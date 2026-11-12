import { useState } from 'react'
import { PageHeader } from '@/shared/ui/PageHeader'
import { InviteMemberForm } from '../components/InviteMemberForm'
import { MembersTable } from '../components/MembersTable'
import { RolePermissions } from '../components/RolePermissions'
import { initialMembers, organization } from '../data/mock'
import type { Member, Role } from '../types'

export function TeamPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers)

  function invite(email: string, role: Role) {
    setMembers((current) => [
      ...current,
      { id: `inv-${current.length + 1}`, email, role, status: 'pending', invitedLabel: 'Invitado ahora' },
    ])
  }

  function changeRole(id: string, role: Role) {
    setMembers((current) => current.map((m) => (m.id === id ? { ...m, role } : m)))
  }

  return (
    <>
      <PageHeader title="Equipo" actions={<span className="text-fg-subtle">{organization.name}</span>} />
      <div className="flex flex-col gap-6 p-6">
        <InviteMemberForm existingEmails={members.map((m) => m.email)} onInvite={invite} />
        <div className="flex flex-wrap items-start gap-6">
          <MembersTable members={members} onRoleChange={changeRole} />
          <RolePermissions />
        </div>
      </div>
    </>
  )
}
