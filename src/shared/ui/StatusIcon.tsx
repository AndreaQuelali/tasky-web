import type { TaskStatus } from '@/features/tasks/types'

export function StatusIcon({ status, className }: { status: TaskStatus; className?: string }) {
  const props = {
    width: 14,
    height: 14,
    viewBox: '0 0 14 14',
    fill: 'none',
    'aria-hidden': true,
    className,
  } as const

  switch (status) {
    case 'todo':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5.5" stroke="var(--color-fg-subtle)" strokeWidth="1.5" strokeDasharray="2.2 2" />
        </svg>
      )
    case 'in_progress':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5.5" stroke="var(--color-warning)" strokeWidth="1.5" />
          <path d="M7 3.5a3.5 3.5 0 0 1 0 7z" fill="var(--color-warning)" />
        </svg>
      )
    case 'in_review':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5.5" stroke="var(--color-accent)" strokeWidth="1.5" />
          <path d="M7 7V3.5A3.5 3.5 0 1 1 3.5 7z" fill="var(--color-accent)" />
        </svg>
      )
    case 'done':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="6.25" fill="var(--color-accent)" />
          <path
            d="M4.3 7.2l1.8 1.8 3.6-3.8"
            stroke="var(--color-accent-fg)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
  }
}
