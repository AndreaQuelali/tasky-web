import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

type Variant = 'primary' | 'outline' | 'ghost'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg font-semibold hover:brightness-110',
  outline: 'border border-line-strong bg-surface text-fg hover:bg-raised',
  ghost: 'text-fg-muted hover:bg-raised hover:text-fg',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }

export function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm transition disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
