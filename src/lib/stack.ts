export const STACK = {
  kicker: '03 — STACK',
  title: 'Tools of the craft',
  subtitle: 'Languages, frameworks, and models — presented as a living map, not a badge wall.',
  status: 'IN COMPOSITION',
} as const

export const FOUNDATION = [
  {
    id: '01',
    name: 'C',
    level: 'BASIC TO INTERMEDIATE',
    focus: false,
    note: 'My first introduction to programming and one of my stronger foundations.',
  },
  {
    id: '02',
    name: 'Java',
    level: 'CURRENTLY LEARNING SERIOUSLY',
    focus: true,
    note: 'Currently focusing on learning Java more seriously and strengthening my programming fundamentals.',
  },
  {
    id: '03',
    name: 'Python',
    level: 'FUNDAMENTALS & SYNTAX',
    focus: false,
    note: 'Familiar with basic syntax and programming concepts.',
  },
  {
    id: '04',
    name: 'HTML',
    level: 'BEGINNER',
    focus: false,
    note: 'Currently learning the foundations of building web interfaces.',
  },
  {
    id: '05',
    name: 'CSS',
    level: 'BEGINNER',
    focus: false,
    note: 'Exploring styling, layouts, and the visual side of web development.',
  },
  {
    id: '06',
    name: 'MySQL',
    level: 'BASIC FOUNDATIONS',
    focus: false,
    note: 'Understand basic database concepts including tables and simple queries.',
  },
] as const

export const EXPLORING = [
  {
    id: 'A',
    name: 'Software Development',
    note: 'The practice I am training for — turning ideas into working software, one honest step at a time.',
    x: 20,
    y: 38,
  },
  {
    id: 'B',
    name: 'UI/UX Design',
    note: 'How something feels when a person uses it. I am studying this with attention, not a job title.',
    x: 44,
    y: 18,
  },
  {
    id: 'C',
    name: 'Web Experiences',
    note: 'Pages that move, respond, and hold a mood. This site is part of that experiment.',
    x: 76,
    y: 26,
  },
  {
    id: 'D',
    name: 'Generative AI',
    note: 'I am learning what these models can make — and where they fall short. Curiosity, not expertise.',
    x: 82,
    y: 62,
  },
  {
    id: 'E',
    name: 'Agentic AI',
    note: 'Curious about systems that can plan and act, not only complete a prompt. Still early.',
    x: 52,
    y: 78,
  },
  {
    id: 'F',
    name: 'Multimodal AI',
    note: 'Interested in work that crosses text, image, and other signals. Watching closely. Not claiming.',
    x: 24,
    y: 70,
  },
] as const

export const EXPLORE_LINKS = [
  [0, 1],
  [0, 2],
  [0, 5],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [1, 5],
  [0, 4],
  [1, 3],
] as const

export const NEXT = [
  {
    id: '01',
    name: 'Advanced Java',
    tag: 'Next Priority',
    note: 'Go deeper in the language I am already studying — structure, practice, real fluency.',
  },
  {
    id: '02',
    name: 'JavaScript',
    tag: 'Web Dynamic',
    note: 'The language that makes the web move. Next on the path, not already in the bag.',
  },
  {
    id: '03',
    name: 'React',
    tag: 'Interface Architecture',
    note: 'I want to understand the interfaces I am beginning to shape — from the inside, not just the surface.',
  },
  {
    id: '04',
    name: 'Real-World Projects',
    tag: 'Applied Engineering',
    note: 'Work that exists outside assignments. Things people can actually use.',
  },
  {
    id: '05',
    name: 'AI Applications',
    tag: 'Applied Intelligence',
    note: 'Move from watching these systems to building small, honest applications with them.',
  },
  {
    id: '06',
    name: 'Game Development',
    tag: 'Long Horizon',
    note: 'A later experiment. Personal. Not the current job — a horizon I want to reach in my own time.',
  },
] as const

export type FoundationItem = (typeof FOUNDATION)[number]
export type ExploreItem = (typeof EXPLORING)[number]
export type NextItem = (typeof NEXT)[number]
