"use client";

import { useEffect, useState } from 'react';

export interface ConflictDetail {
    type: 'TEACHER' | 'CLASSROOM' | 'ROOM' | 'MISSING';
    message: string;
    details: string[]; // For MISSING, details[0] is subjectId, details[1] is subjectName
}

interface ConflictResolutionModalProps {
    isOpen: boolean;
    onClose: () => void;
    conflicts: ConflictDetail[];
    allTeachers?: any[]; // Passed from parent to avoid circular deps
    allClassrooms?: any[];
    conflictingItem?: any; // The draft item that caused the issue
    onResolve?: (updates: any) => void;
    onAutoSchedule?: (subjectId: number) => void;
    onForceSave?: () => void;
}

export default function ConflictResolutionModal({ 
    isOpen, 
    onClose, 
    conflicts,
    allTeachers = [],
    allClassrooms = [],
    conflictingItem,
    onResolve,
    onAutoSchedule,
    onForceSave
}: ConflictResolutionModalProps) {
    const [animate, setAnimate] = useState(false);

    // Draft corrections
    const [newTeacherId, setNewTeacherId] = useState<string>('');
    const [newClassroomId, setNewClassroomId] = useState<number>(0);

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
            // Reset selection when opening
            setNewTeacherId('');
            setNewClassroomId(0);
        } else {
            setAnimate(false);
        }
    }, [isOpen]);

    const handleApplyCorrection = () => {
        const updates: any = {};
        if (newTeacherId) updates.teacherId = newTeacherId;
        if (newClassroomId) updates.classroomId = newClassroomId;
        
        // Find names for UI updates if needed (Parent handles it usually via ID, but good to ensure)
        if (newTeacherId) {
            const t = allTeachers.find(t => t.id === newTeacherId);
            if (t) updates.teacherName = t.user?.fullName;
        }
        if (newClassroomId) {
            const c = allClassrooms.find(c => c.id === Number(newClassroomId));
            if (c) updates.classroomName = c.name;
        }

        if (onResolve && Object.keys(updates).length > 0) {
            onResolve(updates);
            onClose();
        }
    };

    if (!isOpen) return null;

    const hasTeacherConflict = conflicts.some(c => c.type === 'TEACHER');
    const hasRoomConflict = conflicts.some(c => c.type === 'CLASSROOM' || c.type === 'ROOM');
    const hasMissingSubjects = conflicts.some(c => c.type === 'MISSING');
    
    // Only allow force save if mostly missing subjects or specifically allowed
    // For now, allow force save if MISSING is present (implying user knows it's incomplete)
    // or if purely blocking errors aren't present? No, let's just add the button if MISSING exists.
    const showForceSave = hasMissingSubjects; 

    return (
        <div className="fixed inset-0 z-[100] z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`} 
                onClick={onClose}
            ></div>

            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
                {/* Modal Panel */}
                <div 
                    className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border-t-8 ${hasMissingSubjects && !hasTeacherConflict && !hasRoomConflict ? 'border-yellow-500' : 'border-amber-500'} duration-300 ease-out ${animate ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className={`mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-12 sm:w-12 border-4 animate-pulse ${hasMissingSubjects && !hasTeacherConflict && !hasRoomConflict ? 'bg-yellow-100 border-yellow-50 text-yellow-500' : 'bg-amber-100 border-amber-50 text-amber-500'}`}>
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                <h3 className="text-xl font-bold leading-6 text-gray-900" id="modal-title">
                                    {hasMissingSubjects && !hasTeacherConflict && !hasRoomConflict ? 'Horario Incompleto' : 'Conflictos Detectados'}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 mb-4">
                                        {hasMissingSubjects && !hasTeacherConflict && !hasRoomConflict 
                                            ? 'Faltan materias por programar para este semestre.' 
                                            : 'Existen problemas que impiden guardar el horario correctamente.'}
                                    </p>

                                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar mb-4">
                                        {conflicts.map((conflict, idx) => (
                                            <div key={idx} className={`border rounded-xl p-3 shadow-sm ${conflict.type === 'MISSING' ? 'bg-yellow-50 border-yellow-100' : 'bg-amber-50 border-amber-100'}`}>
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <div className="flex items-center gap-2">
                                                        {conflict.type === 'TEACHER' ? (
                                                            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border border-amber-200">Docente</span>
                                                        ) : (conflict.type === 'CLASSROOM' || conflict.type === 'ROOM') ? (
                                                            <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border border-purple-200">Aula</span>
                                                        ) : conflict.type === 'MISSING' ? (
                                                            <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border border-yellow-200">Falta</span>
                                                        ) : null}
                                                        <span className="text-xs font-semibold text-gray-700">{conflict.message}</span>
                                                    </div>
                                                    
                                                    {/* Auto Schedule Button for Missing */}
                                                    {conflict.type === 'MISSING' && onAutoSchedule && (
                                                         <button 
                                                            onClick={() => onAutoSchedule(Number(conflict.details[0]))}
                                                            className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 font-bold transition-colors flex items-center gap-1"
                                                            title="Buscar hueco disponible y asignar"
                                                         >
                                                             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                                             Auto-Asignar
                                                         </button>
                                                    )}
                                                </div>
                                                
                                                {conflict.type !== 'MISSING' && (
                                                    <ul className="text-xs text-gray-600 list-none space-y-1 pl-1">
                                                        {conflict.details.map((detail, dIdx) => (
                                                            <li key={dIdx} className="flex items-start gap-1.5">
                                                                <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                                <span>{detail}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quick Fix Section (Only for NON-MISSING conflicts) */}
                                    {conflictingItem && onResolve && (
                                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-2">
                                            <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Corrección Rápida (Choques)</h4>
                                            
                                            {hasTeacherConflict && (
                                                <div className="mb-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Cambiar Docente a:</label>
                                                    <select 
                                                        className="w-full text-xs border border-gray-300 rounded p-1.5 outline-none focus:border-amber-500"
                                                        value={newTeacherId}
                                                        onChange={(e) => setNewTeacherId(e.target.value)}
                                                    >
                                                        <option value="">-- Seleccionar Docente --</option>
                                                        {allTeachers.map((t: any) => (
                                                            <option key={t.id} value={t.id}>{t.user?.fullName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}

                                            {hasRoomConflict && (
                                                <div className="mb-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Cambiar Aula a:</label>
                                                    <select 
                                                        className="w-full text-xs border border-gray-300 rounded p-1.5 outline-none focus:border-amber-500"
                                                        value={newClassroomId}
                                                        onChange={(e) => setNewClassroomId(Number(e.target.value))}
                                                    >
                                                        <option value="0">-- Seleccionar Aula --</option>
                                                        {allClassrooms.map((c: any) => (
                                                            <option key={c.id} value={c.id}>{c.name} (Cap: {c.capacity})</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}

                                            <button 
                                                onClick={handleApplyCorrection}
                                                disabled={!newTeacherId && !newClassroomId}
                                                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Aplicar Corrección
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-100 gap-2">
                        {showForceSave && onForceSave && (
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-900 sm:w-auto transition-all"
                                onClick={() => {
                                    onForceSave();
                                    onClose();
                                }}
                            >
                                Guardar de todos modos
                            </button>
                        )}
                        <button 
                            type="button" 
                            className="inline-flex w-full justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 sm:w-auto transition-all"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
