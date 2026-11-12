import { myTasks } from '@/features/dashboard/data/mock'
import { initialBoardTasks } from '@/features/kanban/data/mock'
import type { BoardTask } from '@/features/kanban/types'
import type { Person } from '@/features/projects/types'
import type { TaskDetail, TaskProject } from '../detail-types'
import type { TaskLabel } from '../types'

// Datos de ejemplo. Se reemplazan por llamadas a tasky-api más adelante.

const mateo: Person = { id: 'u1', name: 'Mateo Vega', initials: 'MV', tone: 'blue' }
const lucia: Person = { id: 'u2', name: 'Lucía Paz', initials: 'LP', tone: 'violet' }
const sofia: Person = { id: 'u3', name: 'Sofía Quiroga', initials: 'SQ', tone: 'amber' }

const project: TaskProject = { id: 'plataforma-api', name: 'Plataforma API', color: 'accent' }
const security: TaskLabel = { name: 'Seguridad', color: 'accent' }

/** Usuario con la sesión iniciada (de ejemplo). */
export const currentUser: Person = { id: 'me', name: 'Tú', initials: 'TÚ', tone: 'blue' }

/** Responsables que se pueden elegir en el selector. */
export const assignableMembers: Person[] = [mateo, lucia, sofia]

/** Contenido extra de las tareas que tienen ficha completa. */
const detailExtras: Record<string, Pick<TaskDetail, 'description' | 'labels' | 'attachmentList' | 'activity'>> = {
  '12': {
    description:
      'Implementar registro, inicio de sesión y renovación de tokens con ASP.NET Core Identity. El refresh token viaja en una cookie HttpOnly y el access token tiene una vida corta.',
    labels: [{ name: 'Backend', color: 'info' }, security],
    attachmentList: [
      { id: 'a1', name: 'diagrama-auth.png', size: '240 KB', kind: 'png' },
      { id: 'a2', name: 'requisitos-seguridad.pdf', size: '1,2 MB', kind: 'pdf' },
    ],
    activity: [
      { type: 'status', id: 'e1', actor: mateo, from: 'todo', to: 'in_progress', when: 'ayer' },
      {
        type: 'comment',
        id: 'c1',
        author: lucia,
        when: 'hace 2 h',
        body: '¿Usamos expiración corta para el access token? Propongo 15 minutos.',
      },
      {
        type: 'comment',
        id: 'c2',
        author: mateo,
        when: 'hace 1 h',
        body: 'Sí, 15 minutos para el access token y 7 días para el refresh. Subo el diagrama.',
        attachment: 'diagrama-auth.png',
      },
      {
        type: 'comment',
        id: 'c3',
        author: sofia,
        when: 'hace 20 min',
        body: 'Perfecto, lo reviso mañana antes de la reunión.',
      },
    ],
  },
}

/** Tareas del tablero; si no está, una del dashboard (sin comentarios ni adjuntos). */
function findTask(id: string | undefined): BoardTask | undefined {
  const onBoard = initialBoardTasks.find((t) => t.id === id)
  if (onBoard) return onBoard

  const mine = myTasks.find((t) => t.id === id)
  return mine && { ...mine, assignee: mateo, comments: 0, attachments: 0 }
}

const fallbackDescription = 'Sin descripción todavía.'

/** Busca una tarea por id y arma su ficha. Devuelve undefined si no existe. */
export function getTaskDetail(id: string | undefined): TaskDetail | undefined {
  const base = findTask(id)
  if (!base) return undefined

  const extra = detailExtras[base.id]
  return {
    ...base,
    project,
    description: extra?.description ?? fallbackDescription,
    labels: extra?.labels ?? [base.label],
    attachmentList: extra?.attachmentList ?? [],
    activity: extra?.activity ?? [],
  }
}
