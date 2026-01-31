import { PrismaClient, DayOfWeek, Classroom, Teacher } from '@prisma/client';
import prisma from '../../infrastructure/database/prisma.client';

export interface ValidationRequest {
    teacherId: string;
    classroomId: number;
    periodId: number;
    dayOfWeek: DayOfWeek;
    timeBlockIds: number[]; // Array para manejar múltiples bloques
    excludeScheduleId?: string; // Para updates, ignorar el propio horario
}

export interface ValidationResult {
    valid: boolean;
    conflicts: {
        type: 'TEACHER' | 'ROOM' | 'CAPACITY';
        message: string;
        details?: any;
    }[];
}

export class ScheduleValidationService {

    async validate(request: ValidationRequest): Promise<ValidationResult> {
        console.log('--- VALIDATING SCHEDULE ---', new Error().stack);
        const { teacherId, classroomId, periodId, dayOfWeek, timeBlockIds, excludeScheduleId } = request;
        const conflicts: ValidationResult['conflicts'] = [];

        // 1. Validar Conflicto de AULA (Hard Constraint)
        // Un aula no puede tener clases en los mismos bloques
        const roomConflicts = await prisma.classSchedule.findMany({
            where: {
                classroomId,
                periodId,
                dayOfWeek,
                timeBlockId: { in: timeBlockIds },
                id: excludeScheduleId ? { not: excludeScheduleId } : undefined
            },
            include: { timeBlock: true, subject: true }
        });

        if (roomConflicts.length > 0) {
            conflicts.push({
                type: 'ROOM',
                message: `El aula ya está ocupada en el horario solicitado.`,
                details: roomConflicts.map(c => `Bloque ${c.timeBlock.startTime} - ${c.timeBlock.endTime} (${c.timeBlock.name}) duplicado con ${c.subject.name} (Grupo ${c.groupCode})`)
            });
        }

        if (teacherId) {
            // 2. Validar Conflicto de DOCENTE (Hard Constraint)
            // Un docente no puede enseñar en dos lugares a la vez
            const teacherConflicts = await prisma.classSchedule.findMany({
                where: {
                    teacherId,
                    periodId,
                    dayOfWeek,
                    timeBlockId: { in: timeBlockIds },
                    id: excludeScheduleId ? { not: excludeScheduleId } : undefined
                },
                include: { timeBlock: true, subject: true }
            });

            if (teacherConflicts.length > 0) {
                conflicts.push({
                    type: 'TEACHER',
                    message: `El docente ya tiene clase asignada en ese horario.`,
                    details: teacherConflicts.map(c => `Bloque ${c.timeBlock.startTime} - ${c.timeBlock.endTime} (${c.timeBlock.name}) duplicado con ${c.subject.name} (Grupo ${c.groupCode})`)
                });
            }
        }

        if (teacherId) {
            // 3. Validar Disponibilidad Declarada del Docente (Hard Constraint)
            const unavailabilities = await prisma.teacherUnavailability.findMany({
                where: {
                    teacherId,
                    dayOfWeek,
                    timeBlockId: { in: timeBlockIds }
                },
                include: { timeBlock: true }
            });

            if (unavailabilities.length > 0) {
                conflicts.push({
                    type: 'TEACHER',
                    message: `El docente marcó no disponibilidad en este horario.`,
                    details: unavailabilities.map(u => `Bloque ${u.timeBlock.startTime} - ${u.timeBlock.endTime}: ${u.reason || 'No disponible'}`)
                });
            }
        }

        // 4. Validar bloques que sean RECESOS (Hard Constraint)
        const breaks = await prisma.timeBlock.findMany({
            where: {
                id: { in: timeBlockIds },
                isBreak: true
            }
        });

        if (breaks.length > 0) {
            conflicts.push({
                type: 'ROOM', // O logic error
                message: `No se pueden programar clases en horarios de receso.`,
                details: breaks.map(b => b.name)
            });
        }

        return {
            valid: conflicts.length === 0,
            conflicts
        };
    }
}
