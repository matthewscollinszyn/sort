import prisma from './prisma.js';
import { getSystemSetting } from './settings.js';

/**
 * Monthly points reset logic
 * Runs on the 1st day of every month
 */
export const runMonthlyReset = async () => {
    try {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1; // 1-12
        const year = now.getFullYear();

        // Check if we already did the reset for this month
        const resetKey = `points_reset_${year}_${month}`;
        const alreadyReset = await prisma.systemSettings.findUnique({
            where: { key: resetKey }
        });

        if (alreadyReset) {
            return;
        }

        // Only run on the 1st of the month
        if (day !== 1) {
            return;
        }

        console.log(`\n📅 1st of the month detected (${month}/${year}). Starting monthly points reset...`);

        // 1. Get all students with points > 0
        const usersWithPoints = await prisma.user.findMany({
            where: {
                role: 'STUDENT',
                points: { gt: 0 }
            },
            select: {
                id: true,
                points: true,
                username: true
            }
        });

        if (usersWithPoints.length === 0) {
            console.log('   ℹ️ No users with points to reset.');
        } else {
            console.log(`   📊 Found ${usersWithPoints.length} users with points. Moving to history...`);

            // 2. Create history entries and reset points in a transaction
            await prisma.$transaction([
                // Create history entries
                ...usersWithPoints.map(user => prisma.pointHistory.create({
                    data: {
                        userId: user.id,
                        points: user.points,
                        type: 'MONTHLY',
                        month: month === 1 ? 12 : month - 1, // Store as the month that just ended
                        year: month === 1 ? year - 1 : year
                    }
                })),
                // Reset points to 0
                prisma.user.updateMany({
                    where: {
                        role: 'STUDENT',
                        points: { gt: 0 }
                    },
                    data: { points: 0 }
                })
            ]);

            console.log(`   ✅ Successfully reset points for ${usersWithPoints.length} users.`);
        }

        // 3. Mark as done for this month
        await prisma.systemSettings.create({
            data: {
                key: resetKey,
                value: 'done',
                label: `Monthly points reset for ${month}/${year}`
            }
        });

    } catch (error) {
        console.error('   ❌ Error in runMonthlyReset:', error);
    }
};

/**
 * Award points to a student and check for quarterly certificate eligibility.
 * Points are ONLY awarded to students.
 * @param {number} userId - The user ID to award points to
 * @param {number} amount - The amount of points to award
 * @returns {Promise<object>} - Updated user data
 */
export const awardPoints = async (userId, amount) => {
    if (amount <= 0) return null;

    try {
        // Get user details to check role and quarterly points
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true, quarterlyPoints: true, eligibleForCertificate: true }
        });

        if (!user) return null;

        // ONLY STUDENTS GET POINTS
        if (user.role !== 'STUDENT') {
            console.log(`   ℹ️  User ${userId} is ${user.role} - no points awarded.`);
            return null;
        }

        const goldThreshold = parseInt(await getSystemSetting('points_gold_threshold', '300'), 10) || 300;
        const newQuarterlyPoints = user.quarterlyPoints + amount;
        // Only students can be eligible for certificates
        const shouldAwardCertificate = !user.eligibleForCertificate && newQuarterlyPoints >= goldThreshold;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                points: { increment: amount },
                quarterlyPoints: { increment: amount },
                lifetimePoints: { increment: amount },
                eligibleForCertificate: shouldAwardCertificate ? true : undefined
            }
        });

        if (shouldAwardCertificate) {
            console.log(`   🏆 User ${userId} reached ${goldThreshold} quarterly points! ELIGIBLE FOR CERTIFICATE.`);
        }

        return updatedUser;
    } catch (error) {
        console.error('   ❌ Error in awardPoints:', error);
        return null;
    }
};

/**
 * Check if the current_quarter_end date (stored in system_settings) has been
 * reached or passed. Returns { due: boolean, quarter: number|null, year: number }
 * so callers can decide whether to trigger a reset.
 *
 * Call this on login, admin trigger, or any scheduled check.
 */
export const checkQuarterEnd = async () => {
    const quarterEndStr = await getSystemSetting('current_quarter_end');

    if (!quarterEndStr) {
        return { due: false, quarter: null, year: null, reason: 'current_quarter_end not set in system_settings' };
    }

    const quarterEnd = new Date(quarterEndStr);
    if (isNaN(quarterEnd.getTime())) {
        console.warn(`[checkQuarterEnd] Invalid date value: "${quarterEndStr}"`);
        return { due: false, quarter: null, year: null, reason: 'invalid date format' };
    }

    const now = new Date();
    const due = now >= quarterEnd;

    // Derive quarter number from the configured end month
    const endMonth = quarterEnd.getMonth() + 1; // 1-12
    const monthToQuarter = { 3: 1, 6: 2, 9: 3, 12: 4 };
    const quarter = monthToQuarter[endMonth] ?? null;

    return {
        due,
        quarter,
        year: quarterEnd.getFullYear(),
        quarterEndDate: quarterEndStr,
    };
};

/**
 * Quarterly points reset logic.
 * Can be triggered by a scheduled check or an admin action.
 * Uses current_quarter_end from system_settings instead of hardcoded months.
 */
export const runQuarterlyReset = async () => {
    try {
        const { due, quarter, year, reason } = await checkQuarterEnd();

        if (!due) {
            if (reason) console.log(`   ℹ️ Quarterly reset skipped: ${reason}`);
            return;
        }

        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();

        const resetKey = `quarterly_reset_${year}_Q${quarter ?? 'unknown'}`;
        const alreadyReset = await prisma.systemSettings.findUnique({
            where: { key: resetKey }
        });

        if (alreadyReset) {
            return;
        }

        console.log(`\n📅 Quarterly reset due (Q${quarter} end). Starting quarterly points reset...`);

        // 1. Get all students with quarterly points > 0
        const usersWithPoints = await prisma.user.findMany({
            where: {
                role: 'STUDENT',
                quarterlyPoints: { gt: 0 }
            },
            select: {
                id: true,
                quarterlyPoints: true
            }
        });

        if (usersWithPoints.length === 0) {
            console.log('   ℹ️ No users with quarterly points to reset.');
        } else {
            console.log(`   📊 Found ${usersWithPoints.length} users with quarterly points. Moving to history...`);

            // 2. Create history entries and reset points in a transaction
            await prisma.$transaction([
                // Create history entries
                ...usersWithPoints.map(user => prisma.pointHistory.create({
                    data: {
                        userId: user.id,
                        points: user.quarterlyPoints,
                        type: 'QUARTERLY',
                        quarter: quarter,
                        year: year
                    }
                })),
                // Reset quarterly points and eligibility
                prisma.user.updateMany({
                    where: {
                        role: 'STUDENT'
                    },
                    data: {
                        quarterlyPoints: 0,
                        eligibleForCertificate: false
                    }
                })
            ]);

            console.log(`   ✅ Successfully reset quarterly points for ${usersWithPoints.length} users.`);
        }

        // 3. Mark reset as done so it doesn't fire again this quarter
        await prisma.systemSettings.upsert({
            where: { key: resetKey },
            update: { value: 'done' },
            create: {
                key: resetKey,
                value: 'done',
                label: `Quarterly points reset for Q${quarter} (${year})`
            }
        });

        // 4. Advance current_quarter_end to the next quarter (+3 months)
        const nextQuarterEnd = new Date(resetKey.includes('unknown') ? new Date() : new Date(year, (now.getMonth() + 3), 0));
        await prisma.systemSettings.upsert({
            where: { key: 'current_quarter_end' },
            update: { value: nextQuarterEnd.toISOString().split('T')[0] },
            create: {
                key: 'current_quarter_end',
                value: nextQuarterEnd.toISOString().split('T')[0],
                label: 'Current Quarter End Date (YYYY-MM-DD)'
            }
        });

        console.log(`   📅 Next quarter end set to: ${nextQuarterEnd.toISOString().split('T')[0]}`);

    } catch (error) {
        console.error('   ❌ Error in runQuarterlyReset:', error);
    }
};

/**
 * Start the rewards background tasks
 */
export const startRewardTasks = (intervalMs = 3600000) => { // Default: run every hour
    console.log(`⏱️  Reward tasks initialized (Interval: ${intervalMs / 1000 / 60}m)`);
    // Run immediately on start
    runMonthlyReset();
    runQuarterlyReset();
    // Then every interval
    setInterval(() => {
        runMonthlyReset();
        runQuarterlyReset();
    }, intervalMs);
};
