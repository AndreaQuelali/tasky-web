import type { Member, Organization } from '../types'

// Datos de ejemplo. Se reemplazan por llamadas a tasky-api más adelante.

export const organization: Organization = { id: 'nova-labs', name: 'Nova Labs' }

export const initialMembers: Member[] = [
  {
    id: 'u1',
    email: 'mateo@novalabs.example',
    role: 'owner',
    status: 'active',
    person: { id: 'u1', name: 'Mateo Vega', initials: 'MV', tone: 'blue' },
  },
  {
    id: 'u2',
    email: 'lucia@novalabs.example',
    role: 'admin',
    status: 'active',
    person: { id: 'u2', name: 'Lucía Paz', initials: 'LP', tone: 'violet' },
  },
  {
    id: 'u3',
    email: 'sofia@novalabs.example',
    role: 'member',
    status: 'active',
    person: { id: 'u3', name: 'Sofía Quiroga', initials: 'SQ', tone: 'amber' },
  },
  {
    id: 'inv1',
    email: 'diego@correo.example',
    role: 'member',
    status: 'pending',
    invitedLabel: 'Invitado hace 2 días',
  },
]
