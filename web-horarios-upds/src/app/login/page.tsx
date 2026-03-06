"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authService } from '../../features/auth/services/auth.service';
import { createSession } from '@/features/auth/actions';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await authService.login(username, password);
            
            // Guardar sesión básica (Mejorar con Context/Zustand luego)
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Set server-side session
            await createSession(data.token);

            router.push('/dashboard');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-upds-main">
            {/* Overlay Pattern opcional o degradado */}
            <div className="absolute inset-0 bg-gradient-to-br from-upds-main to-black opacity-50 z-0"></div>

            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md z-10 border border-gray-200">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative w-48 h-16 mb-4">
                        <Image 
                            src="/upds-logo.png" 
                            alt="Logo UPDS" 
                            fill 
                            className="object-contain"
                            priority
                            sizes="192px"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-upds-main">Gestión de Horarios</h2>
                    <p className="text-gray-500 text-sm">Facultad de Medicina</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center border border-red-200">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
                        <input 
                            type="text" 
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upds-light focus:border-upds-light outline-none transition-all"
                            placeholder="jperez"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upds-light focus:border-upds-light outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-upds-main text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl"
                    >
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-400">
                    © 2026 UPDS - Sistema de Gestión de Horarios
                </div>
            </div>
        </div>
    );
}
