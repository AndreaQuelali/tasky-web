import type { Person } from '@/features/projects/types'

export type Role = 'owner' | 'admin' | 'member'
export type MemberStatus = 'active' | 'pending'

export type Member = {
  id: string
  email: string
  role: Role
  status: MemberStatus
  /** Solo para miembros activos. */
  person?: Person
  /** Solo para invitaciones pendientes, p. ej. "Invitado hace 2 días". */
  invitedLabel?: string
}

export type Organization = {
  id: string
  name: string
}

export const roleLabels: Record<Role, string> = {
  owner: 'Propietario',
  admin: 'Administrador',
  member: 'Miembro',
}

export const roleDescriptions: Record<Role, string> = {
  owner: 'Administra la organización, sus miembros y los roles.',
  admin: 'Crea proyectos, invita miembros y asigna responsables.',
  member: 'Trabaja en las tareas de los proyectos a los que pertenece.',
}

/** Roles que se pueden asignar (el propietario es único). */
export const assignableRoles: Exclude<Role, 'owner'>[] = ['member', 'admin']
