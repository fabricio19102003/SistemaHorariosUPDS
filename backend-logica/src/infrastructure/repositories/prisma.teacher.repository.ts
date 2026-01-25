import prisma from '../database/prisma.client';
import { ITeacherRepository, TeacherWithDetails } from '../../domain/repositories/teacher.repository';
import { Teacher } from '@prisma/client';

export class PrismaTeacherRepository implements ITeacherRepository {

    async findAll(): Promise<TeacherWithDetails[]> {
        return await prisma.teacher.findMany({
            include: {
                user: true, // We need names from User table
                unavailabilities: true
            }
        });
    }

    async findById(id: string): Promise<TeacherWithDetails | null> {
        return await prisma.teacher.findUnique({
            where: { id },
            include: {
                user: true,
                unavailabilities: true
            }
        });
    }

    async create(data: any): Promise<Teacher> {
        // Complex creation because we need to create User + Teacher profile
        // simplified for this iteration
        throw new Error("Method not implemented.");
    }
}
