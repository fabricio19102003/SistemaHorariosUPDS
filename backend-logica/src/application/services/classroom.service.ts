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

    async create(data: any) {
        // Validación básica
        if (!data.name || !data.capacity) {
            throw new Error('Nombre y capacidad son requeridos');
        }
        return await this.classroomRepository.create({
            name: data.name,
            capacity: parseInt(data.capacity),
            type: data.type || 'THEORY_ROOM',
            location: data.location,
            hasProjector: data.hasProjector ?? true,
            hasAC: data.hasAC ?? true
        });
    }

    async update(id: number, data: any) {
        const updateData: any = {};
        if (data.name) updateData.name = data.name;
        if (data.capacity) updateData.capacity = parseInt(data.capacity);
        if (data.type) updateData.type = data.type;
        if (data.location !== undefined) updateData.location = data.location;
        if (data.hasProjector !== undefined) updateData.hasProjector = data.hasProjector;
        if (data.hasAC !== undefined) updateData.hasAC = data.hasAC;

        return await this.classroomRepository.update(id, updateData);
    }

    async delete(id: number) {
        // TODO: Verificar si tiene horarios asignados antes de borrar
        return await this.classroomRepository.delete(id);
    }
}
