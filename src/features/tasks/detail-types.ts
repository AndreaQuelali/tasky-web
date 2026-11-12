import type { Person } from '@/features/projects/types'
import type { BoardTask } from '@/features/kanban/types'
import type { LabelColor, TaskLabel, TaskStatus } from './types'

export type AttachmentKind = 'png' | 'pdf' | 'file'

export type Attachment = {
  id: string
  name: string
  /** Tamaño ya formateado, p. ej. "240 KB". */
  size: string
  kind: AttachmentKind
}

export type StatusChange = {
  type: 'status'
  id: string
  actor: Person
  from: TaskStatus
  to: TaskStatus
  when: string
}

export type TaskComment = {
  type: 'comment'
  id: string
  author: Person
  when: string
  body: string
  attachment?: string
}

export type ActivityItem = StatusChange | TaskComment

export type TaskProject = {
  id: string
  name: string
  color: LabelColor
}

export type TaskDetail = BoardTask & {
  description: string
  labels: TaskLabel[]
  project: TaskProject
  attachmentList: Attachment[]
  activity: ActivityItem[]
}
