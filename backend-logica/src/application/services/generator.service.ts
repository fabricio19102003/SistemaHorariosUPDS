import prisma from '../../infrastructure/database/prisma.client';
import { ScheduleStatus, DayOfWeek, ClassroomType, ClassSchedule } from '@prisma/client';

export class ScheduleGeneratorService {

    async generateProposal(semester: number, periodId: number) {
        console.log(`🧠 Iniciando algoritmo para Semestre ${semester}, Periodo ${periodId}`);

        // 1. Fetch Resources
        const subjects = await prisma.subject.findMany({ where: { semester } });
        const timeBlocks = await prisma.timeBlock.findMany();
        const classrooms = await prisma.classroom.findMany();
        const teachers = await prisma.teacher.findMany({ include: { user: true, unavailabilities: true } });

        if (subjects.length === 0) throw new Error("No hay materias para este semestre");
        if (timeBlocks.length === 0) throw new Error("No hay bloques horarios definidos");

        const generatedSchedules: ClassSchedule[] = [];

        // 2. Greedy Loop (Materia por Materia)
        for (const subject of subjects) {
            console.log(`   Procesando: ${subject.name}`);
            let scheduled = false;

            // Intentar encontrar un slot válido
            // Estrategia simplificada: Recorrer Días -> Bloques
            const days = Object.values(DayOfWeek);

            for (const day of days) {
                if (scheduled) break;

                for (const block of timeBlocks) {
                    if (scheduled) break;

                    // A. Buscar Docente Disponible
                    // (Simplificación V1: El primer docente que NO tenga choque)
                    const validTeacher = teachers.find(t => {
                        // Check Unavailability (Defined in metadata)
                        const isUnavailable = t.unavailabilities.some(u =>
                            u.dayOfWeek === day && u.timeBlockId === block.id
                        );
                        if (isUnavailable) return false;

                        // Check Conflict with another Schedule (DB Check would be expensive in loop, 
                        // ideally we fetch all schedules first, but strictly relying on atomic inserts for V1 safety or catching errors)
                        // For V1 memory-based check:
                        const teacherConflict = generatedSchedules.find(s =>
                            s.teacherId === t.id && s.dayOfWeek === day && s.timeBlockId === block.id
                        );
                        return !teacherConflict;
                    });

                    if (!validTeacher) continue; // No teacher for this time slot

                    // B. Buscar Aula Disponible
                    const validClassroom = classrooms.find(c => {
                        // Check Capacity (Simple) -> Validation logic could be complex
                        if (c.capacity < 20) return false; // Hardcoded minimum

                        // Check Conflict
                        const roomConflict = generatedSchedules.find(s =>
                            s.classroomId === c.id && s.dayOfWeek === day && s.timeBlockId === block.id
                        );
                        return !roomConflict;
                    });

                    if (!validClassroom) continue;

                    // C. Assign!
                    try {
                        // Database Insertion (Draft)
                        const newSchedule = await prisma.classSchedule.create({
                            data: {
                                subjectId: subject.id,
                                teacherId: validTeacher.id,
                                classroomId: validClassroom.id,
                                periodId: periodId,
                                timeBlockId: block.id,
                                dayOfWeek: day,
                                groupCode: 'A', // Default Group
                                status: ScheduleStatus.DRAFT
                            }
                        });

                        generatedSchedules.push(newSchedule);
                        scheduled = true;
                        console.log(`      ✅ Asignado: ${day} ${block.name} - ${validClassroom.name} - ${validTeacher.user.fullName}`);

                    } catch (error) {
                        // Optimistic concurrency control (Unique constraints might fail here if parallel)
                        // console.warn("Conflict detected during insertion, trying next slot");
                    }
                }
            }

            if (!scheduled) {
                console.warn(`      ⚠️ NO SE PUDO ASIGNAR: ${subject.name}`);
            }
        }

        return {
            processed: subjects.length,
            created: generatedSchedules.length,
            details: generatedSchedules
        };
    }
}
