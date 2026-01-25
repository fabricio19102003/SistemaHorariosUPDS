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
}
