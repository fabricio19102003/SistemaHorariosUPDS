import api from '@/lib/axios';

export interface Teacher {
    id: string;
    specialty: string | null;
    contractType: string | null;
    user: {
        id: string;
        fullName: string;
        username: string;
        email: string | null;
        isActive: boolean;
    };
}

export const teacherService = {
    getAll: async (): Promise<Teacher[]> => {
        const response = await api.get('/teachers');
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/teachers', data);
        return response.data;
    },

    update: async (id: string, data: any) => {
        const response = await api.put(`/teachers/${id}`, data);
        return response.data;
    }
};
