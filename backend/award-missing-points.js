import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function awardMissingPoints() {
    try {
        // Find all verified WASTE reports by students that should have points
        const verifiedReports = await prisma.report.findMany({
            where: {
                type: 'WASTE',
                status: 'VERIFIED',
                user: { role: 'STUDENT' }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                        points: true
                    }
                }
            },
            orderBy: [
                { location: 'asc' },
                { updatedAt: 'asc' }
            ]
        });

        console.log(`\n📊 Found ${verifiedReports.length} verified student WASTE reports\n`);

        // Get system settings
        const pointsSettings = await prisma.systemSettings.findMany({
            where: {
                key: { in: ['points_1st', 'points_2nd', 'points_3rd'] }
            }
        });

        const pointsMap = {
            points_1st: 15,
            points_2nd: 10,
            points_3rd: 5
        };
        pointsSettings.forEach(setting => {
            pointsMap[setting.key] = parseInt(setting.value, 10) || 0;
        });

        console.log('Points settings:', pointsMap);
        console.log('\n');

        // Group by location to determine position
        const locationGroups = new Map();
        verifiedReports.forEach(report => {
            if (!locationGroups.has(report.location)) {
                locationGroups.set(report.location, []);
            }
            locationGroups.get(report.location).push(report);
        });

        let totalPointsAwarded = 0;
        const updates = [];

        // Award points based on position per location
        for (const [location, reports] of locationGroups.entries()) {
            console.log(`\n📍 Location: ${location} (${reports.length} reports)`);

            reports.forEach((report, index) => {
                let points = 0;
                if (index === 0) points = pointsMap.points_1st;
                else if (index === 1) points = pointsMap.points_2nd;
                else if (index === 2) points = pointsMap.points_3rd;

                if (points > 0) {
                    console.log(`   ${index + 1}. User: ${report.user.username} (ID: ${report.userId}) - Report #${report.id} - Award: ${points} pts`);
                    updates.push({
                        userId: report.userId,
                        points: points,
                        reportId: report.id
                    });
                    totalPointsAwarded += points;
                } else {
                    console.log(`   ${index + 1}. User: ${report.user.username} (ID: ${report.userId}) - Report #${report.id} - No points (4th+)`);
                }
            });
        }

        console.log(`\n\n🎯 Total points to award: ${totalPointsAwarded}`);
        console.log(`   Updating ${updates.length} users...\n`);

        // Award the points
        for (const update of updates) {
            await prisma.user.update({
                where: { id: update.userId },
                data: { points: { increment: update.points } }
            });
            console.log(`✅ Awarded ${update.points} points to user ${update.userId} for report #${update.reportId}`);
        }

        console.log('\n✨ Done! Points have been awarded.\n');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

awardMissingPoints();
