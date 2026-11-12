import type { Person } from '@/features/projects/types'
import type { TaskLabel } from '@/features/tasks/types'
import type { BoardTask } from '../types'

// Datos de ejemplo. Se reemplazan por llamadas a tasky-api más adelante.

const mateo: Person = { id: 'u1', name: 'Mateo Vega', initials: 'MV', tone: 'blue' }
const lucia: Person = { id: 'u2', name: 'Lucía Paz', initials: 'LP', tone: 'violet' }
const sofia: Person = { id: 'u3', name: 'Sofía Quiroga', initials: 'SQ', tone: 'amber' }

const backend: TaskLabel = { name: 'Backend', color: 'info' }
const testing: TaskLabel = { name: 'Testing', color: 'success' }
const devops: TaskLabel = { name: 'DevOps', color: 'warning' }

export const boardMembers: Person[] = [mateo, lucia, sofia]

export const initialBoardTasks: BoardTask[] = [
  { id: '18', key: 'TSK-18', title: 'Definir roles del equipo', status: 'todo', priority: 'medium', label: backend, dueDate: '2026-11-14', assignee: mateo, comments: 0, attachments: 0 },
  { id: '21', key: 'TSK-21', title: 'Escribir tests de integración', status: 'todo', priority: 'medium', label: testing, dueDate: '2026-11-17', assignee: sofia, comments: 0, attachments: 0 },
  { id: '24', key: 'TSK-24', title: 'Endpoint de invitaciones a la organización', status: 'todo', priority: 'high', label: backend, dueDate: '2026-11-20', assignee: lucia, comments: 0, attachments: 0 },

  { id: '12', key: 'TSK-12', title: 'API de autenticación JWT', status: 'in_progress', priority: 'high', label: backend, dueDate: '2026-11-12', assignee: mateo, comments: 4, attachments: 1 },
  { id: '15', key: 'TSK-15', title: 'Recuperación de contraseña por correo', status: 'in_progress', priority: 'medium', label: backend, dueDate: '2026-11-15', assignee: lucia, comments: 0, attachments: 0 },
  { id: '27', key: 'TSK-27', title: 'Modelo de comentarios y adjuntos', status: 'in_progress', priority: 'low', label: backend, dueDate: '2026-11-24', assignee: sofia, comments: 0, attachments: 0 },

  { id: '9', key: 'TSK-9', title: 'Filtro global por organización (multi-tenant)', status: 'in_review', priority: 'high', label: backend, dueDate: '2026-11-13', assignee: mateo, comments: 0, attachments: 0 },
  { id: '19', key: 'TSK-19', title: 'Notificaciones en tiempo real con SignalR', status: 'in_review', priority: 'medium', label: backend, dueDate: '2026-11-16', assignee: lucia, comments: 0, attachments: 0 },

  { id: '1', key: 'TSK-1', title: 'Modelo de datos inicial', status: 'done', priority: 'medium', label: backend, dueDate: '2026-10-10', assignee: mateo, comments: 0, attachments: 0 },
  { id: '2', key: 'TSK-2', title: 'Configurar Docker Compose', status: 'done', priority: 'medium', label: devops, dueDate: '2026-10-12', assignee: sofia, comments: 0, attachments: 0 },
  { id: '6', key: 'TSK-6', title: 'Pipeline de CI en GitHub Actions', status: 'done', priority: 'medium', label: devops, dueDate: '2026-10-20', assignee: mateo, comments: 0, attachments: 0 },
]
