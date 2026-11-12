import { Calendar } from 'lucide-react'
import { Link } from 'react-router'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import { formatDateShort, formatDue } from '@/shared/lib/date'
import { Avatar } from '@/shared/ui/Avatar'
import { PriorityIcon } from '@/shared/ui/PriorityIcon'
import { StatusIcon } from '@/shared/ui/StatusIcon'
import type { Person } from '@/features/projects/types'
import { boardColumns } from '@/features/kanban/types'
import type { TaskDetail } from '../detail-types'
import { labelDotClass, priorityLabels, statusLabels, type TaskPriority, type TaskStatus } from '../types'
import { assignableMembers } from '../data/mock'
import { PropertySelect } from './PropertySelect'

type TaskPropertiesProps = {
  task: TaskDetail
  onStatusChange: (status: TaskStatus) => void
  onPriorityChange: (priority: TaskPriority) => void
  onAssigneeChange: (person: Person) => void
}

const statusOptions = boardColumns.map((s) => ({ value: s, label: statusLabels[s] }))
const priorityOptions = (Object.keys(priorityLabels) as TaskPriority[]).map((p) => ({
  value: p,
  label: priorityLabels[p],
}))
const assigneeOptions = assignableMembers.map((m) => ({ value: m.id, label: m.name }))

function Row({ label, children, top }: { label: string; children: ReactNode; top?: boolean }) {
  return (
    <div className={cn('flex gap-2', top ? 'items-start' : 'items-center')}>
      <dt className={cn('w-[88px] shrink-0 pl-2 text-fg-subtle', top && 'pt-1.5')}>{label}</dt>
      <dd className="min-w-0 flex-1">{children}</dd>
    </div>
  )
}

export function TaskProperties({ task, onStatusChange, onPriorityChange, onAssigneeChange }: TaskPropertiesProps) {
  const due = formatDue(task.dueDate)
  const dueText = due.label === formatDateShort(task.dueDate) ? due.label : `${formatDateShort(task.dueDate)} · ${due.label}`
  const overdue = task.status !== 'done' && due.urgent

  return (
    <aside
      aria-label="Propiedades de la tarea"
      className="flex min-w-[260px] flex-1 flex-col gap-1 border-line p-4 pt-5 lg:max-w-[300px] lg:border-l"
    >
      <h2 className="mb-2 ml-2 text-xs font-semibold tracking-wide text-fg-subtle">PROPIEDADES</h2>
      <dl className="flex flex-col gap-0.5">
        <Row label="Estado">
          <PropertySelect
            label="Estado"
            value={task.status}
            options={statusOptions}
            onChange={(v) => onStatusChange(v as TaskStatus)}
          >
            <StatusIcon status={task.status} />
            {statusLabels[task.status]}
          </PropertySelect>
        </Row>
        <Row label="Prioridad">
          <PropertySelect
            label="Prioridad"
            value={task.priority}
            options={priorityOptions}
            onChange={(v) => onPriorityChange(v as TaskPriority)}
          >
            <PriorityIcon priority={task.priority} />
            {priorityLabels[task.priority]}
          </PropertySelect>
        </Row>
        <Row label="Responsable">
          <PropertySelect
            label="Responsable"
            value={task.assignee.id}
            options={assigneeOptions}
            onChange={(id) => {
              const person = assignableMembers.find((m) => m.id === id)
              if (person) onAssigneeChange(person)
            }}
          >
            <Avatar initials={task.assignee.initials} tone={task.assignee.tone} className="size-5 text-[9px]" />
            {task.assignee.name}
          </PropertySelect>
        </Row>
        <Row label="Fecha límite">
          <div className={cn('flex h-8 items-center gap-2 px-2', overdue && 'font-medium text-danger')}>
            <Calendar className="size-3.5" aria-hidden />
            {dueText}
          </div>
        </Row>
        <Row label="Etiquetas" top>
          <ul className="flex flex-col">
            {task.labels.map((l) => (
              <li key={l.name} className="flex h-8 items-center gap-2 px-2">
                <span className={cn('size-2 rounded-full', labelDotClass[l.color])} aria-hidden />
                {l.name}
              </li>
            ))}
          </ul>
        </Row>
        <Row label="Proyecto">
          <Link
            to={`/projects/${task.project.id}`}
            className="flex h-8 items-center gap-2 rounded-md px-2 hover:bg-surface"
          >
            <span className={cn('size-2 rounded-full', labelDotClass[task.project.color])} aria-hidden />
            {task.project.name}
          </Link>
        </Row>
      </dl>
    </aside>
  )
}
