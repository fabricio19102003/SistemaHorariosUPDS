import dotenv from 'dotenv';
import app from './infrastructure/http/app';
import prisma from './infrastructure/database/prisma.client';

dotenv.config();

const PORT = process.env.PORT || 3001;

async function bootstrap() {
    try {
        // Test DB connection
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
}

bootstrap();
