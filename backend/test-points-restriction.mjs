import { ApiClient, logger } from './test-utils.js';

async function testPointsRestriction() {
    const mrfApi = new ApiClient();
    const teacherApi = new ApiClient();
    const studentApi = new ApiClient();

    try {
        logger.step('Starting Points Restriction Test');

        // 1. Login as MRF to verify reports
        logger.info('Logging in as MRF Staff...');
        await mrfApi.login('ricomendoza', 'rico123');
        logger.success('MRF Login Successful');

        // 2. Login as Teacher
        logger.info('Logging in as Teacher...');
        const teacherData = await teacherApi.login('teacher', 'teacher123');
        const initialTeacherPoints = teacherData.user.points;
        logger.success(`Teacher Login Successful (ID: ${teacherData.user.id}, Initial Points: ${initialTeacherPoints})`);

        // 3. Login as Student
        logger.info('Logging in as Student...');
        const studentData = await studentApi.login('student', 'student123');
        const initialStudentPoints = studentData.user.points;
        logger.success(`Student Login Successful (ID: ${studentData.user.id}, Initial Points: ${initialStudentPoints})`);

        // 4. Create a report for Teacher
        logger.info('Creating report for Teacher...');
        const teacherReport = await teacherApi.post('/reports', {
            location: 'Library Entrance',
            urgency: 'normal',
            wasteType: 'general'
        });
        const teacherReportId = teacherReport.data.data.report.id;
        logger.success(`Teacher report created (ID: ${teacherReportId})`);

        // 5. Create a report for Student
        logger.info('Creating report for Student...');
        const studentReport = await studentApi.post('/reports', {
            location: 'Science Hall – 1F',
            urgency: 'normal',
            wasteType: 'recyclable'
        });
        const studentReportId = studentReport.data.data.report.id;
        logger.success(`Student report created (ID: ${studentReportId})`);

        // 6. MRF Verifies Teacher Report
        logger.step('MRF Verifying Teacher Report...');
        const verifyTeacher = await mrfApi.patch(`/reports/${teacherReportId}/status`, { status: 'VERIFIED' });
        logger.info(`Teacher report verification message: ${verifyTeacher.data.message}`);

        // 7. MRF Verifies Student Report
        logger.step('MRF Verifying Student Report...');
        const verifyStudent = await mrfApi.patch(`/reports/${studentReportId}/status`, { status: 'VERIFIED' });
        logger.info(`Student report verification message: ${verifyStudent.data.message}`);

        // 8. Final Check - Get user profiles again
        logger.step('Final Points Check');
        
        const teacherProfile = await teacherApi.get('/auth/me');
        const finalTeacherPoints = teacherProfile.data.data.user.points;
        logger.info(`Teacher Final Points: ${finalTeacherPoints} (Expected: ${initialTeacherPoints})`);

        const studentProfile = await studentApi.get('/auth/me');
        const finalStudentPoints = studentProfile.data.data.user.points;
        logger.info(`Student Final Points: ${finalStudentPoints} (Expected: > ${initialStudentPoints})`);

        if (finalTeacherPoints === initialTeacherPoints && finalStudentPoints > initialStudentPoints) {
            logger.success('TEST PASSED: Only students received points! ✨');
        } else {
            logger.error('TEST FAILED: Points restriction logic incorrect.');
            process.exit(1);
        }

    } catch (error) {
        logger.error(`Test Error: ${error.message}`);
        if (error.data) console.error(error.data);
        process.exit(1);
    }
}

testPointsRestriction();
