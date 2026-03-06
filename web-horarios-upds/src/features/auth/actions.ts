'use server';

import { cookies } from 'next/headers';

export async function createSession(token: string) {
    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 8, // 8 hours matches token expiry
        path: '/',
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session_token');
}

export async function getSessionToken() {
    const cookieStore = await cookies();
    return cookieStore.get('session_token')?.value;
}
