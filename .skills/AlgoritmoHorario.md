---
Name: AlgoritmoHorario
Description: Estrategia y lógica para la detección de conflictos y asignación de horarios.
Trigger: ["algoritmo", "conflicto", "choque", "solapamiento", "asignar", "optimizar"]
Scope: Backend Logic & Planning Module
---

# 🧠 Skill: Algoritmo de Asignación de Horarios

Este skill define cómo "pensamos" al asignar un horario. No es código, es lógica pura.

## 1. Detección de Conflictos (Hard Constraints)
Un horario es inválido si:
- **Docente Duplicado**: El Dr. X tiene clase en Aula 1 y Aula 2 al mismo tiempo.
- **Aula Duplicada**: El Aula 1 tiene Materia A y Materia B al mismo tiempo.
- **Grupo Duplicado**: El Grupo 1 tiene Materia A y Materia B al mismo tiempo.

## 2. Priorización de Asignación
El orden de llenado debe ser:
1. **Recursos Escasos**: Primero asignar Laboratorios y Prácticas Clínicas (son los cuellos de botella).
2. **Docentes Restrictivos**: Luego asignar a los docentes con menor disponibilidad horaria.
3. **Resto**: Asignar teorías en aulas estándar.

## 3. Validación de Espacios
- Si `Inscritos estimados` > `Capacidad Aula`, buscar aula más grande o dividir grupo.
- Si es Laboratorio, validación estricta de cupo.

## 4. Heurística de Optimización
- Minimizar "huecos" para los estudiantes (bloques libres entre clases).
- Maximizar uso de aulas en horas pico (compactar horarios).
