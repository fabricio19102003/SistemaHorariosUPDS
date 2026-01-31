import api from '@/lib/axios';

export interface ScheduleValidationRequest {
    teacherId: string;
    classroomId: number;
    periodId: number;
    dayOfWeek: string; // 'MONDAY', etc.
    timeBlockIds: number[];
}

export interface ScheduleValidationResult {
    valid: boolean;
    conflicts: {
        type: 'TEACHER' | 'ROOM' | 'CAPACITY';
        message: string;
        details?: any;
    }[];
}

export interface CreateBatchScheduleRequest {
    teacherId: string;
    classroomId: number;
    subjectId: number;
    periodId: number;
    dayOfWeek: string;
    timeBlockIds: number[];
    groupCode: string;
}

export const scheduleCreationService = {
    // Validar antes de soltar la tarjeta
    validate: async (data: ScheduleValidationRequest): Promise<ScheduleValidationResult> => {
        const response = await api.post('/schedules/validate', data);
        return response.data;
    },

    // Guardar el horario (puede ser de multiples bloques)
    createBatch: async (data: CreateBatchScheduleRequest) => {
        const response = await api.post('/schedules', data);
        return response.data;
    },

    // Guardar multiples horarios (Global Save)
    createBulk: async (items: CreateBatchScheduleRequest[]) => {
        const response = await api.post('/schedules/bulk', items);
        return response.data;
    },

    // Obtener bloques de tiempo (incluyendo recesos)
    getTimeBlocks: async () => {
        const response = await api.get('/schedules/blocks');
        return response.data;
    },

    // Actualizar bloque (Hora/Receso)
    updateBlock: async (id: number, data: any) => {
        const response = await api.put(`/schedules/blocks/${id}`, data);
        return response.data;
    },

    createBlock: async (data: any) => {
        const response = await api.post('/schedules/blocks', data);
        return response.data;
    },

    deleteBlock: async (id: number) => {
        const response = await api.delete(`/schedules/blocks/${id}`);
        return response.data;
    },

    // Obtener periodo activo
    getActivePeriod: async () => {
        const response = await api.get('/schedules/active-period');
        return response.data;
    },

    // Obtener horarios por periodo (GRID)
    getByPeriod: async (periodId: number) => {
        const response = await api.get(`/schedules?periodId=${periodId}`);
        return response.data;
    },

    delete: async (id: string) => { // Changed types to string? No ID is string UUID
        const response = await api.delete(`/schedules/${id}`);
        return response.data;
    },

    // TEMPLATES
    getTemplates: async () => {
        const response = await api.get('/schedules/templates');
        return response.data;
    },

    saveTemplate: async (data: { name: string, shift?: string, blocks: any[] }) => {
        const response = await api.post('/schedules/templates', data);
        return response.data;
    },

    updateTemplate: async (id: number, data: { name: string, shift?: string, blocks: any[] }) => {
        const response = await api.put(`/schedules/templates/${id}`, data);
        return response.data;
    },

    applyTemplate: async (id: number) => {
        const response = await api.post(`/schedules/templates/${id}/apply`);
        return response.data;
    },

    deleteTemplate: async (id: number) => {
        const response = await api.delete(`/schedules/templates/${id}`);
        return response.data;
    },

    generateProposal: async (data: { semester: number, shift: string, groupCode: string, periodId: number }) => {
        const response = await api.post('/schedules/proposal', data);
        return response.data;
    }
};
