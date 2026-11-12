import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { PageHeader } from '@/shared/ui/PageHeader'
import { ProjectFilterTabs, type ProjectFilter } from '../components/ProjectFilterTabs'
import { ProjectsTable } from '../components/ProjectsTable'
import { projects } from '../data/mock'

export function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectFilter>('all')
  const visible = filter === 'all' ? projects : projects.filter((p) => p.status === filter)

  return (
    <>
      <PageHeader
        title="Proyectos"
        actions={
          <Button className="h-8 gap-1.5 rounded-md px-3 text-[13px]">
            <Plus className="size-3.5" strokeWidth={2.4} aria-hidden />
            Nuevo proyecto
          </Button>
        }
      >
        <ProjectFilterTabs value={filter} onChange={setFilter} />
      </PageHeader>

      <div className="px-6 pb-6">
        {visible.length > 0 ? (
          <ProjectsTable projects={visible} />
        ) : (
          <p className="py-16 text-center text-fg-subtle">No hay proyectos en esta vista.</p>
        )}
      </div>
    </>
  )
}
