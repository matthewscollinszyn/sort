import { PrismaClient } from './generated/prisma/index.js';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function resetData() {
    try {
        console.log('Starting data reset...');

        // 1. Reset points and report counts for students
        const updatedStudents = await prisma.user.updateMany({
            where: { role: 'STUDENT' },
            data: {
                points: 0,
                reports: 0
            }
        });
        console.log(`Reset points and reports for ${updatedStudents.count} students.`);

        // 2. Reset report counts for non-students (since we're clearing the reports table)
        const updatedOthers = await prisma.user.updateMany({
            where: { role: { not: 'STUDENT' } },
            data: {
                reports: 0
            }
        });
        console.log(`Reset report counts for ${updatedOthers.count} non-student users.`);

        // 3. Clear all reports
        const deletedReports = await prisma.report.deleteMany({});
        console.log(`Deleted ${deletedReports.count} reports.`);

        console.log('Data reset completed successfully.');

    } catch (error) {
        console.error('Error during data reset:', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetData();
