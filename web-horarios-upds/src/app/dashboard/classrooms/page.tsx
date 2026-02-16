"use client";

import { useEffect, useState } from 'react';
import { classroomService, Classroom } from '@/features/classrooms/services/classroom.service';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { ClassroomsTabs } from '@/components/dashboard/classrooms/ClassroomsTabs';

export default function ClassroomsPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [editingId, setEditingId] = useState<number | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        capacity: 30,
        type: 'THEORY_ROOM' as Classroom['type'],
        location: '',
        hasProjector: true,
        hasAC: true
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        // Failsafe
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
            const data = await classroomService.getAll();
            setClassrooms(Array.isArray(data) ? data : []);
            clearTimeout(safetyTimer);
        } catch (error: any) {
            console.error(error);
            showToast('Error al cargar aulas', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (classroom: Classroom) => {
        setFormData({
            name: classroom.name,
            capacity: classroom.capacity,
            type: classroom.type,
            location: classroom.location || '',
            hasProjector: classroom.hasProjector,
            hasAC: classroom.hasAC
        });
        setEditingId(classroom.id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('¿Estás seguro de eliminar este aula?')) {
            try {
                await classroomService.delete(id);
                showToast('Aula eliminada correctamente', 'success');
                loadData();
            } catch (error: any) {
                showToast('Error al eliminar aula', 'error');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await classroomService.update(editingId, formData);
                showToast('Aula actualizada exitosamente', 'success');
            } else {
                await classroomService.create(formData as any); // Type cast due to omit 'id'
                showToast('Aula creada exitosamente', 'success');
            }
            setIsModalOpen(false);
            resetForm();
            loadData();
        } catch (error: any) {
            showToast(error.response?.data?.error || 'Error al guardar aula', 'error');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            capacity: 30,
            type: 'THEORY_ROOM',
            location: '',
            hasProjector: true,
            hasAC: true
        });
        setEditingId(null);
    };

    const filteredClassrooms = classrooms.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (c.location?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
        const matchesType = selectedType === 'all' || c.type === selectedType;
        return matchesSearch && matchesType;
    });

    const getTypeLabel = (type: string) => {
        const types: Record<string, string> = {
            'THEORY_ROOM': 'Teoría',
            'LABORATORY': 'Laboratorio',
            'AUDITORIUM': 'Auditorio',
            'VIRTUAL': 'Virtual'
        };
        return types[type] || type;
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-7xl mx-auto">
                <ClassroomsTabs />
                
                {/* HEADERS */}
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
                            <span className="text-upds-main font-bold bg-blue-50 px-2 py-0.5 rounded-md">Aulas / Ambientes</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-upds-main to-blue-700 tracking-tight mb-2">
                            Gestión de Ambientes
                        </h1>
                        <p className="text-gray-500 text-lg">Administra laboratorios, aulas y auditorios para la asignación de horarios.</p>
                    </div>
                    <button 
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="group bg-upds-main text-white px-6 py-3 rounded-xl hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-3 font-semibold"
                    >
                        <div className="bg-white/20 p-1 rounded-lg group-hover:bg-white/30 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </div>
                        Nuevo Ambiente
                    </button>
                </div>

                {/* FILTERS */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                     <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 max-w-xl flex-1 flex items-center gap-2 focus-within:ring-2 focus-within:ring-upds-main/20 focus-within:border-upds-main transition-all">
                        <div className="pl-4 text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full py-3 pr-4 border-none bg-transparent placeholder-gray-400 focus:ring-0 text-gray-700"
                            placeholder="Buscar aula (ej: A-101, Laboratorio 3)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                
                    <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto hide-scrollbar">
                         <button 
                            onClick={() => setSelectedType('all')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedType === 'all' ? 'bg-gray-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Todos
                        </button>
                        <div className="w-px bg-gray-200 mx-2 my-2"></div>
                        {['THEORY_ROOM', 'LABORATORY', 'AUDITORIUM'].map(type => (
                            <button 
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedType === type ? 'bg-upds-main text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                {getTypeLabel(type)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* CONTENT */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                         {[1,2,3].map(i => <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>)}
                    </div>
                ) : filteredClassrooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredClassrooms.map((classroom) => (
                            <div key={classroom.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden">
                                 {/* Type Badge */}
                                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                                    classroom.type === 'LABORATORY' ? 'bg-purple-500' :
                                    classroom.type === 'AUDITORIUM' ? 'bg-orange-500' : 'bg-blue-500'
                                }`}></div>

                                <div className="flex justify-between items-start mb-4 pl-3">
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{getTypeLabel(classroom.type)}</span>
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-upds-main transition-colors">{classroom.name}</h3>
                                    </div>
                                    <div className="flex gap-1">
                                         <button 
                                            onClick={() => handleEdit(classroom)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        </button>
                                         <button 
                                            onClick={() => handleDelete(classroom.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="pl-3 space-y-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        <span className="text-sm font-medium">{classroom.location || 'Sin ubicación'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <span className="text-sm font-medium">Capacidad: {classroom.capacity} est.</span>
                                    </div>
                                </div>

                                <div className="mt-6 pl-3 flex gap-2">
                                    {classroom.hasProjector && (
                                        <span className="bx bx-slideshow p-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold" title="Proyector disponible">📽️ PROYECTOR</span>
                                    )}
                                    {classroom.hasAC && (
                                        <span className="p-2 bg-green-50 text-green-600 rounded-lg text-xs font-bold" title="Aire Acondicionado">❄️ A/C</span>
                                    )}
                                    {!classroom.hasProjector && !classroom.hasAC && (
                                        <span className="text-xs text-gray-400 italic py-2">Básico</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="mx-auto h-16 w-16 text-gray-300 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No se encontraron aulas</h3>
                        <p className="mt-1 text-sm text-gray-500">Intenta con otro filtro o registra un nuevo ambiente.</p>
                    </div>
                )}

                {/* MODAL */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
                        <div className="flex min-h-screen items-center justify-center p-4">
                            <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all">
                                <div className="bg-gradient-to-r from-upds-main to-blue-800 px-8 py-5 flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-white">{editingId ? 'Editar Ambiente' : 'Nuevo Ambiente'}</h3>
                                    <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre / Código</label>
                                        <input 
                                            type="text" required placeholder="Ej: A-101, Laboratorio de Redes"
                                            className="w-full rounded-xl border-gray-200 bg-gray-50/50 border px-4 py-3 outline-none focus:ring-2 focus:ring-upds-main/30 focus:border-upds-main transition-all"
                                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tipo</label>
                                            <select 
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 border px-4 py-3 outline-none focus:ring-2 focus:ring-upds-main/30 focus:border-upds-main transition-all"
                                                value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}
                                            >
                                                <option value="THEORY_ROOM">Aula Teórica</option>
                                                <option value="LABORATORY">Laboratorio</option>
                                                <option value="AUDITORIUM">Auditorio</option>
                                                <option value="VIRTUAL">Virtual</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Capacidad</label>
                                            <input 
                                                type="number" min="1" max="200"
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 border px-4 py-3 outline-none focus:ring-2 focus:ring-upds-main/30 focus:border-upds-main transition-all"
                                                value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ubicación (Opcional)</label>
                                        <input 
                                            type="text" placeholder="Ej: Bloque A, 2do Piso"
                                            className="w-full rounded-xl border-gray-200 bg-gray-50/50 border px-4 py-3 outline-none focus:ring-2 focus:ring-upds-main/30 focus:border-upds-main transition-all"
                                            value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                                        />
                                    </div>

                                    <div className="flex gap-6 pt-2">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${formData.hasProjector ? 'bg-upds-main border-upds-main text-white' : 'border-gray-300'}`}>
                                                {formData.hasProjector && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <input type="checkbox" className="hidden" checked={formData.hasProjector} onChange={e => setFormData({...formData, hasProjector: e.target.checked})} />
                                            <span className="text-sm font-medium text-gray-700">Tiene Proyector</span>
                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${formData.hasAC ? 'bg-upds-main border-upds-main text-white' : 'border-gray-300'}`}>
                                                {formData.hasAC && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <input type="checkbox" className="hidden" checked={formData.hasAC} onChange={e => setFormData({...formData, hasAC: e.target.checked})} />
                                            <span className="text-sm font-medium text-gray-700">Aire Acondicionado</span>
                                        </label>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button 
                                            type="button" onClick={() => setIsModalOpen(false)}
                                            className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            type="submit"
                                            className="flex-1 px-4 py-3 bg-upds-main text-white font-bold rounded-xl hover:bg-blue-900 shadow-lg hover:shadow-xl transition-all"
                                        >
                                            {editingId ? 'Guardar Cambios' : 'Registrar Ambiente'}
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
