import { createBrowserRouter } from 'react-router'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { BoardPage } from '@/features/kanban/pages/BoardPage'
import { TeamPage } from '@/features/organizations/pages/TeamPage'
import { ProjectsPage } from '@/features/projects/pages/ProjectsPage'
import { TaskPage } from '@/features/tasks/pages/TaskPage'
import { AppLayout } from './layout/AppLayout'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:projectId', element: <BoardPage /> },
      { path: 'tasks/:taskId', element: <TaskPage /> },
      { path: 'team', element: <TeamPage /> },
    ],
  },
])
