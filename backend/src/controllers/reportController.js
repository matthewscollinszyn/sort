import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new report
export const createReport = async (req, res) => {
    try {
        const { location, notes, photoUrl, urgency, wasteType } = req.body;
        const userId = req.user.userId;

        // Validate required fields
        if (!location) {
            return res.status(400).json({
                success: false,
                message: 'Location is required'
            });
        }

        // Create the report
        const report = await prisma.report.create({
            data: {
                location,
                notes: notes || '',
                photoUrl: photoUrl || null,
                urgency: urgency || 'normal',
                wasteType: wasteType || 'general',
                userId,
                status: 'PENDING'
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        role: true
                    }
                }
            }
        });

        // Update user's reports count (points awarded by admin when verified)
        await prisma.user.update({
            where: { id: userId },
            data: {
                reports: { increment: 1 }
            }
        });

        res.status(201).json({
            success: true,
            message: 'Report submitted successfully. Awaiting admin verification for points.',
            data: { report }
        });
    } catch (error) {
        console.error('CreateReport error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while submitting the report'
        });
    }
};

// Get all reports for the authenticated user
export const getMyReports = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { status } = req.query;

        const where = { userId };
        if (status && status !== 'all') {
            where.status = status.toUpperCase();
        }

        const reports = await prisma.report.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        role: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({
            success: true,
            data: { reports }
        });
    } catch (error) {
        console.error('GetMyReports error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching reports'
        });
    }
};

// Get all reports (admin/MRF only)
export const getAllReports = async (req, res) => {
    try {
        if (!['ADMIN', 'MRF'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin or MRF only.'
            });
        }

        const { status } = req.query;
        const where = {};
        if (status && status !== 'all') {
            where.status = status.toUpperCase();
        }

        const reports = await prisma.report.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        role: true,
                        studentId: true,
                        course: true,
                        section: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({
            success: true,
            data: { reports }
        });
    } catch (error) {
        console.error('GetAllReports error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching reports'
        });
    }
};

// Get single report by ID
export const getReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const userRole = req.user.role;

        const report = await prisma.report.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        role: true,
                        studentId: true
                    }
                }
            }
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        // Students can only view their own reports
        if (userRole === 'STUDENT' && report.userId !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        res.json({
            success: true,
            data: { report }
        });
    } catch (error) {
        console.error('GetReportById error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the report'
        });
    }
};

// Update report status (MRF/Admin only)
export const updateReportStatus = async (req, res) => {
    try {
        if (!['ADMIN', 'MRF'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin or MRF only.'
            });
        }

        const { id } = req.params;
        const { status, points } = req.body;

        const validStatuses = ['PENDING', 'VERIFIED', 'DISMISSED', 'DISPATCHED', 'COLLECTED', 'RESOLVED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        // Get the current report to check previous status
        const currentReport = await prisma.report.findUnique({
            where: { id },
            select: { status: true, userId: true }
        });

        if (!currentReport) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        const report = await prisma.report.update({
            where: { id },
            data: { status },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true
                    }
                }
            }
        });

        // Award points when status changes to VERIFIED (admin can specify points, default 15)
        let pointsAwarded = 0;
        if (status === 'VERIFIED' && currentReport.status !== 'VERIFIED') {
            pointsAwarded = points || 15; // Default 15 points if not specified
            await prisma.user.update({
                where: { id: currentReport.userId },
                data: {
                    points: { increment: pointsAwarded }
                }
            });
        }

        res.json({
            success: true,
            message: pointsAwarded > 0
                ? `Report verified! ${pointsAwarded} points awarded to reporter.`
                : 'Report status updated',
            data: { report, pointsAwarded }
        });
    } catch (error) {
        console.error('UpdateReportStatus error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the report'
        });
    }
};

// Delete report (own reports only, or admin)
export const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const userRole = req.user.role;

        const report = await prisma.report.findUnique({ where: { id } });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        // Only allow deletion of own reports or by admin
        if (userRole !== 'ADMIN' && report.userId !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await prisma.report.delete({ where: { id } });

        res.json({
            success: true,
            message: 'Report deleted successfully'
        });
    } catch (error) {
        console.error('DeleteReport error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the report'
        });
    }
};
