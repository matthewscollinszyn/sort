import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../lib/prisma.js';

const getRequestToken = (req) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }

    if (typeof req.query.token === 'string' && req.query.token.trim()) {
        return req.query.token.trim();
    }

    return null;
};

export const authenticate = async (req, res, next) => {
    try {
        const token = getRequestToken(req);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // 1. Verify JWT signature (fast, cryptographic — no DB hit)
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expired. Please sign in again.'
                });
            }
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }

        // 2. Session check — single unique-index lookup (fast)
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const session = await prisma.session.findUnique({
            where: { tokenHash },
            select: { id: true, expiresAt: true }
        });

        if (!session) {
            return res.status(401).json({
                success: false,
                message: 'Session not found. Please sign in again.'
            });
        }

        if (session.expiresAt < new Date()) {
            // Clean up expired row in the background
            prisma.session.delete({ where: { tokenHash } }).catch(() => { });
            return res.status(401).json({
                success: false,
                message: 'Session expired. Please sign in again.'
            });
        }

        req.user = decoded;

        // Update lastSeenAt fire-and-forget so it doesn't add to response latency
        prisma.session.update({
            where: { tokenHash },
            data: { lastSeenAt: new Date() }
        }).catch(() => { });

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Authentication error.'
        });
    }
};

// Role-based authorization middleware
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions.'
            });
        }

        next();
    };
};
