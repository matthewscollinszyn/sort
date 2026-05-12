import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

/**
 * Automatically delete reports based on retention policies:
 * - DISMISSED: Delete after 5 minutes
 * - COMPLETED/RESOLVED/COLLECTED: Delete after 14 days
 */
export const runCleanup = async () => {
    try {
        console.log('\n🧹 Running scheduled report cleanup...');
        
        // 1. Retention Policy: DISMISSED reports
        // Previously: Delete after 5 minutes. 
        // Now: We keep them in the database so MRF staff can see history.
        // They are filtered out for Admin in the controller instead.
        /*
        const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
        const dismissedDeleted = await prisma.report.deleteMany({
            where: {
                status: 'DISMISSED',
                updatedAt: { lt: fiveMinsAgo }
            }
        });
        
        if (dismissedDeleted.count > 0) {
            console.log(`   ✅ Removed ${dismissedDeleted.count} dismissed reports (older than 5 mins)`);
        }
        */

        console.log('   ℹ️  Retention policy: Reports are now preserved in DB. Admin view is filtered in controller.');

    } catch (error) {
        console.error('   ❌ Error in runCleanup:', error);
    }
};

/**
 * Start the cleanup interval
 * Default: run every minute to check for 5-min expirations
 */
export const startCleanupTask = (intervalMs = 60000) => {
    console.log(`⏱️  Report cleanup task initialized (Interval: ${intervalMs / 1000}s)`);
    // Run immediately on start
    runCleanup();
    // Then every interval
    setInterval(runCleanup, intervalMs);
};
