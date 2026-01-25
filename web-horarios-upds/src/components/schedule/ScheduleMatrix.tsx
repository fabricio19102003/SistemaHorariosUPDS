"use client";

import { ClassSchedule } from "@/features/schedule/services/schedule.service";

interface ScheduleMatrixProps {
    schedules: ClassSchedule[];
}

const TIME_BLOCKS = [
    { id: 1, name: 'M1', time: '06:30 - 07:15' },
    { id: 2, name: 'M2', time: '07:15 - 08:00' },
    { id: 3, name: 'M3', time: '08:10 - 08:55' },
    { id: 4, name: 'M4', time: '08:55 - 09:40' },
    { id: 5, name: 'M5', time: '09:50 - 10:35' },
    { id: 6, name: 'M6', time: '10:35 - 11:20' },
    { id: 7, name: 'M7', time: '11:20 - 12:05' },
    // Muestreo Tarde/Noche
    { id: 8, name: 'N1', time: '18:15 - 19:00' },
    { id: 9, name: 'N2', time: '19:00 - 19:45' },
    { id: 10, name: 'N3', time: '19:55 - 20:40' },
];

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const DAY_LABELS: Record<string, string> = {
    MONDAY: 'Lunes', TUESDAY: 'Martes', WEDNESDAY: 'Miércoles',
    THURSDAY: 'Jueves', FRIDAY: 'Viernes', SATURDAY: 'Sábado'
};

export default function ScheduleMatrix({ schedules }: ScheduleMatrixProps) {
    
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
                    {TIME_BLOCKS.map((block) => (
                        <tr key={block.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 font-medium text-gray-900 bg-gray-50 border-r border-gray-100">
                                <div className="text-xs text-gray-500">{block.name}</div>
                                <div>{block.time}</div>
                            </td>
                            {DAYS.map(day => {
                                const session = getClass(day, block.id);
                                return (
                                    <td key={`${day}-${block.id}`} className="px-2 py-2 border-r border-gray-100 align-top h-24">
                                        {session ? (
                                            <div className="bg-blue-50 border-l-4 border-upds-light p-2 rounded text-xs shadow-sm h-full flex flex-col justify-between hover:bg-blue-100 transition-colors cursor-pointer">
                                                <div className="font-bold text-upds-main mb-1">
                                                    Materia ID: {session.subjectId}
                                                </div>
                                                <div className="text-gray-600">
                                                    Docente ID: {session.teacherId.split('-')[0]}...
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
