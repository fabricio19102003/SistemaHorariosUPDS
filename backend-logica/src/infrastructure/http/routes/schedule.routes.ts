import { Router } from 'express';
import { ScheduleController } from '../controllers/schedule.controller';
import { ScheduleService } from '../../../application/services/schedule.service';
import { ScheduleValidationService } from '../../../application/services/schedule-validation.service';

import { ScheduleTemplateService } from '../../../application/services/schedule-template.service';
import { ScheduleTemplateController } from '../controllers/schedule-template.controller';

const router = Router();

// Dependency Injection
const validationService = new ScheduleValidationService();
const scheduleService = new ScheduleService(validationService);
const scheduleController = new ScheduleController(scheduleService);

const templateService = new ScheduleTemplateService();
const templateController = new ScheduleTemplateController(templateService);

router.post('/', scheduleController.createBatch);
router.post('/bulk', scheduleController.createBulk);
router.post('/validate', scheduleController.validate);

// Blocks
router.get('/blocks', scheduleController.getBlocks);
router.post('/blocks', scheduleController.createBlock);
router.put('/blocks/:id', scheduleController.updateBlock);
router.delete('/blocks/:id', scheduleController.deleteBlock);

// Templates
router.get('/templates', templateController.getAll);
router.post('/templates', templateController.save);
router.post('/templates/:id/apply', templateController.apply);
router.delete('/templates/:id', templateController.delete);

router.get('/active-period', scheduleController.getActivePeriod);
router.delete('/:id', scheduleController.delete);
router.get('/', scheduleController.getByPeriod);

export default router;

