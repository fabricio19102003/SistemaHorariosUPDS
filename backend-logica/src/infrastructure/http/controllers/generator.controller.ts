import { Request, Response } from 'express';
import { ScheduleGeneratorService } from '../../../application/services/generator.service';

export class GeneratorController {
    constructor(private generatorService: ScheduleGeneratorService) { }

    generate = async (req: Request, res: Response) => {
        try {
            const { semester, periodId } = req.body;

            if (!semester || !periodId) {
                res.status(400).json({ error: 'Missing semester or periodId' });
                return;
            }

            const result = await this.generatorService.generateProposal(Number(semester), Number(periodId));
            res.json(result);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message || 'Internal Algorithm Error' });
        }
    }
}
