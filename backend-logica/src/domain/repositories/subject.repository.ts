import { Subject, Career } from '@prisma/client';

export type SubjectWithDetails = Subject & {
    career: Career;
};

export interface ISubjectRepository {
    findAll(): Promise<SubjectWithDetails[]>;
    findById(id: number): Promise<SubjectWithDetails | null>;
    findBySemester(semester: number): Promise<SubjectWithDetails[]>;
}
