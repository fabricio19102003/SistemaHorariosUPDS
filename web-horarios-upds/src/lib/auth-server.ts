import jwt from 'jsonwebtoken';

// Use same secret as backend-logica
const JWT_SECRET = process.env.JWT_SECRET || 'secret_super_seguro_upds';

export type UserPayload = {
    userId: string;
    username: string;
    role: string;
    fullName: string;
};

export const verifyToken = (token: string): UserPayload | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

export const hasRole = (user: UserPayload | null, roles: string[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
};
