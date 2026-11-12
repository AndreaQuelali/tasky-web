const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const DAY_MS = 86_400_000

export type DueInfo = { label: string; urgent: boolean }

/** Convierte una fecha ISO (YYYY-MM-DD) en una etiqueta corta relativa a hoy. */
export function formatDue(iso: string, now: Date = new Date()): DueInfo {
  const [year, month, day] = iso.split('-').map(Number)
  const due = new Date(year, month - 1, day)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diff = Math.round((due.getTime() - today.getTime()) / DAY_MS)

  if (diff < 0) return { label: 'Vencida', urgent: true }
  if (diff === 0) return { label: 'Hoy', urgent: true }
  if (diff === 1) return { label: 'Mañana', urgent: false }
  return { label: `${day} ${MONTHS[month - 1]}`, urgent: false }
}
