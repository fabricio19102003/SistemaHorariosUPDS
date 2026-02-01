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
            {/* Header Institucional Premium */}
            <header className="bg-upds-main/95 backdrop-blur-md text-white shadow-lg sticky top-0 z-50 border-b border-white/10">
                <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        {/* Logo Container con Efecto Glass */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
                            <div className="relative w-40 h-14 bg-white rounded-xl shadow-xl px-4 flex items-center justify-center overflow-hidden transform transition-transform group-hover:scale-[1.02]">
                                <Image 
                                    src="/upds-logo.png" 
                                    alt="UPDS Logo"
                                    fill
                                    className="object-contain p-1.5"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 200px"
                                />
                            </div>
                        </div>

                        <div className="h-10 w-px bg-white/10 hidden md:block"></div>

                        <div className="hidden md:block">
                            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-sm">
                                Sistema de Gestión de Horarios
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-blue-200 font-medium tracking-wide">
                                <span className="bg-blue-500/20 px-2 py-0.5 rounded text-[10px] border border-blue-400/20">v2.0</span>
                                <span className="opacity-80">Facultad de Medicina</span>
                            </div>
                        </div>

                        {/* Menú de Navegación Moderno */}
                        <nav className="hidden xl:flex ml-8 gap-1.5 bg-black/10 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                             {/* Users: SUPERADMIN only */}
                             {user.role === 'SUPERADMIN' && (
                                <button 
                                    onClick={() => router.push('/dashboard/users')}
                                    className="px-4 py-2 hover:bg-white/10 text-gray-200 hover:text-white rounded-xl transition-all duration-300 text-sm font-semibold flex items-center gap-2 group"
                                >
                                    <span className="p-1 bg-indigo-500/20 rounded-md group-hover:bg-indigo-500 transition-colors duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </span>
                                    Usuarios
                                </button>
                             )}

                             {/* Teachers & Subjects: SUPERADMIN & ADMIN */}
                             {['SUPERADMIN', 'ADMIN'].includes(user.role) && (
                                <>
                                    <button 
                                        onClick={() => router.push('/dashboard/teachers')}
                                        className="px-4 py-2 hover:bg-white/10 text-gray-200 hover:text-white rounded-xl transition-all duration-300 text-sm font-semibold flex items-center gap-2 group"
                                    >
                                        <span className="p-1 bg-emerald-500/20 rounded-md group-hover:bg-emerald-500 transition-colors duration-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </span>
                                        Docentes
                                    </button>
                                    <button 
                                        onClick={() => router.push('/dashboard/subjects')}
                                        className="px-4 py-2 hover:bg-white/10 text-gray-200 hover:text-white rounded-xl transition-all duration-300 text-sm font-semibold flex items-center gap-2 group"
                                    >
                                        <span className="p-1 bg-violet-500/20 rounded-md group-hover:bg-violet-500 transition-colors duration-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                        </span>
                                        Materias
                                    </button>
                                    <button 
                                        onClick={() => router.push('/dashboard/classrooms')}
                                        className="px-4 py-2 hover:bg-white/10 text-gray-200 hover:text-white rounded-xl transition-all duration-300 text-sm font-semibold flex items-center gap-2 group"
                                    >
                                        <span className="p-1 bg-pink-500/20 rounded-md group-hover:bg-pink-500 transition-colors duration-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                        </span>
                                        Aulas
                                    </button>
                                </>
                             )}
                             
                             <div className="w-px h-6 bg-white/10 mx-2 self-center"></div>

                             <button 
                                onClick={() => router.push('/dashboard/schedule')}
                                className="px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 text-sm font-bold flex items-center gap-2 relative overflow-hidden group border border-white/20"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span className="relative z-10">Horarios</span>
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* User Profile Premium */}
                        <div className="flex items-center gap-4 bg-black/20 rounded-full pl-5 pr-1.5 py-1.5 border border-white/5 shadow-inner backdrop-blur-sm group hover:bg-black/30 transition-colors cursor-default">
                            <div className="text-right hidden sm:block leading-tight">
                                <p className="text-sm font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">{user.fullName}</p>
                                <div className="flex items-center justify-end gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                    <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">{user.role}</p>
                                </div>
                            </div>
                            
                            {/* Avatar Circle */}
                            <div className="w-10 h-10 bg-gradient-to-br from-upds-light to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 text-sm font-bold relative overflow-hidden">
                                <span className="relative z-10">{user.fullName.charAt(0)}</span>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout}
                            className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/90 text-white/60 hover:text-white transition-all duration-300 border border-white/10 hover:shadow-lg hover:rotate-90 hover:scale-105"
                            title="Cerrar Sesión"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
