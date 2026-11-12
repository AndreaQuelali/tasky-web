import { Paperclip } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { StatusIcon } from '@/shared/ui/StatusIcon'
import type { ActivityItem } from '../detail-types'
import { statusLabels } from '../types'

type TaskActivityProps = {
  items: ActivityItem[]
  onComment: (body: string) => void
}

export function TaskActivity({ items, onComment }: TaskActivityProps) {
  const [body, setBody] = useState('')
  const fieldId = useId()

  function submit(e: FormEvent) {
    e.preventDefault()
    const text = body.trim()
    if (!text) return
    onComment(text)
    setBody('')
  }

  return (
    <section className="flex flex-col gap-[18px] border-t border-line pt-6">
      <h2 className="text-xs font-semibold tracking-wide text-fg-subtle">ACTIVIDAD</h2>

      <ul className="flex flex-col gap-[18px]">
        {items.map((item) =>
          item.type === 'status' ? (
            <li key={item.id} className="flex items-center gap-2.5 text-fg-subtle">
              <span className="grid w-6 place-items-center" aria-hidden>
                <StatusIcon status={item.to} />
              </span>
              <span>
                <strong className="font-medium text-fg-muted">{item.actor.name}</strong> movió la tarea de{' '}
                {statusLabels[item.from]} a {statusLabels[item.to]} · {item.when}
              </span>
            </li>
          ) : (
            <li key={item.id} className="flex gap-2.5">
              <Avatar initials={item.author.initials} tone={item.author.tone} className="size-6 text-[9px]" />
              <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-lg border border-line bg-surface px-3 py-2.5">
                <div className="flex items-baseline gap-2">
                  <strong className="font-semibold">{item.author.name}</strong>
                  <span className="text-xs text-fg-subtle">{item.when}</span>
                </div>
                <p className="leading-relaxed text-fg-muted">{item.body}</p>
                {item.attachment && (
                  <span className="mt-1 inline-flex items-center gap-1.5 self-start rounded-md border border-line-strong px-2 py-1 text-xs">
                    <Paperclip className="size-3" aria-hidden />
                    {item.attachment}
                  </span>
                )}
              </div>
            </li>
          ),
        )}
      </ul>

      <form onSubmit={submit} className="flex gap-2.5">
        <span
          aria-hidden
          className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-[9px] font-bold text-accent-fg"
        >
          TÚ
        </span>
        <div className="flex min-w-0 flex-1 flex-col rounded-lg border border-line-strong bg-surface focus-within:border-accent">
          <label htmlFor={fieldId} className="sr-only">
            Escribe un comentario
          </label>
          <textarea
            id={fieldId}
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Deja un comentario…"
            className="w-full resize-y bg-transparent px-3 py-2.5 leading-normal outline-none placeholder:text-fg-subtle"
          />
          <div className="flex items-center justify-between gap-2 px-2 py-1.5">
            <button
              type="button"
              aria-label="Adjuntar archivo"
              className="grid size-8 cursor-pointer place-items-center rounded-md text-fg-muted hover:bg-raised hover:text-fg"
            >
              <Paperclip className="size-4" aria-hidden />
            </button>
            <Button type="submit" disabled={!body.trim()} className="h-8 px-3.5">
              Comentar
            </Button>
          </div>
        </div>
      </form>
    </section>
  )
}
