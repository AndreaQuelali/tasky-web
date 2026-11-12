import type { Task, TaskLabel, TaskStatus } from '@/features/tasks/types'

// Datos de ejemplo. Se reemplazan por llamadas a tasky-api más adelante.

const backend: TaskLabel = { name: 'Backend', color: 'info' }
const design: TaskLabel = { name: 'Diseño', color: 'violet' }
const testing: TaskLabel = { name: 'Testing', color: 'success' }

export const myTasks: Task[] = [
  { id: '12', key: 'TSK-12', title: 'API de autenticación JWT', status: 'in_progress', priority: 'high', label: backend, dueDate: '2026-11-12' },
  { id: '15', key: 'TSK-15', title: 'Recuperación de contraseña por correo', status: 'in_progress', priority: 'medium', label: backend, dueDate: '2026-11-15' },
  { id: '3', key: 'WEB-3', title: 'Diseñar pantalla de login', status: 'todo', priority: 'high', label: design, dueDate: '2026-11-11' },
  { id: '18', key: 'TSK-18', title: 'Definir roles del equipo', status: 'todo', priority: 'medium', label: backend, dueDate: '2026-11-14' },
  { id: '21', key: 'TSK-21', title: 'Escribir tests de integración', status: 'todo', priority: 'medium', label: testing, dueDate: '2026-11-17' },
  { id: '8', key: 'WEB-8', title: 'Revisar copy del onboarding', status: 'todo', priority: 'low', label: design, dueDate: '2026-11-19' },
]

export type Stat = { label: string; value: number; tone?: 'danger' | 'accent' }

export const stats: Stat[] = [
  { label: 'Pendientes', value: 12 },
  { label: 'Vencen esta semana', value: 5, tone: 'danger' },
  { label: 'En progreso', value: 7 },
  { label: 'Completadas (7 días)', value: 18, tone: 'accent' },
]

export type DayCount = { day: string; fullDay: string; value: number }

export const completedPerDay: DayCount[] = [
  { day: 'Lun', fullDay: 'lunes', value: 2 },
  { day: 'Mar', fullDay: 'martes', value: 4 },
  { day: 'Mié', fullDay: 'miércoles', value: 3 },
  { day: 'Jue', fullDay: 'jueves', value: 5 },
  { day: 'Vie', fullDay: 'viernes', value: 2 },
  { day: 'Sáb', fullDay: 'sábado', value: 1 },
  { day: 'Dom', fullDay: 'domingo', value: 1 },
]

export type ProjectProgressItem = { id: string; name: string; progress: number; color: 'accent' | 'violet' | 'warning' }

export const projectProgress: ProjectProgressItem[] = [
  { id: 'plataforma-api', name: 'Plataforma API', progress: 64, color: 'accent' },
  { id: 'rediseno-web', name: 'Rediseño web', progress: 38, color: 'violet' },
  { id: 'app-movil', name: 'App móvil', progress: 12, color: 'warning' },
]

type NotificationBase = { id: string; taskId: string; taskKey: string; taskTitle: string; time: string }

export type Notification =
  | (NotificationBase & { type: 'assigned'; actor: string })
  | (NotificationBase & { type: 'status_changed'; status: TaskStatus })
  | (NotificationBase & { type: 'commented'; actor: string })

export const notifications: Notification[] = [
  { id: 'n1', type: 'assigned', actor: 'Lucía Paz', taskId: '3', taskKey: 'WEB-3', taskTitle: 'Diseñar pantalla de login', time: 'hace 5 min' },
  { id: 'n2', type: 'status_changed', status: 'in_review', taskId: '9', taskKey: 'TSK-9', taskTitle: 'Filtro global por organización', time: 'hace 1 h' },
  { id: 'n3', type: 'commented', actor: 'Mateo Vega', taskId: '12', taskKey: 'TSK-12', taskTitle: 'API de autenticación JWT', time: 'hace 3 h' },
]
