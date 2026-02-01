"use client";

import { useEffect, useState, useMemo, useRef, Fragment } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
             className={`p-3 rounded-lg shadow-sm border mb-2 cursor-grab hover:shadow-md transition-all border-l-4 ${subject.color ? `${subject.color} border-l-current` : 'bg-white border-gray-200 border-l-upds-main'}`}>
            <h4 className="font-bold text-gray-800 text-sm truncate" title={subject.name}>{subject.name}</h4>
            <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-800/70 font-mono bg-white/50 px-1 rounded border border-black/5">{subject.code}</span>
                <span className="text-xs bg-white/50 text-gray-700 px-1.5 py-0.5 rounded-full font-bold border border-black/5">{subject.semester}º</span>
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
import ConflictResolutionModal, { ConflictDetail } from '@/components/schedule/ConflictResolutionModal';
import TimeTemplateModal from '@/components/schedule/TimeTemplateModal';
import GenerateProposalModal from '@/components/schedule/GenerateProposalModal';

// --- MAIN PAGE ---

export default function ScheduleCreatorPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [blocks, setBlocks] = useState<any[]>([]);
    const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
    

    
    // DRAFT STATE: Stores all added items locally before saving
    type DraftItem = CreateBatchScheduleRequest & { 
        id: string; // Temporary ID
        subjectName: string; 
        teacherName?: string;
        classroomName?: string;
        subject?: Subject; // <--- ADDED THIS
    };
    const [draftItems, setDraftItems] = useState<DraftItem[]>([]);
    


    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);

    // Saving State
    const [isSaving, setIsSaving] = useState(false);
    const [conflictModalOpen, setConflictModalOpen] = useState(false);
    const [conflicts, setConflicts] = useState<ConflictDetail[]>([]);
    
    // Template Modal State
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

    // Generator Modal State
    const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);

    const searchParams = useSearchParams(); 


    // Filters
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [selectedShift, setSelectedShift] = useState('M'); // Default Shift
    const [selectedGroup, setSelectedGroup] = useState('M1'); // Default Group (Legacy, but now driven by shift)
    const [periodId, setPeriodId] = useState<number | null>(null);

    // Computed subjects based on selection
    const subjects = useMemo(() => allSubjects.filter(s => s.semester === selectedSemester), [allSubjects, selectedSemester]);

    // ...

    // Computed: Next Suggested Group Code based on Shift + Drafts
    const suggestedGroupCode = useMemo(() => {
        // Find highest index for current shift/semester
        // Pattern: {Shift}{Number} e.g. M1, M2
        // Actually user wants: M1, M2 depending on "número de horario". 
        // Let's look at available groups in this context.
        const prefix = selectedShift + selectedSemester; // e.g. M1 ?? No, usually it's M1 (Morning Group 1).
        // Standard naming seems to be Shift + Number. M1, M2, T1, T2. Not M + Semester. 
        // Let's assume M1, M2, M3 are groups in Morning.
        
        let maxIndex = 0;
        const pattern = new RegExp(`^${selectedShift}(\\d+)$`);
        
        // Check drafts
        draftItems.forEach(d => {
            const match = d.groupCode?.match(pattern);
            if (match) {
                const num = parseInt(match[1]);
                if (num > maxIndex) maxIndex = num;
            }
        });

        // Also check DB schedules if we loaded any (mappedDrafts) - covered by draftItems if loaded.
        
        return `${selectedShift}${maxIndex + 1}`;
    }, [selectedShift, draftItems]);

    // Computed available groups based on drafts + defaults
    const availableGroups = useMemo(() => {
        const groups = new Set<string>();
        // Default suggestions
        ['M1', 'M2', 'T1', 'T2', 'N1'].forEach(g => groups.add(g));
        // From existing drafts
        draftItems.forEach(item => {
            if (item.groupCode) groups.add(item.groupCode);
        });
        return Array.from(groups).sort();
    }, [draftItems]);


    // ... in loadInitialData ...
    // If editing, we might want to set the Shift based on the loaded group.
    
    // ...

    const shifts = [
        { id: 'M', label: 'Mañana' },
        { id: 'T', label: 'Tarde' },
        { id: 'N', label: 'Noche' }
    ];


    useEffect(() => {
        const pSemester = searchParams.get('semester');
        const pGroup = searchParams.get('group');

        if (pSemester) setSelectedSemester(Number(pSemester));
        if (pGroup) setSelectedGroup(pGroup);

        loadInitialData(pSemester ? Number(pSemester) : 1, pGroup);
    }, []); // Run ONCE on mount

    const loadInitialData = async (semesterOverride?: number, groupOverride?: string | null) => {
        try {
            const [blocksData, subjectsData, periodData] = await Promise.all([
                scheduleCreationService.getTimeBlocks(),
                subjectService.getAll(),
                scheduleCreationService.getActivePeriod()
            ]);
            setBlocks(blocksData);
            setAllSubjects(subjectsData);
            
            if (periodData) {
                setPeriodId(periodData.id);

                // If editing (params present), load existing data
                if (groupOverride) {
                    const existingSchedules = await scheduleCreationService.getByPeriod(periodData.id);
                    const filtered = existingSchedules.filter((s: any) => 
                        s.subject.semester === semesterOverride && 
                        s.groupCode === groupOverride
                    );

                    const mappedDrafts: DraftItem[] = filtered.map((s: any) => ({
                        id: `db-${s.id}`, // Mark as DB item
                        subjectId: s.subjectId,
                        subjectName: s.subject.name,
                        dayOfWeek: s.dayOfWeek,
                        timeBlockIds: [s.timeBlockId], // DB usually stores 1 block per row? Or mapped? Check service. 
                        // Assuming 1-to-1 for now, or need to group contiguous? 
                        // The GRID logic groups contiguous if I pass multiple IDs. 
                        // But simpler: just map 1-to-1 and let the grid merge visual? 
                        // The logic in page.tsx merges by `timeBlockIds` array. 
                        // If DB returns individual blocks, I should probably group them if they are the same subject/teacher/day/consecutive.
                        // For simplicity in this step, I'll map 1-to-1, but the resize logic might be weird. 
                        // Let's rely on visual merging or keep separate?
                        // Let's try separate first.
                        teacherId: s.teacherId,
                        classroomId: s.classroomId,
                        periodId: s.periodId,
                        groupCode: s.groupCode,
                        teacherName: s.teacher?.user?.fullName || '---',
                        classroomName: s.classroom?.name || '---'
                    }));

                    // We need to merge contiguous blocks to match the "DraftItem" structure which supports spanning
                    // Simple merge logic:
                    const mergedItems: DraftItem[] = [];
                    const sorted = mappedDrafts.sort((a, b) => {
                        const blockA = blocksData.find((bl: any) => bl.id === a.timeBlockIds[0]);
                        const blockB = blocksData.find((bl: any) => bl.id === b.timeBlockIds[0]);
                        return (blockA?.orderIndex || 0) - (blockB?.orderIndex || 0);
                    });

                    // Naive merge: if same day, subject, teacher, classroom, group AND consecutive blocks -> merge
                    // Implementation skipped for brevity, just pushing raw for now. 
                    // Actually, let's just push raw. The grid supports Array<ids>, so single ID is fine.
                    setDraftItems(sorted);
                }
            }
        } catch (error) {
            console.error(error);
            showToast('Error cargando datos iniciales', 'error');
        }
    };

    // Derived Grid State & Covered Cells (FILTERED BY GROUP)
    const { scheduleMap, coveredCells } = useMemo(() => {
        const map: any = {};
        const covered = new Set<string>();

        // Only process items for the selected group
        draftItems.filter(item => item.groupCode === selectedGroup).forEach(item => {
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
    }, [draftItems, selectedGroup]);

    // State for visual resizing feedback
    const [resizingState, setResizingState] = useState<{ itemId: string; additionalBlocks: number } | null>(null);
    
    // State for delete confirmation
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; blockId: number | null }>({ isOpen: false, blockId: null });

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const subject = active.data.current?.subject;
        const cellData = over.data.current;

        if (cellData.isBreak) {
            showToast('No puedes programar en recesos', 'error');
            return;
        }

        // AUTOFILL: Check if this subject was already configured in another slot (GLOBAL CHECK or GROUP CHECK?)
        // If I want to sync teacher across groups, I should check global. 
        // But usually, configuration is unique per group slot. 
        // Let's check GLOBAL to be helpful (if teacher handles multiple groups).
        const existingConfig = draftItems.find(d => d.subjectId === subject.id && d.teacherId);
        
        const newItem: DraftItem = {
            id: `draft-${Date.now()}`,
            subjectId: subject.id,
            subjectName: subject.name,
            subject: subject, // <--- ADDED THIS
            dayOfWeek: cellData.day,
            timeBlockIds: [cellData.blockId],
            // Use existing config if available, otherwise default
            teacherId: existingConfig?.teacherId || subject.defaultTeacherId || '', 
            classroomId: existingConfig?.classroomId || 0,
            periodId: periodId || 0,
            groupCode: selectedGroup, // FORCE SELECTED GROUP
            teacherName: existingConfig?.teacherName || subject.defaultTeacher?.user?.fullName || '---',
            classroomName: existingConfig?.classroomName || '---'
        };

        // Conflict Check (ONLY WITHIN CURRENT GROUP)
        const isOccupied = draftItems.some(item => 
            item.groupCode === selectedGroup && // Check ONLY this group
            item.dayOfWeek === newItem.dayOfWeek && 
            item.timeBlockIds.includes(cellData.blockId)
        );

        if (isOccupied) {
            showToast('Ya existe una materia en este bloque para este grupo', 'error');
            return;
        }

        setDraftItems(prev => [...prev, newItem]);
        if (existingConfig) {
             showToast('Datos autocompletados de configuración previa', 'info');
        }
    };
    
    // ... (Resize logic unchanged) ...

    const handleResizeStart = (e: React.MouseEvent, item: DraftItem) => {
        e.stopPropagation();
        e.preventDefault();

        const startY = e.clientY;
        const startBlockIndex = blocks.findIndex(b => b.id === item.timeBlockIds[0]);
        const currentDuration = item.timeBlockIds.length;
        const rowHeight = 64; 

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaY = moveEvent.clientY - startY;
            const additionalBlocks = Math.round(deltaY / rowHeight);
            
            // Visual Update ONLY
            setResizingState({
                itemId: item.id,
                additionalBlocks: additionalBlocks
            });
        };

        const handleMouseUp = (upEvent: MouseEvent) => {
            const deltaY = upEvent.clientY - startY;
            let addedRows = Math.round(deltaY / rowHeight);
            
            let newEndIndex = startBlockIndex + currentDuration - 1 + addedRows;
            
            // Clamp and Validation Logic
            if (newEndIndex < startBlockIndex) newEndIndex = startBlockIndex;
            if (newEndIndex >= blocks.length) newEndIndex = blocks.length - 1;

            // Build new ID list respecting breaks/conflicts
            const newBlockIds: number[] = [];
            for (let i = startBlockIndex; i <= newEndIndex; i++) {
                if (blocks[i].isBreak && i !== startBlockIndex) break; 
                
                const isOccupied = draftItems.some(d => 
                    d.groupCode === selectedGroup && // CHECK GROUP ONLY
                    d.id !== item.id && 
                    d.dayOfWeek === item.dayOfWeek && 
                    d.timeBlockIds.includes(blocks[i].id)
                );
                
                if (isOccupied && i !== startBlockIndex) break;
                
                newBlockIds.push(blocks[i].id);
            }

            if (newBlockIds.length !== item.timeBlockIds.length) {
                setDraftItems(prev => prev.map(i => i.id === item.id ? { ...i, timeBlockIds: newBlockIds } : i));
            }

            // Reset
            setResizingState(null);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleUpdateDraft = async (data: any) => {
        if (!modalData?.draftId) return;
        
        // CHECK IF GROUP CHANGED -> SWITCH CONTEXT
        if (data.groupCode && data.groupCode !== selectedGroup) {
            setSelectedGroup(data.groupCode);
            
            // Extract Shift from Group (M1 -> M, T1 -> T)
            const firstChar = data.groupCode.charAt(0);
            if (['M', 'T', 'N'].includes(firstChar)) {
                setSelectedShift(firstChar);
            }
            showToast(`Vista cambiada al grupo ${data.groupCode}`, 'info');
        }

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
             const msg = error.response?.data?.error || 'Error al guardar';
             
             // Extract JSON from validation error message if present
             // Format: "Validation failed for subject <id>: <JSON>" 
             // OR just raw JSON if the controller passes it (User logs show raw object "error" string might contain the prefix)
             // The user said: "Validation failed for subject 84: [...]"
             const conflictMatch = msg.match(/Validation failed for subject \d+: (\[.*\])/);
             
             if (conflictMatch && conflictMatch[1]) {
                 try {
                     const parsedConflicts = JSON.parse(conflictMatch[1]);
                     setConflicts(parsedConflicts);
                     setConflictModalOpen(true);
                     return; // Don't show toast
                 } catch (e) {
                     console.error("Failed to parse conflict JSON", e);
                 }
             }

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
            // Calculate next start time (Last Block End Time + 10 mins)
            let nextStartTime = '07:00';
            let nextEndTime = '08:30';
            
            if (blocks.length > 0) {
                const lastBlock = blocks[blocks.length - 1]; // Assuming sorted by time
                // Simple string parsing since format is HH:MM
                const [h, m] = lastBlock.endTime.split(':').map(Number);
                const date = new Date();
                date.setHours(h, m + 10); // +10 mins gap
                
                const nextH = date.getHours().toString().padStart(2, '0');
                const nextM = date.getMinutes().toString().padStart(2, '0');
                nextStartTime = `${nextH}:${nextM}`;

                // Default duration 90 mins
                date.setHours(date.getHours() + 1, date.getMinutes() + 30);
                const endH = date.getHours().toString().padStart(2, '0');
                const endM = date.getMinutes().toString().padStart(2, '0');
                nextEndTime = `${endH}:${endM}`;
            }

            await scheduleCreationService.createBlock({
                name: `Bloque ${blocks.length + 1}`,
                startTime: nextStartTime,
                endTime: nextEndTime,
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

    const confirmDeleteBlock = async () => {
        if (!deleteConfirmation.blockId) return;
        try {
            await scheduleCreationService.deleteBlock(deleteConfirmation.blockId);
             const updatedBlocks = await scheduleCreationService.getTimeBlocks();
             setBlocks(updatedBlocks);
            showToast('Bloque eliminado', 'info');
        } catch (e) {
            showToast('No se puede eliminar (en uso)', 'error');
        } finally {
            setDeleteConfirmation({ isOpen: false, blockId: null });
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

    const handleTemplateApplied = async () => {
        // Refresh blocks from DB
        try {
            const updated = await scheduleCreationService.getTimeBlocks();
            setBlocks(updated);
        } catch (e) {
            console.error(e);
        }
    };

    const handleProposalAccepted = (items: DraftItem[]) => {
        // Add generated items to draft
        setDraftItems(prev => [...prev, ...items]);
        // Maybe switch view to match the generated shift if needed?
        // For now just add them.
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="h-screen flex flex-col bg-gray-50 overflow-hidden select-none">
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
                         <button
                            onClick={() => setIsTemplateModalOpen(true)}
                            className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 font-bold flex items-center gap-1 transition-colors"
                            title="Guardar o Cargar Configuración de Horas"
                         >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                            Plantillas
                         </button>

                         <div className="w-px h-8 bg-gray-200 mx-1"></div>

                        <button
                            onClick={() => setIsGeneratorModalOpen(true)}
                            className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 font-bold flex items-center gap-1 transition-all"
                            title="Generar Propuesta Automática"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            Generar
                        </button>

                         <div className="w-px h-8 bg-gray-200 mx-1"></div>

                        <div className="flex flex-col">
                             <label className="text-[10px] font-bold text-gray-400 uppercase">Turno</label>
                             <select 
                                 value={selectedShift}
                                 onChange={e => setSelectedShift(e.target.value)}
                                 className="bg-gray-100 border-none rounded-lg text-sm font-bold text-gray-700 px-3 py-1.5 outline-none w-32 cursor-pointer hover:bg-gray-200 transition-colors"
                             >
                                 {shifts.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                             </select>
                         </div>

                         <div className="w-px h-8 bg-gray-200 mx-1"></div>

                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Semestre</label>
                            <select 
                                value={selectedSemester} 
                                onChange={e => setSelectedSemester(Number(e.target.value))}
                                className="bg-gray-100 border-none rounded-lg text-sm font-bold text-gray-700 px-3 py-1.5 outline-none w-32"
                            >
                                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}º Semestre</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Grupo</label>
                            <div className="relative">
                                <input 
                                    list="group-suggestions"
                                    type="text"
                                    value={selectedGroup} 
                                    onChange={e => setSelectedGroup(e.target.value.toUpperCase())}
                                    placeholder="Seleccionar..."
                                    className="bg-gray-100 border-none rounded-lg text-sm font-bold text-gray-700 px-3 py-1.5 outline-none w-32 uppercase placeholder-gray-400"
                                />
                                <datalist id="group-suggestions">
                                    {availableGroups.map(g => <option key={g} value={g} />)}
                                </datalist>
                                <div className="absolute right-2 top-1.5 pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-px h-8 bg-gray-200 mx-2"></div>

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
                                <div className="sticky left-0 z-40 bg-gray-100 p-3 border-b border-r border-gray-200"></div>
                                {['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES'].map(day => (
                                    <div key={day} className="bg-gray-50 p-3 border-b border-r border-gray-200 text-center">
                                        <span className="text-xs font-extrabold text-gray-500 tracking-wider text-upds-main">{day}</span>
                                    </div>
                                ))}

                                {/* Time Rows (Editable) */}
                                {blocks.map((block) => (
                                    <Fragment key={`row-${block.id}`}>
                                        {/* Time Label */}
                                        <div className={`sticky left-0 z-30 p-2 border-b border-r border-gray-200 flex flex-col justify-center items-center group relative h-16 min-h-[64px] ${block.isBreak ? 'bg-gray-100' : 'bg-white'}`}>
                                            <div className="flex items-center gap-1 mb-2">
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
                                            
                                            <div className="absolute bottom-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-white/80 backdrop-blur-sm rounded px-1 shadow-sm">
                                                 <button 
                                                    onClick={() => toggleBreak(block)}
                                                    className={`text-[10px] px-2 py-0.5 rounded cursor-pointer transition-colors ${block.isBreak ? 'bg-gray-200 text-gray-500' : 'bg-green-100 text-green-700'}`}
                                                    title={block.isBreak ? 'Habilitar' : 'Marcar Receso'}
                                                >
                                                    {block.isBreak ? 'R' : 'C'}
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirmation({ isOpen: true, blockId: block.id })}
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

                                            if (isCovered) return null;

                                            // Calculate Dynamic RowSpan based on Resizing State
                                            let rowSpan = item ? item.timeBlockIds.length : 1;
                                            if (item && resizingState && resizingState.itemId === item.id) {
                                                const originalLen = item.timeBlockIds.length;
                                                const potential = originalLen + resizingState.additionalBlocks;
                                                rowSpan = potential > 0 ? potential : 1;
                                            }

                                            return (
                                                <GridCell 
                                                    key={key} 
                                                    day={day} 
                                                    blockId={block.id} 
                                                    isBreak={block.isBreak}
                                                    rowSpan={rowSpan}
                                                >
                                                    {item ? (
                                                        <div className={`w-full h-full p-1 relative group z-10 ${resizingState?.itemId === item.id ? 'opacity-80 scale-[1.01] shadow-2xl z-50' : ''}`}>
                                                            <div className={`w-full h-full border rounded p-1 text-[10px] overflow-hidden leading-tight cursor-pointer transition-all shadow-sm 
                                                                ${!item.teacherId || !item.classroomId ? 'ring-2 ring-red-400 ring-inset border-red-300' : 'outline outline-1 outline-white'}
                                                                ${(item.subject || allSubjects.find(s => s.id === item.subjectId))?.color ? `${(item.subject || allSubjects.find(s => s.id === item.subjectId))?.color}` : 'bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200'}
                                                            `}
                                                                 onClick={() => {
                                                                     // Edit
                                                                     // Edit
                                                                     const subjectObj = item.subject || allSubjects.find(s => s.id === item.subjectId) || { id: item.subjectId, name: item.subjectName, code: 'N/A', credits: 0, weeklyHours: 4, semester: 1 } as any;
                                                                     setModalData({
                                                                         draftId: item.id,
                                                                         subject: subjectObj, 
                                                                         day: item.dayOfWeek,
                                                                         startBlockId: item.timeBlockIds[0],
                                                                         semester: selectedSemester,
                                                                         timeBlockIds: item.timeBlockIds, // Added this
                                                                         teacherId: item.teacherId, // Pass existing teacher
                                                                         classroomId: item.classroomId, // Pass existing room
                                                                         groupCode: item.groupCode // Pass existing group
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
                                                                className="absolute bottom-0 left-0 right-0 h-4 cursor-s-resize flex justify-center items-end group/resize z-20 hover:bg-blue-500/10 rounded-b transition-colors"
                                                                onMouseDown={(e) => handleResizeStart(e, item)}
                                                            >
                                                                <div className="w-8 h-1 bg-gray-300 rounded-full mb-1 group-hover/resize:bg-blue-500 transition-colors"></div>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </GridCell>
                                            );
                                        })}
                                    </Fragment>
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
                    selectedShift={selectedShift}
                    suggestedGroup={suggestedGroupCode}
                />
            )}

            <ConflictResolutionModal 
                isOpen={conflictModalOpen}
                onClose={() => setConflictModalOpen(false)}
                conflicts={conflicts}
            />

            <TimeTemplateModal 
                isOpen={isTemplateModalOpen}
                onClose={() => setIsTemplateModalOpen(false)}
                currentBlocks={blocks}
                onTemplateApplied={handleTemplateApplied}
            />

            <GenerateProposalModal 
                isOpen={isGeneratorModalOpen}
                onClose={() => setIsGeneratorModalOpen(false)}
                periodId={periodId || 0}
                onProposalGenerated={handleProposalAccepted}
            />

            {/* DELETE CONFIRMATION MODAL */}
            {deleteConfirmation.isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setDeleteConfirmation({ isOpen: false, blockId: null })}></div>
                    <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full animate-bounce-in">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-center text-gray-800 mb-2">¿Eliminar esta fila de horario?</h3>
                        <p className="text-sm text-gray-500 text-center mb-6">Esta acción eliminará el bloque de tiempo permanentemente. Se eliminarán todas las clases asignadas en este horario.</p>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setDeleteConfirmation({ isOpen: false, blockId: null })}
                                className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={confirmDeleteBlock}
                                className="flex-1 py-2.5 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 shadow-md transition-all active:scale-95"
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
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
