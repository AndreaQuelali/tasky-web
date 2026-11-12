import type { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  /** Contenido junto al título (p. ej. pestañas de filtro). */
  children?: ReactNode
  /** Acciones alineadas a la derecha. */
  actions?: ReactNode
}

export function PageHeader({ title, children, actions }: PageHeaderProps) {
  return (
    <header className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-2">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold">{title}</h1>
        {children}
      </div>
      {actions}
    </header>
  )
}
