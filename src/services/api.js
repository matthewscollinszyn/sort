const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiService {
    constructor() {
        this.baseUrl = API_BASE_URL;
        // Use sessionStorage for per-tab sessions, fallback to localStorage for persistence
        this.storage = this.getStorage();
    }

    // Determine which storage to use - use sessionStorage for per-tab sessions
    getStorage() {
        try {
            const test = '__test__';
            sessionStorage.setItem(test, test);
            sessionStorage.removeItem(test);
            return sessionStorage;
        } catch (e) {
            // Fallback to localStorage if sessionStorage is blocked
            return localStorage;
        }
    }

    getToken() {
        // Try sessionStorage first (per-tab session), then fallback to localStorage (legacy/persistence)
        return sessionStorage.getItem('token') || localStorage.getItem('token');
    }

    setToken(token) {
        // Always store in sessionStorage for per-tab isolation
        sessionStorage.setItem('token', token);
        // Optionally store in localStorage for persistence across tab closes if desired,
        // but for TRUE multi-session isolation, we should probably stick to sessionStorage.
        // The user asked for multiple sessions, so we'll stay with sessionStorage for updates.
    }

    removeToken() {
        sessionStorage.removeItem('token');
        // Also clear from localStorage to ensure full logout
        try {
            localStorage.removeItem('token');
        } catch (e) { /* ignore */ }
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const token = this.getToken();

        const isFormData = options.body instanceof FormData;
        const hasBody = !!options.body;

        const config = {
            headers: {
                ...(hasBody && !isFormData ? { 'Content-Type': 'application/json' } : {}),
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        if (hasBody && typeof options.body === 'object' && !isFormData) {
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(url, config);

            // Check if response is empty (204 No Content)
            if (response.status === 204) {
                return { success: true, data: null };
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Request failed with status ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error(`[API ERROR] ${endpoint}:`, error);
            throw error;
        }
    }

    getStreamUrl(endpoint) {
        const token = this.getToken();
        const url = new URL(`${this.baseUrl}${endpoint}`);
        if (token) {
            url.searchParams.set('token', token);
        }
        return url.toString();
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

    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: userData,
        });
    }

    async getMe() {
        return this.request('/auth/me');
    }

    signout() {
        this.removeToken();
    }

    async getAllUsers() {
        return this.request('/auth/users');
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

    async getAllReports(status = 'all', type, page, limit) {
        const params = new URLSearchParams();
        if (status !== 'all') params.append('status', status);
        if (type && type !== 'all') params.append('type', type);
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);
        const query = params.toString() ? `?${params.toString()}` : '';
        return this.request(`/reports${query}`);
    }

    async getImpactMetrics() {
        return this.request('/reports/impact-metrics');
    }

    async getPublicMetrics() {
        return this.request('/reports/public-metrics');
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

    // MRF workflow endpoints
    async dispatchStaff(reportId, staffId, staffName) {
        return this.request(`/reports/${reportId}/dispatch`, {
            method: 'POST',
            body: { staffId, staffName },
        });
    }

    async confirmCollection(reportId, kilosCollected, assetAction) {
        return this.request(`/reports/${reportId}/confirm-collection`, {
            method: 'POST',
            body: {
                kilos: kilosCollected,
                assetAction: assetAction
            },
        });
    }

    async markAsDone(reportId) {
        return this.request(`/reports/${reportId}/mark-done`, {
            method: 'POST',
        });
    }

    async getLeaderboard() {
        return this.request('/auth/leaderboard');
    }

    async getQuarterlyImpact() {
        return this.request('/auth/quarterly-impact');
    }

    async getNews() {
        return this.request('/news');
    }

    async createNewsItem(newsItem) {
        console.log('[API] createNewsItem called', newsItem);
        try {
            const result = await this.request('/news', {
                method: 'POST',
                body: newsItem,
            });
            console.log('[API] createNewsItem result', result);
            return result;
        } catch (error) {
            console.error('[API] createNewsItem ERROR:', error);
            throw error;
        }
    }

    async updateNewsItem(id, changes) {
        return this.request(`/news/${id}`, {
            method: 'PATCH',
            body: changes,
        });
    }

    async deleteNewsItem(id) {
        return this.request(`/news/${id}`, {
            method: 'DELETE',
        });
    }

    getNewsStreamUrl() {
        return this.getStreamUrl('/news/stream');
    }

    getReportsStreamUrl() {
        return this.getStreamUrl('/reports/stream');
    }

    // Settings endpoints - Asset Categories
    async getAssetCategories() {
        return this.request('/settings/asset-categories');
    }

    async createAssetCategory(data) {
        return this.request('/settings/asset-categories', {
            method: 'POST',
            body: data,
        });
    }

    async updateAssetCategory(id, data) {
        return this.request(`/settings/asset-categories/${id}`, {
            method: 'PUT',
            body: data,
        });
    }

    async deleteAssetCategory(id) {
        return this.request(`/settings/asset-categories/${id}`, {
            method: 'DELETE',
        });
    }

    // Settings endpoints - Locations
    async getLocations(type) {
        const query = type ? `?type=${type}` : '';
        return this.request(`/settings/locations${query}`);
    }

    async createLocation(data) {
        return this.request('/settings/locations', {
            method: 'POST',
            body: data,
        });
    }

    async updateLocation(id, data) {
        return this.request(`/settings/locations/${id}`, {
            method: 'PUT',
            body: data,
        });
    }

    async deleteLocation(id) {
        return this.request(`/settings/locations/${id}`, {
            method: 'DELETE',
        });
    }

    // Settings endpoints - Item Presets
    async getItemPresets(categoryId) {
        const query = categoryId ? `?categoryId=${categoryId}` : '';
        return this.request(`/settings/item-presets${query}`);
    }

    async createItemPreset(data) {
        return this.request('/settings/item-presets', {
            method: 'POST',
            body: data,
        });
    }

    async updateItemPreset(id, data) {
        return this.request(`/settings/item-presets/${id}`, {
            method: 'PUT',
            body: data,
        });
    }

    async deleteItemPreset(id) {
        return this.request(`/settings/item-presets/${id}`, {
            method: 'DELETE',
        });
    }

    // Map endpoints - Campus map
    async uploadCampusMap(imageData, imageName, imageSize) {
        return this.request('/map/upload', {
            method: 'POST',
            body: { imageData, imageName, imageSize },
        });
    }

    async getCampusMap() {
        return this.request('/map/current');
    }

    // Map endpoints - Bin coordinates
    async updateBinCoordinates(locationId, mapX, mapY) {
        return this.request(`/map/bins/${locationId}/coordinates`, {
            method: 'PUT',
            body: { mapX, mapY },
        });
    }

    // Map endpoints - Bin statuses
    async getBinStatuses() {
        return this.request('/map/bins/statuses');
    }

    async updateBinStatus(locationId, fillStatus) {
        return this.request(`/map/bins/${locationId}/status`, {
            method: 'PUT',
            body: { fillStatus },
        });
    }

    // Map endpoints - Analytics
    async getAnalytics() {
        return this.request('/map/analytics');
    }

    // System settings
    async getSystemSettings() {
        return this.request('/settings/system');
    }

    async updateSystemSettings(settings) {
        return this.request('/settings/system', {
            method: 'PUT',
            body: { settings },
        });
    }

    // Generic HTTP methods
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    getImageUrl(path) {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        // The path usually starts with /uploads
        const baseUrl = this.baseUrl.replace('/api', '');
        return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: data,
        });
    }

    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: data,
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // Property getter for backward compatibility
    get BASE_URL() {
        return this.baseUrl;
    }
}

export const api = new ApiService();
export default api;
export { API_BASE_URL };
