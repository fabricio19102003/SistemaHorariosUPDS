import { Router } from 'express';
import { ScheduleController } from '../controllers/schedule.controller';
import { ScheduleService } from '../../../application/services/schedule.service';
import { ScheduleValidationService } from '../../../application/services/schedule-validation.service';

const router = Router();

// Dependency Injection
const validationService = new ScheduleValidationService();
const scheduleService = new ScheduleService(validationService);
const scheduleController = new ScheduleController(scheduleService);

router.post('/', scheduleController.createBatch);
router.post('/bulk', scheduleController.createBulk);
router.post('/validate', scheduleController.validate);
router.get('/blocks', scheduleController.getBlocks);
router.post('/blocks', scheduleController.createBlock);
router.put('/blocks/:id', scheduleController.updateBlock);
router.delete('/blocks/:id', scheduleController.deleteBlock);
router.get('/active-period', scheduleController.getActivePeriod);
router.get('/', scheduleController.getByPeriod);

export default router;
