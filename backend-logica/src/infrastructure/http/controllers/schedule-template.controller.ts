import { Request, Response } from 'express';
import { ScheduleTemplateService } from '../../../application/services/schedule-template.service';

export class ScheduleTemplateController {
    constructor(private service: ScheduleTemplateService) { }

    save = async (req: Request, res: Response) => {
        try {
            const result = await this.service.saveTemplate(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const result = await this.service.update(Number(req.params.id), req.body);
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const result = await this.service.getAll();
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            await this.service.delete(Number(req.params.id));
            res.status(200).send('Deleted');
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    apply = async (req: Request, res: Response) => {
        try {
            await this.service.applyTemplate(Number(req.params.id));
            res.status(200).json({ message: 'Template applied successfully' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
