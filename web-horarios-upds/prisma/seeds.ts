
import { PrismaClient, UserRole, DayOfWeek, ClassroomType, ScheduleStatus } from '@prisma/client'

const prisma = new PrismaClient()

// --- DATOS REALES EXTRAÍDOS DE TUS CSV ---

const TIME_BLOCKS = [
    // Turno Mañana
    { name: 'M1', startTime: '06:30', endTime: '07:15' },
    { name: 'M2', startTime: '07:15', endTime: '08:00' },
    { name: 'M3', startTime: '08:10', endTime: '08:55' },
    { name: 'M4', startTime: '08:55', endTime: '09:40' },
    { name: 'M5', startTime: '09:50', endTime: '10:35' },
    { name: 'M6', startTime: '10:35', endTime: '11:20' },
    { name: 'M7', startTime: '11:20', endTime: '12:05' },
    // Turno Tarde/Noche (Muestreo)
    { name: 'N1', startTime: '17:30', endTime: '18:15' },
    { name: 'N2', startTime: '18:15', endTime: '19:00' },
    { name: 'N3', startTime: '19:10', endTime: '19:55' },
    { name: 'N4', startTime: '19:55', endTime: '20:40' },
    { name: 'N5', startTime: '20:50', endTime: '21:35' },
    { name: 'N6', startTime: '21:35', endTime: '22:20' },
    { name: 'N7', startTime: '22:20', endTime: '23:05' },
]

const TEACHERS_LIST = [
    'Cindy Camargo', 'Marcos Daza', 'Miguel Crespo', 'Carlos Aguilar',
    'Gumer Garrado', 'Taboada', 'Ing. Oyola', 'Dr. Lutfi', 'Dr. Marcelo Perez',
    'Lic. Massiel', 'Dra. Alejandra Escobar', 'Dra. Shalimar Hashimoto',
    'Dr. Ruddy Landivar', 'Dra. Eliana Loza', 'Dr. Erick Roca', 'Dr. Fukumoto',
    'Dr. Gumucio', 'Dra. Estefani Rodriguez', 'Dra. Vanessa Viadez'
]

const SUBJECTS_LIST = [
    // 1er Semestre
    { code: 'MED-101', name: 'Histología y Biología Celular I', credits: 5, semester: 1 },
    { code: 'MED-102', name: 'Embriología Humana I', credits: 5, semester: 1 },
    { code: 'MED-103', name: 'Anatomía Humana I', credits: 6, semester: 1 },
    { code: 'MED-104', name: 'Salud Pública Comunidad I', credits: 4, semester: 1 },
    { code: 'MED-105', name: 'Bioquímica Biología Molecular I', credits: 5, semester: 1 },
    { code: 'MED-106', name: 'Introducción a la Salud Mental I', credits: 3, semester: 1 },
    { code: 'MED-107', name: 'Inglés Técnico I', credits: 3, semester: 1 },
    { code: 'MED-108', name: 'Caso Básico Clínico I', credits: 4, semester: 1 },
    // 4to Semestre
    { code: 'MED-401', name: 'Microbiología y Parasitología', credits: 5, semester: 4 },
    { code: 'MED-402', name: 'Cirugía II', credits: 5, semester: 4 },
    { code: 'MED-403', name: 'Fisiología II', credits: 5, semester: 4 },
    { code: 'MED-404', name: 'Farmacología II', credits: 5, semester: 4 },
    { code: 'MED-405', name: 'Info. Biomédica 2', credits: 3, semester: 4 },
    { code: 'MED-406', name: 'Promoción de la Salud II', credits: 4, semester: 4 },
    { code: 'MED-407', name: 'Caso Clínico IV', credits: 4, semester: 4 },
    // 8vo Semestre
    { code: 'MED-801', name: 'Prácticas Hospitalarias', credits: 8, semester: 8 },
    { code: 'MED-802', name: 'Pediatría', credits: 6, semester: 8 },
    { code: 'MED-803', name: 'Ginecología y Obstetricia', credits: 6, semester: 8 },
    { code: 'MED-804', name: 'Bioética Médica', credits: 3, semester: 8 },
]

async function main() {
    console.log('🌱 Iniciando Seed...')

    // 1. Limpiar base de datos (Orden inverso por dependencias)
    // OJO: Usar con cuidado en producción
    await prisma.classSchedule.deleteMany()
    await prisma.teacherUnavailability.deleteMany()
    await prisma.subject.deleteMany()
    await prisma.teacher.deleteMany()
    await prisma.timeBlock.deleteMany()
    await prisma.classroom.deleteMany()
    await prisma.career.deleteMany()
    await prisma.faculty.deleteMany()
    await prisma.academicPeriod.deleteMany()
    await prisma.user.deleteMany()

    console.log('🧹 Base de datos limpiada.')

    // 2. Crear Facultad y Carrera
    const facultadSalud = await prisma.faculty.create({
        data: {
            name: 'Facultad de Ciencias de la Salud',
            careers: {
                create: {
                    name: 'Medicina',
                    code: 'MED',
                }
            }
        },
        include: { careers: true }
    })

    const carreraMedicina = facultadSalud.careers[0]
    console.log(`✅ Carrera creada: ${carreraMedicina.name}`)

    // 3. Crear Periodo Académico
    const periodo = await prisma.academicPeriod.create({
        data: {
            name: 'Gestión 1-2026',
            startDate: new Date('2026-02-01'),
            endDate: new Date('2026-06-30'),
            isActive: true
        }
    })

    // 4. Crear Bloques de Tiempo
    for (const block of TIME_BLOCKS) {
        await prisma.timeBlock.create({ data: block })
    }
    console.log(`✅ ${TIME_BLOCKS.length} Bloques de tiempo creados.`)

    // 5. Crear Materias (Subjects)
    for (const subj of SUBJECTS_LIST) {
        await prisma.subject.create({
            data: {
                ...subj,
                careerId: carreraMedicina.id
            }
        })
    }
    console.log(`✅ ${SUBJECTS_LIST.length} Materias creadas.`)

    // 6. Crear Docentes y sus Usuarios
    for (const teacherName of TEACHERS_LIST) {
        // Generar email dummy: cindy.camargo@upds.edu.bo
        const email = `${teacherName.toLowerCase().replace(/\s+/g, '.').replace('dr.', '').replace('dra.', '').replace('ing.', '').replace('lic.', '').replace(/^\./, '')}@upds.edu.bo`

        await prisma.user.create({
            data: {
                email: email,
                fullName: teacherName,
                password: 'hashed_password_123', // En un app real, hashear esto
                role: UserRole.TEACHER,
                teacherProfile: {
                    create: {
                        contractType: 'Tiempo Parcial',
                        specialty: 'Medicina General' // Placeholder
                    }
                }
            }
        })
    }
    console.log(`✅ ${TEACHERS_LIST.length} Docentes creados.`)

    // 7. Crear Aulas (Basado en lo visto: Aula 14, Labs, Anfiteatro)
    const classroomsData = [
        { name: 'AULA-14', capacity: 40, type: ClassroomType.THEORY_ROOM },
        { name: 'ANFITEATRO', capacity: 60, type: ClassroomType.THEORY_ROOM },
        { name: 'LAB-HISTOLOGIA', capacity: 25, type: ClassroomType.LABORATORY },
        { name: 'LAB-EMBRIOLOGIA', capacity: 25, type: ClassroomType.LABORATORY },
        { name: 'LAB-BIOQUIMICA', capacity: 25, type: ClassroomType.LABORATORY },
        { name: 'HOSPITAL-PRACTICA', capacity: 100, type: ClassroomType.VIRTUAL }, // Para prácticas externas
    ]

    for (const room of classroomsData) {
        await prisma.classroom.create({ data: room })
    }
    console.log(`✅ ${classroomsData.length} Aulas creadas.`)

    // ------------------------------------------------------------------
    // 8. SIMULACIÓN DE HORARIO REAL (Ejemplo: Lunes 06:30 - Histología)
    // ------------------------------------------------------------------

    // Recuperar IDs necesarios
    const histologia = await prisma.subject.findFirst({ where: { name: 'Histología y Biología Celular I' } })
    const cindy = await prisma.user.findFirst({ where: { fullName: 'Cindy Camargo' }, include: { teacherProfile: true } })
    const aula14 = await prisma.classroom.findFirst({ where: { name: 'AULA-14' } })
    const bloqueM1 = await prisma.timeBlock.findFirst({ where: { name: 'M1' } }) // 06:30

    if (histologia && cindy?.teacherProfile && aula14 && bloqueM1) {
        await prisma.classSchedule.create({
            data: {
                subjectId: histologia.id,
                teacherId: cindy.teacherProfile.id,
                classroomId: aula14.id,
                periodId: periodo.id,
                timeBlockId: bloqueM1.id,
                dayOfWeek: DayOfWeek.MONDAY,
                groupCode: 'M-06',
                status: ScheduleStatus.PUBLISHED
            }
        })
        console.log('📅 Horario de ejemplo creado: Lunes 06:30 - Histología con Cindy Camargo')
    }

    console.log('🚀 Seed completado exitosamente.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
