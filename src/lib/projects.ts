export type ProjectStatus = 'coming-soon' | 'future-experiment'

export type Project = {
  id: string
  slug: string
  title: string
  description: string
  status: ProjectStatus
  stack?: readonly string[]
  image?: string
  github?: string
  live?: string
  href?: string
}

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  'coming-soon': 'Coming soon',
  'future-experiment': 'Future experiment',
}

export const PROJECTS: readonly Project[] = [
  {
    id: '01',
    slug: 'ai-study-planner',
    title: 'AI Study Planner',
    description:
      'An intelligent study planning system designed to help students organize schedules, goals, and learning priorities.',
    status: 'coming-soon',
  },
  {
    id: '02',
    slug: 'gaming-ai-chatbot',
    title: 'Gaming AI Chatbot',
    description:
      'An AI-powered conversational assistant exploring gaming interactions, player assistance, and intelligent recommendations.',
    status: 'coming-soon',
  },
  {
    id: '03',
    slug: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    description:
      'An intelligent resume analysis tool that provides structured feedback and improvement suggestions.',
    status: 'coming-soon',
  },
  {
    id: '04',
    slug: 'playable-game',
    title: 'Playable Game',
    description:
      'A future interactive game experiment exploring creative programming and game development.',
    status: 'future-experiment',
  },
]

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug)
}
