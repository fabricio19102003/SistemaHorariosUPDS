"use client";

import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { scheduleCreationService, CreateBatchScheduleRequest } from '@/features/schedule/services/schedule-creation.service';
import { subjectService, Subject } from '@/features/subjects/services/subject.service';
import { classroomService, Classroom } from '@/features/classrooms/services/classroom.service';
import { teacherService, Teacher } from '@/features/teachers/services/teacher.service';
import { useToast } from '@/context/ToastContext';

// --- COMPONENTS (To be extracted later) ---

function SidebarItem({ subject }: { subject: Subject }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `subject-${subject.id}`,
        data: { type: 'SUBJECT', subject }
    });

    const style = transform ? {
        transform: CSS.Translate.toString(transform),
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} 
             className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 mb-2 cursor-grab hover:shadow-md transition-all border-l-4 border-l-upds-main">
            <h4 className="font-bold text-gray-800 text-sm truncate" title={subject.name}>{subject.name}</h4>
            <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500 font-mono bg-gray-100 px-1 rounded">{subject.code}</span>
                <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-bold">{subject.semester}º</span>
            </div>
        </div>
    );
}

function GridCell({ day, blockId, isBreak, children, rowSpan = 1, onDrop }: any) {
    const { isOver, setNodeRef } = useDroppable({
        id: `cell-${day}-${blockId}`,
        data: { day, blockId, isBreak },
        disabled: isBreak || !!children // Disable drop if occupied or break
    });

    return (
        <div 
            ref={setNodeRef}
            style={{ gridRow: `span ${rowSpan}` }}
            className={`
                border-b border-r border-gray-200 relative transition-colors
                ${isBreak ? 'bg-gray-100/50 striped-bg' : 'bg-white'}
                ${isOver && !isBreak && !children ? 'bg-green-50 ring-2 ring-inset ring-green-400' : ''}
            `}
        >
            {isBreak && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold text-gray-300 tracking-[0.2em]">RECESO</span>
                </div>
            )}
            {children}
        </div>
    );
}

import ScheduleConfigModal from '@/components/schedule/ScheduleConfigModal';

// --- MAIN PAGE ---

export default function ScheduleCreatorPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [blocks, setBlocks] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    
    // DRAFT STATE: Stores all added items locally before saving
    type DraftItem = CreateBatchScheduleRequest & { 
        id: string; // Temporary ID
        subjectName: string; 
        teacherName?: string;
        classroomName?: string;
    };
    const [draftItems, setDraftItems] = useState<DraftItem[]>([]);
    
    // Derived Grid State & Covered Cells
    const { scheduleMap, coveredCells } = useMemo(() => {
        const map: any = {};
        const covered = new Set<string>();

        draftItems.forEach(item => {
            if (item.timeBlockIds && item.timeBlockIds.length > 0) {
                const startBlockId = item.timeBlockIds[0];
                const key = `${item.dayOfWeek}-${startBlockId}`;
                map[key] = item;

                // Mark subsequent blocks as covered
                for (let i = 1; i < item.timeBlockIds.length; i++) {
                     covered.add(`${item.dayOfWeek}-${item.timeBlockIds[i]}`);
                }
            }
        });
        return { scheduleMap: map, coveredCells: covered };
    }, [draftItems]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);

    // Filters
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [periodId, setPeriodId] = useState<number | null>(null);

    // Saving State
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadInitialData();
    }, [selectedSemester]);

    const loadInitialData = async () => {
        try {
            const [blocksData, subjectsData, periodData] = await Promise.all([
                scheduleCreationService.getTimeBlocks(),
                subjectService.getAll(),
                scheduleCreationService.getActivePeriod()
            ]);
            setBlocks(blocksData);
            setSubjects(subjectsData.filter(s => s.semester === selectedSemester));
            
            if (periodData) {
                setPeriodId(periodData.id);
            }
        } catch (error) {
            console.error(error);
            showToast('Error cargando datos iniciales', 'error');
        }
    };

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const subject = active.data.current?.subject;
        const cellData = over.data.current;

        if (cellData.isBreak) {
            showToast('No puedes programar en recesos', 'error');
            return;
        }

        // New Draft Logic
        const newItem: DraftItem = {
            id: `draft-${Date.now()}`,
            subjectId: subject.id,
            subjectName: subject.name,
            dayOfWeek: cellData.day,
            timeBlockIds: [cellData.blockId],
            teacherId: subject.defaultTeacherId || '', 
            classroomId: 0, 
            periodId: periodId || 0,
            groupCode: `G${selectedSemester}`, 
            teacherName: subject.defaultTeacher?.user?.fullName || '---',
            classroomName: '---'
        };

        // Conflict Check
        const isOccupied = draftItems.some(item => 
            item.dayOfWeek === newItem.dayOfWeek && 
            item.timeBlockIds.includes(cellData.blockId)
        );

        if (isOccupied) {
            showToast('Ya existe una materia en este bloque', 'error');
            return;
        }

        setDraftItems(prev => [...prev, newItem]);
    };

    const handleResizeStart = (e: React.MouseEvent, item: DraftItem) => {
        e.stopPropagation();
        e.preventDefault();

        const startY = e.clientY;
        const startBlockIndex = blocks.findIndex(b => b.id === item.timeBlockIds[0]);
        const currentDuration = item.timeBlockIds.length;
        // Approximate height of one row (Need to match CSS)
        // Hardcoded for MVP: 64px = 4rem (h-16 class)
        const rowHeight = 64; 

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaY = moveEvent.clientY - startY;
            const additionalBlocks = Math.round(deltaY / rowHeight);
            
            // Calculate potential new duration
            let newDuration = currentDuration + additionalBlocks;
            if (newDuration < 1) newDuration = 1;
            
            // Calculate new block IDs
            // We need to slice from blocks array
            // [start, start+1, start+2...]
            
            // Limit duration by available blocks and breaks
            // Find max possible duration from start index
            let maxDuration = 0;
            for (let i = startBlockIndex; i < blocks.length; i++) {
                // If it's a break (and not the first block? Actually breaks shouldn't be spanned generally unless authorized)
                // User requirement: "estirar". 
                // Let's assume we Stop at Break for simplicity or skip it?
                // Standard logic: Stop at break.
                if (blocks[i].isBreak && i !== startBlockIndex) break; 
                
                // Also stop if another class exists there?
                // We'll check conflicts on MouseUp to be safe/performant, 
                // but ideally visual feedback limits it.
                maxDuration++;
            }
            
            if (newDuration > maxDuration) newDuration = maxDuration;
            
            // Ideally we'd show a "Ghost" resize indicator. 
            // For now, let's just update valid blocks on MouseUp
        };

        const handleMouseUp = (upEvent: MouseEvent) => {
            const deltaY = upEvent.clientY - startY;
            let addedRows = Math.round(deltaY / rowHeight);
            
            // Re-calculate safely
            let newEndIndex = startBlockIndex + currentDuration - 1 + addedRows;
            
            // Clamp
            if (newEndIndex < startBlockIndex) newEndIndex = startBlockIndex;
            if (newEndIndex >= blocks.length) newEndIndex = blocks.length - 1;

            // Build new ID list respecting breaks/conflicts
            const newBlockIds = [];
            for (let i = startBlockIndex; i <= newEndIndex; i++) {
                if (blocks[i].isBreak && i !== startBlockIndex) break; // Stop at break
                
                // Check if occupied by OTHER items (basic)
                // Skip this check for self
                const isOccupied = draftItems.some(d => 
                    d.id !== item.id && 
                    d.dayOfWeek === item.dayOfWeek && 
                    d.timeBlockIds.includes(blocks[i].id)
                );
                
                if (isOccupied && i !== startBlockIndex) break; // Stop before overlap
                
                newBlockIds.push(blocks[i].id);
            }

            if (newBlockIds.length !== item.timeBlockIds.length) {
                // Update State
                setDraftItems(prev => prev.map(i => i.id === item.id ? { ...i, timeBlockIds: newBlockIds } : i));
            }

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleUpdateDraft = async (data: any) => {
        if (!modalData?.draftId) return;
        setDraftItems(prev => prev.map(item => {
            if (item.id === modalData.draftId) {
                return { ...item, ...data };
            }
            return item;
        }));
        setIsModalOpen(false);
        showToast('Cambio actualizado', 'success');
    };

    const handleGlobalSave = async () => {
        if (draftItems.length === 0) return;
        
        const invalidItems = draftItems.filter(i => !i.teacherId || !i.classroomId);
        if (invalidItems.length > 0) {
            showToast(`Hay ${invalidItems.length} materias incompletas`, 'error');
            return;
        }

        setIsSaving(true);
        try {
            const payload = draftItems.map(({ id, subjectName, teacherName, classroomName, ...rest }) => rest);
            await scheduleCreationService.createBulk(payload);
            showToast('¡Horario guardado!', 'success');
            setDraftItems([]);
        } catch (error: any) {
            console.error(error);
             const msg = error.response?.data?.error || 'Error al guardar';
             showToast(msg, 'error');
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleRemoveDraft = (draftId: string) => {
        setDraftItems(prev => prev.filter(i => i.id !== draftId));
        setIsModalOpen(false);
    };

    const handleTimeChange = async (id: number, field: 'startTime' | 'endTime', value: string) => {
        try {
            await scheduleCreationService.updateBlock(id, { [field]: value });
            setBlocks(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));
            showToast('Hora actualizada', 'success');
        } catch (e) {
            showToast('Error al actualizar hora', 'error');
        }
    };

    const handleAddBlock = async () => {
        try {
            await scheduleCreationService.createBlock({
                name: 'Bloque',
                startTime: '00:00',
                endTime: '00:00',
                orderIndex: blocks.length,
                isBreak: false
            });
            // Refresh
            const updatedBlocks = await scheduleCreationService.getTimeBlocks();
            setBlocks(updatedBlocks);
            showToast('Bloque agregado', 'success');
        } catch (e) {
            showToast('Error al agregar bloque', 'error');
        }
    };

    const handleDeleteBlock = async (id: number) => {
        if (!confirm('¿Seguro que deseas eliminar esta fila?')) return;
        try {
            await scheduleCreationService.deleteBlock(id);
             // Refresh
             const updatedBlocks = await scheduleCreationService.getTimeBlocks();
             setBlocks(updatedBlocks);
            showToast('Bloque eliminado', 'info');
        } catch (e) {
            showToast('No se puede eliminar (en uso)', 'error');
        }
    };

    const toggleBreak = async (block: any) => {
        try {
            const newState = !block.isBreak;
            await scheduleCreationService.updateBlock(block.id, { isBreak: newState });
            setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, isBreak: newState } : b));
            showToast(newState ? 'Marcado como Receso' : 'Habilitado', 'info');
        } catch (e) {
            showToast('Error cambiando estado', 'error');
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shrink-0 shadow-sm z-20">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </button>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-gray-800">Diseñador de Horarios</h1>
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded border border-yellow-200 uppercase tracking-wide">Modo Borrador</span>
                            </div>
                            <p className="text-xs text-gray-500">
                                {draftItems.length} cambios pendientes • Gestión 1-2026
                            </p>
                        </div>
                    </div>
                   <div className="flex items-center gap-3">
                        <select 
                            value={selectedSemester} 
                            onChange={e => setSelectedSemester(Number(e.target.value))}
                            className="bg-gray-100 border-none rounded-lg text-sm font-bold text-gray-700 px-3 py-2 outline-none"
                        >
                            {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}º Semestre</option>)}
                        </select>
                        
                        <button 
                            onClick={handleGlobalSave}
                            disabled={isSaving || draftItems.length === 0}
                            className={`px-4 py-2 rounded-lg font-bold text-white shadow-lg transition-all flex items-center gap-2
                                ${draftItems.length > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105' : 'bg-gray-300 cursor-not-allowed'}
                            `}
                        >
                             {isSaving ? <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>}
                             Guardar Todo ({draftItems.length})
                        </button>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0 z-10 shadow-lg">
                         <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Materias Disponibles</h3>
                            <div className="relative">
                                <input type="text" placeholder="Buscar materia..." className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-8 pr-3 text-sm outline-none focus:border-upds-main/50" />
                                <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {subjects.map(subject => (
                                <SidebarItem key={subject.id} subject={subject} />
                            ))}
                        </div>
                    </aside>

                    <main className="flex-1 overflow-auto bg-gray-50 relative custom-scrollbar">
                        <div className="min-w-[800px] p-6">
                            <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                                {/* Header Row */}
                                <div className="bg-gray-100 p-3 border-b border-r border-gray-200"></div>
                                {['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES'].map(day => (
                                    <div key={day} className="bg-gray-50 p-3 border-b border-r border-gray-200 text-center">
                                        <span className="text-xs font-extrabold text-gray-500 tracking-wider text-upds-main">{day}</span>
                                    </div>
                                ))}

                                {/* Time Rows (Editable) */}
                                {blocks.map((block) => (
                                    <div key={`row-${block.id}`} className="contents">
                                        {/* Time Label */}
                                        <div className={`p-2 border-b border-r border-gray-200 flex flex-col justify-center items-center group relative h-16 ${block.isBreak ? 'bg-gray-100' : 'bg-white'}`}>
                                            <div className="flex items-center gap-1">
                                                <input 
                                                    type="text" 
                                                    defaultValue={block.startTime}
                                                    onBlur={(e) => handleTimeChange(block.id, 'startTime', e.target.value)}
                                                    className="w-12 text-center text-xs font-bold text-gray-600 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-upds-main outline-none"
                                                />
                                                <span className="text-gray-300 transform rotate-90 mx-[-2px]">|</span>
                                                <input 
                                                    type="text" 
                                                    defaultValue={block.endTime}
                                                    onBlur={(e) => handleTimeChange(block.id, 'endTime', e.target.value)}
                                                    className="w-12 text-center text-xs font-bold text-gray-600 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-upds-main outline-none"
                                                />
                                            </div>
                                            
                                            <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                 <button 
                                                    onClick={() => toggleBreak(block)}
                                                    className={`text-[10px] px-2 py-0.5 rounded cursor-pointer transition-colors ${block.isBreak ? 'bg-gray-200 text-gray-500' : 'bg-green-100 text-green-700'}`}
                                                    title={block.isBreak ? 'Habilitar' : 'Marcar Receso'}
                                                >
                                                    {block.isBreak ? 'R' : 'C'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBlock(block.id)}
                                                    className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded hover:bg-red-200"
                                                    title="Eliminar Fila"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Days Cells */}
                                        {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].map(day => {
                                            const key = `${day}-${block.id}`;
                                            const item = scheduleMap[key];
                                            const isCovered = coveredCells.has(key);

                                            if (isCovered) return null; // Don't render covered cells (span takes over)

                                            const rowSpan = item ? item.timeBlockIds.length : 1;

                                            return (
                                                <GridCell 
                                                    key={key} 
                                                    day={day} 
                                                    blockId={block.id} 
                                                    isBreak={block.isBreak}
                                                    rowSpan={rowSpan}
                                                >
                                                    {item ? (
                                                        <div className="w-full h-full p-1 relative group z-10">
                                                            <div className={`w-full h-full border rounded p-1 text-[10px] overflow-hidden leading-tight cursor-pointer transition-colors shadow-sm outline outline-1 outline-white
                                                                ${!item.teacherId || !item.classroomId ? 'bg-yellow-50 border-yellow-300 text-yellow-800 hover:bg-yellow-100' : 'bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200'}
                                                            `}
                                                                 onClick={() => {
                                                                     // Edit
                                                                     const subjectObj = subjects.find(s => s.id === item.subjectId);
                                                                     setModalData({
                                                                         draftId: item.id,
                                                                         subject: subjectObj, 
                                                                         day: item.dayOfWeek,
                                                                         startBlockId: item.timeBlockIds[0],
                                                                         semester: selectedSemester,
                                                                     });
                                                                     setIsModalOpen(true);
                                                                 }}
                                                            >
                                                                <div className="font-bold truncate">{item.subjectName}</div>
                                                                <div className="truncate opacity-80">{item.classroomName || 'Sin Aula'}</div>
                                                                <div className="truncate opacity-75">{item.teacherName || 'Sin Docente'}</div>
                                                                {!item.teacherId && <div className="text-[9px] font-bold text-red-500 mt-0.5 animate-pulse">! Incompleto</div>}
                                                            </div>
                                                            
                                                            {/* Delete Btn */}
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleRemoveDraft(item.id);
                                                                }}
                                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-20"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                            </button>

                                                            {/* RESIZE HANDLE */}
                                                            <div 
                                                                className="absolute bottom-0 left-0 right-0 h-3 cursor-s-resize flex justify-center items-end group/resize z-20 hover:bg-black/5 rounded-b"
                                                                onMouseDown={(e) => handleResizeStart(e, item)}
                                                            >
                                                                <div className="w-8 h-1 bg-gray-300 rounded-full mb-1 group-hover/resize:bg-gray-500 transition-colors"></div>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </GridCell>
                                            );
                                        })}
                                    </div>
                                ))}

                                {/* Add Block Row */}
                                <div className="contents">
                                    <div className="p-2 border-r border-gray-200 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                                         onClick={handleAddBlock}
                                    >
                                        <div className="flex flex-col items-center text-gray-400 hover:text-green-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                            <span className="text-[10px] font-bold">AGREGAR</span>
                                        </div>
                                    </div>
                                    <div className="col-span-5 bg-gray-50 border-b border-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <DragOverlay>
                 <div className="p-3 bg-white rounded-lg shadow-xl border border-upds-main w-64 opacity-90 cursor-grabbing transform scale-105">
                     <h4 className="font-bold text-gray-800 text-sm">Asignando Materia...</h4>
                </div>
            </DragOverlay>

            {isModalOpen && modalData && (
                <ScheduleConfigModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleUpdateDraft}
                    initialData={modalData}
                    blocks={blocks}
                />
            )}
        </DndContext>
    );
}

const stripedStyle = `
    .striped-bg {
        background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            #f3f4f6 10px,
            #f3f4f6 20px
        );
    }
`;
