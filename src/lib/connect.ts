export const CONNECT = {
  kicker: '05 — CONNECT',
  title: 'Start a conversation',
  subtitle:
    'A direct, considered way to reach out — for collaboration, research, or something worth building.',
  status: 'IN COMPOSITION',
} as const

export const CHANNELS = [
  {
    id: '01',
    name: 'LinkedIn',
    label: "Let's connect professionally.",
    value: 'manikanth-reddy-komalla',
    href: 'https://www.linkedin.com/in/manikanth-reddy-komalla-54b349356/',
    isExternal: true,
    actionLabel: 'Open Profile',
  },
  {
    id: '02',
    name: 'Email',
    label: 'For ideas, collaborations, or just to say hello.',
    value: 'manikanthreddykomalla@gmail.com',
    href: 'mailto:manikanthreddykomalla@gmail.com',
    isExternal: false,
    actionLabel: 'Send Email',
  },
] as const

export const PERSONAL_NOTE = {
  kicker: 'Got something in mind?',
  title: "I'm always interested in new ideas.",
  description:
    'Whether it relates to software development, frontend craftsmanship, UI/UX exploration, generative AI experimentation, or building something ambitious from scratch — feel free to reach out.',
} as const
