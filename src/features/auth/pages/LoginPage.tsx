import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { Button } from '@/shared/ui/Button'
import { TextField } from '@/shared/ui/TextField'

const loginSchema = z.object({
  email: z.email('Ingresa un correo válido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  // TODO: conectar con POST /auth/login de tasky-api.
  const onSubmit = handleSubmit(async () => {
    await navigate('/')
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-sidebar px-6 py-12">
      <div className="flex flex-col items-center gap-3.5">
        <span className="grid size-11 place-items-center rounded-xl bg-accent">
          <Check className="size-6 text-accent-fg" strokeWidth={3} aria-hidden />
        </span>
        <span className="text-[13px] font-semibold tracking-[0.14em] text-fg-muted">TASKY</span>
      </div>

      <form onSubmit={onSubmit} noValidate className="flex w-full max-w-[340px] flex-col gap-4">
        <h1 className="text-center text-[22px] font-semibold tracking-tight">Inicia sesión en TASKY</h1>
        <TextField
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" disabled={isSubmitting}>
          Continuar
        </Button>
      </form>
    </div>
  )
}
