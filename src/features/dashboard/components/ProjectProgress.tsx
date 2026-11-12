import { Link } from 'react-router'
import { cn } from '@/shared/lib/cn'
import type { ProjectProgressItem } from '../data/mock'

const fill = { accent: 'bg-accent', violet: 'bg-violet', warning: 'bg-warning' }

export function ProjectProgress({ projects }: { projects: ProjectProgressItem[] }) {
  return (
    <section className="flex flex-col gap-3.5 rounded-[10px] border border-line px-4 py-3.5">
      <h2 className="font-semibold">Avance por proyecto</h2>
      {projects.map((p) => (
        <div key={p.id} className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <Link to={`/projects/${p.id}`} className="flex items-center gap-2 hover:underline">
              <span className={cn('size-2 rounded-full', fill[p.color])} aria-hidden />
              {p.name}
            </Link>
            <span className="text-fg-muted">{p.progress}%</span>
          </div>
          <div
            role="progressbar"
            aria-label={`Avance de ${p.name}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={p.progress}
            className="h-1 rounded-full bg-line"
          >
            <div className={cn('h-full rounded-full', fill[p.color])} style={{ width: `${p.progress}%` }} />
          </div>
        </div>
      ))}
    </section>
  )
}
