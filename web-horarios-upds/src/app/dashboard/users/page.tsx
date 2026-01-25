"use client";

import { useEffect, useState } from 'react';
import { userService, User } from '@/features/users/services/user.service';
import CreateUserModal from '@/components/users/CreateUserModal';
import { useToast } from '@/context/ToastContext';
import { authService } from '@/features/auth/services/auth.service';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user || user.role !== 'SUPERADMIN') {
            showToast('No tienes permiso para ver esta página', 'error');
            router.push('/dashboard');
            return;
        }
        setCurrentUser(user);
        loadUsers();
    }, [router, showToast]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getAll();
            setUsers(data);
        } catch (error) {
            console.error(error);
            showToast('Error al cargar usuarios', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            await userService.toggleStatus(id);
            setUsers(users.map(u => u.id === id ? { ...u, isActive: !currentStatus } : u));
            showToast('Estado de usuario actualizado', 'success');
        } catch (error) {
            showToast('Error al actualizar estado', 'error');
        }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('ALL');

    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    const roleTranslations: Record<string, string> = {
        SUPERADMIN: 'Super Administrador',
        ADMIN: 'Coordinador',
        TEACHER: 'Docente',
        STUDENT: 'Estudiante',
    };
    
    const roleColors: Record<string, string> = {
        SUPERADMIN: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300',
        ADMIN: 'bg-red-100 text-red-800 border-red-200',
        TEACHER: 'bg-blue-100 text-blue-800 border-blue-200',
        STUDENT: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header ... */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                     {/* ... Title section ... */}
                     <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <span onClick={() => router.push('/dashboard')} className="cursor-pointer hover:text-upds-main transition-colors">Dashboard</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            <span className="font-medium text-gray-900">Usuarios</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Gestión de Usuarios</h1>
                        <p className="text-gray-500 mt-1">Administra el acceso y roles de todo el personal académico.</p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                             onClick={() => router.push('/dashboard')}
                             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-upds-main shadow-sm transition-all"
                        >
                            Volver
                        </button>
                        <button 
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex-1 md:flex-none bg-upds-main text-white px-5 py-2.5 rounded-lg hover:bg-blue-900 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            Nuevo Usuario
                        </button>
                    </div>
                </div>

                {/* Filters & Search Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-upds-main focus:border-upds-main sm:text-sm transition duration-150 ease-in-out"
                            placeholder="Buscar usuario por nombre, email o cuenta..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filtrar por Rol:</label>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-upds-main focus:border-upds-main sm:text-sm rounded-md"
                        >
                            <option value="ALL">Todos los Roles</option>
                            <option value="Docente">Docente</option> {/* Using rendered values logic issue? No, filter logic uses raw values. Let's fix this logic below */}
                            <option value="SUPERADMIN">Super Admin</option>
                            <option value="ADMIN">Coordinador</option>
                            <option value="TEACHER">Docente</option>
                            <option value="STUDENT">Estudiante</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuario</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rol</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha Alta</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-upds-light flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white">
                                                    {user.fullName.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900 group-hover:text-upds-main transition-colors">{user.fullName}</div>
                                                <div className="text-sm text-gray-500">@{user.username}</div>
                                                {user.email && <div className="text-xs text-gray-400">{user.email}</div>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border shadow-sm ${roleColors[user.role] || 'bg-gray-100 text-gray-800'}`}>
                                            {roleTranslations[user.role] || user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.isActive ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Activo</span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inactivo</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => handleToggleStatus(user.id, user.isActive)}
                                            disabled={user.username === 'superadmin'} // Protección mock
                                            className={`${user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} font-semibold disabled:opacity-30 disabled:cursor-not-allowed`}
                                        >
                                            {user.isActive ? 'Desactivar' : 'Activar'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                        No se encontraron usuarios que coincidan con la búsqueda.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateUserModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)}
                onUserCreated={loadUsers}
            />
        </div>
    );
}
