import { MessageSquare, Paperclip } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { formatDue } from '@/shared/lib/date'
import { Avatar } from '@/shared/ui/Avatar'
import { PriorityIcon } from '@/shared/ui/PriorityIcon'
import { labelDotClass } from '@/features/tasks/types'
import type { BoardTask } from '../types'

/** Contenido visual de una tarjeta. Se reutiliza en la columna y en el overlay de arrastre. */
export function TaskCardBody({ task }: { task: BoardTask }) {
  const done = task.status === 'done'
  const due = formatDue(task.dueDate)

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xs text-fg-subtle">{task.key}</span>
        <Avatar initials={task.assignee.initials} tone={task.assignee.tone} className="size-5 text-[9px]" />
      </div>
      <span className={cn('font-medium leading-snug', done && 'text-fg-subtle line-through')}>{task.title}</span>
      <div className="flex items-center gap-2.5 text-xs text-fg-muted">
        {!done && <PriorityIcon priority={task.priority} />}
        <span className="inline-flex items-center gap-1.5">
          <span className={cn('size-[7px] rounded-full', labelDotClass[task.label.color])} aria-hidden />
          {task.label.name}
        </span>
        {task.comments > 0 && (
          <span className="inline-flex items-center gap-1" aria-label={`${task.comments} comentarios`}>
            <MessageSquare className="size-3" aria-hidden />
            {task.comments}
          </span>
        )}
        {task.attachments > 0 && (
          <span className="inline-flex items-center gap-1" aria-label={`${task.attachments} adjuntos`}>
            <Paperclip className="size-3" aria-hidden />
            {task.attachments}
          </span>
        )}
        {!done && (
          <span className={cn('ml-auto', due.urgent && 'font-semibold text-danger')}>{due.label}</span>
        )}
      </div>
    </>
  )
}
