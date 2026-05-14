import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Shared helper — mirrors the one in middleware/auth.js
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

// Shared helper — extract raw token from request (same logic as middleware)
const extractToken = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) return authHeader.split(' ')[1];
    if (typeof req.query.token === 'string' && req.query.token.trim()) return req.query.token.trim();
    return null;
};

// Sign in user
export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        // Find user by username, email, or lrn (case-insensitive)
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: { equals: username, mode: 'insensitive' } },
                    { email: { equals: username, mode: 'insensitive' } },
                    { lrn: { equals: username, mode: 'insensitive' } }
                ]
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Compare password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        console.log('Signing in user:', user.username, 'Role:', user.role, 'User ID:', user.id);

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Persist session row so this device can be tracked and revoked
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const userAgent = req.headers['user-agent'] || null;
        const ipAddress = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || null);
        await prisma.session.create({
            data: {
                userId: user.id,
                tokenHash: hashToken(token),
                deviceName: userAgent ? userAgent.substring(0, 150) : null,
                ipAddress: ipAddress ? ipAddress.substring(0, 45) : null,
                userAgent,
                expiresAt
            }
        });

        // Return user data (without password) and token
        const { password: _, ...userWithoutPassword } = user;
        const normalizedUser = {
            ...userWithoutPassword,
            studentId: userWithoutPassword.lrn || null
        };

        res.json({
            success: true,
            message: 'Sign in successful',
            data: {
                user: normalizedUser,
                token
            }
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during sign in'
        });
    }
};

// Register new user (student)
export const register = async (req, res) => {
    try {
        const {
            username,
            password,
            firstName,
            lastName,
            email,
            lrn,
            yearLevel,
            section,
            role = 'STUDENT' // Default to STUDENT
        } = req.body;

        // Validate required fields
        if (!username || !password || !firstName || !lastName) {
            return res.status(400).json({
                success: false,
                message: 'Username, password, first name, and last name are required'
            });
        }

        // Check if username already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: 'insensitive'
                }
            }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists'
            });
        }

        // Check if email already exists (if provided)
        if (email) {
            const existingEmail = await prisma.user.findFirst({
                where: {
                    email: {
                        equals: email,
                        mode: 'insensitive'
                    }
                }
            });

            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            }
        }

        // Check if LRN already exists (if provided)
        if (lrn) {
            const existingLRN = await prisma.user.findFirst({
                where: { lrn }
            });

            if (existingLRN) {
                return res.status(400).json({
                    success: false,
                    message: 'LRN already registered'
                });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                firstName,
                lastName,
                email,
                lrn,
                yearLevel,
                section,
                role
            }
        });

        // Return success (without password)
        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                user: userWithoutPassword
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration'
        });
    }
};

// Sign out user
export const signout = async (req, res) => {
    try {
        // Delete the session row so the token is immediately invalidated on all devices
        const token = extractToken(req);
        if (token) {
            await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } }).catch(() => { });
        }
    } catch (_) { }

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });
    res.json({
        success: true,
        message: 'Signed out successfully'
    });
};

// List active sessions for the authenticated user
export const getSessions = async (req, res) => {
    try {
        const sessions = await prisma.session.findMany({
            where: {
                userId: req.user.userId,
                expiresAt: { gt: new Date() }
            },
            select: {
                id: true,
                deviceName: true,
                ipAddress: true,
                createdAt: true,
                lastSeenAt: true,
                expiresAt: true
            },
            orderBy: { lastSeenAt: 'desc' }
        });
        res.json({ success: true, data: { sessions } });
    } catch (error) {
        console.error('GetSessions error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch sessions' });
    }
};

// Revoke a specific session by its ID (allows remote logout of one device)
export const revokeSession = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await prisma.session.deleteMany({
            where: { id, userId: req.user.userId }
        });
        if (deleted.count === 0) {
            return res.status(404).json({ success: false, message: 'Session not found' });
        }
        res.json({ success: true, message: 'Session revoked' });
    } catch (error) {
        console.error('RevokeSession error:', error);
        res.status(500).json({ success: false, message: 'Failed to revoke session' });
    }
};

// Revoke all other sessions (logout everywhere except current device)
export const revokeAllOtherSessions = async (req, res) => {
    try {
        const token = extractToken(req);
        const currentHash = token ? hashToken(token) : null;
        await prisma.session.deleteMany({
            where: {
                userId: req.user.userId,
                ...(currentHash ? { NOT: { tokenHash: currentHash } } : {})
            }
        });
        res.json({ success: true, message: 'All other sessions revoked' });
    } catch (error) {
        console.error('RevokeAllOtherSessions error:', error);
        res.status(500).json({ success: false, message: 'Failed to revoke sessions' });
    }
};

// Get current user
export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                id: true,
                username: true,
                role: true,
                firstName: true,
                lastName: true,
                email: true,
                lrn: true,
                yearLevel: true,
                section: true,
                points: true,
                quarterlyPoints: true,
                lifetimePoints: true,
                eligibleForCertificate: true,
                reports: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const normalizedUser = {
            ...user,
            studentId: user.lrn || null
        };

        res.json({
            success: true,
            data: { user: normalizedUser }
        });
    } catch (error) {
        console.error('GetMe error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
    try {
        console.log('getAllUsers - User role:', req.user.role, 'User ID:', req.user.userId);

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin only.'
            });
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                role: true,
                firstName: true,
                lastName: true,
                email: true,
                lrn: true,
                yearLevel: true,
                section: true,
                points: true,
                quarterlyPoints: true,
                lifetimePoints: true,
                eligibleForCertificate: true,
                reports: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });

        const normalizedUsers = users.map((user) => ({
            ...user,
            studentId: user.lrn || null
        }));

        res.json({
            success: true,
            data: { users: normalizedUsers }
        });
    } catch (error) {
        console.error('GetAllUsers error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};

// Get leaderboard (top students by points) – accessible to any authenticated user
export const getLeaderboard = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: { role: 'STUDENT' },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                yearLevel: true,
                section: true,
                points: true,
                lifetimePoints: true,
                reports: true,
            },
            orderBy: { points: 'desc' },
            take: 20,
        });

        const leaderboard = users.map((u, idx) => ({
            rank: idx + 1,
            name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username,
            points: u.points,
            lifetimePoints: u.lifetimePoints,
            reports: u.reports,
            department: u.yearLevel ? `${u.yearLevel} - ${u.section || ''}` : '',
        }));

        res.json({ success: true, data: { leaderboard } });
    } catch (error) {
        console.error('GetLeaderboard error:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};

// Get quarterly impact (kg diverted) for the student
export const getQuarterlyImpact = async (req, res) => {
    try {
        const userId = req.user.userId;
        const completedStatuses = ['COMPLETED', 'RESOLVED', 'COLLECTED'];

        // Determine the current quarter start date
        const now = new Date();
        const month = now.getMonth() + 1;
        let quarterStart;

        if (month >= 6 && month <= 10) quarterStart = new Date(now.getFullYear(), 5, 1);
        else if (month >= 11 || month <= 1) quarterStart = new Date(month <= 1 ? now.getFullYear() - 1 : now.getFullYear(), 10, 1);
        else if (month >= 2 && month <= 3) quarterStart = new Date(now.getFullYear(), 1, 1);
        else quarterStart = new Date(now.getFullYear(), 3, 1);

        const stats = await prisma.report.aggregate({
            where: {
                userId,
                status: { in: completedStatuses },
                collectionDate: { gte: quarterStart }
            },
            _sum: { kilosCollected: true }
        });

        const kilosDiverted = roundNumber(stats._sum.kilosCollected || 0, 1);

        res.json({
            success: true,
            data: { kilosDiverted }
        });
    } catch (error) {
        console.error('GetQuarterlyImpact error:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};

// Helper for rounding
function roundNumber(value, decimals = 1) {
    if (!Number.isFinite(value)) return 0;
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}
