# Contexto del Módulo: Backend Lógica

Este directorio contiene el "cerebro" de la aplicación. Aquí reside la lógica pura de asignación de horarios.

## Responsabilidades
1. **Gestión de Datos Maestros**: CRUD de Docentes, Materias, Aulas.
2. **Motor de Horarios**: Algoritmos para generar y validar propuestas de horario.
3. **API REST**: Exponer estos servicios al frontend.

## Estructura Interna (Sugerida)
```
/src
  /domain       # Entidades y Reglas de Negocio (sin dependencias externas)
  /application  # Casos de Uso (ej: CrearHorario, ValidarDisponibilidad)
  /infrastructure # DB, Server, Controllers
```

## Reglas de Oro
- **No acoplamiento**: El dominio no debe saber que existe una base de datos o HTTP.
- **Tests**: La lógica de horarios es compleja, requiere Unit Tests fuertes.
