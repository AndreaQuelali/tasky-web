import { Link } from 'react-router'
import { cn } from '@/shared/lib/cn'
import { formatDue } from '@/shared/lib/date'
import { PriorityIcon } from '@/shared/ui/PriorityIcon'
import { StatusIcon } from '@/shared/ui/StatusIcon'
import { labelDotClass, statusLabels, type Task, type TaskStatus } from '@/features/tasks/types'

const groupOrder: TaskStatus[] = ['in_progress', 'in_review', 'todo']

export function MyTasksList({ tasks }: { tasks: Task[] }) {
  const groups = groupOrder
    .map((status) => ({ status, items: tasks.filter((t) => t.status === status) }))
    .filter((g) => g.items.length > 0)

  return (
    <section aria-labelledby="my-tasks" className="min-w-0 overflow-hidden rounded-[10px] border border-line">
      <h2 id="my-tasks" className="sr-only">
        Mis tareas
      </h2>
      {groups.map((group) => (
        <div key={group.status}>
          <div className="flex items-center gap-2 border-b border-line bg-[#141517] px-3.5 py-2">
            <StatusIcon status={group.status} />
            <h3 className="font-semibold">{statusLabels[group.status]}</h3>
            <span className="text-fg-subtle">{group.items.length}</span>
          </div>
          <ul>
            {group.items.map((task) => {
              const due = formatDue(task.dueDate)
              return (
                <li key={task.id} className="border-b border-[#1b1d20] last:border-b-0">
                  <Link
                    to={`/tasks/${task.id}`}
                    className="flex h-10 items-center gap-3 px-3.5 hover:bg-surface"
                  >
                    <PriorityIcon priority={task.priority} />
                    <span className="w-[52px] shrink-0 text-fg-subtle">{task.key}</span>
                    <StatusIcon status={task.status} />
                    <span className="min-w-0 flex-1 truncate font-medium">{task.title}</span>
                    <span className="hidden items-center gap-1.5 text-fg-muted sm:inline-flex">
                      <span className={cn('size-2 rounded-full', labelDotClass[task.label.color])} aria-hidden />
                      {task.label.name}
                    </span>
                    <span className={cn('w-[60px] text-right', due.urgent ? 'font-semibold text-danger' : 'text-fg-muted')}>
                      {due.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </section>
  )
}
