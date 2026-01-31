"use client";

import { useEffect, useState } from 'react';

export interface ConflictDetail {
    type: 'TEACHER' | 'CLASSROOM' | 'ROOM';
    message: string;
    details: string[];
}

interface ConflictResolutionModalProps {
    isOpen: boolean;
    onClose: () => void;
    conflicts: ConflictDetail[];
}

export default function ConflictResolutionModal({ isOpen, onClose, conflicts }: ConflictResolutionModalProps) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
        } else {
            setAnimate(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

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
                    className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border-t-8 border-amber-500 duration-300 ease-out ${animate ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:h-12 sm:w-12 border-4 border-amber-50 animate-pulse">
                                <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                <h3 className="text-xl font-bold leading-6 text-gray-900" id="modal-title">
                                    Conflicto de Horarios Detectado
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 mb-4">
                                        No se pueden guardar los cambios porque existen choques en la programación.
                                    </p>

                                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                        {conflicts.map((conflict, idx) => (
                                            <div key={idx} className="bg-amber-50 border border-amber-100 rounded-xl p-3 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {conflict.type === 'TEACHER' ? (
                                                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border border-amber-200">Docente</span>
                                                    ) : (conflict.type === 'CLASSROOM' || conflict.type === 'ROOM') ? (
                                                        <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border border-purple-200">Aula</span>
                                                    ) : null}
                                                    <span className="text-xs font-semibold text-gray-700">{conflict.message}</span>
                                                </div>
                                                <ul className="text-xs text-gray-600 list-none space-y-1 pl-1">
                                                    {conflict.details.map((detail, dIdx) => (
                                                        <li key={dIdx} className="flex items-start gap-1.5">
                                                            <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                            <span>{detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-100">
                        <button 
                            type="button" 
                            className="inline-flex w-full justify-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 hover:bg-amber-600 hover:shadow-xl hover:translate-y-[-1px] sm:ml-3 sm:w-auto transition-all"
                            onClick={onClose}
                        >
                            Entendido, corregiré esto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
