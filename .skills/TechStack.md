---
Name: TechStack
Description: Definición del stack tecnológico y guías de estilo para el proyecto.
Trigger: ["stack", "tecnología", "node", "react", "typescript", "estilo", "lint"]
Scope: Global Development
---

# 🛠️ Skill: Tech Stack & Coding Standards

## Backend
- **Framework**: Node.js con Express (o NestJS si la complejidad crece).
- **Arquitectura**: Clean Architecture / Hexagonal.
  - `domain/`: Reglas de negocio puras (Entities, Value Objects).
  - `application/`: Casos de uso (Use Cases).
  - `infrastructure/`: Implementaciones (Express controllers, Prisma repositories).
- **ORM**: Prisma IO.
- **Validación**: Zod.

## Frontend
- **Framework**: React (Vite) + TypeScript.
- **Estilos**: TailwindCSS.
- **Estado**: Zustand o Context API (evitar Redux a menos que sea necesario).
- **Componentes**: Diseñar componentes pequeños y reutilizables.

## General Standards
- **Idioma**: Código en Inglés (`const schedule`, `function createTimeSlot`), Comentarios/Docs en Español (para el equipo/usuario).
- **Nombres**: camelCase para variables/funcs, PascalCase para Clases/Componentes.
- **Commits**: Conventional Commits (`feat: agregar validación de aula`).
