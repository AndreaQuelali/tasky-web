import { cn } from '@/shared/lib/cn'
import type { DayCount } from '../data/mock'

const CHART_HEIGHT = 96

export function ProductivityChart({ data }: { data: DayCount[] }) {
  const max = Math.max(...data.map((d) => d.value))
  const summary = data.map((d) => `${d.fullDay} ${d.value}`).join(', ')

  return (
    <section className="flex flex-col gap-3.5 rounded-[10px] border border-line px-4 py-3.5">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-semibold">Productividad</h2>
        <span className="text-xs text-fg-subtle">Completadas · 7 días</span>
      </div>
      <div role="img" aria-label={`Completadas por día: ${summary}`} className="flex h-[130px] items-end gap-2">
        {data.map((d) => {
          const peak = d.value === max
          return (
            <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className={cn('text-[11px]', peak ? 'font-semibold text-fg' : 'text-fg-muted')}>{d.value}</span>
              <span
                className={cn('w-full rounded-t', peak ? 'bg-accent' : 'bg-[#25494a]')}
                style={{ height: Math.round((d.value / max) * CHART_HEIGHT) }}
              />
            </div>
          )
        })}
      </div>
      <div aria-hidden className="flex gap-2 text-center text-[11px] text-fg-subtle">
        {data.map((d) => (
          <span key={d.day} className="flex-1">
            {d.day}
          </span>
        ))}
      </div>
    </section>
  )
}
