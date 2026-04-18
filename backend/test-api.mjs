import http from 'http';

// Test 1: Health check
console.log('Testing health endpoint...');
http.get('http://localhost:5000/api/health', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('✅ Health check response:', data);

        // Test 2: Sign in
        testSignIn();
    });
}).on('error', err => {
    console.error('❌ Health check error:', err.message);
    process.exit(1);
});

function testSignIn() {
    console.log('\nTesting sign in...');
    const postData = JSON.stringify({
        username: 'admin',
        password: 'admin123'
    });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/signin',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                if (response.success) {
                    console.log('✅ Admin sign in successful');
                    console.log('Token:', response.data.token.substring(0, 30) + '...');
                    testGetReports(response.data.token);
                } else {
                    console.error('❌ Sign in failed:', response.message);
                    process.exit(1);
                }
            } catch (e) {
                console.error('❌ Parse error:', e.message);
                console.error('Response:', data);
                process.exit(1);
            }
        });
    });

    req.on('error', err => {
        console.error('❌ Sign in error:', err.message);
        process.exit(1);
    });

    req.write(postData);
    req.end();
}

function testGetReports(token) {
    console.log('\nTesting get reports...');
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/reports',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                if (response.success) {
                    console.log(`✅ Reports fetched: ${response.data.reports.length} reports`);
                    response.data.reports.slice(0, 3).forEach(r => {
                        console.log(`   - ${r.location} (${r.status})`);
                    });
                } else {
                    console.error('❌ Get reports failed:', response.message);
                    process.exit(1);
                }
                process.exit(0);
            } catch (e) {
                console.error('❌ Parse error:', e.message);
                console.error('Response:', data);
                process.exit(1);
            }
        });
    });

    req.on('error', err => {
        console.error('❌ Get reports error:', err.message);
        process.exit(1);
    });

    req.end();
}
