import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/shared/ui/Button'
import { TextField } from '@/shared/ui/TextField'
import { assignableRoles, roleLabels, type Role } from '../types'

const inviteSchema = z.object({
  email: z.email('Ingresa un correo válido'),
  role: z.enum(['member', 'admin']),
})

type InviteValues = z.infer<typeof inviteSchema>

type InviteMemberFormProps = {
  /** Correos que ya son miembros o tienen una invitación pendiente. */
  existingEmails: string[]
  onInvite: (email: string, role: Role) => void
}

export function InviteMemberForm({ existingEmails, onInvite }: InviteMemberFormProps) {
  const roleId = useId()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<InviteValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: '', role: 'member' },
  })

  // TODO: conectar con POST /organizations/:id/invitations de tasky-api.
  const onSubmit = handleSubmit(({ email, role }) => {
    const normalized = email.trim().toLowerCase()
    if (existingEmails.includes(normalized)) {
      setError('email', { message: 'Ese correo ya es miembro o tiene una invitación pendiente' })
      return
    }
    onInvite(normalized, role)
    reset()
  })

  return (
    <section aria-label="Invitar miembro" className="flex flex-col gap-3 rounded-[10px] border border-line p-4">
      <h2 className="text-[13px] font-semibold">Invitar a un miembro</h2>
      <form onSubmit={onSubmit} noValidate className="flex flex-wrap items-start gap-2.5">
        <TextField
          label="Correo electrónico"
          type="email"
          placeholder="nombre@correo.com"
          autoComplete="off"
          error={errors.email?.message}
          className="h-9"
          {...register('email')}
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor={roleId} className="text-xs font-medium text-fg-muted">
            Rol
          </label>
          <select
            id={roleId}
            className="h-9 rounded-lg border border-line-strong bg-surface px-2.5 text-sm text-fg [color-scheme:dark]"
            {...register('role')}
          >
            {assignableRoles.map((r) => (
              <option key={r} value={r}>
                {roleLabels[r]}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" className="mt-[22px] h-9">
          Enviar invitación
        </Button>
      </form>
    </section>
  )
}
