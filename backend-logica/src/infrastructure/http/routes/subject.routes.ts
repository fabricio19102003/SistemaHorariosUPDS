import { Router } from 'express';
import { SubjectController } from '../controllers/subject.controller';

const router = Router();
const subjectController = new SubjectController();

router.get('/', subjectController.getAll);
router.post('/', subjectController.create);
router.put('/:id', subjectController.update);

export default router;
