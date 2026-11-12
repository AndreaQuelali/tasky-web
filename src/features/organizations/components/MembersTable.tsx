import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { Avatar } from '@/shared/ui/Avatar'
import { assignableRoles, roleLabels, type Member, type Role } from '../types'

type MembersTableProps = {
  members: Member[]
  onRoleChange: (id: string, role: Role) => void
}

function RoleCell({ member, onRoleChange }: { member: Member; onRoleChange: MembersTableProps['onRoleChange'] }) {
  const label = roleLabels[member.role]

  // El propietario y las invitaciones pendientes no cambian de rol desde aquí.
  if (member.role === 'owner') {
    return (
      <span className="rounded-full border border-[#3c4047] px-2.5 py-[3px] text-xs font-semibold">{label}</span>
    )
  }
  if (member.status === 'pending') {
    return <span className="text-xs font-semibold text-fg-muted">{label}</span>
  }

  const name = member.person?.name ?? member.email
  return (
    <div className="relative inline-flex rounded-full focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent">
      <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-line-strong px-2.5 text-xs font-semibold hover:bg-surface">
        {label}
        <ChevronDown className="size-3 text-fg-subtle" aria-hidden />
      </span>
      <select
        aria-label={`Cambiar rol de ${name}, actualmente ${label}`}
        value={member.role}
        onChange={(e) => onRoleChange(member.id, e.target.value as Role)}
        className="absolute inset-0 size-full cursor-pointer opacity-0 [color-scheme:dark]"
      >
        {assignableRoles.map((r) => (
          <option key={r} value={r}>
            {roleLabels[r]}
          </option>
        ))}
      </select>
    </div>
  )
}

export function MembersTable({ members, onRoleChange }: MembersTableProps) {
  const active = members.filter((m) => m.status === 'active').length
  const pending = members.length - active

  return (
    <section aria-label="Miembros" className="min-w-0 flex-[2_1_520px] overflow-hidden rounded-[10px] border border-line">
      <div className="flex items-baseline justify-between border-b border-line bg-surface px-4 py-3">
        <h2 className="text-[13px] font-semibold">Miembros</h2>
        <span className="text-fg-subtle">
          {active} {active === 1 ? 'activo' : 'activos'} · {pending} {pending === 1 ? 'pendiente' : 'pendientes'}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr className="text-left text-xs text-fg-subtle">
              <th scope="col" className="px-4 py-2.5 font-medium">Persona</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Rol</th>
              <th scope="col" className="py-2.5 pl-3 pr-4 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => {
              const pendingMember = m.status === 'pending'
              return (
                <tr key={m.id} className="border-t border-line">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      {m.person ? (
                        <Avatar initials={m.person.initials} tone={m.person.tone} className="size-7 text-[10px]" />
                      ) : (
                        <span
                          aria-hidden
                          className="grid size-7 shrink-0 place-items-center rounded-full bg-line text-[10px] font-bold text-fg-muted"
                        >
                          ?
                        </span>
                      )}
                      <span className="flex min-w-0 flex-col leading-snug">
                        <span className="font-medium">{m.person?.name ?? m.email}</span>
                        <span className="text-xs text-fg-subtle">{m.person ? m.email : m.invitedLabel}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <RoleCell member={m} onRoleChange={onRoleChange} />
                  </td>
                  <td className="py-2.5 pl-3 pr-4">
                    <span className={cn('inline-flex items-center gap-1.5', pendingMember && 'text-warning')}>
                      <span
                        aria-hidden
                        className={cn('size-2 rounded-full', pendingMember ? 'bg-warning' : 'bg-accent')}
                      />
                      {pendingMember ? 'Invitación pendiente' : 'Activo'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
