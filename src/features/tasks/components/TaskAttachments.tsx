import { cn } from '@/shared/lib/cn'
import type { Attachment, AttachmentKind } from '../detail-types'

const kindClass: Record<AttachmentKind, string> = {
  png: 'bg-[#223049] text-[#9dbcf4]',
  pdf: 'bg-[#4a2a22] text-[#f4a998]',
  file: 'bg-raised text-fg-muted',
}

export function TaskAttachments({ attachments }: { attachments: Attachment[] }) {
  if (attachments.length === 0) return null

  return (
    <section className="flex flex-col gap-2.5">
      <h2 className="text-xs font-semibold tracking-wide text-fg-subtle">ADJUNTOS</h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-2">
        {attachments.map((a) => (
          <li key={a.id}>
            {/* Los archivos reales llegan con la API; por ahora es solo la vista. */}
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg border border-line px-2.5 py-2 text-left hover:bg-surface"
            >
              <span
                aria-hidden
                className={cn('grid size-8 place-items-center rounded-md text-[10px] font-bold uppercase', kindClass[a.kind])}
              >
                {a.kind === 'file' ? 'ARCH' : a.kind}
              </span>
              <span className="flex min-w-0 flex-col leading-snug">
                <span className="truncate font-medium">{a.name}</span>
                <span className="text-xs text-fg-subtle">{a.size}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
