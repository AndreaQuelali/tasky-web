import { cn } from '@/shared/lib/cn'
import type { Stat } from '../data/mock'

const toneClass = { danger: 'text-danger', accent: 'text-accent' }

export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <section
      aria-label="Estadísticas"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-px overflow-hidden rounded-[10px] border border-line bg-line"
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1 bg-canvas px-4 py-3.5">
          <span className="text-xs text-fg-subtle">{s.label}</span>
          <span className={cn('text-[26px] font-semibold tracking-tight', s.tone && toneClass[s.tone])}>{s.value}</span>
        </div>
      ))}
    </section>
  )
}
