import prisma from '../database/prisma.client';
import { IClassroomRepository } from '../../domain/repositories/classroom.repository';
import { Classroom, ClassroomType } from '@prisma/client';

export class PrismaClassroomRepository implements IClassroomRepository {

    async findAll(): Promise<Classroom[]> {
        return await prisma.classroom.findMany();
    }

    async findById(id: number): Promise<Classroom | null> {
        return await prisma.classroom.findUnique({
            where: { id }
        });
    }

    async findByType(type: ClassroomType): Promise<Classroom[]> {
        return await prisma.classroom.findMany({
            where: { type }
        });
    }

    async create(data: Omit<Classroom, 'id'>): Promise<Classroom> {
        return await prisma.classroom.create({
            data
        });
    }

    async update(id: number, data: Partial<Classroom>): Promise<Classroom> {
        return await prisma.classroom.update({
            where: { id },
            data
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.classroom.delete({
            where: { id }
        });
    }
}
