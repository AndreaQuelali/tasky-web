import { useDroppable } from '@dnd-kit/core'
import { Plus } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { StatusIcon } from '@/shared/ui/StatusIcon'
import { statusLabels, type TaskStatus } from '@/features/tasks/types'
import type { BoardTask } from '../types'
import { DraggableTaskCard } from './DraggableTaskCard'

export function BoardColumn({ status, tasks }: { status: TaskStatus; tasks: BoardTask[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <section aria-labelledby={`col-${status}`} className="flex w-[280px] shrink-0 flex-col gap-2">
      <div className="flex items-center gap-2 px-1 pb-1.5 pt-1">
        <StatusIcon status={status} />
        <h2 id={`col-${status}`} className="font-semibold">
          {statusLabels[status]}
        </h2>
        <span className="text-fg-subtle">{tasks.length}</span>
        {status !== 'done' && (
          <button
            type="button"
            aria-label={`Añadir tarea en ${statusLabels[status]}`}
            className="ml-auto grid size-6 cursor-pointer place-items-center rounded-md text-fg-subtle hover:bg-surface hover:text-fg"
          >
            <Plus className="size-3.5" strokeWidth={2.2} aria-hidden />
          </button>
        )}
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          'flex min-h-24 flex-col gap-2 rounded-lg border border-dashed border-transparent p-0.5 transition',
          isOver && 'border-accent bg-accent/5',
        )}
      >
        {tasks.map((task) => (
          <DraggableTaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && <p className="px-2 py-6 text-center text-fg-subtle">Sin tareas</p>}
      </div>
    </section>
  )
}
