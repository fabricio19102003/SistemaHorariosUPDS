"use client";

import { useState, useEffect } from 'react';
import { scheduleCreationService } from '@/features/schedule/services/schedule-creation.service';
import { useToast } from '@/context/ToastContext';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

interface TimeTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentBlocks: any[];
    onTemplateApplied: () => void;
}

export default function TimeTemplateModal({ isOpen, onClose, currentBlocks, onTemplateApplied }: TimeTemplateModalProps) {
    const { showToast } = useToast();
    const [mode, setMode] = useState<'LOAD' | 'SAVE'>('LOAD');
    const [templates, setTemplates] = useState<any[]>([]);
    
    // Save Form
    const [templateName, setTemplateName] = useState('');
    const [selectedShift, setSelectedShift] = useState('M');
    const [editingId, setEditingId] = useState<number | null>(null);

    // Loading State
    const [isLoading, setIsLoading] = useState(false);

    // Confirmation State
    const [confirmState, setConfirmState] = useState<{
        isOpen: boolean;
        type: 'APPLY' | 'DELETE' | null;
        id: number | null;
    }>({ isOpen: false, type: null, id: null });

    useEffect(() => {
        if (isOpen && mode === 'LOAD') {
            loadTemplates();
        }
    }, [isOpen, mode]);

    const loadTemplates = async () => {
        setIsLoading(true);
        try {
            const data = await scheduleCreationService.getTemplates();
            setTemplates(data);
        } catch (error) {
            showToast('Error cargando plantillas', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!templateName.trim()) return;
        setIsLoading(true);
        try {
            const payload = {
                name: templateName,
                shift: selectedShift,
                blocks: currentBlocks.map(b => ({
                    startTime: b.startTime,
                    endTime: b.endTime,
                    isBreak: b.isBreak,
                    name: b.name
                }))
            };

            if (editingId) {
                await scheduleCreationService.updateTemplate(editingId, payload);
                showToast('Plantilla actualizada', 'success');
            } else {
                await scheduleCreationService.saveTemplate(payload);
                showToast('Plantilla guardada', 'success');
            }
            
            setMode('LOAD');
            setEditingId(null);
            loadTemplates();
            setTemplateName('');
        } catch (error) {
            showToast('Error al guardar plantilla', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (template: any) => {
        setTemplateName(template.name);
        setSelectedShift(template.shift || 'M');
        setEditingId(template.id);
        setMode('SAVE');
    };

    const handleApply = (id: number) => {
        setConfirmState({ isOpen: true, type: 'APPLY', id });
    };

    const handleDelete = (id: number) => {
        setConfirmState({ isOpen: true, type: 'DELETE', id });
    };

    const handleConfirmAction = async () => {
        if (!confirmState.id || !confirmState.type) return;

        const { id, type } = confirmState;
        setIsLoading(true);

        try {
            if (type === 'APPLY') {
                await scheduleCreationService.applyTemplate(id);
                showToast('Plantilla aplicada correctamente', 'success');
                onTemplateApplied(); 
                onClose();
            } else if (type === 'DELETE') {
                await scheduleCreationService.deleteTemplate(id);
                setTemplates(prev => prev.filter(t => t.id !== id));
                showToast('Plantilla eliminada', 'info');
            }
        } catch (error) {
            showToast(`Error al ${type === 'APPLY' ? 'aplicar' : 'eliminar'}`, 'error');
        } finally {
            setIsLoading(false);
            setConfirmState({ isOpen: false, type: null, id: null });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose}></div>
             <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Plantillas de Horario</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setMode('LOAD')} 
                        className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-all ${mode === 'LOAD' ? 'bg-white text-upds-main shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Cargar
                    </button>
                    <button 
                        onClick={() => { setMode('SAVE'); setEditingId(null); setTemplateName(''); }} 
                        className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-all ${mode === 'SAVE' ? 'bg-white text-upds-main shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {editingId ? 'Editar Plantilla' : 'Guardar Actual'}
                    </button>
                </div>

                {mode === 'LOAD' ? (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                        {isLoading && templates.length === 0 ? (
                            <div className="text-center py-8 text-gray-400 text-sm">Cargando...</div>
                        ) : templates.length === 0 ? (
                            <div className="text-center py-8 text-gray-400 text-sm italic">No hay plantillas guardadas</div>
                        ) : (
                            templates.map((template) => (
                                <div key={template.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors group">
                                    <div>
                                        <div className="font-bold text-gray-800 text-sm">{template.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {template.shift === 'M' ? 'Mañana' : template.shift === 'T' ? 'Tarde' : 'Noche'} • {new Date(template.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleApply(template.id)}
                                            className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200" 
                                            title="Aplicar Plantilla"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        </button>
                                        <button 
                                            onClick={() => handleEdit(template)}
                                            className="p-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200" 
                                            title="Editar (Sobreescribir con actual)"
                                        >
                                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(template.id)}
                                            className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200"
                                            title="Eliminar"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre de la Plantilla</label>
                            <input 
                                type="text" 
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-upds-main"
                                placeholder="Ej: Horario Mañana Estándar"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Turno Asociado</label>
                            <select 
                                value={selectedShift}
                                onChange={(e) => setSelectedShift(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-upds-main"
                            >
                                <option value="M">Mañana</option>
                                <option value="T">Tarde</option>
                                <option value="N">Noche</option>
                            </select>
                            <p className="text-[10px] text-gray-400 mt-1">Esto ayuda a organizar las plantillas.</p>
                        </div>
                        
                        <div className="pt-4">
                            <button 
                                onClick={handleSave}
                                disabled={isLoading || !templateName.trim()}
                                className="w-full bg-upds-main text-white font-bold py-2.5 rounded-lg shadow-lg hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {isLoading ? 'Guardando...' : (editingId ? 'Actualizar Plantilla' : 'Guardar Nueva Plantilla')}
                            </button>
                            {editingId && (
                                <p className="text-[10px] text-center text-gray-400 mt-2">
                                    Se actualizará con la configuración de bloques actual de la pantalla visible.
                                </p>
                            )}
                        </div>
                    </div>
                )}
             </div>

            <ConfirmationModal 
                isOpen={confirmState.isOpen}
                onClose={() => setConfirmState({ ...confirmState, isOpen: false })}
                onConfirm={handleConfirmAction}
                title={confirmState.type === 'APPLY' ? '¿Aplicar Plantilla?' : '¿Eliminar Plantilla?'}
                message={confirmState.type === 'APPLY' 
                    ? 'Esta acción reemplazará la configuración de horas actual. ¿Deseas continuar?' 
                    : 'Esta acción no se puede deshacer. ¿Deseas eliminar esta plantilla permanentemente?'}
                confirmText={confirmState.type === 'APPLY' ? 'Sí, Aplicar' : 'Eliminar'}
                type={confirmState.type === 'DELETE' ? 'danger' : 'warning'}
            />
        </div>
    );
}
