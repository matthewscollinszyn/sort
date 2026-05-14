export class ApiClient {
    constructor(baseUrl = 'http://localhost:5000/api') {
        this.baseUrl = baseUrl;
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    async request(path, method = 'GET', body = null) {
        const url = `${this.baseUrl}${path}`;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (this.token) {
            options.headers['Authorization'] = `Bearer ${this.token}`;
        }

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                return Promise.reject({
                    status: response.status,
                    data,
                    message: data.message || `HTTP error! status: ${response.status}`
                });
            }

            return { status: response.status, data };
        } catch (error) {
            if (error.status) throw error;
            throw new Error(`Connection error: ${error.message}`);
        }
    }

    async login(username, password) {
        const result = await this.request('/auth/signin', 'POST', { username, password });
        if (result.data.success) {
            this.setToken(result.data.data.token);
            return result.data.data;
        }
        throw new Error(`Login failed: ${result.data.message}`);
    }

    get(path) { return this.request(path, 'GET'); }
    post(path, body) { return this.request(path, 'POST', body); }
    patch(path, body) { return this.request(path, 'PATCH', body); }
    delete(path) { return this.request(path, 'DELETE'); }
}

export const logger = {
    info: (msg) => console.log(`\x1b[36mℹ\x1b[0m ${msg}`),
    success: (msg) => console.log(`\x1b[32m✔\x1b[0m ${msg}`),
    warn: (msg) => console.log(`\x1b[33m⚠\x1b[0m ${msg}`),
    error: (msg) => console.error(`\x1b[31m✘\x1b[0m ${msg}`),
    step: (msg) => console.log(`\n\x1b[1m🚀 ${msg}\x1b[0m`),
    divider: () => console.log('\x1b[90m' + '-'.repeat(50) + '\x1b[0m')
};
