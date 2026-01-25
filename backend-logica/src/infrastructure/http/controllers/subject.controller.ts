import { Request, Response } from 'express';
import { SubjectService } from '../../../application/services/subject.service';

export class SubjectController {
    private subjectService: SubjectService;

    constructor() {
        this.subjectService = new SubjectService();
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const subjects = await this.subjectService.findAll();
            res.json(subjects);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const subject = await this.subjectService.create(req.body);
            res.status(201).json(subject);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const subject = await this.subjectService.update(parseInt(id), req.body);
            res.json(subject);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
