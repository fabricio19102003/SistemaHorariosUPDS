import prisma from '../../infrastructure/database/prisma.client';

export class SubjectService {

    async findAll() {
        return await prisma.subject.findMany({
            include: {
                career: true,
                defaultTeacher: {
                    include: {
                        user: {
                            select: { fullName: true }
                        }
                    }
                }
            },
            orderBy: { semester: 'asc' }
        });
    }

    async create(data: any) {
        // Verificar unicidad de código
        const existing = await prisma.subject.findUnique({
            where: { code: data.code }
        });

        if (existing) {
            throw new Error(`La materia con código ${data.code} ya existe`);
        }

        return await prisma.subject.create({
            data: {
                name: data.name,
                code: data.code,
                credits: parseInt(data.credits),
                semester: parseInt(data.semester),
                careerId: parseInt(data.careerId),
                defaultTeacherId: data.defaultTeacherId || null,
                category: data.category || null,
                color: data.color || null
            },
            include: {
                career: true,
                defaultTeacher: {
                    include: {
                        user: { select: { fullName: true } }
                    }
                }
            }
        });
    }

    async update(id: number, data: any) {
        return await prisma.subject.update({
            where: { id },
            data: {
                name: data.name,
                credits: parseInt(data.credits),
                semester: parseInt(data.semester),
                careerId: parseInt(data.careerId),
                defaultTeacherId: data.defaultTeacherId || null,
                category: data.category || null,
                color: data.color || null
            },
            include: {
                career: true,
                defaultTeacher: {
                    include: {
                        user: { select: { fullName: true } }
                    }
                }
            }
        });
    }
}
