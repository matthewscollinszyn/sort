import prisma from '../lib/prisma.js';
import { publishEvent } from '../lib/realtime.js';

// Upload or update campus map
export const uploadCampusMap = async (req, res) => {
    try {
        const { imageData, imageName, imageSize } = req.body;
        const userId = req.user?.userId;

        if (!imageData) {
            return res.status(400).json({
                success: false,
                message: 'Image data is required'
            });
        }

        // Check if a map already exists
        const existingMap = await prisma.campusMap.findFirst({
            orderBy: { createdAt: 'desc' }
        });

        let campusMap;
        if (existingMap) {
            // Update existing map
            campusMap = await prisma.campusMap.update({
                where: { id: existingMap.id },
                data: {
                    imageData,
                    imageName,
                    imageSize,
                    uploadedById: userId,
                    updatedAt: new Date()
                }
            });
        } else {
            // Create new map
            campusMap = await prisma.campusMap.create({
                data: {
                    imageData,
                    imageName,
                    imageSize,
                    uploadedById: userId
                }
            });
        }

        res.json({
            success: true,
            message: 'Campus map uploaded successfully',
            data: { id: campusMap.id }
        });
    } catch (error) {
        console.error('Error uploading campus map:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload campus map'
        });
    }
};

// Get current campus map
export const getCampusMap = async (req, res) => {
    try {
        const campusMap = await prisma.campusMap.findFirst({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                imageData: true,
                imageName: true,
                imageSize: true,
                updatedAt: true
            }
        });

        if (!campusMap) {
            return res.json({
                success: true,
                data: null
            });
        }

        res.json({
            success: true,
            data: campusMap
        });
    } catch (error) {
        console.error('Error fetching campus map:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch campus map'
        });
    }
};

// Update bin location coordinates
export const updateBinCoordinates = async (req, res) => {
    try {
        const { locationId } = req.params;
        const { mapX, mapY } = req.body;

        if (mapX === undefined || mapY === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Coordinates (mapX, mapY) are required'
            });
        }

        const location = await prisma.location.update({
            where: { id: parseInt(locationId, 10) },
            data: { mapX, mapY }
        });

        res.json({
            success: true,
            message: 'Bin coordinates updated',
            data: location
        });
    } catch (error) {
        console.error('Error updating bin coordinates:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update bin coordinates'
        });
    }
};

// Get bin statuses
export const getBinStatuses = async (req, res) => {
    try {
        console.log('getBinStatuses called');
        const statuses = await prisma.binStatus.findMany();
        console.log('Found statuses:', statuses.length);

        res.json({
            success: true,
            data: statuses
        });
    } catch (error) {
        console.error('Error fetching bin statuses:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bin statuses',
            error: error.message
        });
    }
};

// Update bin status
export const updateBinStatus = async (req, res) => {
    try {
        const { locationId } = req.params;
        const { fillStatus } = req.body;
        const userId = req.user?.userId;

        if (!fillStatus || !['empty', 'full'].includes(fillStatus)) {
            return res.status(400).json({
                success: false,
                message: 'Valid fillStatus is required (empty, full)'
            });
        }

        const id = parseInt(locationId, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid locationId'
            });
        }

        const location = await prisma.location.findUnique({
            where: { id },
            select: { name: true }
        });

        const binStatus = await prisma.binStatus.upsert({
            where: { locationId: id },
            update: {
                fillStatus,
                lastUpdated: new Date(),
                updatedBy: userId
            },
            create: {
                locationId: id,
                fillStatus,
                updatedBy: userId
            }
        });

        // Broadcast real-time update
        publishEvent('reports', 'binStatus.updated', {
            locationId: id,
            locationName: location?.name,
            fillStatus,
            updatedBy: userId,
            timestamp: new Date()
        });

        res.json({
            success: true,
            message: 'Bin status updated',
            data: binStatus
        });
    } catch (error) {
        console.error('Error updating bin status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update bin status'
        });
    }
};

// Get analytics data from real reports
export const getAnalytics = async (req, res) => {
    try {
        // Total reports count
        const totalReports = await prisma.report.count();

        // Reports by type
        const wasteReports = await prisma.report.count({
            where: { type: 'WASTE' }
        });
        const assetReports = await prisma.report.count({
            where: { type: 'ASSET' }
        });

        // Reports by status
        const pendingReports = await prisma.report.count({
            where: { status: 'PENDING' }
        });
        const resolvedReports = await prisma.report.count({
            where: { status: { in: ['COMPLETED', 'RESOLVED', 'COLLECTED'] } }
        });
        const dismissedReports = await prisma.report.count({
            where: { status: 'DISMISSED' }
        });

        // Active users (users who have submitted reports)
        const activeUsers = await prisma.user.count({
            where: { reports: { gt: 0 } }
        });

        // Total kilos collected
        const kgCollected = await prisma.report.aggregate({
            _sum: { kilosCollected: true },
            where: { kilosCollected: { not: null } }
        });

        // CO2 calculation (approximate: 1kg waste = 0.5kg CO2 saved)
        const co2Saved = (kgCollected._sum.kilosCollected || 0) * 0.5;

        // Reports by month (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const reportsByMonth = await prisma.report.groupBy({
            by: ['createdAt'],
            _count: { id: true },
            where: {
                createdAt: { gte: sixMonthsAgo }
            }
        });

        // Group by month
        const monthlyData = {};
        reportsByMonth.forEach(item => {
            const month = new Date(item.createdAt).toLocaleString('default', { month: 'short' });
            monthlyData[month] = (monthlyData[month] || 0) + item._count.id;
        });

        res.json({
            success: true,
            data: {
                totalReports,
                wasteReports,
                assetReports,
                pendingReports,
                resolvedReports,
                dismissedReports,
                activeUsers,
                kgCollected: parseFloat((kgCollected._sum.kilosCollected || 0).toFixed(2)),
                co2Saved: parseFloat(co2Saved.toFixed(2)),
                monthlyData
            }
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch analytics'
        });
    }
};
