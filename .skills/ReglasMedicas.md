---
Name: ReglasMedicas
Description: Lógica de negocio y restricciones académicas de la UPDS Facultad de Medicina.
Trigger: ["duración", "regla", "laboratorio", "materia", "requisito", "bloque", "medicina"]
Scope: Global (Backend Validation & Frontend Forms)
---

# 🏥 Skill: Reglas Médicas y Académicas UPDS

Esta skill define las "Leyes" que el algoritmo no puede romper.

## 1. Estructura de Bloques Horarios
- **Bloque Estándar**: 45 minutos.
- **Módulo Académico**: Generalmente 2 bloques (90 min) de teoría.
- **Prácticas**: Bloques de 3 a 4 horas (180-240 min) dependiendo de la materia.

## 2. Tipos de Materias y Restricciones
### A. Materias Teóricas (Aulas)
- Ej: Anatomía I (Teoría), Histología.
- **Capacidad**: Hasta 60 alumnos.
- **Recurso**: Aula estándar con proyector.

### B. Prácticas de Laboratorio (Crítico)
- Ej: Disección, Microscopía.
- **Capacidad**: MÁXIMO 15-20 alumnos por grupo (Estricto).
- **Recurso**: Laboratorios específicos (Lab A, Lab B).
- **Regla de Oro**: No se puede programar teoría de la misma materia simultáneamente con su práctica para el mismo grupo.

### C. Prácticas Clínicas (Hospitales)
- Requieren traslado. Se debe dejar una "ventana de traslado" de 60 min si el bloque anterior fue en campus.

## 3. Reglas de Disponibilidad Docente
- Los doctores suelen ser profesionales externos.
- **Prioridad Alta**: Respetar sus franjas de "No Disponible".
- Un docente no puede estar en dos lugares (obvio, pero el algoritmo debe validarlo).

## 4. Correlatividades (Soft Constraint)
- Intentar no solapar materias del mismo semestre (ej: Semestre 1).
- Si Anatomía y Histología son del Sem 1, no pueden dictarse el Lunes a las 08:00 AM ambas para el Grupo A.

## Instrucciones de Autoinvocación
Cuando realices validaciones de horarios:
1. Verifica si la materia requiere Laboratorio.
2. Chequea el tamaño del grupo vs capacidad del aula.
3. Asegura tiempos de traslado si detectas el tag "Hospital".
