import { Teacher, User, TeacherUnavailability } from '@prisma/client';

// Extend Teacher type to include relations we often need
export type TeacherWithDetails = Teacher & {
    user: User;
    unavailabilities: TeacherUnavailability[];
};

export interface ITeacherRepository {
    findAll(): Promise<TeacherWithDetails[]>;
    findById(id: string): Promise<TeacherWithDetails | null>;
    create(data: any): Promise<Teacher>; // Type 'any' strictly for now, refine with DTOs later
    // update(id: string, data: any): Promise<Teacher>;
    // delete(id: string): Promise<void>;
}
