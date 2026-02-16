import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const requireRole = (allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: 'No autenticado.' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            console.error(`Role mismatch! User role: ${req.user.role}, Allowed: ${allowedRoles}`);
            return res.status(403).json({ error: 'Acceso prohibido. Rol insuficiente.' });
        }

        next();
    };
};
