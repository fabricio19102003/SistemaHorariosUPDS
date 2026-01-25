import { Request, Response } from 'express';
import { ClassroomService } from '../../../application/services/classroom.service';
import { ClassroomType } from '@prisma/client';

export class ClassroomController {
    constructor(private classroomService: ClassroomService) { }

    getAll = async (req: Request, res: Response) => {
        try {
            const { type } = req.query;
            if (type && Object.values(ClassroomType).includes(type as ClassroomType)) {
                const classrooms = await this.classroomService.getClassroomsByType(type as ClassroomType);
                res.json(classrooms);
            } else {
                const classrooms = await this.classroomService.getAllClassrooms();
                res.json(classrooms);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getOne = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const classroom = await this.classroomService.getClassroomById(Number(id));
            if (!classroom) {
                res.status(404).json({ error: 'Classroom not found' });
                return;
            }
            res.json(classroom);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const classroom = await this.classroomService.create(req.body);
            res.status(201).json(classroom);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const classroom = await this.classroomService.update(Number(id), req.body);
            res.json(classroom);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.classroomService.delete(Number(id));
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
