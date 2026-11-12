import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, className, id, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-xs font-medium text-fg-muted">
        {label}
      </label>
      <input
        id={inputId}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'h-10 rounded-lg border border-line-strong bg-surface px-3 text-sm text-fg placeholder:text-fg-subtle',
          error && 'border-danger',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
})
