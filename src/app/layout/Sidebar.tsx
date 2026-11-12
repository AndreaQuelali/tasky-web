import { FolderKanban, LayoutDashboard, LogOut, Plus, Search, Users } from 'lucide-react'
import { NavLink } from 'react-router'
import { cn } from '@/shared/lib/cn'

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/projects', label: 'Proyectos', icon: FolderKanban, end: false },
  { to: '/team', label: 'Equipo', icon: Users, end: false },
]

// Datos de ejemplo hasta conectar con la API.
const projects = [
  { id: 'plataforma-api', name: 'Plataforma API', color: 'bg-accent' },
  { id: 'rediseno-web', name: 'Rediseño web', color: 'bg-violet' },
  { id: 'app-movil', name: 'App móvil', color: 'bg-warning' },
]

const itemClass =
  'flex h-8 items-center gap-2.5 rounded-md px-2 font-medium text-fg-muted transition hover:bg-surface hover:text-fg'

export function Sidebar() {
  return (
    <aside className="flex w-[232px] shrink-0 flex-col gap-3.5 border-r border-line bg-sidebar p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 p-1.5 font-semibold">
          <span className="grid size-5 place-items-center rounded-[5px] bg-accent text-[11px] font-bold text-accent-fg">
            N
          </span>
          Nova Labs
        </div>
        <button
          type="button"
          aria-label="Nueva tarea"
          className="grid size-7 cursor-pointer place-items-center rounded-md text-fg-muted hover:bg-surface hover:text-fg"
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </div>

      <button
        type="button"
        className="flex h-8 cursor-pointer items-center gap-2 rounded-md border border-line px-2 text-left text-fg-muted hover:bg-surface"
      >
        <Search className="size-3.5" aria-hidden />
        <span className="flex-1">Buscar</span>
        <kbd className="rounded border border-line-strong px-1.5 text-[11px] text-fg-subtle">⌘K</kbd>
      </button>

      <nav aria-label="Principal" className="flex flex-col gap-0.5">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => cn(itemClass, isActive && 'bg-raised text-fg')}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col gap-0.5">
        <span className="px-2 py-1.5 text-[11px] font-semibold tracking-wider text-fg-subtle">PROYECTOS</span>
        {projects.map((p) => (
          <NavLink
            key={p.id}
            to={`/projects/${p.id}`}
            className={({ isActive }) => cn(itemClass, isActive && 'bg-raised text-fg')}
          >
            <span className={cn('size-2 rounded-full', p.color)} aria-hidden />
            {p.name}
          </NavLink>
        ))}
      </div>

      <NavLink to="/login" className={cn(itemClass, 'mt-auto')}>
        <LogOut className="size-4" aria-hidden />
        Cerrar sesión
      </NavLink>
    </aside>
  )
}
