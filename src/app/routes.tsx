import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { HomePage } from '@/pages/HomePage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { AboutPage } from '@/pages/AboutPage'
import { StackPage } from '@/pages/StackPage'
import { JourneyPage } from '@/pages/JourneyPage'
import { ConnectPage } from '@/pages/ConnectPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="stack" element={<StackPage />} />
        <Route path="journey" element={<JourneyPage />} />
        <Route path="connect" element={<ConnectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
