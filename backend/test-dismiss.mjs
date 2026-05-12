import http from 'http';

const BASE_URL = 'http://localhost:5000/api';

async function request(path, method = 'GET', body = null, token = null) {
    const url = `${BASE_URL}${path}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    return new Promise((resolve, reject) => {
        const req = http.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = data ? JSON.parse(data) : {};
                    resolve({ status: res.statusCode, data: json });
                } catch (e) {
                    resolve({ status: res.statusCode, data: { raw: data } });
                }
            });
        });
        req.on('error', reject);
        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runTests() {
    console.log('🚀 Starting tests...');

    // 1. Sign in
    console.log('\n👤 Signing in...');
    const studentLogin = await request('/auth/signin', 'POST', { username: 'student', password: 'student123' });
    const studentToken = studentLogin.data.data.token;
    const adminLogin = await request('/auth/signin', 'POST', { username: 'admin', password: 'admin123' });
    const adminToken = adminLogin.data.data.token;
    console.log('✅ Signed in');

    // Get location ID for "Cafeteria – Block A"
    const locationsResult = await request('/settings/locations?type=BIN_LOCATION', 'GET', null, studentToken);
    const locations = Array.isArray(locationsResult.data) ? locationsResult.data : locationsResult.data.data || [];
    const cafeteria = locations.find(l => l.name === 'Cafeteria – Block A');
    
    // 2. Create 2 reports
    console.log(`\n📝 Creating 2 reports for "${cafeteria.name}"...`);
    const r1 = await request('/reports', 'POST', { location: cafeteria.name, urgency: 'high' }, studentToken);
    const r2 = await request('/reports', 'POST', { location: cafeteria.name, urgency: 'normal' }, studentToken);
    
    // 3. Verify status is 'full' (due to high urgency)
    console.log('\n🔍 Verifying status is full...');
    await request(`/reports/${r1.data.data.report.id}/status`, 'PATCH', { status: 'VERIFIED' }, adminToken);
    let binStatus = await request('/map/bins/statuses', 'GET', null, studentToken);
    console.log(`   Bin Status: ${binStatus.data.data.find(s => s.locationId === cafeteria.id)?.fillStatus}`);

    // 4. Dismiss 1st report, check if still full
    console.log('\n🚫 Dismissing 1st report...');
    await request(`/reports/${r1.data.data.report.id}/status`, 'PATCH', { status: 'DISMISSED' }, adminToken);
    binStatus = await request('/map/bins/statuses', 'GET', null, studentToken);
    console.log(`   Bin Status (1 report left): ${binStatus.data.data.find(s => s.locationId === cafeteria.id)?.fillStatus}`);

    // 5. Dismiss 2nd report, check if empty
    console.log('\n🚫 Dismissing 2nd report...');
    await request(`/reports/${r2.data.data.report.id}/status`, 'PATCH', { status: 'DISMISSED' }, adminToken);
    binStatus = await request('/map/bins/statuses', 'GET', null, studentToken);
    console.log(`   Bin Status (0 reports left): ${binStatus.data.data.find(s => s.locationId === cafeteria.id)?.fillStatus}`);
    
    if (binStatus.data.data.find(s => s.locationId === cafeteria.id)?.fillStatus === 'empty') {
        console.log('✅ Dismissal reset logic works!');
    } else {
        console.log('❌ Dismissal reset logic failed');
    }

    console.log('\n✨ All tests completed!');
}

runTests().catch(console.error);
