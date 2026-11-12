import type { ReactNode } from 'react'

export function PageHeader({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <header className="flex h-12 items-center justify-between gap-3 border-b border-line px-6">
      <h1 className="font-semibold">{title}</h1>
      {actions}
    </header>
  )
}
