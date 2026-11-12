import { roleDescriptions, roleLabels, type Role } from '../types'

const roles: Role[] = ['owner', 'admin', 'member']

export function RolePermissions() {
  return (
    <aside
      aria-label="Permisos por rol"
      className="flex min-w-0 flex-[1_1_260px] flex-col gap-4 rounded-[10px] border border-line p-4"
    >
      <h2 className="text-[13px] font-semibold">Qué puede hacer cada rol</h2>
      {roles.map((r) => (
        <div key={r} className="flex flex-col gap-0.5">
          <span className="font-semibold">{roleLabels[r]}</span>
          <span className="leading-normal text-fg-muted">{roleDescriptions[r]}</span>
        </div>
      ))}
    </aside>
  )
}
