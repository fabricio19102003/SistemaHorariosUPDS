import prisma from '../../infrastructure/database/prisma.client';

export class ScheduleTemplateService {

    async saveTemplate(data: { name: string, shift?: string, blocks: any[] }) {
        return await prisma.scheduleTemplate.create({
            data: {
                name: data.name,
                shift: data.shift,
                blocks: data.blocks
            }
        });
    }

    async getAll() {
        return await prisma.scheduleTemplate.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }

    async delete(id: number) {
        return await prisma.scheduleTemplate.delete({
            where: { id }
        });
    }

    async applyTemplate(templateId: number) {
        const template = await prisma.scheduleTemplate.findUnique({
            where: { id: templateId }
        });

        if (!template) throw new Error('Template not found');

        const templateBlocks = template.blocks as any[];

        // Transaction: Update existing blocks or create new ones
        return await prisma.$transaction(async (tx) => {
            // 1. Get existing global blocks
            const currentBlocks = await tx.timeBlock.findMany({
                orderBy: { id: 'asc' } // Assuming ID order is the logical order
            });

            // 2. Update existing ones
            for (let i = 0; i < currentBlocks.length; i++) {
                if (i < templateBlocks.length) {
                    const tBlock = templateBlocks[i];
                    await tx.timeBlock.update({
                        where: { id: currentBlocks[i].id },
                        data: {
                            startTime: tBlock.startTime,
                            endTime: tBlock.endTime,
                            isBreak: !!tBlock.isBreak,
                            // Optionally update name if needed, but user emphasized "Time"
                        }
                    });
                } else {
                    // Current has MORE than template. Delete extras? 
                    // Or just leave them alone? 
                    // If we switch from 10 blocks to 5 blocks, the extra 5 might still have classes.
                    // Let's leave them for now to be safe, or user 'delete' manually.
                }
            }

            // 3. Create NEW blocks if template has MORE
            if (templateBlocks.length > currentBlocks.length) {
                for (let i = currentBlocks.length; i < templateBlocks.length; i++) {
                    const tBlock = templateBlocks[i];
                    await tx.timeBlock.create({
                        data: {
                            name: tBlock.name || `Bloque ${i + 1}`,
                            startTime: tBlock.startTime,
                            endTime: tBlock.endTime,
                            isBreak: !!tBlock.isBreak
                        }
                    });
                }
            }

            return true;
        });
    }
}
