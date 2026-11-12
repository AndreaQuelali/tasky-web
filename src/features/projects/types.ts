import type { AvatarTone } from '@/shared/ui/Avatar'
import type { LabelColor, TaskStatus } from '@/features/tasks/types'

export type ProjectStatus = 'active' | 'planned' | 'archived'

export type Person = {
  id: string
  name: string
  initials: string
  tone: AvatarTone
}

export type Project = {
  id: string
  name: string
  description: string
  color: LabelColor
  lead: Person
  /** Avance de 0 a 100. */
  progress: number
  /** Fechas en formato ISO (YYYY-MM-DD). */
  startDate: string
  endDate: string
  status: ProjectStatus
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  active: 'Activo',
  planned: 'Planificado',
  archived: 'Archivado',
}

/** Reutiliza los iconos de estado de las tareas para los proyectos. */
export const projectStatusIcon: Record<ProjectStatus, TaskStatus> = {
  active: 'in_progress',
  planned: 'todo',
  archived: 'done',
}
