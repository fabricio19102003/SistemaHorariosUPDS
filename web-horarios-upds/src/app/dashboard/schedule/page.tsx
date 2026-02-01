"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { scheduleCreationService } from '@/features/schedule/services/schedule-creation.service';
import { useToast } from '@/context/ToastContext';

export default function ScheduleDashboardPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [schedules, setSchedules] = useState<any[]>([]);
    const [blocks, setBlocks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activePeriod, setActivePeriod] = useState<any>(null);

    // Filters
    const [selectedSemester, setSelectedSemester] = useState<number>(1);
    const [selectedShift, setSelectedShift] = useState<string>('M'); // M, T, N
    const [selectedGroup, setSelectedGroup] = useState<string>('');
    
    // Delete State
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; scheduleId: number | null }>({ isOpen: false, scheduleId: null });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [period, blocksData] = await Promise.all([
                scheduleCreationService.getActivePeriod(),
                scheduleCreationService.getTimeBlocks()
            ]);
            
            setActivePeriod(period);
            setBlocks(blocksData);

            if (period) {
                const data = await scheduleCreationService.getByPeriod(period.id);
                setSchedules(data);
                
                // Set default group if any (try to find one matching default shift M)
                if (data.length > 0) {
                     const firstGroup = data.find((s: any) => s.subject.semester === 1 && s.groupCode.startsWith('M'))?.groupCode 
                        || data.find((s: any) => s.subject.semester === 1)?.groupCode 
                        || data[0].groupCode;
                     setSelectedGroup(firstGroup);
                     // Update shift if needed
                     if (firstGroup) setSelectedShift(firstGroup.charAt(0));
                }
            }
        } catch (error) {
            console.error(error);
            showToast('Error cargando horarios', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Derived State: Available Filters
    // Filter semesters by Shift
    const availableSemesters = Array.from(new Set(
        schedules
            .filter(s => s.groupCode.startsWith(selectedShift))
            .map(s => s.subject.semester)
    )).sort((a, b) => a - b);
    
    // Reset semester when shift changes if current semester invalid
    useEffect(() => {
        if (availableSemesters.length > 0) {
            if (!availableSemesters.includes(selectedSemester)) {
                setSelectedSemester(availableSemesters[0]);
            }
        }
    }, [selectedShift, availableSemesters]);

    // Filter groups by Semester AND Shift
    const availableGroups = Array.from(new Set(
        schedules
            .filter(s => s.subject.semester === selectedSemester && s.groupCode.startsWith(selectedShift))
            .map(s => s.groupCode)
    )).sort();

    // Reset group when filters change
    useEffect(() => {
        if (availableGroups.length > 0) {
            if (!availableGroups.includes(selectedGroup)) {
                setSelectedGroup(availableGroups[0]);
            }
        } else {
             setSelectedGroup('');
        }
    }, [selectedSemester, selectedShift, availableGroups]);

    const handleDelete = async () => {
        if (!deleteConfirmation.scheduleId) return;
        try {
            await scheduleCreationService.delete(deleteConfirmation.scheduleId);
            showToast('Horario eliminado', 'info');
            // Refresh local state without full reload
            setSchedules(prev => prev.filter(s => s.id !== deleteConfirmation.scheduleId));
        } catch (error) {
            showToast('Error eliminando horario', 'error');
        } finally {
            setDeleteConfirmation({ isOpen: false, scheduleId: null });
        }
    };

    // Grid Mapping
    const scheduleMap = new Map<string, any>();
    schedules.forEach(s => {
        if (s.subject.semester === selectedSemester && s.groupCode === selectedGroup) {
            scheduleMap.set(`${s.dayOfWeek}-${s.timeBlockId}`, s);
        }
    });

    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const daysEs: {[key: string]: string} = { 'MONDAY': 'Lunes', 'TUESDAY': 'Martes', 'WEDNESDAY': 'Miércoles', 'THURSDAY': 'Jueves', 'FRIDAY': 'Viernes', 'SATURDAY': 'Sábado' };
    
    const shifts = [
        { id: 'M', label: 'Mañana' },
        { id: 'T', label: 'Tarde' },
        { id: 'N', label: 'Noche' }
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center shadow-sm z-10 sticky top-0">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => router.push('/dashboard')}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                        title="Volver al Dashboard"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Horarios Académicos</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100 uppercase tracking-wide">
                                {activePeriod ? activePeriod.name : 'Cargando...'}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                     {/* Filters */}
                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                        <select 
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(Number(e.target.value))}
                            className="bg-transparent text-sm font-bold text-gray-700 px-3 py-2 rounded focus:bg-white outline-none transition-colors cursor-pointer"
                        >
                            {availableSemesters.map(s => <option key={s} value={s}>{s}º Semestre</option>)}
                        </select>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <select 
                            value={selectedShift}
                            onChange={(e) => setSelectedShift(e.target.value)}
                            className="bg-transparent text-sm font-bold text-gray-700 px-3 py-2 rounded focus:bg-white outline-none transition-colors cursor-pointer"
                        >
                            {shifts.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                        </select>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <select 
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                            className="bg-transparent text-sm font-bold text-gray-700 px-3 py-2 rounded focus:bg-white outline-none transition-colors cursor-pointer min-w-[80px]"
                            disabled={availableGroups.length === 0}
                        >
                             {availableGroups.length === 0 && <option value="">Sin grupos</option>}
                            {availableGroups.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>

                    <div className="h-8 w-px bg-gray-200 mx-2"></div>

                    <button 
                        onClick={() => router.push('/dashboard/schedule/create')}
                        className="bg-gray-100 text-gray-700 font-bold px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Nuevo
                    </button>
                    <button 
                        onClick={() => router.push(`/dashboard/schedule/create?semester=${selectedSemester}&group=${selectedGroup}`)}
                        className="bg-upds-main text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-blue-900 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedGroup}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Editar
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-8 relative">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-upds-main"></div>
                    </div>
                ) : schedules.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-6">No hay horarios registrados.</p>
                        <button onClick={() => router.push('/dashboard/schedule/create')} className="text-upds-main font-bold hover:underline">Crear Horario &rarr;</button>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ring-1 ring-black/5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-800 text-white">
                                        <th className="px-4 py-3 text-left w-32 font-bold uppercase tracking-wider text-xs border-r border-gray-700">Horario</th>
                                        {days.slice(0, 5).map(day => ( // Showing Mon-Fri
                                            <th key={day} className="px-4 py-3 text-center w-[18%] font-bold uppercase tracking-wider text-xs border-r border-gray-700 last:border-r-0">
                                                {daysEs[day]}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {blocks.map((block) => {
                                        if (block.isBreak) return (
                                            <tr key={block.id} className="bg-gray-50">
                                                <td className="px-4 py-2 border-r border-gray-200 text-xs font-bold text-gray-500 text-center">
                                                    {block.startTime} - {block.endTime}
                                                </td>
                                                <td colSpan={5} className="px-4 py-2 text-center text-xs font-bold text-gray-400 tracking-[0.2em] bg-gray-100/50 striped-bg">
                                                    RECESO
                                                </td>
                                            </tr>
                                        );

                                        return (
                                            <tr key={block.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-4 py-3 border-r border-gray-200 font-mono text-gray-600 font-medium text-xs bg-gray-50/30">
                                                    <div className="flex flex-col items-center">
                                                        <span>{block.startTime}</span>
                                                        <span className="w-3 h-px bg-gray-300 my-1"></span>
                                                        <span>{block.endTime}</span>
                                                    </div>
                                                </td>
                                                {days.slice(0, 5).map(day => {
                                                    const item = scheduleMap.get(`${day}-${block.id}`);
                                                    return (
                                                        <td key={day} className="border-r border-gray-100 last:border-r-0 relative h-24 p-1 align-top group/cell">
                                                            {item ? (
                                                                <div className={`h-full w-full rounded-lg p-2 hover:shadow-md transition-all hover:scale-[1.02] cursor-default border border-l-4 relative group/item ${item.subject.color ? `${item.subject.color} border-l-current` : 'bg-blue-50 border-blue-100 border-l-upds-main'}`}>
                                                                    <div className="font-bold text-gray-800 text-xs mb-1 line-clamp-2" title={item.subject.name}>
                                                                        {item.subject.name}
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-600 mb-1">
                                                                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                                                        <span className="truncate">{item.classroom?.name || 'VIRTUAL'}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                                                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                                        <span className="truncate">{item.teacher?.user?.fullName || 'Por asignar'}</span>
                                                                    </div>
                                                                    
                                                                    {/* DELETE BUTTON */}
                                                                    <button 
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setDeleteConfirmation({ isOpen: true, scheduleId: item.id });
                                                                        }}
                                                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-all shadow-sm hover:scale-110"
                                                                        title="Eliminar horario"
                                                                    >
                                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="h-full w-full rounded-lg border border-dashed border-transparent hover:border-gray-200 transition-colors"></div>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                            <div>
                                {availableSemesters.length} Semestres encontrados
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-blue-50 border border-blue-100 border-l-4 border-l-upds-main rounded-sm"></span>
                                    <span>Clases Programadas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-gray-100 striped-bg border border-gray-200 rounded-sm"></span>
                                    <span>Receso</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <style jsx global>{`
                .striped-bg {
                    background-image: repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 5px,
                        #e5e7eb 5px,
                        #e5e7eb 10px
                    );
                }
            `}</style>
            
            {/* DELETE CONFIRMATION MODAL */}
            {deleteConfirmation.isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setDeleteConfirmation({ isOpen: false, scheduleId: null })}></div>
                    <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full animate-bounce-in">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-center text-gray-800 mb-2">¿Eliminar horario?</h3>
                        <p className="text-sm text-gray-500 text-center mb-6">Esta acción no se puede deshacer. Se eliminará la clase del horario.</p>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setDeleteConfirmation({ isOpen: false, scheduleId: null })}
                                className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleDelete}
                                className="flex-1 py-2.5 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 shadow-md transition-all active:scale-95"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
