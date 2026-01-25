"use client";

import { useEffect, useState } from 'react';
import { teacherService, Teacher } from '@/features/teachers/services/teacher.service';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

export default function TeachersPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        specialty: '',
        contractType: 'FULL_TIME'
    });

    useEffect(() => {
        loadTeachers();
    }, []);

    const loadTeachers = async () => {
        setLoading(true);
        try {
            const data = await teacherService.getAll();
            setTeachers(data);
        } catch (error) {
            console.error(error);
            showToast('Error al cargar docentes', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await teacherService.create(formData);
            showToast('Docente registrado exitosamente', 'success');
            setIsModalOpen(false);
            setFormData({ fullName: '', username: '', email: '', specialty: '', contractType: 'FULL_TIME' });
            loadTeachers();
        } catch (error: any) {
            showToast(error.response?.data?.error || 'Error al crear docente', 'error');
        }
    };

    const filteredTeachers = teachers.filter(t => 
        t.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <span onClick={() => router.push('/dashboard')} className="cursor-pointer hover:text-upds-main transition-colors">Dashboard</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            <span className="font-medium text-gray-900">Docentes</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Gestión de Docentes</h1>
                        <p className="text-gray-500 mt-1">Administra la planta docente y sus asignaciones.</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-upds-main text-white px-5 py-2.5 rounded-lg hover:bg-blue-900 transition-all shadow-md flex items-center gap-2 font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Nuevo Docente
                    </button>
                </div>

                {/* Search */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-upds-main focus:border-upds-main sm:text-sm"
                            placeholder="Buscar docente por nombre o especialidad..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Docente</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Especialidad</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contrato</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTeachers.map((teacher) => (
                                <tr key={teacher.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                                {teacher.user.fullName.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{teacher.user.fullName}</div>
                                                <div className="text-sm text-gray-500">{teacher.user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {teacher.specialty || 'Sin asignar'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {teacher.contractType}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${teacher.user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {teacher.user.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal Simplificado */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                         <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
                         <div className="flex min-h-full items-center justify-center p-4">
                            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                                <h3 className="text-lg font-bold mb-4">Registrar Nuevo Docente</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                                        <input type="text" required className="w-full border rounded-md p-2" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                         <div>
                                            <label className="block text-sm font-medium text-gray-700">Usuario</label>
                                            <input type="text" required className="w-full border rounded-md p-2" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <input type="email" className="w-full border rounded-md p-2" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Especialidad</label>
                                        <input type="text" className="w-full border rounded-md p-2" placeholder="Ej: Redes, Programación..." value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} />
                                    </div>
                                    <div className="flex justify-end gap-2 mt-6">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-gray-600">Cancelar</button>
                                        <button type="submit" className="px-4 py-2 bg-upds-main text-white rounded-md hover:bg-blue-900">Guardar Docente</button>
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
