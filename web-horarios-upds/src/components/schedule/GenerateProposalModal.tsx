"use client";

import { useState, useEffect } from 'react';
import { scheduleCreationService } from '@/features/schedule/services/schedule-creation.service';
import { useToast } from '@/context/ToastContext';

interface GenerateProposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    periodId: number;
    initialSemester: number;
    onProposalGenerated: (items: any[]) => void;
}

export default function GenerateProposalModal({ isOpen, onClose, periodId, initialSemester, onProposalGenerated }: GenerateProposalModalProps) {
    
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    
    // Form
    const [semester, setSemester] = useState(initialSemester);
    const [shift, setShift] = useState('M');
    const [groupCode, setGroupCode] = useState('M1');

    // Sync semester when prop changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setSemester(initialSemester);
        }
    }, [initialSemester, isOpen]);

    const handleShiftChange = (newShift: string) => {
        setShift(newShift);
        // Suggest group code
        setGroupCode(`${newShift}1`);
    };

    const handleGenerate = async () => {
        if (!periodId) {
            showToast('No hay periodo activo', 'error');
            return;
        }

        setIsLoading(true);
        try {
            const proposal = await scheduleCreationService.generateProposal({
                semester,
                shift,
                groupCode,
                periodId
            });

            // Iterate and map to DraftItem structure if needed, or parent handles it
            // The service returns objects with .subject, .teacher, .classroom
            const items = proposal.details || [];
            
            const mappedItems = items
                .filter((p: any) => !p.timeBlock?.isBreak) // Frontend safety filter
                .map((p: any) => ({
                    id: p.id,
                    subjectId: p.subjectId,
                    subjectName: p.subject.name,
                    subject: p.subject, // Pass full subject object
                    teacherId: p.teacherId,
                    teacherName: p.teacher ? p.teacher.user?.fullName || 'TBD' : 'Por Definir',
                    classroomId: p.classroomId,
                    classroomName: p.classroom ? p.classroom.name : undefined,
                    periodId: p.periodId,
                    dayOfWeek: p.dayOfWeek,
                    timeBlockIds: [p.timeBlockId], // Map to Array
                    groupCode: p.groupCode
                }));

            onProposalGenerated(mappedItems);
            showToast(`Propuesta generada con ${mappedItems.length} clases`, 'success');
            onClose();
        } catch (error: any) {
            showToast(error.response?.data?.error || 'Error generando propuesta', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose}></div>
             <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <svg className="w-6 h-6 text-upds-main" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        Generar Propuesta
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Semestre</label>
                        <select 
                            value={semester}
                            onChange={(e) => setSemester(Number(e.target.value))}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-upds-main"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(s => (
                                <option key={s} value={s}>{s}º Semestre</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Turno</label>
                        <select 
                            value={shift}
                            onChange={(e) => handleShiftChange(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-upds-main"
                        >
                            <option value="M">Mañana</option>
                            <option value="T">Tarde</option>
                            <option value="N">Noche</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Grupo (Sugerido)</label>
                        <input 
                            type="text" 
                            value={groupCode}
                            onChange={(e) => setGroupCode(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-upds-main font-mono"
                            placeholder="Ej: M1"
                        />
                    </div>

                    <div className="pt-4">
                        <button 
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Generando...
                                </>
                            ) : 'Generar Automáticamente'}
                        </button>
                        <p className="text-[10px] text-gray-400 text-center mt-3 leading-tight">
                            El sistema buscará horarios disponibles para todas las materias del semestre elegido, respetando disponibilidad de docentes y aulas.
                        </p>
                    </div>
                </div>
             </div>
        </div>
    );
}
