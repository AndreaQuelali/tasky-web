import { cn } from '@/shared/lib/cn'

export type AvatarTone = 'blue' | 'violet' | 'amber'

const toneClass: Record<AvatarTone, string> = {
  blue: 'bg-[#223049] text-[#9dbcf4]',
  violet: 'bg-[#3a2547] text-[#d8b4f0]',
  amber: 'bg-[#4a3a14] text-[#f0d184]',
}

export function Avatar({ initials, tone, className }: { initials: string; tone: AvatarTone; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('grid size-[22px] shrink-0 place-items-center rounded-full text-[10px] font-bold', toneClass[tone], className)}
    >
      {initials}
    </span>
  )
}
