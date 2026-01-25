import api from '../../../lib/axios';

export interface LoginResponse {
    user: {
        id: string;
        email: string;
        fullName: string;
        role: string;
        teacherId?: string;
    };
    token: string;
}

export const authService = {
    async login(username: string, password: string): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>('/auth/login', { username, password });
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    getCurrentUser() {
        if (typeof window === 'undefined') return null;
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
};
