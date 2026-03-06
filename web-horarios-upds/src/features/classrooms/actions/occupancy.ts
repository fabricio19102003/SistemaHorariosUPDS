'use server';

import { prisma } from '@/lib/prisma';
import { DayOfWeek } from '@prisma/client';
import { getSessionToken } from '@/features/auth/actions';
import { hasRole, verifyToken } from '@/lib/auth-server';

export type HeatmapData = {
    dayOfWeek: DayOfWeek;
    timeBlockId: number;
    timeBlockName: string;
    occupancyCount: number;
    percentage: number;
};

export type ClassroomStatus = {
    id: number;
    name: string;
    type: string;
    isAvailable: boolean;
    currentClass?: {
        subject: string;
        teacher: string;
        endTime: string;
    };
};

export type OccupancyStat = {
    classroomId: number;
    classroomName: string;
    totalSlots: number;
    usedSlots: number;
    percentage: number;
};

export type ConflictAlert = {
    dayOfWeek: DayOfWeek;
    timeBlockName: string;
    occupancyPercentage: number;
    severity: 'HIGH' | 'CRITICAL';
    message: string;
};

export type OccupancyDetail = {
    classroomName: string;
    subjectName: string;
    teacherName: string;
    groupCode: string;
};

// Helper for auth check
async function checkAuth() {
    const token = await getSessionToken();
    if (!token) throw new Error('Unauthorized');

    const user = verifyToken(token);
    if (!user) throw new Error('Invalid Token');

    // Normalize role check (backend uses uppercase)
    if (!hasRole(user, ['ADMIN', 'SUPERADMIN'])) {
        throw new Error('Forbidden: Requires ADMIN or SUPERADMIN role');
    }
    return user;
}

export async function getWeeklyHeatmap(periodId?: number): Promise<HeatmapData[]> {
    await checkAuth();

    // If no period specified, try to find an active one
    let activePeriodId = periodId;
    if (!activePeriodId) {
        const activePeriod = await prisma.academicPeriod.findFirst({
            where: { isActive: true },
        });
        if (activePeriod) activePeriodId = activePeriod.id;
    }

    if (!activePeriodId) return [];

    const totalClassrooms = await prisma.classroom.count();
    if (totalClassrooms === 0) return [];

    const timeBlocks = await prisma.timeBlock.findMany({
        orderBy: { startTime: 'asc' },
    });

    const schedules = await prisma.classSchedule.groupBy({
        by: ['dayOfWeek', 'timeBlockId'],
        where: {
            periodId: activePeriodId,
            status: { not: 'CANCELLED' },
        },
        _count: {
            classroomId: true,
        },
    });

    const heatmap: HeatmapData[] = [];

    for (const block of timeBlocks) {
        Object.values(DayOfWeek).forEach(day => {
            const match = schedules.find(s => s.timeBlockId === block.id && s.dayOfWeek === day);
            const count = match?._count.classroomId || 0;

            heatmap.push({
                dayOfWeek: day,
                timeBlockId: block.id,
                timeBlockName: block.name,
                occupancyCount: count,
                percentage: Math.round((count / totalClassrooms) * 100),
            });
        });
    }


    return heatmap;
}

export async function getOccupancyDetails(day: DayOfWeek, timeBlockId: number): Promise<OccupancyDetail[]> {
    await checkAuth();

    const activePeriod = await prisma.academicPeriod.findFirst({
        where: { isActive: true },
    });

    if (!activePeriod) return [];

    const schedules = await prisma.classSchedule.findMany({
        where: {
            periodId: activePeriod.id,
            dayOfWeek: day,
            timeBlockId: timeBlockId,
            status: { not: 'CANCELLED' },
        },
        include: {
            classroom: true,
            subject: true,
            teacher: { include: { user: true } },
        },
    });

    return schedules.map(s => ({
        classroomName: s.classroom.name,
        subjectName: s.subject.name,
        teacherName: s.teacher?.user.fullName || 'TBD',
        groupCode: s.groupCode,
    }));
}

export async function getCurrentAvailability(periodId?: number): Promise<ClassroomStatus[]> {
    await checkAuth();

    const now = new Date();
    const daysMap = [DayOfWeek.SUNDAY, DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY];
    const currentDay = daysMap[now.getDay()];

    const currentTimeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const currentBlock = await prisma.timeBlock.findFirst({
        where: {
            startTime: { lte: currentTimeString },
            endTime: { gte: currentTimeString },
        }
    });

    let activePeriodId = periodId;
    if (!activePeriodId) {
        const activePeriod = await prisma.academicPeriod.findFirst({
            where: { isActive: true },
        });
        if (activePeriod) activePeriodId = activePeriod.id;
    }

    const allClassrooms = await prisma.classroom.findMany({
        orderBy: { name: 'asc' }
    });

    if (!currentBlock || !activePeriodId) {
        return allClassrooms.map(c => ({
            id: c.id,
            name: c.name,
            type: c.type,
            isAvailable: true
        }));
    }

    const occupiedSchedules = await prisma.classSchedule.findMany({
        where: {
            periodId: activePeriodId,
            dayOfWeek: currentDay,
            timeBlockId: currentBlock.id,
            status: { not: 'CANCELLED' }
        },
        include: {
            subject: true,
            teacher: { include: { user: true } },
            timeBlock: true
        }
    });

    const occupiedIds = new Set(occupiedSchedules.map(s => s.classroomId));

    return allClassrooms.map(c => {
        const isOccupied = occupiedIds.has(c.id);
        const schedule = isOccupied ? occupiedSchedules.find(s => s.classroomId === c.id) : undefined;

        return {
            id: c.id,
            name: c.name,
            type: c.type,
            isAvailable: !isOccupied,
            currentClass: schedule ? {
                subject: schedule.subject.name,
                teacher: schedule.teacher?.user.fullName || 'TBD',
                endTime: schedule.timeBlock.endTime
            } : undefined
        };
    });
}

export async function getOccupancyStats(periodId?: number): Promise<{ stats: OccupancyStat[], totalOccupancy: number }> {
    await checkAuth();

    let activePeriodId = periodId;
    if (!activePeriodId) {
        const activePeriod = await prisma.academicPeriod.findFirst({
            where: { isActive: true },
        });
        if (activePeriod) activePeriodId = activePeriod.id;
    }

    if (!activePeriodId) return { stats: [], totalOccupancy: 0 };

    const totalTimeBlocks = await prisma.timeBlock.count();
    const weeklySlots = totalTimeBlocks * 6; // Mon-Sat

    const classrooms = await prisma.classroom.findMany({
        include: {
            _count: {
                select: {
                    schedules: {
                        where: {
                            periodId: activePeriodId,
                            status: { not: 'CANCELLED' }
                        }
                    }
                }
            }
        }
    });

    const stats = classrooms.map(c => ({
        classroomId: c.id,
        classroomName: c.name,
        totalSlots: weeklySlots,
        usedSlots: c._count.schedules,
        percentage: weeklySlots > 0 ? Math.round((c._count.schedules / weeklySlots) * 100) : 0
    }));

    const totalUsed = stats.reduce((acc, curr) => acc + curr.usedSlots, 0);
    const totalCapacity = classrooms.length * weeklySlots;
    const globalPercentage = totalCapacity > 0 ? Math.round((totalUsed / totalCapacity) * 100) : 0;

    return {
        stats: stats.sort((a, b) => b.percentage - a.percentage), // Highest occupancy first
        totalOccupancy: globalPercentage
    };
}

export async function getConflictCandidates(periodId?: number): Promise<ConflictAlert[]> {
    await checkAuth();

    const heatmap = await getWeeklyHeatmap(periodId);

    const alerts: ConflictAlert[] = heatmap
        .filter(d => d.percentage >= 85)
        .map(d => ({
            dayOfWeek: d.dayOfWeek,
            timeBlockName: d.timeBlockName,
            occupancyPercentage: d.percentage,
            severity: d.percentage >= 95 ? 'CRITICAL' : 'HIGH',
            message: d.percentage >= 95
                ? `Uso críticamente alto el ${d.dayOfWeek} en el bloque ${d.timeBlockName}. Conflictos de programación inminentes.`
                : `Uso alto el ${d.dayOfWeek} en el bloque ${d.timeBlockName}. Disponibilidad limitada.`
        }));

    return alerts;
}
