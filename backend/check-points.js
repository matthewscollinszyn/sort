import { PrismaClient } from './generated/prisma/index.js';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function checkPoints() {
    try {
        // Get student user
        const user = await prisma.user.findUnique({
            where: { id: 1 },
            select: {
                username: true,
                points: true,
                reports: true,
                firstName: true,
                lastName: true
            }
        });

        console.log('\n=== USER INFO ===');
        console.log(`Name: ${user.firstName} ${user.lastName} (${user.username})`);
        console.log(`Points: ${user.points}`);
        console.log(`Reports count: ${user.reports}`);

        // Get all reports for this user
        const reports = await prisma.report.findMany({
            where: { userId: 1 },
            select: {
                id: true,
                location: true,
                status: true,
                type: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: { createdAt: 'desc' }
        });

        console.log('\n=== REPORTS ===');
        console.table(reports);

        // Check system settings for points
        const settings = await prisma.systemSettings.findMany({
            where: {
                key: { in: ['points_1st', 'points_2nd', 'points_3rd'] }
            }
        });

        console.log('\n=== SYSTEM SETTINGS ===');
        console.table(settings);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkPoints();
