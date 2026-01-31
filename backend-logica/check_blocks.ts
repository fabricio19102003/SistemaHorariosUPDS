
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- CHECKING TIME BLOCKS ---');
    const blocks = await prisma.timeBlock.findMany({
        orderBy: { startTime: 'asc' }
    });

    if (blocks.length === 0) {
        console.log('NO BLOCKS FOUND IN DB!');
    } else {
        console.log(`Found ${blocks.length} blocks:`);
        blocks.forEach(b => console.log(`${b.id}: ${b.name} [${b.startTime} - ${b.endTime}] isBreak=${b.isBreak}`));
    }
    console.log('--- END CHECK ---');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
