"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authService } from '../../features/auth/services/auth.service';
import { scheduleService, ClassSchedule } from '../../features/schedule/services/schedule.service';
import ScheduleMatrix from '../../components/schedule/ScheduleMatrix';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
    
    // Controles Filtro (Mock por ahora)
    const [semester, setSemester] = useState(1);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            router.push('/login');
        } else {
            setUser(currentUser);
        }
    }, [router]);

    const handleLogout = () => {
        authService.logout();
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            // Hardcoded periodId 1 for MVP
            const result = await scheduleService.generateProposal(semester, 1);
            setSchedules(result.details);
            alert(`¡Generación completa! Se asignaron ${result.created} clases.`);
        } catch (error: any) {
            console.error(error);
            alert('Error al generar horario: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null; // O un spinner

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Institucional */}
            <header className="bg-upds-main text-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        {/* Logo Container con Fondo Blanco */}
                        <div className="relative w-36 h-12 bg-white rounded-lg shadow-sm px-3 flex items-center justify-center overflow-hidden">
                             <Image 
                                src="/upds-logo.png" 
                                alt="UPDS Logo"
                                fill
                                className="object-contain p-1"
                                priority
                             />
                        </div>
                        <div className="border-l border-white/20 pl-6 hidden md:block">
                            <h1 className="text-xl font-bold leading-tight tracking-wide">Sistema de Gestión Académica</h1>
                            <p className="text-sm text-blue-100 font-light">Facultad de Medicina</p>
                        </div>

                        {/* Menú de Navegación */}
                        <nav className="hidden md:flex ml-6 gap-2">
                             {/* Users: SUPERADMIN only */}
                             {user.role === 'SUPERADMIN' && (
                                <button 
                                    onClick={() => router.push('/dashboard/users')}
                                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 border border-white/10"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    Usuarios
                                </button>
                             )}

                             {/* Teachers & Subjects: SUPERADMIN & ADMIN */}
                             {['SUPERADMIN', 'ADMIN'].includes(user.role) && (
                                <>
                                    <button 
                                        onClick={() => router.push('/dashboard/teachers')}
                                        className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 border border-white/10"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        Docentes
                                    </button>
                                    <button 
                                        onClick={() => router.push('/dashboard/subjects')}
                                        className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 border border-white/10"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                        Materias
                                    </button>
                                </>
                             )}
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* User Info & Avatar */}
                        <div className="flex items-center gap-3 bg-white/10 rounded-full pl-4 pr-1 py-1 border border-white/10">
                            <div className="text-right hidden sm:block leading-tight">
                                <p className="text-sm font-bold tracking-tight">{user.fullName}</p>
                                <p className="text-[10px] text-blue-200 font-medium uppercase tracking-wider">{user.role}</p>
                            </div>
                            
                            {/* Avatar Circle */}
                            <div className="w-9 h-9 bg-upds-light rounded-full flex items-center justify-center shadow-inner border-2 border-upds-main text-xs font-bold ring-2 ring-white/20">
                                {user.fullName.charAt(0)}
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout}
                            className="group flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-red-500/90 text-white/80 hover:text-white transition-all duration-300 border border-white/10"
                            title="Cerrar Sesión"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="container mx-auto px-4 py-8">
                
                {/* Control Panel */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-1">Generador de Horarios</h2>
                            <p className="text-gray-500 text-sm">Selecciona los parámetros para generar una nueva propuesta.</p>
                        </div>
                        
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="flex-1 md:w-48">
                                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Semestre</label>
                                <select 
                                    value={semester}
                                    onChange={(e) => setSemester(Number(e.target.value))}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-upds-light outline-none"
                                >
                                    <option value={1}>1er Semestre</option>
                                    <option value={2}>2do Semestre</option>
                                    <option value={3}>3er Semestre</option>
                                    <option value={4}>4to Semestre</option>
                                </select>
                            </div>
                            <div className="flex-1 md:w-48">
                                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Gestión</label>
                                <select disabled className="w-full border border-gray-300 bg-gray-50 rounded px-3 py-2 text-sm text-gray-500 cursor-not-allowed">
                                    <option>1-2026</option>
                                </select>
                            </div>
                            <button 
                                onClick={handleGenerate}
                                disabled={loading}
                                className="bg-upds-light text-white px-6 py-2.5 rounded hover:bg-blue-600 transition-colors font-medium shadow-sm h-[42px] mt-auto disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading && (
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {loading ? 'Generando...' : 'Generar Propuesta'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Schedule Visualization */}
                {schedules.length > 0 ? (
                    <div className="animation-fade-in">
                        <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <span className="w-2 h-6 bg-upds-main rounded-sm"></span>
                            Propuesta Generada
                            <span className="text-sm font-normal text-gray-500 ml-2">({schedules.length} clases asignadas)</span>
                        </h3>
                        <ScheduleMatrix schedules={schedules} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
                        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="text-lg">No hay horarios generados aún</p>
                        <p className="text-sm">Selecciona un semestre y presiona "Generar Propuesta"</p>
                    </div>
                )}
            </main>
        </div>
    );
}
