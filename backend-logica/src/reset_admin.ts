
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Resetting Superadmin Password...');

    // Hash new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('admin123', salt);

    console.log('🔑 Generated Hash:', hashedPassword);

    try {
        const user = await prisma.user.upsert({
            where: { username: 'superadmin' },
            update: {
                password: hashedPassword,
                isActive: true
            },
            create: {
                username: 'superadmin',
                email: 'admin@upds.edu.bo',
                fullName: 'Super Admin',
                password: hashedPassword,
                role: 'SUPERADMIN',
                isActive: true
            }
        });

        console.log('✅ Superadmin password updated successfully!');
        console.log(`👤 User: ${user.username}, Role: ${user.role}`);
    } catch (error) {
        console.error('❌ Error updating superadmin:', error);
    }
}

main().finally(() => prisma.$disconnect());
