/* =========================================================
   EcoLedger – API Service
   Handles all backend communication
   ========================================================= */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

interface SigninResponse {
  user: {
    id: string;
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role: string;
    studentId?: string;
    course?: string;
    section?: string;
  };
  token: string;
}

interface ReportData {
  location: string;
  notes?: string;
  photoUrl?: string;
  urgency?: string;
  wasteType?: string;
}

interface NewsItemData {
  tag: string;
  date: string;
  title: string;
  desc: string;
}

interface ImpactMetrics {
  waste: {
    totalCollected: number;
    monthlyIncrease: number;
    recyclingRate: number;
    divertedFromLandfill: number;
    activeCollectionPoints: number;
  };
  environmental: {
    co2Reduced: number;
    treesEquivalent: number;
    waterSaved: number;
    energySaved: number;
  };
  participation: {
    activeUsers: number;
    totalReports: number;
    avgResponseTime: number;
    satisfactionScore: number;
  };
  trends: Array<{ month: string; waste: number; recycling: number; participation: number }>;
  breakdown: Array<{ category: string; value: number; color: string }>;
}

class ApiService {
  private baseUrl: string;
  private storage: Storage;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.storage = this.getStorage();
  }

  // Determine which storage to use
  private getStorage(): Storage {
    try {
      const test = '__test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return sessionStorage;
    } catch {
      return localStorage;
    }
  }

  getToken(): string | null {
    return this.storage.getItem('token');
  }

  setToken(token: string): void {
    this.storage.setItem('token', token);
  }

  removeToken(): void {
    this.storage.removeItem('token');
  }

  private async request<T = unknown>(endpoint: string, options: RequestInit & { body?: unknown } = {}): Promise<ApiResponse<T>> {
    console.log('[API.request] Called with endpoint:', endpoint, 'options:', options);
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken();
    console.log('[API.request] Token:', token ? 'EXISTS' : 'MISSING');

    const config: RequestInit = {
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

    console.log('[API.request] Fetching:', url, config);
    try {
      const response = await fetch(url, config);
      console.log('[API.request] Response status:', response.status, response.statusText);
      const data = await response.json();
      console.log('[API.request] Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('[API.request] ERROR:', error);
      throw error;
    }
  }

  getStreamUrl(endpoint: string): string {
    const token = this.getToken();
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (token) {
      url.searchParams.set('token', token);
    }
    return url.toString();
  }

  // Auth endpoints
  async signin(username: string, password: string): Promise<ApiResponse<SigninResponse>> {
    const response = await this.request<SigninResponse>('/auth/signin', {
      method: 'POST',
      body: { username, password },
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getMe(): Promise<ApiResponse<{ user: SigninResponse['user'] }>> {
    return this.request('/auth/me');
  }

  async getAllUsers(): Promise<ApiResponse<{ users: SigninResponse['user'][] }>> {
    return this.request('/auth/users');
  }

  signout(): void {
    this.removeToken();
  }

  // Reports endpoints
  async createReport(reportData: ReportData): Promise<ApiResponse> {
    return this.request('/reports', {
      method: 'POST',
      body: reportData,
    });
  }

  async getMyReports(status: string = 'all'): Promise<ApiResponse> {
    const query = status !== 'all' ? `?status=${status}` : '';
    return this.request(`/reports/my-reports${query}`);
  }

  async getAllReports(status: string = 'all', type?: string): Promise<ApiResponse> {
    const params = new URLSearchParams();
    if (status !== 'all') params.append('status', status);
    if (type && type !== 'all') params.append('type', type);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/reports${query}`);
  }

  async getImpactMetrics(): Promise<ApiResponse<{ impactMetrics: ImpactMetrics }>> {
    return this.request('/reports/impact-metrics');
  }

  async getReportById(id: string): Promise<ApiResponse> {
    return this.request(`/reports/${id}`);
  }

  async updateReportStatus(id: string, status: string): Promise<ApiResponse> {
    return this.request(`/reports/${id}/status`, {
      method: 'PATCH',
      body: { status },
    });
  }

  async deleteReport(id: string): Promise<ApiResponse> {
    return this.request(`/reports/${id}`, {
      method: 'DELETE',
    });
  }

  // MRF workflow endpoints
  async dispatchStaff(reportId: string, staffId: string, staffName: string): Promise<ApiResponse> {
    return this.request(`/reports/${reportId}/dispatch`, {
      method: 'POST',
      body: { staffId, staffName },
    });
  }

  async confirmCollection(reportId: string, kilosCollected: number): Promise<ApiResponse> {
    return this.request(`/reports/${reportId}/confirm-collection`, {
      method: 'POST',
      body: { kilos: kilosCollected },
    });
  }

  async markAsDone(reportId: string): Promise<ApiResponse> {
    return this.request(`/reports/${reportId}/mark-done`, {
      method: 'POST',
    });
  }

  async getNews(): Promise<ApiResponse<{ news: NewsItemData[] }>> {
    return this.request('/news');
  }

  async createNewsItem(newsItem: NewsItemData): Promise<ApiResponse<{ news: NewsItemData[] }>> {
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

  async updateNewsItem(id: string, changes: NewsItemData): Promise<ApiResponse<{ news: NewsItemData[] }>> {
    return this.request(`/news/${id}`, {
      method: 'PATCH',
      body: changes,
    });
  }

  async deleteNewsItem(id: string): Promise<ApiResponse<{ news: NewsItemData[] }>> {
    return this.request(`/news/${id}`, {
      method: 'DELETE',
    });
  }

  getNewsStreamUrl(): string {
    return this.getStreamUrl('/news/stream');
  }

  getReportsStreamUrl(): string {
    return this.getStreamUrl('/reports/stream');
  }
}

export const api = new ApiService();
export default api;
