import { PrismaClient, DayOfWeek, ClassroomType } from '@prisma/client';
import prisma from '../../infrastructure/database/prisma.client';

interface ProposalRequest {
    semester: number;
    shift: 'M' | 'T' | 'N';
    groupCode: string;
    periodId: number;
    careerId?: number; // Optional filter
}

export class ScheduleGeneratorService {

    async generateProposal(request: ProposalRequest) {
        console.log('--- SERVICE: generateProposal called ---', request);
        try {
            const { semester, shift, groupCode, periodId, careerId } = request;

            // 1. Get Subjects for the Semester
            console.log(`--- GENERATOR: Fetching subjects for semester ${semester}...`);
            const subjects = await prisma.subject.findMany({
                where: {
                    semester: semester,
                    careerId: careerId ? careerId : undefined
                },
                include: { defaultTeacher: true }
            });
            console.log(`--- GENERATOR: Found ${subjects.length} subjects.`);

            if (subjects.length === 0) {
                console.log('--- GENERATOR ERROR: No subjects found ---');
                throw new Error(`No subjects found for semester ${semester}`);
            }

            // 2. Get TimeBlocks for the Shift
            console.log(`--- GENERATOR: Fetching TimeBlocks for shift ${shift}...`);
            const allBlocks = await prisma.timeBlock.findMany({
                orderBy: { startTime: 'asc' }
            });

            const shiftBlocks = allBlocks.filter(b => {
                const hour = parseInt(b.startTime.split(':')[0]);
                if (shift === 'M') return hour < 12;
                if (shift === 'T') return hour >= 12 && hour < 18; // 12:00 to 17:59
                if (shift === 'N') return hour >= 17; // Should cover 17:30 block
                return false;
            }).filter(b => !b.isBreak); // EXCLUDE BREAKS

            console.log(`--- GENERATOR: Found ${shiftBlocks.length} valid blocks for shift.`);

            if (shiftBlocks.length === 0) {
                console.log('--- GENERATOR ERROR: No time blocks found ---');
                throw new Error(`No time blocks found for shift ${shift}`);
            }

            // 3. Get Available Classrooms (Theory by default)
            const classrooms = await prisma.classroom.findMany({
                where: { type: ClassroomType.THEORY_ROOM }
            });
            console.log(`--- GENERATOR: Found ${classrooms.length} classrooms.`);

            // 4. Algorithm: Greedy Allocation
            const proposedSchedule: any[] = [];
            const occupiedSlots = new Set<string>(); // "Day-BlockId" (for this group)

            for (const subject of subjects) {
                console.log(`--- GENERATOR: Processing subject: ${subject.name} (Hours: ${subject.weeklyHours}) ---`);
                let blocksAssigned = 0;
                // Default to 4 blocks if 0 or null (safety)
                const blocksNeeded = subject.weeklyHours > 0 ? subject.weeklyHours : 2;

                // Try to spread across days: Mon, Wed, Fri or Tue, Thu
                // Simple approach: Iterate days M-F, then blocks
                const days: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

                for (const day of days) {
                    if (blocksAssigned >= blocksNeeded) break;

                    for (const block of shiftBlocks) {
                        if (blocksAssigned >= blocksNeeded) break;

                        const slotKey = `${day}-${block.id}`;

                        // 4.1 Check Local Collision (This Group)
                        if (occupiedSlots.has(slotKey)) continue;

                        // 4.2 Check Global Collision (DB) - Teacher
                        // If subject has a default teacher, check if they are free
                        if (subject.defaultTeacherId) {
                            const teacherBusy = await prisma.classSchedule.findFirst({
                                where: {
                                    teacherId: subject.defaultTeacherId,
                                    periodId,
                                    dayOfWeek: day,
                                    timeBlockId: block.id
                                }
                            });
                            if (teacherBusy) continue; // Teacher busy

                            // Check Unavailability
                            const teacherUnavail = await prisma.teacherUnavailability.findFirst({
                                where: {
                                    teacherId: subject.defaultTeacherId,
                                    dayOfWeek: day,
                                    timeBlockId: block.id
                                }
                            });
                            if (teacherUnavail) continue;
                        }

                        // 4.3 Find a Free Room
                        // We need a room that is NOT occupied in DB at this time
                        // AND not occupied by our current proposal (though likely different rooms for different groups, 
                        // but here we are generating for ONE group, so logic implies 1 room needed)
                        // Actually, we just need to assign ANY valid room.

                        let assignedRoomId = null;

                        // Optimistic: Try to find the first room free in DB
                        // This is efficiently hard without fetching all schedules.
                        // Let's simplified: Check if a candidate room is free.

                        for (const room of classrooms) {
                            const roomBusy = await prisma.classSchedule.findFirst({
                                where: {
                                    classroomId: room.id,
                                    periodId,
                                    dayOfWeek: day,
                                    timeBlockId: block.id
                                }
                            });

                            if (!roomBusy) {
                                assignedRoomId = room.id;
                                break; // Found one
                            }
                        }

                        if (!assignedRoomId) {
                            // No rooms available at this time
                            continue;
                        }

                        // 4.4 Book it
                        proposedSchedule.push({
                            id: `temp-${subject.id}-${day}-${block.id}`, // Temp ID
                            subjectId: subject.id,
                            subject: subject,
                            teacherId: subject.defaultTeacherId || undefined, // Send undefined (null) if no teacher
                            teacher: subject.defaultTeacher,
                            classroomId: assignedRoomId,
                            periodId,
                            dayOfWeek: day,
                            timeBlockId: block.id,
                            timeBlock: block,
                            groupCode: groupCode,
                            status: 'DRAFT'
                        });

                        occupiedSlots.add(slotKey);
                        blocksAssigned++;
                    }
                }

                if (blocksAssigned < blocksNeeded) {
                    // Warn? Push a partial?
                    console.log(`--- GENERATOR WARNING: Could not assign all blocks for ${subject.name} (${blocksAssigned}/${blocksNeeded}) ---`);
                }
            } // End for subjects

            console.log(`--- GENERATOR SUCCESS: Generated ${proposedSchedule.length} items. Returning... ---`);
            return proposedSchedule;
        } catch (error) {
            console.error('--- GENERATOR SERVICE ERROR ---', error);
            throw error;
        }
    }
}
