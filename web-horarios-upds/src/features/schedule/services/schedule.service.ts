import api from '../../../lib/axios';

export interface ClassSchedule {
    id: string;
    subjectId: number;
    teacherId: string;
    classroomId: number;
    dayOfWeek: string;
    timeBlockId: number;
    groupCode: string;
    status: string;
}

export interface ScheduleProposal {
    processed: number;
    created: number;
    details: ClassSchedule[];
}

export const scheduleService = {
    async generateProposal(semester: number, periodId: number): Promise<ScheduleProposal> {
        const response = await api.post<ScheduleProposal>('/generator/proposal', { semester, periodId });
        return response.data;
    }
};
