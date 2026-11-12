# tasky-web

Frontend de **TASKY**, plataforma SaaS de gestión de proyectos y tareas.
La API vive en el repo `tasky-api` (.NET).

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router · TanStack Query · React Hook Form + Zod

## Empezar

```bash
npm install
cp .env.example .env   # ajusta VITE_API_URL
npm run dev
```

Scripts: `dev`, `build`, `lint`, `preview`.

## Estructura

```
src/
├── app/        router, providers y layout (sidebar)
├── features/   un folder por módulo: auth, dashboard, projects, kanban, tasks, organizations
├── shared/     lib (cn) y componentes UI reutilizables
└── api/        cliente generado desde el OpenAPI de la API (no editar a mano)
```

## Diseño

Los tokens de color (tema oscuro) están en `src/index.css`, dentro de `@theme`.
