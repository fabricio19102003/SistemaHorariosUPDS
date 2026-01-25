import { Router } from 'express';
import { TeacherController } from '../controllers/teacher.controller';

const router = Router();
const teacherController = new TeacherController();

router.get('/', teacherController.getAll);
router.post('/', teacherController.create);
router.put('/:id', teacherController.update);

export default router;
