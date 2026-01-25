"use client";

import { useState } from 'react';
import { userService } from '@/features/users/services/user.service';
import { useToast } from '@/context/ToastContext';

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUserCreated: () => void;
}

export default function CreateUserModal({ isOpen, onClose, onUserCreated }: CreateUserModalProps) {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        email: '',
        role: 'TEACHER'
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await userService.create(formData);
            showToast('Usuario creado exitosamente', 'success');
            onUserCreated();
            setFormData({ fullName: '', username: '', password: '', email: '', role: 'TEACHER' }); // Reset
            onClose();
        } catch (error: any) {
            console.error(error);
            showToast(error.response?.data?.error || 'Error al crear usuario', 'error');
        } finally {
            setLoading(false);
        }
    };

    const roleOptions = [
        { id: 'TEACHER', label: 'Docente', description: 'Acceso a gestión de materias y horarios.', icon: '👨‍🏫', color: 'border-blue-500 bg-blue-50 text-blue-700' },
        { id: 'ADMIN', label: 'Coordinador', description: 'Gestión académica y reportes.', icon: '👔', color: 'border-red-500 bg-red-50 text-red-700' },
        { id: 'SUPERADMIN', label: 'Super Admin', description: 'Control total del sistema.', icon: '🛡️', color: 'border-yellow-500 bg-yellow-50 text-yellow-700' },
    ];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop Blur */}
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-upds-main to-blue-900 px-6 py-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="bg-white/20 p-1.5 rounded-lg">👤</span>
                                Nuevo Usuario
                            </h3>
                            <p className="text-blue-200 text-sm mt-0.5">Complete la información para registrar un nuevo miembro.</p>
                        </div>
                        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        
                        {/* 1. Selección de Rol */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">1. Seleccione el Rol</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {roleOptions.map((role) => (
                                    <div 
                                        key={role.id}
                                        onClick={() => setFormData({...formData, role: role.id})}
                                        className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md ${formData.role === role.id ? role.color : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                                    >
                                        <div className="text-2xl mb-2">{role.icon}</div>
                                        <div className="font-bold text-sm text-gray-900">{role.label}</div>
                                        <div className="text-xs text-gray-500 leading-tight mt-1">{role.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. Información del Usuario */}
                        <div className="space-y-6">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide border-b pb-2">2. Información Personal & Acceso</label>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                                    <input 
                                        type="text" required
                                        placeholder="Ej: Juan Pérez"
                                        className="w-full rounded-lg border-gray-300 border px-4 py-2.5 outline-none focus:ring-2 focus:ring-upds-main/20 focus:border-upds-main transition-all"
                                        value={formData.fullName}
                                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico (Opcional)</label>
                                    <input 
                                        type="email" 
                                        placeholder="juan@upds.edu.bo"
                                        className="w-full rounded-lg border-gray-300 border px-4 py-2.5 outline-none focus:ring-2 focus:ring-upds-main/20 focus:border-upds-main transition-all"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Usuario (Login)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-400">@</span>
                                        <input 
                                            type="text" required
                                            placeholder="jperez"
                                            className="w-full pl-8 rounded-md border-gray-300 border px-3 py-2 outline-none focus:border-upds-main focus:ring-1 focus:ring-upds-main transition-all bg-white"
                                            value={formData.username}
                                            onChange={e => setFormData({...formData, username: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contraseña Inicial</label>
                                    <input 
                                        type="text" required
                                        placeholder="********"
                                        className="w-full rounded-md border-gray-300 border px-3 py-2 outline-none focus:border-upds-main focus:ring-1 focus:ring-upds-main transition-all bg-white font-mono text-sm"
                                        value={formData.password}
                                        onChange={e => setFormData({...formData, password: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="mt-10 flex gap-4 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-[2] px-4 py-2.5 bg-upds-main text-white font-bold rounded-lg hover:bg-blue-900 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Procesando...
                                    </>
                                ) : (
                                    'Crear Usuario'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
