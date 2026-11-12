import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { statusLabels, type TaskStatus } from '@/features/tasks/types'
import { projects } from '@/features/projects/data/mock'
import { BoardColumn } from '../components/BoardColumn'
import { cardClass } from '../components/DraggableTaskCard'
import { TaskCardBody } from '../components/TaskCardBody'
import { boardMembers, initialBoardTasks } from '../data/mock'
import { boardColumns } from '../types'

export function BoardPage() {
  const { projectId } = useParams()
  const project = projects.find((p) => p.id === projectId)

  // Las tareas de ejemplo son las mismas para todos los proyectos.
  const [tasks, setTasks] = useState(initialBoardTasks)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  )

  const titleOf = (id: string | number) => tasks.find((t) => t.id === id)?.key ?? 'tarea'
  const columnOf = (id: string | number) => statusLabels[id as TaskStatus] ?? 'otra zona'

  const announcements: Announcements = {
    onDragStart: ({ active }) => `Levantaste ${titleOf(active.id)}.`,
    onDragOver: ({ active, over }) => (over ? `${titleOf(active.id)} está sobre ${columnOf(over.id)}.` : undefined),
    onDragEnd: ({ active, over }) =>
      over ? `${titleOf(active.id)} se movió a ${columnOf(over.id)}.` : `${titleOf(active.id)} volvió a su lugar.`,
    onDragCancel: ({ active }) => `Movimiento cancelado. ${titleOf(active.id)} volvió a su lugar.`,
  }

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(String(active.id))
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null)
    if (!over) return
    const status = over.id as TaskStatus
    setTasks((current) => current.map((t) => (t.id === active.id && t.status !== status ? { ...t, status } : t)))
  }

  if (!project) {
    return (
      <div className="flex flex-col items-start gap-3 p-6">
        <p>No encontramos ese proyecto.</p>
        <Link to="/projects" className="text-accent hover:underline">
          Volver a Proyectos
        </Link>
      </div>
    )
  }

  const activeTask = tasks.find((t) => t.id === activeId)

  return (
    <>
      <header className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-2">
        <nav aria-label="Ruta" className="flex items-center gap-2">
          <Link to="/projects" className="text-fg-subtle hover:text-fg">
            Proyectos
          </Link>
          <span aria-hidden className="text-[#5b5f68]">
            /
          </span>
          <h1 className="font-semibold">{project.name}</h1>
        </nav>
        <div className="flex items-center gap-3">
          <div role="group" aria-label="Miembros del proyecto" className="flex">
            {boardMembers.map((m, i) => (
              <span key={m.id} title={m.name} className={i > 0 ? '-ml-1.5' : undefined}>
                <Avatar initials={m.initials} tone={m.tone} className="size-6 border-2 border-canvas" />
              </span>
            ))}
          </div>
          <Button className="h-8 gap-1.5 rounded-md px-3 text-[13px]">
            <Plus className="size-3.5" strokeWidth={2.4} aria-hidden />
            Nueva tarea
          </Button>
        </div>
      </header>

      <DndContext
        sensors={sensors}
        accessibility={{ announcements }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className="flex gap-3 overflow-x-auto p-6 pt-4">
          {boardColumns.map((status) => (
            <BoardColumn key={status} status={status} tasks={tasks.filter((t) => t.status === status)} />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className={`${cardClass} w-[280px] rotate-1 cursor-grabbing shadow-2xl shadow-black/50`}>
              <TaskCardBody task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  )
}
