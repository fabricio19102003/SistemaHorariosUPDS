import prisma from '../../infrastructure/database/prisma.client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class AuthService {
    private SECRET = process.env.JWT_SECRET || 'secret_super_seguro_upds';

    async login(username: string, password: string) {
        console.log(`[AuthService] Attempting login for username: ${username}`);

        // 1. Buscar Usuario por Username
        try {
            const user = await prisma.user.findUnique({
                where: { username },
                include: { teacherProfile: true }
            });

            if (!user) {
                console.warn(`[AuthService] User not found: ${username}`);
                throw new Error('Credenciales inválidas');
            }

            console.log(`[AuthService] User found: ${user.id}, Role: ${user.role}`);
            console.log(`[AuthService] Stored Password Hash: ${user.password.substring(0, 10)}... (Length: ${user.password.length})`);

            // 2. Validar Password con Bcrypt
            const isValid = await bcrypt.compare(password, user.password);
            console.log(`[AuthService] Password valid: ${isValid}`);

            if (!isValid) {
                console.warn(`[AuthService] Invalid password for: ${username}`);
                throw new Error('Credenciales inválidas');
            }

            if (!user.isActive) {
                throw new Error('Usuario inactivo');
            }

            // 3. Generar JWT (Incluyendo Role)
            const token = jwt.sign(
                {
                    userId: user.id,
                    username: user.username,
                    role: user.role,
                    fullName: user.fullName
                },
                this.SECRET,
                { expiresIn: '8h' }
            );

            // Update lastLogin without awaiting to not block response
            prisma.user.update({
                where: { id: user.id },
                data: { lastLogin: new Date() }
            }).catch(err => console.error('Error updating lastLogin', err));

            return {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role,
                    teacherId: user.teacherProfile?.id
                },
                token
            };
        } catch (error) {
            console.error('[AuthService] Error in login:', error);
            throw error;
        }
    }
}
