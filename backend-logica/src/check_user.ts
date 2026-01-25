import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔍 Buscando usuario superadmin...');
    const user = await prisma.user.findUnique({
        where: { username: 'superadmin' }
    });

    if (user) {
        console.log('✅ Usuario encontrado:');
        console.log(JSON.stringify(user, null, 2));
    } else {
        console.error('❌ Usuario superadmin NO encontrado.');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
