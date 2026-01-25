import prisma from '../../infrastructure/database/prisma.client';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

export class TeacherService {

    async findAll() {
        return await prisma.teacher.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                        isActive: true
                    }
                }
            }
        });
    }

    async create(data: any) {
        // Transaction to create User + Teacher
        return await prisma.$transaction(async (tx) => {
            // 1. Check if user exists
            const existing = await tx.user.findFirst({
                where: {
                    OR: [
                        { username: data.username },
                        { email: data.email }
                    ]
                }
            });

            if (existing) {
                throw new Error('El usuario o email ya existe');
            }

            // 2. Create User
            const hashedPassword = await bcrypt.hash(data.password || 'upds123', 10);
            const user = await tx.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    fullName: data.fullName,
                    password: hashedPassword,
                    role: Role.TEACHER,
                    isActive: true
                }
            });

            // 3. Create Teacher Profile
            const teacher = await tx.teacher.create({
                data: {
                    userId: user.id,
                    specialty: data.specialty,
                    contractType: data.contractType
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            fullName: true,
                            username: true
                        }
                    }
                }
            });

            return teacher;
        });
    }

    async update(id: string, data: any) {
        return await prisma.teacher.update({
            where: { id },
            data: {
                specialty: data.specialty,
                contractType: data.contractType,
                user: {
                    update: {
                        fullName: data.fullName,
                        email: data.email,
                        isActive: data.isActive
                    }
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                        isActive: true
                    }
                }
            }
        });
    }
}
