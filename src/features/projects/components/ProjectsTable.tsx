import { Link } from 'react-router'
import { cn } from '@/shared/lib/cn'
import { formatDateRange } from '@/shared/lib/date'
import { Avatar } from '@/shared/ui/Avatar'
import { StatusIcon } from '@/shared/ui/StatusIcon'
import { labelDotClass } from '@/features/tasks/types'
import { projectStatusIcon, projectStatusLabels, type Project } from '../types'

export function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] border-collapse">
        <thead>
          <tr className="text-left text-xs text-fg-subtle">
            <th scope="col" className="px-2 py-3.5 font-medium">Nombre</th>
            <th scope="col" className="px-2 py-3.5 font-medium">Responsable</th>
            <th scope="col" className="px-2 py-3.5 font-medium">Progreso</th>
            <th scope="col" className="px-2 py-3.5 font-medium">Fechas</th>
            <th scope="col" className="px-2 py-3.5 font-medium">Estado</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-t border-line last:border-b hover:bg-surface">
              <td className="p-0">
                <Link to={`/projects/${p.id}`} className="flex flex-col gap-0.5 px-2 py-3">
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className={cn('size-2 rounded-full', labelDotClass[p.color])} aria-hidden />
                    {p.name}
                  </span>
                  <span className="pl-[18px] text-fg-subtle">{p.description}</span>
                </Link>
              </td>
              <td className="px-2 py-3">
                <span className="flex items-center gap-2">
                  <Avatar initials={p.lead.initials} tone={p.lead.tone} />
                  {p.lead.name}
                </span>
              </td>
              <td className="px-2 py-3">
                <span className="flex items-center gap-2.5">
                  <span
                    role="progressbar"
                    aria-label={`Avance de ${p.name}`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={p.progress}
                    className="block h-1 w-24 rounded-full bg-line"
                  >
                    <span
                      className={cn('block h-full rounded-full', labelDotClass[p.color])}
                      style={{ width: `${p.progress}%` }}
                    />
                  </span>
                  <span className="text-fg-muted">{p.progress}%</span>
                </span>
              </td>
              <td className="whitespace-nowrap px-2 py-3 text-fg-muted">{formatDateRange(p.startDate, p.endDate)}</td>
              <td className="px-2 py-3">
                <span className="inline-flex items-center gap-1.5">
                  <StatusIcon status={projectStatusIcon[p.status]} />
                  {projectStatusLabels[p.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
