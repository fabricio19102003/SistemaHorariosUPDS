import { Classroom, ClassroomType } from '@prisma/client';

export interface IClassroomRepository {
    findAll(): Promise<Classroom[]>;
    findById(id: number): Promise<Classroom | null>;
    findByType(type: ClassroomType): Promise<Classroom[]>;
    create(data: Omit<Classroom, 'id'>): Promise<Classroom>;
    update(id: number, data: Partial<Classroom>): Promise<Classroom>;
    delete(id: number): Promise<void>;
}
