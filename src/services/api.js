const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.baseUrl = API_BASE_URL;
        // Use sessionStorage for per-tab sessions, fallback to localStorage for persistence
        this.storage = this.getStorage();
    }

    // Determine which storage to use - sessionStorage for tab isolation, localStorage for persistence
    getStorage() {
        // Check if we have sessionStorage capabilities
        try {
            const test = '__test__';
            sessionStorage.setItem(test, test);
            sessionStorage.removeItem(test);
            return sessionStorage;
        } catch (e) {
            return localStorage;
        }
    }

    getToken() {
        return this.storage.getItem('token');
    }

    setToken(token) {
        this.storage.setItem('token', token);
    }

    removeToken() {
        this.storage.removeItem('token');
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const token = this.getToken();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        if (options.body && typeof options.body === 'object') {
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Auth endpoints
    async signin(username, password) {
        const response = await this.request('/auth/signin', {
            method: 'POST',
            body: { username, password },
        });

        if (response.success && response.data?.token) {
            this.setToken(response.data.token);
        }

        return response;
    }

    async getMe() {
        return this.request('/auth/me');
    }

    async getAllUsers() {
        return this.request('/auth/users');
    }

    signout() {
        this.removeToken();
    }

    // Reports endpoints
    async createReport(reportData) {
        return this.request('/reports', {
            method: 'POST',
            body: reportData,
        });
    }

    async getMyReports(status = 'all') {
        const query = status !== 'all' ? `?status=${status}` : '';
        return this.request(`/reports/my-reports${query}`);
    }

    async getAllReports(status = 'all') {
        const query = status !== 'all' ? `?status=${status}` : '';
        return this.request(`/reports${query}`);
    }

    async getReportById(id) {
        return this.request(`/reports/${id}`);
    }

    async updateReportStatus(id, status) {
        return this.request(`/reports/${id}/status`, {
            method: 'PATCH',
            body: { status },
        });
    }

    async deleteReport(id) {
        return this.request(`/reports/${id}`, {
            method: 'DELETE',
        });
    }
}

export const api = new ApiService();
export default api;
