"use client";

import { useState, useEffect } from 'react';
import { scheduleCreationService } from '@/features/schedule/services/schedule-creation.service';
import { useToast } from '@/context/ToastContext';

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

    // Loading State
    const [isLoading, setIsLoading] = useState(false);

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
            await scheduleCreationService.saveTemplate({
                name: templateName,
                shift: selectedShift,
                blocks: currentBlocks.map(b => ({
                    startTime: b.startTime,
                    endTime: b.endTime,
                    isBreak: b.isBreak,
                    name: b.name
                }))
            });
            showToast('Plantilla guardada', 'success');
            setMode('LOAD');
            loadTemplates();
            setTemplateName('');
        } catch (error) {
            showToast('Error al guardar plantilla', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleApply = async (id: number) => {
        if (!confirm('¿Estás seguro? Esto reemplazará las horas actuales.')) return;
        
        setIsLoading(true);
        try {
            await scheduleCreationService.applyTemplate(id);
            showToast('Plantilla aplicada correctamente', 'success');
            onTemplateApplied(); // Trigger refresh in parent
            onClose();
        } catch (error) {
            showToast('Error al aplicar plantilla', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar esta plantilla?')) return;
        try {
            await scheduleCreationService.deleteTemplate(id);
            setTemplates(prev => prev.filter(t => t.id !== id));
            showToast('Plantilla eliminada', 'info');
        } catch (error) {
            showToast('Error al eliminar', 'error');
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
                        onClick={() => setMode('SAVE')} 
                        className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-all ${mode === 'SAVE' ? 'bg-white text-upds-main shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Guardar Actual
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
                                {isLoading ? 'Guardando...' : 'Guardar Plantilla'}
                            </button>
                        </div>
                    </div>
                )}
             </div>
        </div>
    );
}
