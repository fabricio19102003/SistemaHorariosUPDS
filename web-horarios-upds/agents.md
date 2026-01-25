# Contexto del Módulo: Frontend Interfaz (Web)

Este directorio contiene la interfaz de usuario. Su responsabilidad es mostrar datos claros y permitir la manipulación intuitiva de los horarios.

## Responsabilidades
1. **Visualización**: Tablas de horarios legibles (Matriz Semana x Hora).
2. **Interacción**: Drag & Drop (si es posible) para mover clases.
3. **Feedback**: Mostrar conflictos en tiempo real (rojo = choque).

## Stack Específico
- **Next.js**: Aprovechando SSR para carga rápida inicial.
- **Tailwind**: Utilidad para diseño rápido.

## Estructura
- `/components`: UI pura.
- `/pages` (o `/app`): Rutas.
- `/hooks`: Lógica de vista reutilizable.
