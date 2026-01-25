import prisma from '../database/prisma.client';
import { ISubjectRepository, SubjectWithDetails } from '../../domain/repositories/subject.repository';

export class PrismaSubjectRepository implements ISubjectRepository {

    async findAll(): Promise<SubjectWithDetails[]> {
        return await prisma.subject.findMany({
            include: {
                career: true
            }
        });
    }

    async findById(id: number): Promise<SubjectWithDetails | null> {
        return await prisma.subject.findUnique({
            where: { id },
            include: {
                career: true
            }
        });
    }

    async findBySemester(semester: number): Promise<SubjectWithDetails[]> {
        return await prisma.subject.findMany({
            where: { semester },
            include: {
                career: true
            }
        });
    }
}
