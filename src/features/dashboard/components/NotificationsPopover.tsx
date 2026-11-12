import { Bell } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { statusLabels } from '@/features/tasks/types'
import type { Notification } from '../data/mock'

export function NotificationsPopover({ items }: { items: Notification[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={`Notificaciones, ${items.length} sin leer`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-8 cursor-pointer place-items-center rounded-md text-fg-muted hover:bg-surface hover:text-fg"
      >
        <Bell className="size-4" aria-hidden />
        <span className="absolute right-[3px] top-[3px] size-2 rounded-full bg-danger" aria-hidden />
      </button>

      {open && (
        <div
          role="region"
          aria-label="Notificaciones"
          className="absolute right-0 top-10 z-10 w-[360px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[10px] border border-line-strong bg-surface shadow-2xl shadow-black/50"
        >
          <div className="flex items-center justify-between border-b border-line px-3.5 py-3">
            <span className="font-semibold">Notificaciones</span>
            <button type="button" className="cursor-pointer p-1 text-xs text-accent hover:underline">
              Marcar como leídas
            </button>
          </div>
          <ul>
            {items.map((n) => (
              <li key={n.id} className="border-b border-[#1f2125] last:border-b-0">
                <Link
                  to={`/tasks/${n.taskId}`}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-2.5 px-3.5 py-3 hover:bg-raised"
                >
                  <span className="mt-[5px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span className="flex flex-col gap-0.5 leading-[1.45]">
                    <NotificationText n={n} />
                    <span className="text-xs text-fg-subtle">{n.time}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function NotificationText({ n }: { n: Notification }) {
  const ref = <span className="text-fg-muted">{n.taskKey}</span>
  switch (n.type) {
    case 'assigned':
      return (
        <span>
          <strong className="font-semibold">{n.actor}</strong> te asignó {ref} {n.taskTitle}
        </span>
      )
    case 'status_changed':
      return (
        <span>
          {ref} {n.taskTitle} pasó a <strong className="font-semibold">{statusLabels[n.status]}</strong>
        </span>
      )
    case 'commented':
      return (
        <span>
          <strong className="font-semibold">{n.actor}</strong> comentó en {ref} {n.taskTitle}
        </span>
      )
  }
}
