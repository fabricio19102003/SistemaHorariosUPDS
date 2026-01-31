import prisma from '../../infrastructure/database/prisma.client';
import { ScheduleValidationService, ValidationRequest } from './schedule-validation.service';
import { ScheduleStatus, DayOfWeek } from '@prisma/client';

export interface CreateScheduleDTO {
    teacherId: string;
    classroomId: number;
    subjectId: number;
    periodId: number;
    dayOfWeek: DayOfWeek;
    timeBlockIds: number[]; // [1, 2] for a 2-block class
    groupCode: string;
}

export class ScheduleService {
    constructor(private validationService: ScheduleValidationService) { }

    async createBatch(data: CreateScheduleDTO) {
        // 1. Validate first
        const validation = await this.validationService.validate({
            teacherId: data.teacherId,
            classroomId: data.classroomId,
            periodId: data.periodId,
            dayOfWeek: data.dayOfWeek,
            timeBlockIds: data.timeBlockIds
        });

        if (!validation.valid) {
            throw new Error(JSON.stringify(validation.conflicts));
        }

        // 2. Transactional Create
        return await prisma.$transaction(async (tx) => {
            const createdSchedules = [];

            for (const blockId of data.timeBlockIds) {
                const schedule = await tx.classSchedule.create({
                    data: {
                        teacherId: data.teacherId,
                        classroomId: data.classroomId,
                        subjectId: data.subjectId,
                        periodId: data.periodId,
                        dayOfWeek: data.dayOfWeek,
                        timeBlockId: blockId,
                        groupCode: data.groupCode,
                        status: ScheduleStatus.PUBLISHED
                    }
                });
                createdSchedules.push(schedule);
            }

            return createdSchedules;
        });
    }

    async createBulk(items: CreateScheduleDTO[]) {
        // 1. Validate all items first
        // Note: This validates against CURRENT database state.
        // It does not validate items within the batch against each other (assuming frontend does this or they are distinct).
        for (const item of items) {
            const validation = await this.validationService.validate({
                teacherId: item.teacherId,
                classroomId: item.classroomId,
                periodId: item.periodId,
                dayOfWeek: item.dayOfWeek,
                timeBlockIds: item.timeBlockIds
            });

            if (!validation.valid) {
                throw new Error(`Validation failed for subject ${item.subjectId}: ${JSON.stringify(validation.conflicts)}`);
            }
        }

        // 2. Transactional Create for ALL items
        return await prisma.$transaction(async (tx) => {
            const allCreated = [];

            for (const item of items) {
                for (const blockId of item.timeBlockIds) {
                    const schedule = await tx.classSchedule.create({
                        data: {
                            teacherId: item.teacherId,
                            classroomId: item.classroomId,
                            subjectId: item.subjectId,
                            periodId: item.periodId,
                            dayOfWeek: item.dayOfWeek,
                            timeBlockId: blockId,
                            groupCode: item.groupCode,
                            status: ScheduleStatus.PUBLISHED
                        }
                    });
                    allCreated.push(schedule);
                }
            }
            return allCreated;
        });
    }

    // Helper to get grid data
    async getByPeriod(periodId: number) {
        return await prisma.classSchedule.findMany({
            where: { periodId },
            include: {
                subject: true,
                teacher: { include: { user: true } },
                classroom: true,
                timeBlock: true
            }
        });
    }

    // Get TimeBlocks (including breaks)
    async getAllTimeBlocks() {
        return await prisma.timeBlock.findMany({
            orderBy: { startTime: 'asc' }
        });
    }

    // Update TimeBlock (Dynamic Grid)
    async updateBlock(id: number, data: any) {
        return await prisma.timeBlock.update({
            where: { id },
            data
        });
    }

    async createBlock(data: any) {
        // Basic validation or default values could go here
        return await prisma.timeBlock.create({
            data: {
                name: data.name || 'Nuevo Bloque',
                startTime: data.startTime || '00:00',
                endTime: data.endTime || '00:00',
                // orderIndex: removed as it causes type error
                isBreak: !!data.isBreak
            }
        });
    }

    async deleteBlock(id: number) {
        // Cascade delete manually (or rely on schema Cascade if configured)
        // Ensure we remove dependencies first to allow deletion
        return await prisma.$transaction([
            prisma.classSchedule.deleteMany({ where: { timeBlockId: id } }),
            prisma.teacherUnavailability.deleteMany({ where: { timeBlockId: id } }),
            prisma.timeBlock.delete({ where: { id } })
        ]);
    }

    async getActivePeriod() {
        return await prisma.academicPeriod.findFirst({
            where: { isActive: true }
        });
    }

    async delete(id: string) {
        return await prisma.classSchedule.delete({
            where: { id }
        });
    }
}
