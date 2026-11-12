export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done'
export type TaskPriority = 'high' | 'medium' | 'low'
export type LabelColor = 'info' | 'violet' | 'success' | 'warning' | 'accent'

export type TaskLabel = {
  name: string
  color: LabelColor
}

export type Task = {
  id: string
  /** Identificador legible, p. ej. TSK-12. */
  key: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  label: TaskLabel
  /** Fecha límite en formato ISO (YYYY-MM-DD). */
  dueDate: string
}

export const statusLabels: Record<TaskStatus, string> = {
  todo: 'Por hacer',
  in_progress: 'En progreso',
  in_review: 'En revisión',
  done: 'Hecho',
}

export const priorityLabels: Record<TaskPriority, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
}

/** Clases estáticas para que Tailwind las detecte. */
export const labelDotClass: Record<LabelColor, string> = {
  info: 'bg-info',
  violet: 'bg-violet',
  success: 'bg-success',
  warning: 'bg-warning',
  accent: 'bg-accent',
}
