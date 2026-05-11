import { PrismaClient } from '../../generated/prisma/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

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

        // Find user by username (case-insensitive)
        const user = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: 'insensitive'
                }
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

        // Return user data (without password) and token
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            success: true,
            message: 'Sign in successful',
            data: {
                user: userWithoutPassword,
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
            studentId,
            course,
            section,
            department,
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
                where: { studentId: lrn }
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
                studentId,
                course,
                section,
                department,
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
    // Clear the HttpOnly cookie
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
                studentId: true,
                course: true,
                section: true,
                department: true,
                points: true,
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

        res.json({
            success: true,
            data: { user }
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
                studentId: true,
                course: true,
                section: true,
                department: true,
                points: true,
                reports: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({
            success: true,
            data: { users }
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
                course: true,
                department: true,
                points: true,
                reports: true,
            },
            orderBy: { points: 'desc' },
            take: 20,
        });

        const leaderboard = users.map((u, idx) => ({
            rank: idx + 1,
            name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username,
            points: u.points,
            reports: u.reports,
            department: u.course || u.department || '',
        }));

        res.json({ success: true, data: { leaderboard } });
    } catch (error) {
        console.error('GetLeaderboard error:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};
