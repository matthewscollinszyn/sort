import { ApiClient, logger } from './test-utils.js';

async function test300PointsThreshold() {
    const api = new ApiClient();
    const adminApi = new ApiClient();

    try {
        logger.step('Starting 300-Points Threshold Test');

        // 1. Login as Admin
        logger.info('Logging in as Admin...');
        await adminApi.login('admin', 'admin123');
        logger.success('Admin Login Successful');

        // 2. Register a fresh test student
        const testUsername = `student_${Date.now()}`;
        logger.info(`Registering test student: ${testUsername}...`);
        const registration = await adminApi.post('/auth/register', {
            username: testUsername,
            password: 'password123',
            firstName: 'Test',
            lastName: 'Student',
            email: `${testUsername}@example.com`,
            role: 'STUDENT'
        });
        const studentId = registration.data.data.user.id;
        logger.success(`Student registered with ID: ${studentId}`);

        // 3. Log in as the new student
        logger.info('Logging in as test student...');
        await api.login(testUsername, 'password123');
        logger.success('Student Login Successful');

        // 4. Award points incrementally
        logger.info('Simulating reports and verifications to reach 300 points...');
        
        for (let i = 1; i <= 20; i++) {
            const location = `Location ${i}_${Date.now()}`;
            
            // Student creates a report
            const reportCreation = await api.post('/reports', {
                location: location,
                urgency: 'high',
                wasteType: 'recyclable'
            });
            const reportId = reportCreation.data.data.report.id;

            // Admin verifies (awards 15 points)
            await adminApi.patch(`/reports/${reportId}/status`, { status: 'VERIFIED' });

            if (i % 5 === 0 || i === 20) {
                const profile = await api.get('/auth/me');
                const user = profile.data.data.user;
                logger.info(`Progress: ${user.quarterlyPoints} points. Eligible: ${user.eligibleForCertificate}`);
            }
        }

        // 5. Final Verification
        logger.step('Final Eligibility Check');
        const finalProfile = await api.get('/auth/me');
        const { quarterlyPoints, eligibleForCertificate } = finalProfile.data.data.user;
        
        logger.info(`Total Quarterly Points: ${quarterlyPoints}`);
        logger.info(`Eligible for Certificate: ${eligibleForCertificate}`);

        if (quarterlyPoints >= 300 && eligibleForCertificate === true) {
            logger.success('TEST PASSED: Student reached 300 points and is now eligible for a certificate! ✨');
        } else {
            logger.error('TEST FAILED: Eligibility logic did not trigger correctly.');
            process.exit(1);
        }

    } catch (error) {
        logger.error(`Test Error: ${error.message}`);
        if (error.data) console.error(error.data);
        process.exit(1);
    }
}

test300PointsThreshold();
