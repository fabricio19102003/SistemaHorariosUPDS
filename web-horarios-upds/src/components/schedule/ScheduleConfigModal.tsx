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
        teacherId?: string;
        classroomId?: number;
        groupCode?: string;
    };
    blocks: any[]; // All time blocks
    selectedShift?: string; // New
    suggestedGroup?: string; // New
}

// --- INTERNAL COMPONENTS ---

interface SearchableSelectProps {
    label: string;
    options: any[];
    value: string | number | null;
    onChange: (val: any) => void;
    placeholder?: string;
    renderOption: (opt: any) => React.ReactNode;
    getLabel: (opt: any) => string;
    icon?: React.ReactNode;
}

function SearchableSelect({ label, options, value, onChange, placeholder, renderOption, getLabel, icon }: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [localOptions, setLocalOptions] = useState(options);

    useEffect(() => {
        setLocalOptions(options);
    }, [options]);

    useEffect(() => {
        if (!isOpen) {
            setSearch(''); 
        }
    }, [isOpen]);

    const filtered = localOptions.filter(opt => 
        getLabel(opt).toLowerCase().includes(search.toLowerCase())
    );

    const selectedOption = options.find(o => o.id === value);

    return (
        <div className="relative group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                {label}
            </label>
            
            <div className="relative">
                {/* Trigger */}
                <div 
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full bg-white border rounded-xl px-4 py-3 cursor-pointer transition-all flex items-center justify-between
                        ${isOpen ? 'border-upds-main ring-4 ring-blue-500/10 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                    `}
                >
                    <div className="flex items-center gap-3 overflow-hidden">
                        {icon && <div className={`text-gray-400 ${isOpen ? 'text-upds-main' : ''}`}>{icon}</div>}
                        
                        {selectedOption ? (
                            <span className="font-bold text-gray-700 truncate block">
                                {getLabel(selectedOption)}
                            </span>
                        ) : (
                            <span className="text-gray-400 font-medium">{placeholder}</span>
                        )}
                    </div>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-upds-main' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                        <div className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top">
                            {/* Search */}
                            <div className="p-2 border-b border-gray-100 bg-gray-50/50 sticky top-0">
                                <div className="relative">
                                    <input 
                                        autoFocus
                                        type="text" 
                                        className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm font-medium outline-none focus:border-upds-main"
                                        placeholder="Buscar..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                            </div>
                            
                            {/* List */}
                            <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                                {filtered.length > 0 ? (
                                    filtered.map((opt) => (
                                        <div 
                                            key={opt.id}
                                            onClick={() => {
                                                onChange(opt.id);
                                                setIsOpen(false);
                                            }}
                                            className={`
                                                px-3 py-2.5 rounded-lg cursor-pointer transition-colors flex items-center gap-3
                                                ${value === opt.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'}
                                            `}
                                        >
                                            {renderOption(opt)}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-gray-400 text-sm">
                                        No se encontraron resultados
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function ScheduleConfigModal({ isOpen, onClose, onSave, initialData, blocks, suggestedGroup }: ScheduleConfigModalProps) {
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
            
            // Prioritize existing assignment, then default teacher, then empty
            if (initialData.teacherId) {
                setTeacherId(initialData.teacherId);
            } else if (initialData.subject.defaultTeacherId) {
                setTeacherId(initialData.subject.defaultTeacherId);
            } else {
                setTeacherId('');
            }
            
            if (initialData.classroomId) {
                setClassroomId(initialData.classroomId);
            } else {
                setClassroomId(null);
            }
            
            if (initialData.groupCode) {
                 setGroupCode(initialData.groupCode);
            }

            // Group Code Logic (Only if not set)
            if (!initialData.groupCode && !groupCode) {
                if (suggestedGroup) {
                    setGroupCode(suggestedGroup);
                } else if (!groupCode) {
                     // Basic fallback
                     setGroupCode(`G${initialData.semester}`);
                }
            }
        }
    }, [isOpen, initialData, suggestedGroup]);

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
            const timeBlockIds = initialData.timeBlockIds || [initialData.startBlockId];
            if (!timeBlockIds || timeBlockIds.length === 0) {
                 showToast('Selección de horario inválida', 'error');
                 return;
            }

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
             console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const startBlock = blocks.find(b => b.id === initialData.startBlockId);
    
    // Quick Groups
    const quickGroups = new Set<string>();
    if (suggestedGroup) quickGroups.add(suggestedGroup);
    quickGroups.add('PENDIENTE');
    quickGroups.add(`G${initialData.semester}`);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-visible animate-fade-in-up transform transition-all scale-100">
                    
                    {/* Header */}
                    <div className="bg-upds-main px-6 py-5 flex justify-between items-center text-white bg-gradient-to-r from-blue-900 to-blue-800 rounded-t-2xl shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 backdrop-blur rounded-xl border border-white/10 shadow-inner">
                                <svg className="w-5 h-5 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg tracking-tight leading-none">Configurar Asignación</h3>
                                <p className="text-xs text-blue-200 mt-1 font-medium opacity-80">Edita los detalles de la clase</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-lg transition-colors text-blue-100 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Summary Info Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 p-5 rounded-2xl flex items-start gap-4 shadow-sm relative overflow-hidden group">
                           {/* Decorative background element */}
                           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

                            <div className="w-14 h-14 bg-white shadow-md border border-white rounded-2xl flex flex-col items-center justify-center text-blue-700 font-black text-xl shrink-0 z-10 relative">
                                <span>{initialData.subject.code?.split('-')[1] || '?'}</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider -mt-1">{initialData.subject.code?.split('-')[0] || ''}</span>
                            </div>
                            <div className="z-10">
                                <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1">{initialData.subject.name}</h4>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/60 rounded-lg border border-blue-100/50 shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="font-bold text-gray-700">{initialData.day}</span>
                                    </div>
                                    {startBlock && (
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/60 rounded-lg border border-blue-100/50 shadow-sm">
                                             <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                             <span className="font-medium text-gray-600 font-mono">{startBlock.startTime} - {startBlock.endTime}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 relative">
                            {/* TEACHER SELECT */}
                            <div className="col-span-2 relative z-30">
                                <SearchableSelect 
                                    label="Docente Encargado"
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                                    options={teachers}
                                    value={teacherId}
                                    onChange={(id) => setTeacherId(String(id))}
                                    placeholder="Seleccionar Docente..."
                                    getLabel={(t) => t.user?.fullName || 'Sin Nombre'}
                                    renderOption={(t) => (
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-800 text-sm">{t.user?.fullName}</span>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${t.contractType === 'FULL_TIME' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                    {t.contractType === 'FULL_TIME' ? 'TIEMPO COMPLETO' : 'HORARIO'}
                                                </span>
                                                {t.specialty && <span className="text-[10px] text-gray-400 truncate max-w-[150px]">{t.specialty}</span>}
                                            </div>
                                        </div>
                                    )}
                                />
                                {initialData.subject.defaultTeacherId && !teacherId && (
                                     <div className="mt-2 flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>Sugerido: Hay un docente asignado a esta materia.</span>
                                        <button 
                                            onClick={() => setTeacherId(initialData.subject.defaultTeacherId || '')}
                                            className="ml-auto font-bold underline hover:text-green-800"
                                        >
                                            Asignar
                                        </button>
                                     </div>
                                )}
                            </div>

                            {/* CLASSROOM SELECT */}
                            <div className="col-span-2 relative z-20">
                                <SearchableSelect 
                                    label="Aula / Ambiente"
                                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                                    options={classrooms}
                                    value={classroomId}
                                    onChange={(id) => setClassroomId(Number(id))}
                                    placeholder="Seleccionar Aula..."
                                    getLabel={(c) => c.name}
                                    renderOption={(c) => (
                                        <div className="flex items-center justify-between w-full">
                                            <span className="font-bold text-gray-800">{c.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">{c.type}</span>
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${c.capacity >= 40 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                                                    Cap: {c.capacity}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            
                            {/* GROUP CODE INPUT */}
                             <div className="col-span-2 pt-2 border-t border-gray-100">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Código de Grupo</label>
                                <div className="flex items-center gap-3">
                                    <div className="relative group flex-1">
                                        <input 
                                            type="text" 
                                            value={groupCode}
                                            onChange={(e) => setGroupCode(e.target.value.toUpperCase())} 
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-upds-main focus:ring-4 focus:ring-blue-500/10 transition-all font-bold tracking-widest uppercase placeholder-gray-400 font-mono text-center text-lg"
                                            placeholder="EJ: M1"
                                        />
                                        <div className="absolute right-3 top-3.5 pointer-events-none text-gray-300 group-hover:text-upds-main transition-colors">
                                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                                        </div>
                                    </div>
                                    
                                    {/* Quick Buttons */}
                                    <div className="flex gap-2">
                                        {Array.from(quickGroups).map(g => (
                                            <button 
                                                key={g} 
                                                onClick={() => setGroupCode(g)}
                                                className={`h-full px-4 rounded-xl font-bold text-sm border transition-all active:scale-95 ${groupCode === g ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-offset-1 ring-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    {/* Footer */}
                    <div className="flex justify-end gap-3 p-5 bg-gray-50 border-t border-gray-100">
                        <button onClick={onClose} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-200 hover:text-gray-800 rounded-xl transition-colors">Cancelar</button>
                        <button 
                            onClick={handleSave}
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-upds-main to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : null}
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
