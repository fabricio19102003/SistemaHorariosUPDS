"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { scheduleCreationService } from '@/features/schedule/services/schedule-creation.service';
import { useToast } from '@/context/ToastContext';

export default function ScheduleDashboardPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [schedules, setSchedules] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activePeriod, setActivePeriod] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const period = await scheduleCreationService.getActivePeriod();
            setActivePeriod(period);
            if (period) {
                const data = await scheduleCreationService.getByPeriod(period.id);
                setSchedules(data);
            }
        } catch (error) {
            console.error(error);
            showToast('Error cargando horarios', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Group schedules by Semester -> Subject
    const groupedSchedules = schedules.reduce((acc: any, curr: any) => {
        const semester = curr.subject.semester;
        if (!acc[semester]) acc[semester] = [];
        acc[semester].push(curr);
        return acc;
    }, {});

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Horarios Académicos</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {activePeriod ? `Gestión ${activePeriod.name}` : 'Cargando gestión...'}
                    </p>
                </div>
                <button 
                    onClick={() => router.push('/dashboard/schedule/create')}
                    className="bg-upds-main text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-blue-900 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Nuevo Horario
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-upds-main"></div>
                    </div>
                ) : schedules.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Sin Horarios Registrados</h3>
                        <p className="text-gray-500 mt-1 mb-6">Comienza creando el primer horario para esta gestión.</p>
                        <button onClick={() => router.push('/dashboard/schedule/create')} className="text-upds-main font-bold hover:underline">Ir al Diseñador &rarr;</button>
                    </div>
                ) : (
                    <div className="space-y-8 animate-fade-in-up">
                        {Object.keys(groupedSchedules).sort().map((semester: any) => (
                            <div key={semester} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-gray-800">{semester}º Semestre</h3>
                                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                        {new Set(groupedSchedules[semester].map((s: any) => s.subject.id)).size} Materias
                                    </span>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {/* Group by Subject inside Semester */}
                                    {Object.values(groupedSchedules[semester].reduce((subAcc: any, curr: any) => {
                                        if(!subAcc[curr.subject.id]) subAcc[curr.subject.id] = { info: curr.subject, classes: [] };
                                        subAcc[curr.subject.id].classes.push(curr);
                                        return subAcc;
                                    }, {})).map((subjectGroup: any) => (
                                        <div key={subjectGroup.info.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h4 className="font-bold text-gray-800">{subjectGroup.info.name}</h4>
                                                    <span className="text-xs text-gray-500 font-mono">{subjectGroup.info.code}</span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {subjectGroup.classes.map((cls: any) => (
                                                    <div key={cls.id} className="bg-white border border-gray-200 rounded-lg p-3 text-sm shadow-sm flex items-center justify-between">
                                                        <div>
                                                            <div className="font-bold text-upds-main flex items-center gap-2">
                                                                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                                                {cls.dayOfWeek}
                                                            </div>
                                                            <div className="text-gray-600 mt-1">
                                                                {cls.timeBlock.startTime} - {cls.timeBlock.endTime}
                                                            </div>
                                                            <div className="text-xs text-gray-400 mt-1">
                                                                {cls.classroom.name} • {cls.groupCode}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded mb-1 inline-block">
                                                                {cls.teacher.user.fullName.split(' ')[0]}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
