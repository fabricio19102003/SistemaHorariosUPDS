import { IClassroomRepository } from '../../domain/repositories/classroom.repository';
import { ClassroomType } from '@prisma/client';

export class ClassroomService {
    constructor(private classroomRepository: IClassroomRepository) { }

    async getAllClassrooms() {
        return await this.classroomRepository.findAll();
    }

    async getClassroomById(id: number) {
        return await this.classroomRepository.findById(id);
    }

    async getClassroomsByType(type: ClassroomType) {
        return await this.classroomRepository.findByType(type);
    }
}
