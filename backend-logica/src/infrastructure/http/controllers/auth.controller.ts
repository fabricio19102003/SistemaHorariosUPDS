import { Request, Response } from 'express';
import { AuthService } from '../../../application/services/auth.service';

export class AuthController {
    constructor(private authService: AuthService) { }

    login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                res.status(400).json({ error: 'Username y password son requeridos' });
                return;
            }

            const result = await this.authService.login(username, password);
            res.json(result);
        } catch (error: any) {
            console.error(error);
            if (error.message === 'Credenciales inválidas' || error.message === 'Usuario inactivo') {
                res.status(401).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Error del servidor' });
            }
        }
    }
}
