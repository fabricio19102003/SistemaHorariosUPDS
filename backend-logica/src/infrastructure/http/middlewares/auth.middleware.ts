import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret_super_seguro_upds';

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    jwt.verify(token, SECRET, (err: any, user: any) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(403).json({ error: 'Token inválido o expirado.', details: err.message });
        }
        console.log('User authenticated:', user.username, user.role);
        req.user = user;
        next();
    });
};
