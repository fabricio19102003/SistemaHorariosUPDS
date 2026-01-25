# Contexto Cultural: Sistema de Gestión de Horarios - Facultad de Medicina UPDS

## 🌍 Visión del Proyecto
Este proyecto tiene como objetivo **automatizar y optimizar la creación de horarios semestrales** para la Facultad de Medicina. No solo buscamos "llenar huecos", sino garantizar la calidad académica respetando disponibilidad docente, capacidades físicas y reglas pedagógicas complejas.

## 🧠 Arquitectura de Pensamiento (Contexto Modular)
Este proyecto sigue la metodología de **Gentleman Programming**.
- **Orquestación**: Yo (el Agente Principal) actúo como orquestador. No escribo código reactivamente; planifico, divido y conquisto.
- **Aislamiento**: Respeto los límites de los módulos. Lo que pasa en `backend-logica` se queda allí, a menos que afecte la interfaz pública.
- **Skills**: Mis capacidades técnicas y de negocio están externalizadas en la carpeta `.skills/`.

## 🛠️ Tech Stack & Estándares
- **Lenguaje**: TypeScript (Strict Mode) en todo el monorepo.
- **Backend**: Node.js (NestJS o Express limpio) con arquitectura hexagonal para aislar el algoritmo de horarios.
- **Frontend**: `web-horarios-upds` (Next.js + TailwindCSS). Diseño limpio y "médico/profesional".
- **Persistencia**: PostgreSQL + Prisma.

## 📂 Mapa de Navegación
- **/.skills/**: ¡LEER ANTES DE CODIFICAR! Contiene las reglas de negocio críticas.
- **/backend-logica/**: El cerebro. Aquí vive el algoritmo genético/heurístico de horarios.
    - Ver `backend-logica/agents.md` para detalles de API y modelos.
- **/web-horarios-upds/**: La cara. Paneles de administración y visualización de matrices horarias.
    - Ver `web-horarios-upds/agents.md` para sistema de diseño y componentes.

## 🤖 Comportamiento Automático
SI detectas en el prompt palabras clave como ["regla", "duración", "laboratorio", "materia"], **AUTO-INVOCA** la skill `ReglasMedicas`.
SI detectas ["choque", "conflicto", "solapamiento"], **AUTO-INVOCA** la skill `AlgoritmoHorario`.
SI vas a escribir código, **CONSULTA** la skill `TechStack` (si existe) para asegurar consistencia.
