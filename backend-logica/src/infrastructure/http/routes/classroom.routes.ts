import { Router } from 'express';
import { ClassroomController } from '../controllers/classroom.controller';
import { ClassroomService } from '../../../application/services/classroom.service';
import { PrismaClassroomRepository } from '../../repositories/prisma.classroom.repository';

const router = Router();

// Dependecy Injection
const classroomRepo = new PrismaClassroomRepository();
const classroomService = new ClassroomService(classroomRepo);
const classroomController = new ClassroomController(classroomService);

router.get('/', classroomController.getAll);
router.get('/:id', classroomController.getOne);

export default router;
