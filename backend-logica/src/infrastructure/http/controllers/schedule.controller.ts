import { Request, Response } from 'express';
import { ScheduleService } from '../../../application/services/schedule.service';
import { ScheduleValidationService } from '../../../application/services/schedule-validation.service';

import { ScheduleGeneratorService } from '../../../application/services/schedule-generator.service';

export class ScheduleController {
    constructor(
        private scheduleService: ScheduleService,
        private generatorService: ScheduleGeneratorService = new ScheduleGeneratorService()
    ) { }

    generateProposal = async (req: Request, res: Response) => {
        console.log('--- ENTERING generateProposal ---');
        try {
            const result = await this.generatorService.generateProposal(req.body);
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    createBatch = async (req: Request, res: Response) => {
        try {
            const result = await this.scheduleService.createBatch(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            // Check if error is a validation JSON
            try {
                const conflicts = JSON.parse(error.message);
                if (Array.isArray(conflicts)) {
                    res.status(409).json({ error: 'Conflict detected', conflicts });
                    return;
                }
            } catch (e) {
                // Not a json error
            }
            res.status(400).json({ error: error.message });
        }
    }

    createBulk = async (req: Request, res: Response) => {
        try {
            const items = req.body;
            if (!Array.isArray(items)) {
                res.status(400).json({ error: 'Body must be an array of schedules' });
                return;
            }
            const result = await this.scheduleService.createBulk(items);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    createBlock = async (req: Request, res: Response) => {
        try {
            const result = await this.scheduleService.createBlock(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteBlock = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            await this.scheduleService.deleteBlock(id);
            res.status(200).send('Deleted'); // Or 204
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    validate = async (req: Request, res: Response) => {
        // Expose validation endpoint for optimistic UI checks
        try {
            const validationService = new ScheduleValidationService();
            const result = await validationService.validate(req.body);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    getBlocks = async (req: Request, res: Response) => {
        try {
            const blocks = await this.scheduleService.getAllTimeBlocks();
            res.json(blocks);
        } catch (error: any) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getByPeriod = async (req: Request, res: Response) => {
        try {
            const { periodId } = req.query;
            const schedules = await this.scheduleService.getByPeriod(Number(periodId) || 1);
            res.json(schedules);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    updateBlock = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const result = await this.scheduleService.updateBlock(id, req.body);
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    getActivePeriod = async (req: Request, res: Response) => {
        try {
            const period = await this.scheduleService.getActivePeriod();
            if (!period) {
                res.status(404).json({ error: 'No active period found' });
                return;
            }
            res.json(period);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.scheduleService.delete(id);
            res.status(200).send('Deleted');
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
