# AGENTS.md

Guía para agentes de código y colaboradores que trabajen en **tasky-web**, el frontend de TASKY (plataforma SaaS de gestión de proyectos y tareas). La API vive en el repositorio `tasky-api` (.NET).

## Comandos

```bash
npm install
npm run dev      # servidor de desarrollo (Vite)
npm run build    # tsc -b && vite build; debe pasar sin errores
npm run lint     # oxlint; debe quedar en 0 warnings y 0 errors
```

Antes de dar un cambio por terminado, ejecuta `npm run build` y `npm run lint`.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router · TanStack Query · React Hook Form + Zod · lucide-react · @dnd-kit/core.

## Estructura

- `src/app/`: router, providers y layout (sidebar).
- `src/features/<módulo>/`: un folder por módulo (`auth`, `dashboard`, `projects`, `kanban`, `tasks`, `organizations`), con `pages/`, `components/`, `data/` y `types.ts`.
- `src/shared/`: utilidades (`lib/`) y componentes de UI reutilizables (`ui/`).
- `src/api/`: cliente generado desde el OpenAPI de tasky-api. **No editar a mano.**

## Convenciones de código

- Alias de rutas: importa con `@/` (por ejemplo `@/shared/ui/Button`), no con rutas relativas largas.
- TypeScript estricto con `verbatimModuleSyntax` y `erasableSyntaxOnly`: usa `import type` para tipos y no uses `enum`; usa uniones de strings.
- Estilos solo con Tailwind. Los colores salen de los tokens de `@theme` en `src/index.css` (`bg-surface`, `text-fg-muted`, `border-line`, `text-accent`...). No añadas colores sueltos si ya existe un token.
- Las clases dinámicas de Tailwind deben ser estáticas (mapas como `Record<..., string>`) para que se detecten al compilar.
- Usa `cn()` de `@/shared/lib/cn` para combinar clases.
- Formularios con React Hook Form + Zod.
- La interfaz está en **español**; el código (nombres, tipos, commits) está en inglés.
- Accesibilidad: controles con nombre accesible, foco visible, uso de elementos nativos (`button`, `select`, `label`) antes que `div` clicables, y soporte de teclado.
- Los módulos nuevos siguen el layout de `features/<módulo>/`. No importes componentes internos de otra feature salvo tipos y datos compartidos explícitos.

## Datos de ejemplo

Mientras la API no esté conectada, cada feature usa datos locales en `features/<módulo>/data/mock.ts`, con el comentario "Datos de ejemplo". Al integrar la API, esos datos se reemplazan por llamadas con TanStack Query y el cliente de `src/api/`; no mezcles ambos en un mismo componente.

## Git y Pull Requests

- Ramas: `main` solo recibe merges desde `develop` al publicar. Cada funcionalidad va en `feature/<nombre>`, creada desde `develop`, y su PR apunta a `develop`.
- Commits con [Conventional Commits](https://www.conventionalcommits.org/) **en inglés** (`feat(kanban): add kanban board`). Sin trailers de coautoría.
- Las PRs usan `.github/pull_request_template.md` (Summary, Changes, How to test, Notes) y también se redactan en inglés.
- Haz commit solo cuando se pida explícitamente.
