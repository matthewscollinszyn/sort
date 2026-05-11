import { PrismaClient } from '../../generated/prisma/index.js';
import { publishEvent } from '../lib/realtime.js';

const prisma = new PrismaClient();

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const IMPACT_COEFFICIENTS = {
    co2PerKg: 1.2,
    treesPerKg: 0.02,
    waterPerKg: 3.2,
    energyPerKg: 2.4,
};

function getMonthKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

function buildMonthBuckets(monthCount) {
    const now = new Date();
    const buckets = [];
    for (let i = monthCount - 1; i >= 0; i -= 1) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        buckets.push({
            key: getMonthKey(date),
            month: MONTH_LABELS[date.getMonth()],
            waste: 0,
            recycling: 0,
            participation: 0,
        });
    }
    return buckets;
}

function roundNumber(value, decimals = 1) {
    if (!Number.isFinite(value)) return 0;
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

function formatUserDisplayName(user) {
    if (!user) return null;
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || null;
}

function emitReportEvent(event, report, extra = {}) {
    publishEvent('reports', event, {
        reportId: report.id,
        status: report.status,
        type: report.type,
        userId: report.userId || report.user?.id,
        assignedStaffId: report.assignedStaffId || null,
        assignedStaffName: formatUserDisplayName(report.assignedStaff) || null,
        location: report.location,
        ...extra,
    });
}

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

        // Determine report type based on wasteType/category
        // Fetch asset categories from database
        const assetCategories = await prisma.assetCategory.findMany({
            where: { enabled: true },
            select: { name: true }
        });
        const assetCategoryNames = assetCategories.map(c => c.name.toLowerCase());

        const normalizedWasteType = (wasteType || 'general').toLowerCase();
        const reportType = assetCategoryNames.includes(normalizedWasteType) ? 'ASSET' : 'WASTE';

        // Create the report
        const report = await prisma.report.create({
            data: {
                location,
                notes: notes || '',
                photoUrl: photoUrl || null,
                urgency: urgency || 'normal',
                wasteType: wasteType || 'general',
                type: reportType,
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
                },
                assignedStaff: {
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
            where: { id: parseInt(userId, 10) },
            data: {
                reports: { increment: 1 }
            }
        });

        emitReportEvent('report.created', report, {
            actorRole: req.user.role,
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
                },
                assignedStaff: {
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
        console.log('getAllReports called - User role:', req.user.role, 'User ID:', req.user.userId);

        if (!['ADMIN', 'MRF'].includes(req.user.role)) {
            console.log('❌ Access denied for role:', req.user.role);
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin or MRF only.'
            });
        }

        console.log('✅ Access granted for role:', req.user.role);
        const { status, type } = req.query;
        const where = {};
        if (status && status !== 'all') {
            where.status = status.toUpperCase();
        }
        if (type && type !== 'all') {
            where.type = type.toUpperCase();
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
                },
                assignedStaff: {
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

        console.log('getReportById called - Report ID:', id, 'User role:', userRole, 'User ID:', userId);

        const reportId = parseInt(id, 10);
        if (isNaN(reportId)) {
            console.log('❌ Invalid report ID:', id);
            return res.status(400).json({
                success: false,
                message: 'Invalid report ID'
            });
        }

        const report = await prisma.report.findUnique({
            where: { id: reportId },
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
                },
                assignedStaff: {
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

        console.log(`\n🔄 updateReportStatus called - Report ID: ${id}, New Status: ${status}, Actor: ${req.user.role} (ID: ${req.user.userId})`);

        const validStatuses = ['PENDING', 'VERIFIED', 'DISMISSED', 'DISPATCHED', 'COLLECTED', 'RESOLVED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        // Get the current report to check previous status, type, location, and reporter role
        const currentReport = await prisma.report.findUnique({
            where: { id: parseInt(id, 10) },
            select: {
                status: true,
                userId: true,
                type: true,
                location: true,
                user: { select: { role: true, username: true, points: true } }
            }
        });

        if (!currentReport) {
            console.log(`❌ Report ${id} not found`);
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        console.log(`   Previous status: ${currentReport.status}, Reporter: ${currentReport.user.username} (${currentReport.user.role}), Location: "${currentReport.location}", Type: ${currentReport.type}`);

        const report = await prisma.report.update({
            where: { id: parseInt(id, 10) },
            data: { status },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true
                    }
                },
                assignedStaff: {
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

        // Award points when status changes to VERIFIED
        let pointsAwarded = 0;
        if (status === 'VERIFIED' && currentReport.status !== 'VERIFIED') {
            console.log(`   ✅ Status change to VERIFIED detected - calculating points...`);

            if (currentReport.type === 'WASTE' && currentReport.user?.role === 'STUDENT') {
                // For student bin (WASTE) reports: position-based points for same bin location
                // Fetch points from SystemSettings
                const pointsSettings = await prisma.systemSettings.findMany({
                    where: {
                        key: { in: ['points_1st', 'points_2nd', 'points_3rd'] }
                    }
                });

                // Convert to map with defaults
                const pointsMap = {
                    points_1st: 15,
                    points_2nd: 10,
                    points_3rd: 5
                };
                pointsSettings.forEach(setting => {
                    pointsMap[setting.key] = parseInt(setting.value, 10) || 0;
                });

                console.log(`   Points config: 1st=${pointsMap.points_1st}, 2nd=${pointsMap.points_2nd}, 3rd=${pointsMap.points_3rd}`);

                // Count how many reports at the same location were already verified
                // (excluding this report)
                const verifiedSameLocation = await prisma.report.count({
                    where: {
                        location: currentReport.location,
                        type: 'WASTE',
                        status: 'VERIFIED',
                        id: { not: parseInt(id, 10) },
                        user: { role: 'STUDENT' }
                    }
                });

                // Award points based on position (1st, 2nd, 3rd verified reporter)
                if (verifiedSameLocation === 0) pointsAwarded = pointsMap.points_1st;
                else if (verifiedSameLocation === 1) pointsAwarded = pointsMap.points_2nd;
                else if (verifiedSameLocation === 2) pointsAwarded = pointsMap.points_3rd;
                else pointsAwarded = 0;

                console.log(`   📊 Position at "${currentReport.location}": ${verifiedSameLocation + 1}${verifiedSameLocation === 0 ? 'st' : verifiedSameLocation === 1 ? 'nd' : verifiedSameLocation === 2 ? 'rd' : 'th'} verified (${verifiedSameLocation} before this)`);
                console.log(`   💰 Points to award: ${pointsAwarded}`);
            } else {
                // For non-student or asset reports, use provided points or default 15
                pointsAwarded = points || 15;
                console.log(`   💰 Non-student/asset report - awarding: ${pointsAwarded} points`);
            }

            if (pointsAwarded > 0) {
                await prisma.user.update({
                    where: { id: currentReport.userId },
                    data: { points: { increment: pointsAwarded } }
                });
                console.log(`   ✅ Awarded ${pointsAwarded} points to user ${currentReport.userId} (${currentReport.user.username})`);
                console.log(`   📈 New total: ${currentReport.user.points} + ${pointsAwarded} = ${currentReport.user.points + pointsAwarded} points\n`);
            } else {
                console.log(`   ℹ️  No points awarded (4th+ reporter at this location)\n`);
            }
        } else if (status === 'VERIFIED' && currentReport.status === 'VERIFIED') {
            console.log(`   ℹ️  Report already VERIFIED - no points awarded (preventing duplicate awards)\n`);
        } else {
            console.log(`   ℹ️  Status change to ${status} - no points awarded\n`);
        }

        emitReportEvent('report.updated', report, {
            previousStatus: currentReport.status,
            actorRole: req.user.role,
            pointsAwarded,
        });

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

        const report = await prisma.report.findUnique({ where: { id: parseInt(id, 10) } });

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

        emitReportEvent('report.deleted', report, {
            previousStatus: report.status,
            actorRole: req.user.role,
        });

        await prisma.report.delete({ where: { id: parseInt(id, 10) } });

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

/* ═══════════════════════════════════════════════════════════
   MRF OPERATIONS WORKFLOW
   ═══════════════════════════════════════════════════════════ */

// 1. DISPATCH STAFF - Admin assigns MRF staff to a PENDING report
export const dispatchStaff = async (req, res) => {
    try {
        // Only Admin can dispatch
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin only.'
            });
        }

        const { id } = req.params;
        const { staffId } = req.body;

        // Validate required fields
        if (!staffId) {
            return res.status(400).json({
                success: false,
                message: 'Staff ID is required'
            });
        }

        const assignedStaff = await prisma.user.findUnique({
            where: { id: parseInt(staffId, 10) },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
            }
        });

        if (!assignedStaff || assignedStaff.role !== 'MRF') {
            return res.status(400).json({
                success: false,
                message: 'Selected staff member is invalid'
            });
        }

        // Get the current report
        const currentReport = await prisma.report.findUnique({
            where: { id: parseInt(id, 10) },
            select: { status: true }
        });

        if (!currentReport) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        // Only allow dispatching PENDING or VERIFIED reports
        if (!['PENDING', 'VERIFIED'].includes(currentReport.status)) {
            return res.status(400).json({
                success: false,
                message: `Cannot dispatch report with status: ${currentReport.status}`
            });
        }

        // Update report to DISPATCHED with assigned staff
        const report = await prisma.report.update({
            where: { id: parseInt(id, 10) },
            data: {
                status: 'DISPATCHED',
                assignedStaffId: parseInt(staffId, 10)
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
                },
                assignedStaff: {
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

        emitReportEvent('report.updated', report, {
            previousStatus: currentReport.status,
            actorRole: req.user.role,
            action: 'dispatch',
        });

        res.json({
            success: true,
            message: `Report dispatched to ${formatUserDisplayName(assignedStaff)}`,
            data: { report }
        });
    } catch (error) {
        console.error('DispatchStaff error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while dispatching staff'
        });
    }
};

// 2. CONFIRM COLLECTION - MRF staff enters kilos and marks as IN_PROGRESS
export const confirmCollection = async (req, res) => {
    try {
        // Only MRF staff can confirm collection
        if (req.user.role !== 'MRF') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. MRF staff only.'
            });
        }

        const { id } = req.params;
        const { kilos } = req.body;

        // Validate required fields
        if (kilos === undefined || kilos === null) {
            return res.status(400).json({
                success: false,
                message: 'Kilos collected is required'
            });
        }

        if (typeof kilos !== 'number' || kilos < 0) {
            return res.status(400).json({
                success: false,
                message: 'Kilos must be a valid positive number'
            });
        }

        // Get the current report
        const currentReport = await prisma.report.findUnique({
            where: { id: parseInt(id, 10) },
            select: { status: true, assignedStaffId: true }
        });

        if (!currentReport) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        // Only allow confirming DISPATCHED reports
        if (currentReport.status !== 'DISPATCHED') {
            return res.status(400).json({
                success: false,
                message: `Cannot confirm collection for report with status: ${currentReport.status}`
            });
        }

        // Verify the staff member is assigned to this report
        if (currentReport.assignedStaffId !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not assigned to this report'
            });
        }

        // Update report to IN_PROGRESS with collection data
        const report = await prisma.report.update({
            where: { id: parseInt(id, 10) },
            data: {
                status: 'IN_PROGRESS',
                kilosCollected: kilos,
                collectionDate: new Date()
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
                },
                assignedStaff: {
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

        emitReportEvent('report.updated', report, {
            previousStatus: currentReport.status,
            actorRole: req.user.role,
            action: 'confirm_collection',
            kilosCollected: kilos,
        });

        res.json({
            success: true,
            message: `Collection confirmed: ${kilos} kg recorded`,
            data: { report }
        });
    } catch (error) {
        console.error('ConfirmCollection error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while confirming collection'
        });
    }
};

// 3. MARK AS DONE - MRF staff finalizes the report as COMPLETED
export const markAsDone = async (req, res) => {
    try {
        // Only MRF staff can mark as done
        if (req.user.role !== 'MRF') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. MRF staff only.'
            });
        }

        const { id } = req.params;

        // Get the current report
        const currentReport = await prisma.report.findUnique({
            where: { id: parseInt(id, 10) },
            select: {
                status: true,
                assignedStaffId: true,
                userId: true,
                kilosCollected: true
            }
        });

        if (!currentReport) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        // Only allow marking IN_PROGRESS reports as done
        if (currentReport.status !== 'IN_PROGRESS') {
            return res.status(400).json({
                success: false,
                message: `Cannot mark as done for report with status: ${currentReport.status}`
            });
        }

        // Verify the staff member is assigned to this report
        if (currentReport.assignedStaffId !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not assigned to this report'
            });
        }

        // Update report to COMPLETED
        const report = await prisma.report.update({
            where: { id: parseInt(id, 10) },
            data: {
                status: 'COMPLETED'
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
                },
                assignedStaff: {
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

        // Award points to the reporter for completed collection
        const pointsAwarded = 20; // Award 20 points for completed report
        await prisma.user.update({
            where: { id: currentReport.userId },
            data: {
                points: { increment: pointsAwarded }
            }
        });

        emitReportEvent('report.updated', report, {
            previousStatus: currentReport.status,
            actorRole: req.user.role,
            action: 'mark_done',
            pointsAwarded,
        });

        res.json({
            success: true,
            message: `Report marked as completed. ${pointsAwarded} points awarded to reporter.`,
            data: { report, pointsAwarded }
        });
    } catch (error) {
        console.error('MarkAsDone error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while marking as done'
        });
    }
};

// Impact metrics for dashboard analytics (admin/MRF only)
export const getImpactMetrics = async (req, res) => {
    try {
        if (!['ADMIN', 'MRF'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin or MRF only.'
            });
        }

        const reports = await prisma.report.findMany({
            select: {
                id: true,
                type: true,
                status: true,
                wasteType: true,
                kilosCollected: true,
                createdAt: true,
                updatedAt: true,
                collectionDate: true,
                userId: true,
            }
        });

        const activeLocations = await prisma.location.count({
            where: { enabled: true }
        });

        const wasteReports = reports.filter((r) => r.type === 'WASTE');
        const totalReports = reports.length;
        const totalCollected = reports.reduce((sum, report) => sum + (report.kilosCollected || 0), 0);

        const completedStatuses = new Set(['COMPLETED', 'RESOLVED', 'COLLECTED']);
        const divertedFromLandfill = reports.reduce((sum, report) => {
            if (!completedStatuses.has(report.status)) return sum;
            return sum + (report.kilosCollected || 0);
        }, 0);

        const recyclableReports = wasteReports.filter((report) => {
            if (!report.wasteType) return false;
            return report.wasteType.toLowerCase() !== 'general';
        });

        const recyclingRate = wasteReports.length > 0
            ? roundNumber((recyclableReports.length / wasteReports.length) * 100, 1)
            : 0;

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeUsers = new Set(
            reports
                .filter((report) => report.createdAt >= thirtyDaysAgo)
                .map((report) => report.userId)
        ).size;

        const responseTimes = reports
            .filter((report) => report.updatedAt && report.createdAt)
            .map((report) => (report.updatedAt.getTime() - report.createdAt.getTime()) / 36e5)
            .filter((hours) => hours > 0);

        const avgResponseTime = responseTimes.length
            ? roundNumber(responseTimes.reduce((sum, hours) => sum + hours, 0) / responseTimes.length, 1)
            : 0;

        const completedReports = reports.filter((report) => completedStatuses.has(report.status));
        const satisfactionScore = totalReports > 0
            ? roundNumber(Math.min(5, (completedReports.length / totalReports) * 5), 1)
            : 0;

        const trends = buildMonthBuckets(6);
        const trendMap = new Map(trends.map((bucket) => [bucket.key, bucket]));

        reports.forEach((report) => {
            const bucketDate = report.collectionDate || report.updatedAt || report.createdAt;
            const bucketKey = getMonthKey(bucketDate);
            const bucket = trendMap.get(bucketKey);
            if (!bucket) return;
            const weight = report.kilosCollected || 0;

            if (report.type === 'WASTE') {
                bucket.waste += weight;
                if (report.wasteType && report.wasteType.toLowerCase() !== 'general') {
                    bucket.recycling += weight;
                }
            }
            bucket.participation += 1;
        });

        const lastMonth = trends[trends.length - 1];
        const previousMonth = trends[trends.length - 2];
        const monthlyIncrease = previousMonth && previousMonth.waste > 0
            ? roundNumber(((lastMonth.waste - previousMonth.waste) / previousMonth.waste) * 100, 1)
            : 0;

        const breakdownTotals = new Map();
        const useKilosForBreakdown = wasteReports.some((report) => report.kilosCollected);

        wasteReports.forEach((report) => {
            const category = (report.wasteType || 'general').toLowerCase();
            const increment = useKilosForBreakdown ? (report.kilosCollected || 0) : 1;
            breakdownTotals.set(category, (breakdownTotals.get(category) || 0) + increment);
        });

        const totalBreakdownValue = Array.from(breakdownTotals.values()).reduce((sum, value) => sum + value, 0) || 1;
        const breakdownPalette = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#22c55e', '#0ea5e9'];
        const breakdown = Array.from(breakdownTotals.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([category, value], index) => ({
                category: category.charAt(0).toUpperCase() + category.slice(1),
                value: Math.round((value / totalBreakdownValue) * 100),
                color: breakdownPalette[index % breakdownPalette.length],
            }));

        const impactMetrics = {
            waste: {
                totalCollected: roundNumber(totalCollected, 1),
                monthlyIncrease,
                recyclingRate,
                divertedFromLandfill: roundNumber(divertedFromLandfill, 1),
                activeCollectionPoints: activeLocations,
            },
            environmental: {
                co2Reduced: roundNumber(totalCollected * IMPACT_COEFFICIENTS.co2PerKg, 1),
                treesEquivalent: roundNumber(totalCollected * IMPACT_COEFFICIENTS.treesPerKg, 1),
                waterSaved: roundNumber(totalCollected * IMPACT_COEFFICIENTS.waterPerKg, 1),
                energySaved: roundNumber(totalCollected * IMPACT_COEFFICIENTS.energyPerKg, 1),
            },
            participation: {
                activeUsers,
                totalReports,
                avgResponseTime,
                satisfactionScore,
            },
            trends,
            breakdown,
        };

        res.json({
            success: true,
            data: { impactMetrics }
        });
    } catch (error) {
        console.error('GetImpactMetrics error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching impact metrics'
        });
    }
};
