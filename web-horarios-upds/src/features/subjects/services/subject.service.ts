import api from '@/lib/axios';

export interface Subject {
    id: number;
    name: string;
    code: string;
    credits: number;
    semester: number;
    careerId: number;
    defaultTeacherId?: string | null;
    defaultTeacher?: {
        user: {
            fullName: string;
        }
    } | null;
    category?: string | null;
    color?: string | null;
}

export const subjectService = {
    getAll: async (): Promise<Subject[]> => {
        const response = await api.get('/subjects');
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/subjects', data);
        return response.data;
    },

    update: async (id: number, data: any) => {
        const response = await api.put(`/subjects/${id}`, data);
        return response.data;
    }
};
