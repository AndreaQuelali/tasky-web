import { useDraggable } from '@dnd-kit/core'
import { GripVertical } from 'lucide-react'
import type { KeyboardEventHandler, PointerEventHandler } from 'react'
import { Link } from 'react-router'
import { cn } from '@/shared/lib/cn'
import type { BoardTask } from '../types'
import { TaskCardBody } from './TaskCardBody'

export const cardClass =
  'flex flex-col gap-2 rounded-lg border border-line bg-surface px-3 py-2.5 text-fg'

export function DraggableTaskCard({ task }: { task: BoardTask }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, isDragging } = useDraggable({ id: task.id })
  // dnd-kit tipa los listeners como Function; son handlers de eventos de React.
  const onPointerDown = listeners?.onPointerDown as PointerEventHandler<HTMLDivElement> | undefined
  const onKeyDown = listeners?.onKeyDown as KeyboardEventHandler<HTMLButtonElement> | undefined

  return (
    // El arrastre con puntero funciona en toda la tarjeta; con teclado, desde el asa.
    <div ref={setNodeRef} onPointerDown={onPointerDown} className={cn('group relative', isDragging && 'opacity-40')}>
      <Link
        to={`/tasks/${task.id}`}
        draggable={false}
        className={cn(cardClass, 'transition hover:border-[#3c4047] hover:bg-[#1a1b1f]')}
      >
        <TaskCardBody task={task} />
      </Link>
      <button
        type="button"
        ref={setActivatorNodeRef}
        aria-label={`Mover ${task.key}`}
        onKeyDown={onKeyDown}
        {...attributes}
        className="absolute right-8 top-2 grid size-5 cursor-grab place-items-center rounded text-fg-subtle opacity-0 hover:text-fg focus-visible:opacity-100 group-hover:opacity-100"
      >
        <GripVertical className="size-3.5" aria-hidden />
      </button>
    </div>
  )
}
