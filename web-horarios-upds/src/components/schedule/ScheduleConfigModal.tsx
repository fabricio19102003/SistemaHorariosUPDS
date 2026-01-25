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
    };
    blocks: any[]; // All time blocks
}

export default function ScheduleConfigModal({ isOpen, onClose, onSave, initialData, blocks }: ScheduleConfigModalProps) {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    
    // Select options
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    // Form State
    const [teacherId, setTeacherId] = useState('');
    const [classroomId, setClassroomId] = useState<number | null>(null);
    const [endBlockId, setEndBlockId] = useState<number>(initialData.startBlockId);
    const [groupCode, setGroupCode] = useState('');

    useEffect(() => {
        if (isOpen) {
            loadOptions();
            // Reset logic
            setEndBlockId(initialData.startBlockId);
            
            // Auto-Select Teacher if available
            if (initialData.subject.defaultTeacherId) {
                setTeacherId(initialData.subject.defaultTeacherId);
            } else {
                setTeacherId('');
            }

            // Smart Group Detection
            if (!groupCode) {
                 const startBlock = blocks.find(b => b.id === initialData.startBlockId);
                 if (startBlock) {
                     const hour = parseInt(startBlock.startTime.split(':')[0]);
                     // Morning (07-12) -> G1, Afternoon (12-18) -> G2, Night (18+) -> G3
                     let suggestedGroup = `G${initialData.semester}`;
                     if (hour >= 18) suggestedGroup += "-N"; // Night
                     else if (hour >= 12) suggestedGroup += "-T"; // Afternoon
                     else suggestedGroup += "-M"; // Morning
                     setGroupCode(suggestedGroup);
                 } else {
                     setGroupCode(`G${initialData.semester}`);
                 }
            }
        }
    }, [isOpen, initialData]);

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
            // Logic to calculate intermediate blocks
            const startBlockIndex = blocks.findIndex(b => b.id === initialData.startBlockId);
            const endBlockIndex = blocks.findIndex(b => b.id === endBlockId);
            
            const selectedBlocks = blocks.slice(startBlockIndex, endBlockIndex + 1);
            const timeBlockIds = selectedBlocks.filter(b => !b.isBreak).map(b => b.id);

            if (timeBlockIds.length === 0) {
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

    // Filter available end blocks (must be same or after start block)
    const startBlockIndex = blocks.findIndex(b => b.id === initialData.startBlockId);
    const availableEndBlocks = blocks.slice(startBlockIndex).filter(b => !b.isBreak); 
    const startBlock = blocks.find(b => b.id === initialData.startBlockId);

    const quickGroups = [`G${initialData.semester}-M`, `G${initialData.semester}-T`, `G${initialData.semester}-N`, 'PENDIENTE'];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                    <div className="bg-upds-main px-6 py-4 flex justify-between items-center text-white">
                        <h3 className="font-bold text-lg">Configurar Horario</h3>
                        <button onClick={onClose}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Summary Info (Unchanged) */}
                        <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                                {initialData.subject.code.split('-')[1] || '?'}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{initialData.subject.name}</h4>
                                <p className="text-sm text-gray-500">{initialData.day} • Inicio: {startBlock?.startTime}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Time Selection */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hora Inicio</label>
                                <input type="text" disabled value={`${startBlock?.startTime} (${startBlock?.name})`} className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed" />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hora Fin (Bloque)</label>
                                <select 
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-upds-main focus:ring-1 focus:ring-upds-main"
                                    value={endBlockId}
                                    onChange={(e) => setEndBlockId(Number(e.target.value))}
                                >
                                    {availableEndBlocks.map(block => (
                                        <option key={block.id} value={block.id}>
                                            {block.endTime} ({block.name})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Resource Selection */}
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                    Docente
                                    {initialData.subject.defaultTeacherId && <span className="ml-2 text-[10px] bg-green-100 text-green-600 px-1.5 rounded">Sugerido</span>}
                                </label>
                                <select 
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-upds-main focus:ring-1 focus:ring-upds-main"
                                    value={teacherId}
                                    onChange={(e) => setTeacherId(e.target.value)}
                                >
                                    <option value="">Seleccione Docente...</option>
                                    {teachers.map(t => (
                                        <option key={t.id} value={t.id}>{t.user?.fullName} ({t.contractType})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Aula / Ambiente</label>
                                <select 
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-upds-main focus:ring-1 focus:ring-upds-main"
                                    value={classroomId || ''}
                                    onChange={(e) => setClassroomId(Number(e.target.value))}
                                >
                                    <option value="">Seleccione Aula...</option>
                                    {classrooms.map(c => (
                                        <option key={c.id} value={c.id}>{c.name} (Cap: {c.capacity}) - {c.type}</option>
                                    ))}
                                </select>
                            </div>
                            
                             <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Código de Grupo</label>
                                <div className="flex gap-2 mb-2">
                                    {quickGroups.map(g => (
                                        <button 
                                            key={g} 
                                            onClick={() => setGroupCode(g)}
                                            className={`text-[10px] px-2 py-1 rounded border transition-colors ${groupCode === g ? 'bg-upds-main text-white border-upds-main' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                                <input 
                                    type="text" 
                                    value={groupCode}
                                    onChange={(e) => setGroupCode(e.target.value)} 
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-upds-main"
                                    placeholder="Ej: M1.M2 (Personalizado)"
                                />
                                <p className="text-[10px] text-gray-400 mt-1">Escribe o selecciona un código rápido. (M=Mañana, T=Tarde, N=Noche)</p>
                            </div>
                        </div>
                        
                        {/* Footer (Unchanged) */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button onClick={onClose} className="px-5 py-2 text-gray-600 font-bold hover:bg-gray-50 rounded-lg">Cancelar</button>
                            <button 
                                onClick={handleSave}
                                disabled={loading}
                                className="px-6 py-2 bg-upds-main text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : null}
                                Guardar Horario
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
