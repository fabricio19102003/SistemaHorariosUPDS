
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking superadmin...');
    const user = await prisma.user.findUnique({
        where: { username: 'superadmin' }
    });

    if (!user) {
        console.log('❌ Superadmin user NOT FOUND');
        return;
    }

    console.log('✅ Superadmin found');
    console.log('stored hash:', user.password);

    const isValid = await bcrypt.compare('admin123', user.password);
    console.log(`Password 'admin123' valid? ${isValid ? '✅ YES' : '❌ NO'}`);
}

main().finally(() => prisma.$disconnect());
