"use client";

import { useEffect, useState } from 'react';
import { subjectService, Subject } from '@/features/subjects/services/subject.service';
import { teacherService, Teacher } from '@/features/teachers/services/teacher.service';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

export default function SubjectsPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    // Categories Definition
    const CATEGORIES = [
        { name: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
        { name: 'BÁSICA - FUNCIONAL', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
        { name: 'MEDICINA I', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
        { name: 'MEDICINA II', color: 'bg-orange-100 text-orange-800 border-orange-200' },
        { name: 'MEDICINA III', color: 'bg-rose-100 text-rose-800 border-rose-200' },
        { name: 'CIRUGÍA I', color: 'bg-pink-100 text-pink-800 border-pink-200' },
        { name: 'CIRUGÍA II', color: 'bg-purple-100 text-purple-800 border-purple-200' },
        { name: 'CIRUGÍA III', color: 'bg-lime-100 text-lime-800 border-lime-200' },
        { name: 'ÉTICA', color: 'bg-amber-50 text-amber-800 border-amber-200' },
        { name: 'PSICOLOGÍA', color: 'bg-pink-50 text-pink-600 border-pink-100' },
        { name: 'SALUD PÚBLICA', color: 'bg-violet-100 text-violet-800 border-violet-200' },
    ];

    // Form State
    const [formData, setFormData] = useState<{
        name: string;
        code: string;
        credits: number;
        semester: number;
        careerId: number;
        defaultTeacherId: string;
        category: string;
        color: string;
    }>({
        name: '',
        code: '',
        credits: 80,
        semester: 1,
        careerId: 1, 
        defaultTeacherId: '',
        category: '',
        color: ''
    });

    // Custom Selectors State
    const [teacherSearch, setTeacherSearch] = useState('');
    const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const handleEdit = (subject: Subject) => {

        // Fix potential undefined defaultTeacherId if the backend structure is nested differently or ID is not direct
        // Ideally the subject object has defaultTeacherId or we extract it from relation. 
        // Based on previous service, `defaultTeacherId` field exists in Prisma model but frontend type might need adjustment.
        // Let's assume subject has defaultTeacherId (raw) or we use the relation. 
        // Actually, my previous service types defined `defaultTeacher` object but not the raw ID. I should fix that if I want to prefill.
        // Quick fix: The backend `findAll` returns `defaultTeacher` relation. It doesn't explicitly return `defaultTeacherId` unless selected.
        // However, Prisma includes foreign keys by default if not excluded? Javascript objects usually have it.
        // Let's safe check. If not, I might need to adjust the service or use the relation to find the ID.
        // Wait, the edit form uses `defaultTeacherId` state.
        
        // Let's look at the subject type in state.
        // Since I can't see the exact runtime value, I will try to use `subject.defaultTeacherId` (which might be in the response even if not typed in interface) 
        // OR search the teacher list for a matching name? No, that's brittle.
        // I'll assume the backend sends `defaultTeacherId`. 
        
        // Actually, looking at my previous Backend Service `findAll`: It includes `defaultTeacher`. 
        // Prisma `findMany` returns the scalar fields (like `defaultTeacherId`) by default unless `select` is used.
        // I used `include`. So `defaultTeacherId` SHOULD be there. I just need to cast it or add it to interface.

        const rawSubject = subject as any;
        setFormData({
            name: subject.name,
            code: subject.code,
            credits: subject.credits,
            semester: subject.semester,
            careerId: subject.careerId,
            defaultTeacherId: rawSubject.defaultTeacherId || '',
            category: subject.category || '',
            color: subject.color || ''
        });

        setEditingId(subject.id);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await subjectService.update(editingId, formData);
                showToast('Materia actualizada exitosamente', 'success');
            } else {
                await subjectService.create(formData);
                showToast('Materia creada exitosamente', 'success');
            }
            setIsModalOpen(false);
            resetForm();
            loadData();
        } catch (error: any) {
            showToast(error.response?.data?.error || 'Error al guardar materia', 'error');
        }
    };

    const loadData = async () => {
        setLoading(true);
        // Failsafe: Si en 5s no carga, quitar loading
        const safetyTimer = setTimeout(() => {
            setLoading((current) => {
                if (current) {
                    console.error("Force stop loading due to timeout");
                    return false;
                }
                return false;
            });
        }, 5000);

        try {
            console.log("Fetching data...");
            const [subjectsData, teachersData] = await Promise.all([
                subjectService.getAll(),
                teacherService.getAll()
            ]);
            console.log("Data received:", { subjects: subjectsData.length, teachers: teachersData.length });
            
            // Ensure inputs are arrays
            setSubjects(Array.isArray(subjectsData) ? subjectsData : []);
            setTeachers(Array.isArray(teachersData) ? teachersData : []);
            clearTimeout(safetyTimer);
        } catch (error: any) {
            console.error("Load Error:", error);
            showToast('Error al cargar datos: ' + (error.message || 'Desconocido'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', code: '', credits: 80, semester: 1, careerId: 1, defaultTeacherId: '', category: '', color: '' });
        setTeacherSearch('');
        setEditingId(null);
    };

    const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');

    // ... useEffect ...

    // ... handlers ...

    const filteredSubjects = subjects.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            s.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSemester = selectedSemester === 'all' || s.semester === selectedSemester;
        
        return matchesSearch && matchesSemester;
    });

    const filteredTeachers = teachers.filter(t => 
        t.user.fullName.toLowerCase().includes(teacherSearch.toLowerCase()) || 
        t.specialty?.toLowerCase().includes(teacherSearch.toLowerCase())
    );

    // Grouping Logic
    const groupedSubjects = filteredSubjects.reduce((acc, subject) => {
        const sem = subject.semester;
        if (!acc[sem]) acc[sem] = [];
        acc[sem].push(subject);
        return acc;
    }, {} as Record<number, Subject[]>);

    const sortedSemesters = Object.keys(groupedSubjects).map(Number).sort((a, b) => a - b);

    // Helper text for semester
    const getSemesterName = (num: number) => {
        const names = ['Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto', 'Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo'];
        return names[num - 1] ? `${names[num - 1]} Semestre` : `Semestre ${num}`;
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
                            <span 
                                onClick={() => router.push('/dashboard')} 
                                className="cursor-pointer hover:text-upds-main hover:underline transition-all flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                Dashboard
                            </span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            <span className="text-upds-main font-bold bg-blue-50 px-2 py-0.5 rounded-md">Materias</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-upds-main to-blue-700 tracking-tight mb-2">
                            Catálogo Académico
                        </h1>
                        <p className="text-gray-500 text-lg">Administra el plan de estudios, carga horaria y la asignación docente de manera integral.</p>
                    </div>
                    <button 
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="group bg-upds-main text-white px-6 py-3 rounded-xl hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-3 font-semibold"
                    >
                        <div className="bg-white/20 p-1 rounded-lg group-hover:bg-white/30 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </div>
                        Nueva Materia
                    </button>
                </div>



                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Search Bar */}
                    <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 max-w-xl flex-1 flex items-center gap-2 focus-within:ring-2 focus-within:ring-upds-main/20 focus-within:border-upds-main transition-all">
                        <div className="pl-4 text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full py-3 pr-4 border-none bg-transparent placeholder-gray-400 focus:ring-0 text-gray-700"
                            placeholder="Buscar por nombre (ej: Cálculo) o sigla (ej: MAT-101)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Semester Visual Filter */}
                    <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto hide-scrollbar max-w-full md:max-w-2xl">
                         <button 
                            onClick={() => setSelectedSemester('all')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedSemester === 'all' ? 'bg-gray-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Todos
                        </button>
                        <div className="w-px bg-gray-200 mx-2 my-2"></div>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(sem => (
                            <button 
                                key={sem}
                                onClick={() => setSelectedSemester(sem)}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-bold transition-all shrink-0 ${selectedSemester === sem ? 'bg-upds-main text-white shadow-md scale-105' : 'text-gray-500 hover:bg-gray-50 hover:text-upds-main'}`}
                            >
                                {sem}º
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[1,2,3].map(i => <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>)}
                   </div>
                ) : filteredSubjects.length > 0 ? (
                    <div className="space-y-12">
                        {sortedSemesters.map(semester => (
                            <div key={semester} className="relative">
                                <div className="flex items-center gap-4 mb-6 sticky top-0 bg-gray-50/95 backdrop-blur-sm p-2 z-10 border-b border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {getSemesterName(semester)}
                                    </h2>
                                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-xs font-bold">
                                        {groupedSubjects[semester].length} Materias
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {groupedSubjects[semester].map((subject) => (
                                        <div key={subject.id} className={`group rounded-2xl shadow-sm border p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden ${subject.color || 'bg-white border-gray-100 hover:border-blue-100'}`}>
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/40 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                                            
                                            {/* Edit Button */}
                                            <button 
                                                onClick={() => handleEdit(subject)}
                                                className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm shadow-sm border border-black/5 p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                                                title="Editar Materia"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>

                                            <div className="flex justify-between items-start mb-4 relative pr-10">
                                                <span className="bg-white/60 text-gray-700 font-mono text-sm px-3 py-1.5 rounded-lg border border-black/5 font-bold tracking-wide backdrop-blur-sm">
                                                    {subject.code}
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:opacity-80 transition-opacity line-clamp-2 min-h-[3.5rem] mix-blend-multiply">
                                                {subject.name}
                                            </h3>

                                            {/* Category Badge */}
                                            {subject.category && (
                                                <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md w-fit mb-3 border ${subject.color ? 'bg-white/80 border-transparent shadow-sm text-gray-800' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                    {subject.category}
                                                </div>
                                            )}
                                            
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-medium">
                                                <div className="flex items-center gap-1.5" title="Carga Horaria">
                                                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span className="text-gray-700/80">{subject.credits} Horas</span>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-black/5 relative">
                                                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500/70 mb-2">Docente Titular</p>
                                                {subject.defaultTeacher ? (
                                                    <div className="flex items-center gap-3 bg-white/60 p-2 rounded-xl backdrop-blur-sm border border-black/5 transition-colors">
                                                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-upds-main to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                                            {subject.defaultTeacher.user.fullName.charAt(0)}
                                                        </div>
                                                        <div className="truncate">
                                                            <p className="text-sm font-bold text-gray-800 truncate">{subject.defaultTeacher.user.fullName}</p>
                                                            <p className="text-xs text-blue-600 truncate font-medium">Docente Asignado</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-gray-400 py-1 italic">
                                                        <div className="h-8 w-8 rounded-full bg-black/5 border-2 border-dashed border-black/10 flex items-center justify-center">?</div>
                                                        <span className="text-sm font-medium text-gray-500/60">Sin asignar</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="mx-auto h-16 w-16 text-gray-300 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No se encontraron materias</h3>
                        <p className="mt-1 text-sm text-gray-500">Prueba ajustando tu búsqueda o crea una nueva materia.</p>
                    </div>
                )}

                {/* MODAL REDISEÑADO */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
                        <div className="flex min-h-screen items-center justify-center p-4">
                            <div className="relative w-full max-w-2xl transform overflow-visible rounded-2xl bg-white text-left shadow-2xl transition-all">
                                
                                <div className="bg-gradient-to-r from-upds-main to-blue-800 px-8 py-5 rounded-t-2xl flex justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{editingId ? 'Editar Materia' : 'Nueva Materia'}</h3>
                                        <p className="text-blue-200 text-sm">{editingId ? 'Modifica la información existente' : 'Ingresa los detalles académicos'}</p>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                                    {/* ...form fields same as before... */}
                                    {/* SECCIÓN 1: DATOS BÁSICOS */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="col-span-1">
                                             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sigla / Código</label>
                                             <input 
                                                type="text" required 
                                                placeholder="Ej: SIS-101" 
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 border px-4 py-3 outline-none focus:ring-2 focus:ring-upds-main/30 focus:border-upds-main font-mono tracking-wide uppercase transition-all" 
                                                value={formData.code} 
                                                onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} 
                                             />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre de la Materia</label>
                                            <input 
                                                type="text" required 
                                                placeholder="Ej: Introducción a la Programación" 
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 border px-4 py-3 outline-none focus:ring-2 focus:ring-upds-main/30 focus:border-upds-main transition-all font-medium text-gray-800" 
                                                value={formData.name} 
                                                onChange={e => setFormData({...formData, name: e.target.value})} 
                                            />
                                        </div>
                                    </div>

                                    {/* SECCIÓN 2: SEMESTRE Y CATEGORÍA */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Semestre Académico</label>
                                            <div className="flex flex-wrap gap-2">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(sem => (
                                                    <button
                                                        key={sem}
                                                        type="button"
                                                        onClick={() => setFormData({...formData, semester: sem})}
                                                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all border-2 ${
                                                            formData.semester === sem 
                                                            ? 'border-upds-main bg-upds-main text-white shadow-md' 
                                                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {sem}
                                                    </button>
                                                ))}
                                                <div className="flex items-center gap-2 bg-gray-50 px-2 rounded-lg border border-gray-100 ml-1">
                                                    <span className="text-[10px] font-bold text-gray-500">HRS:</span>
                                                    <input 
                                                        type="number" min="1" max="200" 
                                                        className="w-10 bg-transparent text-center font-bold text-gray-800 outline-none border-b border-transparent focus:border-upds-main py-1 text-sm"
                                                        value={formData.credits}
                                                        onChange={e => setFormData({...formData, credits: parseInt(e.target.value)})}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                                 Categoría
                                                 {formData.category && <span className="ml-2 bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[9px] font-normal cursor-pointer hover:bg-red-100 hover:text-red-600" onClick={() => setFormData({...formData, category: '', color: ''})}>Borrar</span>}
                                            </label>
                                            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto px-1 py-1 custom-scrollbar">
                                                {CATEGORIES.map(cat => (
                                                    <button
                                                        key={cat.name}
                                                        type="button"
                                                        onClick={() => setFormData({...formData, category: cat.name, color: cat.color})}
                                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all ${
                                                            formData.category === cat.name 
                                                            ? `${cat.color} ring-2 ring-offset-1 ring-blue-400 shadow-sm scale-105` 
                                                            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        {cat.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* SECCIÓN 3: SELECTOR DE DOCENTE */}
                                    <div className="relative">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Asignar Docente Titular</label>
                                        
                                        <div className="relative">
                                            <button 
                                                type="button"
                                                onClick={() => setIsTeacherDropdownOpen(!isTeacherDropdownOpen)}
                                                className={`w-full text-left rounded-xl border bg-white px-4 py-3 outline-none transition-all flex items-center justify-between ${isTeacherDropdownOpen ? 'ring-2 ring-upds-main/30 border-upds-main' : 'border-gray-200 hover:border-gray-300'}`}
                                            >
                                                {formData.defaultTeacherId ? (
                                                    <div className="flex items-center gap-3">
                                                         {(() => {
                                                            const t = teachers.find(t => t.id === formData.defaultTeacherId);
                                                            return t ? (
                                                                <>
                                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">{t.user.fullName.charAt(0)}</div>
                                                                    <div>
                                                                        <div className="font-bold text-gray-800 text-sm">{t.user.fullName}</div>
                                                                        <div className="text-xs text-gray-500">{t.specialty}</div>
                                                                    </div>
                                                                </>
                                                            ) : <span>Seleccionar...</span>
                                                         })()}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">Buscar y seleccionar docente...</span>
                                                )}
                                                <svg className={`w-5 h-5 text-gray-400 transition-transform ${isTeacherDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </button>

                                            {/* DROPDOWN */}
                                            {isTeacherDropdownOpen && (
                                                <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-64 flex flex-col animate-in fade-in slide-in-from-top-2">
                                                    <div className="p-2 bg-gray-50 border-b border-gray-100 sticky top-0">
                                                        <input 
                                                            type="text" autoFocus
                                                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-upds-main"
                                                            placeholder="Filtrar por nombre o especialidad..."
                                                            value={teacherSearch}
                                                            onChange={e => setTeacherSearch(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="overflow-y-auto p-1">
                                                        <div 
                                                            className="p-2 cursor-pointer hover:bg-gray-50 rounded-lg text-gray-500 text-sm italic"
                                                            onClick={() => { setFormData({...formData, defaultTeacherId: ''}); setIsTeacherDropdownOpen(false); }}
                                                        >
                                                            -- Sin Asignar --
                                                        </div>
                                                        {filteredTeachers.map(t => (
                                                            <div 
                                                                key={t.id}
                                                                onClick={() => { setFormData({...formData, defaultTeacherId: t.id}); setIsTeacherDropdownOpen(false); }}
                                                                className={`p-2 cursor-pointer hover:bg-blue-50 rounded-lg flex items-center gap-3 transition-colors ${formData.defaultTeacherId === t.id ? 'bg-blue-50/80 border border-blue-100' : ''}`}
                                                            >
                                                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs shrink-0">{t.user.fullName.charAt(0)}</div>
                                                                <div>
                                                                    <div className="font-bold text-gray-800 text-sm">{t.user.fullName}</div>
                                                                    <div className="text-xs text-gray-500">{t.specialty}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {filteredTeachers.length === 0 && (
                                                            <div className="p-4 text-center text-gray-400 text-sm">No se encontraron docentes</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* FOOTER */}
                                    <div className="flex gap-4 pt-6 mt-4 border-t border-gray-50">
                                        <button 
                                            type="button" 
                                            onClick={() => setIsModalOpen(false)} 
                                            className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="flex-[2] px-4 py-3 bg-upds-main text-white font-bold rounded-xl hover:bg-blue-900 shadow-lg hover:shadow-xl transition-all"
                                        >
                                            {editingId ? 'Actualizar' : 'Guardar Materia'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

