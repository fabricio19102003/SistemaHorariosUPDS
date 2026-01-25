import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import teacherRoutes from './routes/teacher.routes';
import subjectRoutes from './routes/subject.routes';
import classroomRoutes from './routes/classroom.routes';
import generatorRoutes from './routes/generator.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

app.use('/api/teachers', teacherRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/generator', generatorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Basic Route
app.get('/', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        message: 'Sistema de Horarios UPDS API v1',
        timestamp: new Date().toISOString()
    });
});

// Health Check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

export default app;
