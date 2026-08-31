export const JOURNEY = {
  kicker: '04 — JOURNEY',
  title: 'A timeline in motion',
  subtitle: 'Education, milestones, and the path from student to builder. This chapter is not written yet.',
  status: 'IN COMPOSITION',
} as const

export type MilestoneState = 'past' | 'present' | 'future'

export type Milestone = {
  id: string
  era: string
  title: string
  label: string
  topic: string
  story: string
  tags: readonly string[]
  specialization?: string
  state: MilestoneState
}

export const MILESTONES: readonly Milestone[] = [
  {
    id: '01',
    era: '2024',
    title: 'The First Line of Code',
    label: 'The Beginning',
    topic: 'C Programming',
    story:
      'C was my introduction to programming. It was where I first started understanding how code, logic, and problem-solving work.',
    tags: ['C Programming', 'Logic & Control Flow', 'First Principles'],
    state: 'past',
  },
  {
    id: '02',
    era: 'Second Year — First Semester',
    title: 'Discovering Java',
    label: 'Exploring',
    topic: 'Programming Fundamentals',
    story:
      'Java introduced me to a larger world of software development, but at this stage I was still only beginning to understand what I wanted to build.',
    tags: ['Basic Syntax', 'Basic Operations', 'Programming Fundamentals'],
    state: 'past',
  },
  {
    id: '03',
    era: 'Second Year — Second Semester',
    title: 'Exploring Full-Stack Development',
    label: 'Finding My Direction',
    topic: 'Frontend & UI/UX',
    story:
      'I explored full-stack development, but this phase helped me understand what I enjoy more: creating interfaces, experiences, and the visible side of technology.',
    tags: ['Frontend Development', 'Web Design', 'UI/UX Craft', 'Digital Experiences'],
    state: 'past',
  },
  {
    id: '04',
    era: 'Specialization Focus',
    title: 'The AI Direction',
    label: 'New Territory',
    topic: 'Intelligent Systems',
    story:
      'AI became another direction I wanted to explore — not because I already know everything about it, but because I want to understand how intelligent systems can become part of the things I build.',
    specialization: 'Generative AI for Agentic & Multimodal Intelligence',
    tags: ['Generative AI', 'Agentic AI', 'Multimodal Intelligence'],
    state: 'past',
  },
  {
    id: '05',
    era: 'Now',
    title: 'Building the Foundation',
    label: 'Current Focus',
    topic: 'Active Practice',
    story:
      "I don't have a long list of finished projects or years of experience yet. Right now, I am focused on learning properly, improving my foundations, and becoming capable of building real things.",
    tags: [
      'Java Seriously',
      'Core Fundamentals',
      'Frontend & Web Experiences',
      'UI/UX Design',
      'Generative AI',
      'Real Projects',
    ],
    state: 'present',
  },
  {
    id: '06',
    era: 'Future Horizon',
    title: 'The Next Chapter',
    label: 'Still Writing',
    topic: 'Destinations Ahead',
    story:
      'Becoming a professional software developer and turning curiosity into real-world software, AI-powered applications, resilient web engineering, advanced Java, and personal creative experiments.',
    tags: [
      'Professional Software Dev',
      'Real-World Projects',
      'AI Applications',
      'Advanced Java',
      'JavaScript & React',
      'Game Dev Experiments',
    ],
    state: 'future',
  },
] as const
