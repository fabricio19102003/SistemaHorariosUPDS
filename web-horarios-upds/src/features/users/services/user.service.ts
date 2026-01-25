import api from '../../../lib/axios';
import { authService } from '../../auth/services/auth.service';

export interface User {
    id: string;
    username: string;
    email: string | null;
    fullName: string;
    role: 'SUPERADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT';
    isActive: boolean;
    createdAt: string;
}

export const userService = {
    async getAll(): Promise<User[]> {
        const response = await api.get<User[]>('/users');
        return response.data;
    },

    async create(data: { fullName: string; username: string; password: string; role: string; email?: string }): Promise<User> {
        const response = await api.post<User>('/users', data);
        return response.data;
    },

    async toggleStatus(id: string): Promise<User> {
        const response = await api.patch<User>(`/users/${id}/status`);
        return response.data;
    },

    async updateRole(id: string, role: string): Promise<User> {
        const response = await api.patch<User>(`/users/${id}/role`, { role });
        return response.data;
    }
};
