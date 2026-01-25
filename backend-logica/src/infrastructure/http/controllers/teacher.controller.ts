import { Request, Response } from 'express';
import { TeacherService } from '../../../application/services/teacher.service';

export class TeacherController {
    private teacherService: TeacherService;

    constructor() {
        this.teacherService = new TeacherService();
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const teachers = await this.teacherService.findAll();
            res.json(teachers);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const teacher = await this.teacherService.create(req.body);
            res.status(201).json(teacher);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const teacher = await this.teacherService.update(id, req.body);
            res.json(teacher);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
