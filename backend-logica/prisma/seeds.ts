
import { PrismaClient, Role, DayOfWeek, ClassroomType, ScheduleStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// --- DATOS REALES EXTRAÍDOS DE TUS CSV ---

const TIME_BLOCKS = [
    // Turno Mañana
    { name: 'M1', startTime: '06:30', endTime: '07:15', isBreak: false },
    { name: 'M2', startTime: '07:15', endTime: '08:00', isBreak: false },
    { name: 'RECESO-1', startTime: '08:00', endTime: '08:10', isBreak: true }, // 10 min break
    { name: 'M3', startTime: '08:10', endTime: '08:55', isBreak: false },
    { name: 'M4', startTime: '08:55', endTime: '09:40', isBreak: false },
    { name: 'RECESO-2', startTime: '09:40', endTime: '09:50', isBreak: true }, // 10 min break
    { name: 'M5', startTime: '09:50', endTime: '10:35', isBreak: false },
    { name: 'M6', startTime: '10:35', endTime: '11:20', isBreak: false },
    { name: 'M7', startTime: '11:20', endTime: '12:05', isBreak: false },
    // Turno Tarde/Noche (Muestreo)
    { name: 'N1', startTime: '17:30', endTime: '18:15', isBreak: false },
    { name: 'N2', startTime: '18:15', endTime: '19:00', isBreak: false },
    { name: 'RECESO-3', startTime: '19:00', endTime: '19:10', isBreak: true }, // 10 min break
    { name: 'N3', startTime: '19:10', endTime: '19:55', isBreak: false },
    { name: 'N4', startTime: '19:55', endTime: '20:40', isBreak: false },
    { name: 'RECESO-4', startTime: '20:40', endTime: '20:50', isBreak: true }, // 10 min break
    { name: 'N5', startTime: '20:50', endTime: '21:35', isBreak: false },
    { name: 'N6', startTime: '21:35', endTime: '22:20', isBreak: false },
    { name: 'N7', startTime: '22:20', endTime: '23:05', isBreak: false },
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
    { code: 'MED-0101', name: 'Histología y Biología Celular I', credits: 80, semester: 1, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0102', name: 'Salud Pública Comunidad I', credits: 80, semester: 1, category: 'SALUD PÚBLICA', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MED-0103', name: 'Bioquímica Biología Molecular I', credits: 80, semester: 1, category: 'BÁSICA - FUNCIONAL', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { code: 'MED-0104', name: 'Inglés Técnico I', credits: 40, semester: 1, category: 'ÉTICA', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { code: 'MED-0105', name: 'Embriología Humana I', credits: 80, semester: 1, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0106', name: 'Caso Básico Clínico I', credits: 60, semester: 1, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0107', name: 'Anatomía Humana I', credits: 100, semester: 1, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },

    // 2do Semestre
    { code: 'MED-0201', name: 'Histología y Biología Celular II', credits: 80, semester: 2, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0202', name: 'Salud Pública Comunidad II', credits: 80, semester: 2, category: 'SALUD PÚBLICA', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MED-0203', name: 'Bioquímica Biología Molecular II', credits: 80, semester: 2, category: 'BÁSICA - FUNCIONAL', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { code: 'MED-0204', name: 'Inglés Técnico II', credits: 40, semester: 2, category: 'ÉTICA', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { code: 'MED-0205', name: 'Embriología Humana II', credits: 80, semester: 2, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0206', name: 'Caso Básico Clínico II', credits: 60, semester: 2, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0207', name: 'Anatomía Humana II', credits: 100, semester: 2, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },

    // 3er Semestre
    { code: 'MED-0301', name: 'Fisiología I', credits: 80, semester: 3, category: 'BÁSICA - FUNCIONAL', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { code: 'MED-0302', name: 'Introducción a la Cirugía I', credits: 80, semester: 3, category: 'CIRUGÍA', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { code: 'MED-0303', name: 'Promoción de la Salud en el Ciclo de Vida I', credits: 80, semester: 3, category: 'SALUD PÚBLICA', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MED-0304', name: 'Informática Biomédica I', credits: 60, semester: 3, category: 'TECNOLOGÍA', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { code: 'MED-0305', name: 'Caso Básico Clínico III', credits: 60, semester: 3, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0306', name: 'Inglés Técnico III', credits: 40, semester: 3, category: 'ÉTICA', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { code: 'MED-0307', name: 'Farmacología I', credits: 80, semester: 3, category: 'BÁSICA - FUNCIONAL', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },

    // 4to Semestre
    { code: 'MED-0401', name: 'Microbiología y Parasitología', credits: 80, semester: 4, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0402', name: 'Fisiología II', credits: 80, semester: 4, category: 'BÁSICA - FUNCIONAL', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { code: 'MED-0403', name: 'Introducción a la Cirugía II', credits: 80, semester: 4, category: 'CIRUGÍA', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { code: 'MED-0404', name: 'Inglés Técnico IV', credits: 40, semester: 4, category: 'ÉTICA', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { code: 'MED-0405', name: 'Farmacología II', credits: 80, semester: 4, category: 'BÁSICA - FUNCIONAL', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0406', name: 'Promoción de la Salud en el Ciclo de Vida II', credits: 80, semester: 4, category: 'SALUD PÚBLICA', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MED-0407', name: 'Informática Biomédica II', credits: 60, semester: 4, category: 'TECNOLOGÍA', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { code: 'MED-0408', name: 'Caso Básico Clínico IV', credits: 60, semester: 4, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },

    // 5to Semestre
    { code: 'MED-0501', name: 'Medicina Psicológica y Comunicación', credits: 60, semester: 5, category: 'PSICOLOGÍA', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { code: 'MED-0502', name: 'Propedéutica Médica y Fisiopatología', credits: 80, semester: 5, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0503', name: 'Epidemiología Clínica y Medicina Basada en Evidencia', credits: 80, semester: 5, category: 'SALUD PÚBLICA', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MED-0504', name: 'Soporte Vital Básico', credits: 40, semester: 5, category: 'URGENCIAS', color: 'bg-red-100 text-red-800 border-red-200' },
    { code: 'MED-0505', name: 'Imagenología', credits: 60, semester: 5, category: 'DIAGNÓSTICO', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { code: 'MED-0506', name: 'Laboratorio Clínico', credits: 60, semester: 5, category: 'DIAGNÓSTICO', color: 'bg-blue-100 text-blue-800 border-blue-200' },

    // 6to Semestre
    { code: 'MED-0601', name: 'Neumología', credits: 60, semester: 6, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0602', name: 'Psiquiatría', credits: 60, semester: 6, category: 'PSICOLOGÍA', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { code: 'MED-0603', name: 'Otorrinolaringología', credits: 60, semester: 6, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0604', name: 'Farmacología Terapéutica', credits: 80, semester: 6, category: 'BÁSICA - FUNCIONAL', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0605', name: 'Nefrología', credits: 60, semester: 6, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0606', name: 'Anatomía Patológica I', credits: 80, semester: 6, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0607', name: 'Urología', credits: 60, semester: 6, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0608', name: 'Hematología', credits: 60, semester: 6, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0609', name: 'Cardiología', credits: 60, semester: 6, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },

    // 7mo Semestre
    { code: 'MED-0701', name: 'Oftalmología', credits: 60, semester: 7, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0702', name: 'Genética Clínica', credits: 60, semester: 7, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0703', name: 'Nutrición Humana', credits: 60, semester: 7, category: 'SALUD PÚBLICA', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MED-0704', name: 'Dermatología', credits: 60, semester: 7, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0705', name: 'Endocrinología', credits: 60, semester: 7, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0706', name: 'Anatomía Patológica II', credits: 80, semester: 7, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0707', name: 'Gastroenterología', credits: 60, semester: 7, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0708', name: 'Neurología', credits: 60, semester: 7, category: 'CLÍNICA', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0709', name: 'Antropología Médica e Interculturalidad', credits: 40, semester: 7, category: 'SALUD PÚBLICA', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
]

async function main() {
    console.log('🌱 Iniciando Seed...')

    // 1. Limpiar base de datos (Orden inverso por dependencias)
    // OJO: Usar con cuidado en producción
    try {
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
    } catch (e) {
        console.log('⚠️ Tablas probablemente vacías o inexistentes, continuando...')
    }

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

    // 5.5 Crear Superadmin
    await prisma.user.create({
        data: {
            fullName: 'Super Admin',
            username: 'superadmin',
            email: 'admin@upds.edu.bo',
            password: bcrypt.hashSync('admin123', 10), // Contraseña Real Hasheada
            role: Role.SUPERADMIN
        }
    })
    console.log('🛡️  Superadmin creado (user: superadmin).')

    // 5.6 Crear Test User: Pedro (SUPERADMIN)
    await prisma.user.create({
        data: {
            fullName: 'Pedro',
            username: 'pedro',
            email: 'pedro@upds.edu.bo',
            password: bcrypt.hashSync('admin123', 10),
            role: Role.SUPERADMIN
        }
    })
    console.log('🛡️  Usuario Test creado: Pedro (SUPERADMIN)')

    // 5.7 Crear Test User: Fabricio (ADMIN)
    await prisma.user.create({
        data: {
            fullName: 'Fabricio',
            username: 'fabricio',
            email: 'fabricio@upds.edu.bo',
            password: bcrypt.hashSync('admin123', 10),
            role: Role.ADMIN
        }
    })
    console.log('🛡️  Usuario Test creado: Fabricio (ADMIN)')

    // 5.8 Crear Test User: Daniel (SUPERADMIN)
    await prisma.user.create({
        data: {
            fullName: 'Daniel',
            username: 'daniel',
            email: 'daniel@upds.edu.bo',
            password: bcrypt.hashSync('admin123', 10),
            role: Role.SUPERADMIN
        }
    })
    console.log('🛡️  Usuario Test creado: Daniel (SUPERADMIN)')

    // 6. Crear Docentes y sus Usuarios
    for (const teacherName of TEACHERS_LIST) {
        // Generar email dummy: cindy.camargo@upds.edu.bo
        const email = `${teacherName.toLowerCase().replace(/\s+/g, '.').replace('dr.', '').replace('dra.', '').replace('ing.', '').replace('lic.', '').replace(/^\./, '')}@upds.edu.bo`

        await prisma.user.create({
            data: {
                email: email,
                username: email.split('@')[0], // Generar username desde email
                fullName: teacherName,
                password: 'hashed_password_123', // En un app real, hashear esto
                role: Role.TEACHER,
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
    // 8. SIMULACIÓN DE HORARIO REAL (Ejemplo: Lunes 06:30 - Histología con Cindy Camargo)
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
