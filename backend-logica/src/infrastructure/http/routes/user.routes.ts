import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../../../application/services/user.service';
import { authenticateToken } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// Todas las rutas requieren autenticación y rol SUPERADMIN
router.use(authenticateToken);
router.use(requireRole([Role.SUPERADMIN]));

router.get('/', userController.getAll);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.patch('/:id/role', userController.updateRole);
router.patch('/:id/status', userController.toggleStatus);

export default router;
