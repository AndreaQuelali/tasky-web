import type { Person, Project } from '../types'

// Datos de ejemplo. Se reemplazan por llamadas a tasky-api más adelante.

const mateo: Person = { id: 'u1', name: 'Mateo Vega', initials: 'MV', tone: 'blue' }
const lucia: Person = { id: 'u2', name: 'Lucía Paz', initials: 'LP', tone: 'violet' }
const sofia: Person = { id: 'u3', name: 'Sofía Quiroga', initials: 'SQ', tone: 'amber' }

export const projects: Project[] = [
  {
    id: 'plataforma-api',
    name: 'Plataforma API',
    description: 'API REST en .NET para usuarios, organizaciones y tareas',
    color: 'accent',
    lead: mateo,
    progress: 64,
    startDate: '2026-10-03',
    endDate: '2026-12-12',
    status: 'active',
  },
  {
    id: 'rediseno-web',
    name: 'Rediseño web',
    description: 'Nueva interfaz del sitio y flujo de onboarding',
    color: 'violet',
    lead: lucia,
    progress: 38,
    startDate: '2026-10-20',
    endDate: '2026-11-30',
    status: 'active',
  },
  {
    id: 'app-movil',
    name: 'App móvil',
    description: 'Versión móvil para consultar y mover tareas',
    color: 'warning',
    lead: sofia,
    progress: 12,
    startDate: '2026-11-01',
    endDate: '2027-02-28',
    status: 'active',
  },
  {
    id: 'documentacion',
    name: 'Documentación',
    description: 'Guías de uso y referencia pública de la API',
    color: 'info',
    lead: mateo,
    progress: 0,
    startDate: '2026-11-10',
    endDate: '2027-01-15',
    status: 'planned',
  },
]
