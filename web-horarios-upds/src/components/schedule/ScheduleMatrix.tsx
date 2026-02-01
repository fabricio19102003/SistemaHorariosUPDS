"use client";

import { ClassSchedule } from "@/features/schedule/services/schedule.service";

interface ScheduleMatrixProps {
    schedules: any[]; // Changed to any to support the richer object structure from backend
    timeBlocks?: any[];
}

const DEFAULT_TIME_BLOCKS = [
    { id: 1, name: 'M1', time: '06:30 - 07:15', startTime: '06:30' },
    { id: 2, name: 'M2', time: '07:15 - 08:00', startTime: '07:15' },
    { id: 3, name: 'M3', time: '08:10 - 08:55', startTime: '08:10' },
    { id: 4, name: 'M4', time: '08:55 - 09:40', startTime: '08:55' },
    { id: 5, name: 'M5', time: '09:50 - 10:35', startTime: '09:50' },
    { id: 6, name: 'M6', time: '10:35 - 11:20', startTime: '10:35' },
    { id: 7, name: 'M7', time: '11:20 - 12:05', startTime: '11:20' },
    // Muestreo Tarde/Noche
    { id: 8, name: 'N1', time: '18:15 - 19:00', startTime: '18:15' },
    { id: 9, name: 'N2', time: '19:00 - 19:45', startTime: '19:00' },
    { id: 10, name: 'N3', time: '19:55 - 20:40', startTime: '19:55' },
];

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const DAY_LABELS: Record<string, string> = {
    MONDAY: 'Lunes', TUESDAY: 'Martes', WEDNESDAY: 'Miércoles',
    THURSDAY: 'Jueves', FRIDAY: 'Viernes', SATURDAY: 'Sábado'
};

export default function ScheduleMatrix({ schedules, timeBlocks }: ScheduleMatrixProps) {
    
    // Use passed blocks or fallback, sorted by time
    const blocks = (timeBlocks && timeBlocks.length > 0) ? timeBlocks : DEFAULT_TIME_BLOCKS;
    
    // Función helper para encontrar clase en (dia, bloque)
    const getClass = (day: string, blockId: number) => {
        return schedules.find(s => s.dayOfWeek === day && s.timeBlockId === blockId);
    };

    return (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="min-w-full bg-white text-sm">
                <thead className="bg-upds-main text-white">
                    <tr>
                        <th className="px-4 py-3 text-left w-24">Horario</th>
                        {DAYS.map(day => (
                            <th key={day} className="px-4 py-3 text-center min-w-[150px]">
                                {DAY_LABELS[day]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {blocks.map((block) => (
                        <tr key={block.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 font-medium text-gray-900 bg-gray-50 border-r border-gray-100">
                                <div className="text-xs text-gray-500">{block.name || `B${block.id}`}</div>
                                <div>{block.time || `${block.startTime} - ${block.endTime}`}</div>
                            </td>
                            {DAYS.map(day => {
                                const session = getClass(day, block.id);
                                return (
                                    <td key={`${day}-${block.id}`} className="px-2 py-2 border-r border-gray-100 align-top h-24">
                                        {session ? (
                                            <div className="bg-blue-50 border-l-4 border-upds-light p-2 rounded text-xs shadow-sm h-full flex flex-col justify-between hover:bg-blue-100 transition-colors cursor-pointer">
                                                <div className="font-bold text-upds-main mb-1 line-clamp-3">
                                                    {/* Prioritize Name if object exists, else fallback to ID */}
                                                    {session.subject?.name || `Materia ID: ${session.subjectId}`}
                                                </div>
                                                <div className="text-gray-600">
                                                     {/* Safe check for teacher object or ID */}
                                                     {session.teacher?.user?.fullName || (session.teacherId ? `Docente ID: ${session.teacherId}` : 'Por asignar')}
                                                </div>
                                                <div className="mt-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-white text-gray-800 border border-gray-200 max-w-fit">
                                                    Aula {session.classroomId}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full w-full"></div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
