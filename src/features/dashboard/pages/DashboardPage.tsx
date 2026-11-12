import { Plus } from 'lucide-react'
import { Link } from 'react-router'
import { PageHeader } from '@/shared/ui/PageHeader'
import { MyTasksList } from '../components/MyTasksList'
import { NotificationsPopover } from '../components/NotificationsPopover'
import { ProductivityChart } from '../components/ProductivityChart'
import { ProjectProgress } from '../components/ProjectProgress'
import { StatsStrip } from '../components/StatsStrip'
import { completedPerDay, myTasks, notifications, projectProgress, stats } from '../data/mock'

const today = new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

export function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        actions={
          <div className="flex items-center gap-2">
            <NotificationsPopover items={notifications} />
            <Link
              to="/projects/plataforma-api"
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-accent px-3 font-semibold text-accent-fg hover:brightness-110"
            >
              <Plus className="size-3.5" strokeWidth={2.4} aria-hidden />
              Nueva tarea
            </Link>
          </div>
        }
      />

      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl font-semibold tracking-tight">Tu resumen de hoy</h2>
          <p className="text-fg-subtle first-letter:uppercase">{today} · Nova Labs</p>
        </div>

        <StatsStrip stats={stats} />

        <div className="flex flex-wrap items-start gap-6">
          <div className="min-w-0 flex-[1.5_1_440px]">
            <MyTasksList tasks={myTasks} />
          </div>
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-6">
            <ProductivityChart data={completedPerDay} />
            <ProjectProgress projects={projectProgress} />
          </div>
        </div>
      </div>
    </>
  )
}
