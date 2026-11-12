import type { Person } from '@/features/projects/types'
import type { Task, TaskStatus } from '@/features/tasks/types'

export type BoardTask = Task & {
  assignee: Person
  comments: number
  attachments: number
}

/** Orden de las columnas del tablero, de izquierda a derecha. */
export const boardColumns: TaskStatus[] = ['todo', 'in_progress', 'in_review', 'done']
