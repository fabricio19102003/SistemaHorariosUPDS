
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
    { code: 'MMF-0110', name: 'ANATOMÍA HUMANA I', credits: 100, semester: 1, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MMF-0115', name: 'EMBRIOLOGÍA GENERAL', credits: 80, semester: 1, category: 'BÁSICA - FUNCIONAL', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MMF-0120', name: 'BIOLOGÍA CELULAR I', credits: 80, semester: 1, category: 'MEDICINA I', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MMF-0130', name: 'BIOQUÍMICA I', credits: 80, semester: 1, category: 'MEDICINA II', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { code: 'SCP-0140', name: 'PRIMEROS AUXILIOS COMUNITARIO I', credits: 60, semester: 1, category: 'CIRUGÍA I', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { code: 'PSI-0150', name: 'INTRODUCCIÓN A LA PSICOLOGÍA MÉDICA I', credits: 40, semester: 1, category: 'CIRUGÍA II', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { code: 'CREC-0160', name: 'CASO BÁSICO CLÍNICO I', credits: 60, semester: 1, category: 'CIRUGÍA III', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'LIN-0135', name: 'INGLÉS I (TÉCNICO I)', credits: 40, semester: 1, category: 'ÉTICA', color: 'bg-amber-50 text-amber-800 border-amber-200' },

    // 2do Semestre
    { code: 'MMF-0210', name: 'ANATOMÍA HUMANA II', credits: 100, semester: 2, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MMF-0215', name: 'HISTOLOGÍA', credits: 80, semester: 2, category: 'BÁSICA - FUNCIONAL', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MMF-0225', name: 'BIOLOGÍA CELULAR II', credits: 80, semester: 2, category: 'MEDICINA I', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MMF-0235', name: 'BIOQUÍMICA II', credits: 80, semester: 2, category: 'MEDICINA II', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { code: 'SCP-0240', name: 'PRIMEROS AUXILIOS COMUNITARIO II', credits: 60, semester: 2, category: 'CIRUGÍA I', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { code: 'PSI-0250', name: 'INTRODUCCIÓN A LA PSICOLOGÍA MÉDICA II', credits: 40, semester: 2, category: 'CIRUGÍA II', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { code: 'CREC-0260', name: 'CASO BÁSICO CLÍNICO II', credits: 60, semester: 2, category: 'CIRUGÍA III', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'LIN-0330', name: 'INGLÉS II (TÉCNICO II)', credits: 40, semester: 2, category: 'ÉTICA', color: 'bg-amber-50 text-amber-800 border-amber-200' },

    // 3er Semestre
    { code: 'MMF-0310', name: 'ANATOMÍA HUMANA III', credits: 100, semester: 3, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'CMI-0320', name: 'INTRODUCCIÓN A LA CLÍNICA I', credits: 80, semester: 3, category: 'MEDICINA I', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MMF-0335', name: 'BIOQUÍMICA III', credits: 80, semester: 3, category: 'MEDICINA II', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { code: 'SCP-0340', name: 'PROPEDÉUTICA Y EPIDEMIOLOGÍA I', credits: 60, semester: 3, category: 'MEDICINA III', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { code: 'SCP-0350', name: 'INFORMÁTICA BIOMÉDICA I', credits: 60, semester: 3, category: 'CIRUGÍA II', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { code: 'CBC-0300', name: 'CASO BÁSICO CLÍNICO III', credits: 60, semester: 3, category: 'CIRUGÍA III', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'LIN-0430', name: 'INGLÉS III (TÉCNICO III)', credits: 40, semester: 3, category: 'ÉTICA', color: 'bg-amber-50 text-amber-800 border-amber-200' },

    // 4to Semestre
    { code: 'MMF-0410', name: 'FISIOLOGÍA I', credits: 80, semester: 4, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'CMI-0420', name: 'INTRODUCCIÓN A LA CLÍNICA II', credits: 80, semester: 4, category: 'MEDICINA I', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MMF-0435', name: 'MICROBIOLOGÍA Y PARASITOLOGÍA', credits: 80, semester: 4, category: 'MEDICINA II', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { code: 'SCP-0440', name: 'PROPEDÉUTICA Y EPIDEMIOLOGÍA II', credits: 80, semester: 4, category: 'MEDICINA III', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { code: 'SCP-0450', name: 'INFORMÁTICA BIOMÉDICA II', credits: 60, semester: 4, category: 'CIRUGÍA II', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { code: 'CBC-0400', name: 'CASO INTEGRADO CLÍNICO IV', credits: 60, semester: 4, category: 'CIRUGÍA III', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'LIN-0440', name: 'INGLÉS IV (CONVERSACIONAL I)', credits: 40, semester: 4, category: 'ÉTICA', color: 'bg-amber-50 text-amber-800 border-amber-200' },

    // 5to Semestre
    { code: 'MED-0510', name: 'PATOLOGÍA GENERAL Y FISIOPATOLOGÍA', credits: 80, semester: 5, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0515', name: 'FISIOLOGÍA II', credits: 80, semester: 5, category: 'BÁSICA - FUNCIONAL', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0520', name: 'SEMIOLOGÍA', credits: 80, semester: 5, category: 'MEDICINA I', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MED-0530', name: 'PSICOLOGÍA Y SALUD MENTAL', credits: 60, semester: 5, category: 'MEDICINA II', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { code: 'PSI-0540', name: 'EPIDEMIOLOGÍA E INVESTIGACIÓN', credits: 60, semester: 5, category: 'MEDICINA III', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { code: 'SVB-0550', name: 'SOPORTE VITAL BÁSICO', credits: 40, semester: 5, category: 'CIRUGÍA II', color: 'bg-purple-100 text-purple-800 border-purple-200' },

    // 6to Semestre
    { code: 'PAT-0605', name: 'ANATOMÍA PATOLÓGICA', credits: 80, semester: 6, category: 'BÁSICA - MORFOLÓGICA', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0610', name: 'FARMACOLOGÍA I', credits: 80, semester: 6, category: 'BÁSICA - FUNCIONAL', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { code: 'MED-0620', name: 'DIAGNÓSTICO POR IMÁGENES', credits: 60, semester: 6, category: 'MEDICINA I', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MED-0630', name: 'OTORRINOLARINGOLOGÍA', credits: 60, semester: 6, category: 'MEDICINA II', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { code: 'MED-0640', name: 'DERMATOLOGÍA', credits: 60, semester: 6, category: 'MEDICINA III', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { code: 'MED-0675', name: 'FARMACOLOGÍA II', credits: 80, semester: 6, category: 'CIRUGÍA I', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { code: 'MED-0710-PRE', name: 'OFTALMOLOGÍA', credits: 60, semester: 6, category: 'CIRUGÍA II', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { code: 'MED-0780-PRE', name: 'INFECTOLOGÍA', credits: 60, semester: 6, category: 'CIRUGÍA III', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0640-NEF', name: 'NEFROLOGÍA', credits: 60, semester: 6, category: 'ÉTICA', color: 'bg-amber-50 text-amber-800 border-amber-200' },

    // 7mo Semestre
    { code: 'MMF-0705', name: 'ANATOMÍA PATOLÓGICA II', credits: 80, semester: 7, category: 'MEDICINA I', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { code: 'MED-0710', name: 'GASTROENTEROLOGÍA', credits: 60, semester: 7, category: 'MEDICINA II', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { code: 'MED-0720', name: 'DERMATOLOGÍA CLÍNICA', credits: 60, semester: 7, category: 'MEDICINA III', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { code: 'MED-0730', name: 'ENDOCRINOLOGÍA', credits: 60, semester: 7, category: 'CIRUGÍA I', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { code: 'MED-0740', name: 'OFTALMOLOGÍA CLÍNICA', credits: 60, semester: 7, category: 'CIRUGÍA II', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { code: 'MED-0780', name: 'INFECTOLOGÍA CLÍNICA', credits: 60, semester: 7, category: 'CIRUGÍA III', color: 'bg-lime-100 text-lime-800 border-lime-200' },
    { code: 'MED-0770', name: 'GENÉTICA CLÍNICA', credits: 60, semester: 7, category: 'ÉTICA', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { code: 'MED-0660', name: 'HEMATOLOGÍA', credits: 60, semester: 7, category: 'PSICOLOGÍA', color: 'bg-pink-50 text-pink-600 border-pink-100' },
    { code: 'SCP-0780', name: 'ANTROPOLOGÍA MÉDICA', credits: 40, semester: 7, category: 'SALUD PÚBLICA', color: 'bg-violet-100 text-violet-800 border-violet-200' },
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
