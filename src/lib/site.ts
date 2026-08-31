export const SITE = {
  name: 'Manikanth Reddy Komalla',
  shortName: 'Manikanth',
  monogram: 'MK',
  mantra: 'CODE. BUILD. EVOLVE.',
  role: 'Computer Science Engineering',
  focus: ['Software Development', 'Full-Stack', 'Generative AI', 'Agentic AI', 'Multimodal Intelligence'],
} as const

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Stack', path: '/stack' },
  { label: 'Journey', path: '/journey' },
  { label: 'Connect', path: '/connect' },
] as const

export type NavPath = (typeof NAV_LINKS)[number]['path']
