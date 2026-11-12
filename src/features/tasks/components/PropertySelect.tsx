import type { ReactNode } from 'react'

type Option = { value: string; label: string }

type PropertySelectProps = {
  /** Nombre accesible del campo, p. ej. "Estado". */
  label: string
  value: string
  options: Option[]
  onChange: (value: string) => void
  /** Representación visual del valor actual. */
  children: ReactNode
}

/** Fila de propiedad: se ve como botón y usa un select nativo (accesible por teclado) encima. */
export function PropertySelect({ label, value, options, onChange, children }: PropertySelectProps) {
  return (
    <div className="relative rounded-md focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent hover:bg-surface">
      <div className="flex h-8 items-center gap-2 px-2">{children}</div>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 size-full cursor-pointer opacity-0 [color-scheme:dark]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
