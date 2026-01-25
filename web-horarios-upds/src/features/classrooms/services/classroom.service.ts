import api from '@/lib/axios';

export interface Classroom {
    id: number;
    name: string;
    capacity: number;
    type: 'LABORATORY' | 'THEORY_ROOM' | 'AUDITORIUM' | 'VIRTUAL';
    location: string | null;
    hasProjector: boolean;
    hasAC: boolean;
}

export const classroomService = {
    getAll: async (): Promise<Classroom[]> => {
        const response = await api.get('/classrooms');
        return response.data;
    },

    getById: async (id: number): Promise<Classroom> => {
        const response = await api.get(`/classrooms/${id}`);
        return response.data;
    },

    create: async (data: Omit<Classroom, 'id'>) => {
        const response = await api.post('/classrooms', data);
        return response.data;
    },

    update: async (id: number, data: Partial<Classroom>) => {
        const response = await api.put(`/classrooms/${id}`, data);
        return response.data;
    },

    delete: async (id: number) => {
        await api.delete(`/classrooms/${id}`);
    }
};
