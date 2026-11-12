import type { TaskPriority } from '@/features/tasks/types'

const DIM = '#3a3d44'

const bars: Record<TaskPriority, [string, string, string]> = {
  high: ['var(--color-danger)', 'var(--color-danger)', 'var(--color-danger)'],
  medium: ['var(--color-warning)', 'var(--color-warning)', DIM],
  low: ['var(--color-fg-subtle)', DIM, DIM],
}

export function PriorityIcon({ priority }: { priority: TaskPriority }) {
  const [a, b, c] = bars[priority]
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <rect x="1.5" y="8" width="2.8" height="4" rx=".8" fill={a} />
      <rect x="5.6" y="5" width="2.8" height="7" rx=".8" fill={b} />
      <rect x="9.7" y="2" width="2.8" height="10" rx=".8" fill={c} />
    </svg>
  )
}
