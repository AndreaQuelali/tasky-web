import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { PageHeader } from '@/shared/ui/PageHeader'
import { TaskActivity } from '../components/TaskActivity'
import { TaskAttachments } from '../components/TaskAttachments'
import { TaskProperties } from '../components/TaskProperties'
import { currentUser, getTaskDetail } from '../data/mock'
import type { TaskDetail } from '../detail-types'

export function TaskPage() {
  const { taskId } = useParams()
  const initial = getTaskDetail(taskId)

  if (!initial) {
    return (
      <>
        <PageHeader title="Tarea no encontrada" />
        <p className="p-6 text-fg-muted">
          No existe una tarea con ese identificador.{' '}
          <Link to="/projects" className="text-accent hover:underline">
            Volver a proyectos
          </Link>
        </p>
      </>
    )
  }

  // La key reinicia el estado local al pasar de una tarea a otra.
  return <TaskDetailView key={initial.id} initial={initial} />
}

function TaskDetailView({ initial }: { initial: TaskDetail }) {
  const [task, setTask] = useState(initial)

  function addComment(body: string) {
    setTask((t) => ({
      ...t,
      activity: [
        ...t.activity,
        {
          type: 'comment',
          id: `local-${t.activity.length + 1}`,
          author: currentUser,
          when: 'ahora',
          body,
        },
      ],
    }))
  }

  return (
    <>
      <header className="flex min-h-12 items-center border-b border-line px-6 py-2">
        <nav aria-label="Ruta" className="flex flex-wrap items-center gap-2 text-fg-subtle">
          <Link to="/projects" className="hover:text-fg">
            Proyectos
          </Link>
          <span aria-hidden>/</span>
          <Link to={`/projects/${task.project.id}`} className="hover:text-fg">
            {task.project.name}
          </Link>
          <span aria-hidden>/</span>
          <span className="font-semibold text-fg">{task.key}</span>
        </nav>
      </header>

      <div className="flex flex-wrap">
        <div className="min-w-0 flex-[1_1_480px] px-6 pb-12 pt-8 lg:px-10">
          <div className="flex max-w-[720px] flex-col gap-7">
            <div className="flex flex-col gap-3.5">
              <h1 className="text-balance text-[26px] font-semibold leading-tight tracking-tight">{task.title}</h1>
              <p className="text-pretty text-sm leading-relaxed text-fg-muted">{task.description}</p>
            </div>
            <TaskAttachments attachments={task.attachmentList} />
            <TaskActivity items={task.activity} onComment={addComment} />
          </div>
        </div>

        <TaskProperties
          task={task}
          onStatusChange={(status) => setTask((t) => ({ ...t, status }))}
          onPriorityChange={(priority) => setTask((t) => ({ ...t, priority }))}
          onAssigneeChange={(assignee) => setTask((t) => ({ ...t, assignee }))}
        />
      </div>
    </>
  )
}
