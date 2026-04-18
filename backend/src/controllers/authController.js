import { PrismaClient } from '@prisma/client';
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
