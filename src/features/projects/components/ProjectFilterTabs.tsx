import { cn } from '@/shared/lib/cn'
import type { ProjectStatus } from '../types'

export type ProjectFilter = 'all' | ProjectStatus

const tabs: { value: ProjectFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Activos' },
  { value: 'planned', label: 'Planificados' },
  { value: 'archived', label: 'Archivados' },
]

type Props = {
  value: ProjectFilter
  onChange: (value: ProjectFilter) => void
}

export function ProjectFilterTabs({ value, onChange }: Props) {
  return (
    <div role="group" aria-label="Filtrar proyectos" className="flex gap-0.5">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          aria-pressed={value === tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'h-7 cursor-pointer rounded-md px-2.5 font-medium transition',
            value === tab.value ? 'bg-raised text-fg' : 'text-fg-muted hover:bg-surface hover:text-fg',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
