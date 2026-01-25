"use client";

import { useEffect, useState } from 'react';
import { Subject } from '@/features/subjects/services/subject.service';
import { Classroom, classroomService } from '@/features/classrooms/services/classroom.service';
import { Teacher, teacherService } from '@/features/teachers/services/teacher.service';
import { scheduleCreationService } from '@/features/schedule/services/schedule-creation.service';
import { useToast } from '@/context/ToastContext';

interface ScheduleConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => Promise<void>;
    initialData: {
        subject: Subject;
        day: string;
        startBlockId: number;
        semester: number;
        timeBlockIds?: number[];
    };
    blocks: any[]; // All time blocks
    selectedShift?: string; // New
    suggestedGroup?: string; // New
}

export default function ScheduleConfigModal({ isOpen, onClose, onSave, initialData, blocks, selectedShift, suggestedGroup }: ScheduleConfigModalProps) {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    
    // Select options
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    // Form State
    const [teacherId, setTeacherId] = useState('');
    const [classroomId, setClassroomId] = useState<number | null>(null);
    const [groupCode, setGroupCode] = useState('');

    useEffect(() => {
        if (isOpen) {
            loadOptions();
            
            // Auto-Select Teacher if available
            if (initialData.subject.defaultTeacherId) {
                setTeacherId(initialData.subject.defaultTeacherId);
            } else {
                setTeacherId('');
            }

            // Smart Group Detection
            if (!groupCode) {
                if (suggestedGroup) {
                     setGroupCode(suggestedGroup);
                } else {
                     // Fallback Logic based on time
                     const startBlock = blocks.find(b => b.id === initialData.startBlockId);
                     if (startBlock) {
                         const hour = parseInt(startBlock.startTime.split(':')[0]);
                         let autoSuffix = "-M";
                         if (hour >= 18) autoSuffix = "-N";
                         else if (hour >= 12) autoSuffix = "-T";
                         setGroupCode(`G${initialData.semester}${autoSuffix}`);
                     }
                }
            }
        }
    }, [isOpen, initialData, suggestedGroup]); // Added suggestedGroup dep

    const loadOptions = async () => {
        try {
            const [roomsData, teachersData] = await Promise.all([
                classroomService.getAll(),
                teacherService.getAll()
            ]);
            setClassrooms(roomsData);
            setTeachers(teachersData);
        } catch (error) {
            console.error('Error loading options', error);
            showToast('Error cargando listas de docentes/aulas', 'error');
        }
    };

    const handleSave = async () => {
        if (!teacherId || !classroomId) {
            showToast('Selecciona docente y aula', 'error');
            return;
        }

        setLoading(true);
        try {
            // Use existing timeBlockIds from the item being edited
            const timeBlockIds = initialData.timeBlockIds || [initialData.startBlockId];

            if (!timeBlockIds || timeBlockIds.length === 0) {
                 showToast('Selección de horario inválida', 'error');
                 return;
            }

            // Find names for optimistic UI update
            const selectedTeacher = teachers.find(t => t.id === teacherId);
            const selectedClassroom = classrooms.find(c => c.id === classroomId);

            await onSave({
                teacherId,
                classroomId,
                timeBlockIds,
                groupCode,
                teacherName: selectedTeacher?.user?.fullName,
                classroomName: selectedClassroom?.name
            });
            onClose();
        } catch (error: any) {
             // Toast handled by parent or here if needed
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const startBlock = blocks.find(b => b.id === initialData.startBlockId);
    
    // Quick Groups - Include Suggested!
    const quickGroups = new Set<string>();
    if (suggestedGroup) quickGroups.add(suggestedGroup);
    quickGroups.add(`${selectedShift || 'M'}${initialData.semester}`); // Fallback suggestion e.g. M1
    quickGroups.add('PENDIENTE');

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up transform transition-all scale-100">
                    <div className="bg-upds-main px-6 py-4 flex justify-between items-center text-white bg-gradient-to-r from-blue-900 to-blue-800">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-white/20 rounded-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            </div>
                            <h3 className="font-bold text-lg tracking-tight">Configurar Horario</h3>
                        </div>
                        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Summary Info */}
                        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl">
                                {initialData.subject.code.split('-')[1] || '?'}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-lg leading-tight">{initialData.subject.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">{initialData.day}</span>
                                    <span className="text-xs text-gray-500">• Inicio: {startBlock?.startTime}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            {/* Resource Selection */}
                            <div className="col-span-2 relative group">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">
                                    Docente
                                    {initialData.subject.defaultTeacherId && <span className="ml-2 text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100">Sugerido por Materia</span>}
                                </label>
                                <div className="relative">
                                    <select 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-upds-main focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                                        value={teacherId}
                                        onChange={(e) => setTeacherId(e.target.value)}
                                    >
                                        <option value="">Seleccione Docente...</option>
                                        {teachers.map(t => (
                                            <option key={t.id} value={t.id}>{t.user?.fullName} ({t.contractType})</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400 group-hover:text-upds-main transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 relative group">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Aula / Ambiente</label>
                                <div className="relative">
                                    <select 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-upds-main focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                                        value={classroomId || ''}
                                        onChange={(e) => setClassroomId(Number(e.target.value))}
                                    >
                                        <option value="">Seleccione Aula...</option>
                                        {classrooms.map(c => (
                                            <option key={c.id} value={c.id}>{c.name} (Cap: {c.capacity}) - {c.type}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400 group-hover:text-upds-main transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>
                            
                             <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Código de Grupo</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {Array.from(quickGroups).map(g => (
                                        <button 
                                            key={g} 
                                            onClick={() => setGroupCode(g)}
                                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all active:scale-95 ${groupCode === g ? 'bg-upds-main text-white border-upds-main shadow-md ring-2 ring-offset-1 ring-upds-main' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        value={groupCode}
                                        onChange={(e) => setGroupCode(e.target.value.toUpperCase())} 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-upds-main focus:ring-4 focus:ring-blue-500/10 transition-all font-bold tracking-widest uppercase placeholder-gray-400"
                                        placeholder="EJ: M1"
                                    />
                                    <div className="absolute right-3 top-3.5 pointer-events-none text-gray-300">
                                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2 ml-1">
                                    {selectedShift === 'M' && 'Turno Mañana seleccionado.'}
                                    {selectedShift === 'T' && 'Turno Tarde seleccionado.'}
                                    {selectedShift === 'N' && 'Turno Noche seleccionado.'}
                                </p>
                            </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button onClick={onClose} className="px-5 py-2.5 text-gray-500 font-bold hover:bg-gray-50 hover:text-gray-700 rounded-xl transition-colors">Cancelar</button>
                            <button 
                                onClick={handleSave}
                                disabled={loading}
                                className="px-6 py-2.5 bg-gradient-to-r from-upds-main to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : null}
                                Guardar Asignación
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
