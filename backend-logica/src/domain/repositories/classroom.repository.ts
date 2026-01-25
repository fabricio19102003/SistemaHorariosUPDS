import { Classroom, ClassroomType } from '@prisma/client';

export interface IClassroomRepository {
    findAll(): Promise<Classroom[]>;
    findById(id: number): Promise<Classroom | null>;
    findByType(type: ClassroomType): Promise<Classroom[]>;
}
