import { ApiClient, logger } from './test-utils.js';

async function runTests() {
    const api = new ApiClient();

    try {
        logger.step('Testing Health Endpoint');
        const health = await api.get('/health');
        logger.success(`Health check response: ${JSON.stringify(health.data)}`);

        logger.step('Testing Sign In');
        const loginData = await api.login('admin', 'admin123');
        logger.success('Admin sign in successful');
        logger.info(`Token: ${loginData.token.substring(0, 30)}...`);

        logger.step('Testing Get Reports');
        const reports = await api.get('/reports');
        const reportList = reports.data.data.reports || [];
        logger.success(`Reports fetched: ${reportList.length} reports`);
        
        reportList.slice(0, 3).forEach(r => {
            logger.info(`- ${r.location} (${r.status})`);
        });

        logger.step('All API tests passed!');

    } catch (error) {
        logger.error(`Test Error: ${error.message}`);
        if (error.data) console.error(error.data);
        process.exit(1);
    }
}

runTests();
