import { Request, Response } from 'express';
import { UserService } from '../../../application/services/user.service';

export class UserController {
    constructor(private userService: UserService) { }

    getAll = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.create(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await this.userService.update(id, req.body);
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ error: 'Error al actualizar usuario' });
        }
    }

    updateRole = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { role } = req.body;
            const user = await this.userService.updateRole(id, role);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: 'Error al actualizar rol' });
        }
    }

    toggleStatus = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await this.userService.toggleStatus(id);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: 'Error al cambiar estado' });
        }
    }
}
