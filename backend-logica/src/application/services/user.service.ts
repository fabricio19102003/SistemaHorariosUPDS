import prisma from '../../infrastructure/database/prisma.client';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

export class UserService {

    async findAll() {
        return await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                fullName: true,
                role: true,
                isActive: true,
                createdAt: true,
                lastLogin: true,
                teacherProfile: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async update(id: string, data: any) {
        const updateData: any = {
            fullName: data.fullName,
            email: data.email,
            username: data.username,
            role: data.role
        };

        if (data.password && data.password.trim() !== '') {
            updateData.password = await bcrypt.hash(data.password, 10);
        }

        return await prisma.user.update({
            where: { id },
            data: updateData,
            select: { id: true, username: true, role: true }
        });
    }

    async create(data: any) {
        // Verificar si existe usuario o email
        const existing = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: data.username },
                    { email: data.email }
                ]
            }
        });

        if (existing) throw new Error('El usuario o email ya existe');

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                fullName: data.fullName,
                password: hashedPassword,
                role: data.role as Role || Role.TEACHER,
                isActive: true
            },
            select: { id: true, username: true, role: true }
        });
    }

    async updateRole(id: string, role: Role) {
        return await prisma.user.update({
            where: { id },
            data: { role },
            select: { id: true, role: true }
        });
    }

    async toggleStatus(id: string) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw new Error('Usuario no encontrado');

        // Evitar desactivarse a sí mismo o al superadmin principal si fuera necesario lógica extra
        // Por ahora simple toggle
        return await prisma.user.update({
            where: { id },
            data: { isActive: !user.isActive },
            select: { id: true, isActive: true }
        });
    }
}
