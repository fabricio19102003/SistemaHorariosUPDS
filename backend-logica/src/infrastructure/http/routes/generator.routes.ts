import { Router } from 'express';
import { GeneratorController } from '../controllers/generator.controller';
import { ScheduleGeneratorService } from '../../../application/services/generator.service';

const router = Router();

// Dependecy Injection
const generatorService = new ScheduleGeneratorService();
const generatorController = new GeneratorController(generatorService);

router.post('/proposal', generatorController.generate);

export default router;
