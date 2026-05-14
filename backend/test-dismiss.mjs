import { ApiClient, logger } from './test-utils.js';

async function runTests() {
    const student1Api = new ApiClient();
    const student2Api = new ApiClient();
    const adminApi = new ApiClient();

    try {
        logger.step('Starting Bin Status Dismissal Test');

        // 1. Sign in Admin
        logger.info('Signing in Admin...');
        await adminApi.login('admin', 'admin123');
        logger.success('Signed in as Admin');

        // 2. Register/Login two students
        const s1User = `s1_${Date.now()}`;
        const s2User = `s2_${Date.now()}`;

        logger.info(`Registering student 1: ${s1User}...`);
        await adminApi.post('/auth/register', {
            username: s1User,
            password: 'password123',
            firstName: 'Student',
            lastName: 'One',
            email: `${s1User}@example.com`,
            role: 'STUDENT'
        });
        await student1Api.login(s1User, 'password123');

        logger.info(`Registering student 2: ${s2User}...`);
        await adminApi.post('/auth/register', {
            username: s2User,
            password: 'password123',
            firstName: 'Student',
            lastName: 'Two',
            email: `${s2User}@example.com`,
            role: 'STUDENT'
        });
        await student2Api.login(s2User, 'password123');
        
        logger.success('Two fresh students ready');

        // Get location ID for "Cafeteria – Block A"
        const locationsResult = await adminApi.get('/settings/locations?type=BIN_LOCATION');
        const locations = locationsResult.data.data || [];
        const cafeteria = locations.find(l => l.name === 'Cafeteria – Block A');
        
        if (!cafeteria) {
            throw new Error('Cafeteria – Block A location not found');
        }

        logger.info(`Target Location: ${cafeteria.name} (ID: ${cafeteria.id})`);

        // 3. Create 2 reports from DIFFERENT students
        logger.step(`Creating 2 reports for "${cafeteria.name}"...`);
        const r1 = await student1Api.post('/reports', { location: cafeteria.name, urgency: 'high' });
        logger.info(`Report 1 created by ${s1User}`);
        
        const r2 = await student2Api.post('/reports', { location: cafeteria.name, urgency: 'normal' });
        logger.info(`Report 2 created by ${s2User}`);
        
        logger.success('Reports created successfully');
        
        // 4. Verify status is 'full' (due to high urgency)
        logger.info('Verifying status is full after verification...');
        await adminApi.patch(`/reports/${r1.data.data.report.id}/status`, { status: 'VERIFIED' });
        
        let binStatuses = await adminApi.get('/map/bins/statuses');
        let currentStatus = binStatuses.data.data.find(s => s.locationId === cafeteria.id)?.fillStatus;
        logger.info(`Current Bin Status: ${currentStatus}`);

        // 5. Dismiss 1st report, check if still full (because r2 is still active)
        // Wait, r2 is NORMAL urgency. 
        // Logic: activeCount >= 3 OR highUrgencyCount > 0.
        // r1 was high urgency. Once dismissed, highUrgencyCount becomes 0.
        // r2 is normal urgency, activeCount becomes 1.
        // Threshold for activeCount is 3.
        // So after dismissing r1, it SHOULD become 'empty' unless there are other reports.
        
        logger.step('Dismissing 1st report (High Urgency)...');
        await adminApi.patch(`/reports/${r1.data.data.report.id}/status`, { status: 'DISMISSED' });
        
        binStatuses = await adminApi.get('/map/bins/statuses');
        currentStatus = binStatuses.data.data.find(s => s.locationId === cafeteria.id)?.fillStatus;
        logger.info(`Bin Status (1 report left): ${currentStatus}`);

        // 6. Dismiss 2nd report, check if empty
        logger.step('Dismissing 2nd report...');
        await adminApi.patch(`/reports/${r2.data.data.report.id}/status`, { status: 'DISMISSED' });
        
        binStatuses = await adminApi.get('/map/bins/statuses');
        currentStatus = binStatuses.data.data.find(s => s.locationId === cafeteria.id)?.fillStatus;
        logger.info(`Bin Status (0 reports left): ${currentStatus}`);
        
        if (currentStatus === 'empty') {
            logger.success('TEST PASSED: Dismissal reset logic works!');
        } else {
            logger.error(`TEST FAILED: Status is ${currentStatus}, expected 'empty'`);
            process.exit(1);
        }

        logger.step('All tests completed successfully!');

    } catch (error) {
        logger.error(`Test Error: ${error.message}`);
        if (error.data) console.error(error.data);
        process.exit(1);
    }
}

runTests();
