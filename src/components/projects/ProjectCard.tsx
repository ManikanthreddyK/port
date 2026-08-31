import { useCallback, useState, type MouseEvent } from 'react'
import { ArrowUpRight, GitBranch, Globe } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { PROJECT_STATUS_LABEL, type Project } from '@/lib/projects'
import { cardSpring, MotionLink } from '@/components/home/homeMotion'
import { ProjectMotif } from '@/components/projects/ProjectMotif'
import { cn } from '@/lib/cn'
import '@/components/projects/projects.css'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const reduced = useReducedMotion()
  const status = PROJECT_STATUS_LABEL[project.status]
  const isFuture = project.status === 'future-experiment'
  const hasMedia = Boolean(project.image)
  const hasStack = Boolean(project.stack?.length)
  const hasGitHub = Boolean(project.github)
  const hasLive = Boolean(project.live)
  const hasCase = Boolean(project.href)
  const [glow, setGlow] = useState({ x: 50, y: 40 })

  const onMove = useCallback(
      (event: MouseEvent<HTMLElement>) => {
      if (reduced) return
      const rect = event.currentTarget.getBoundingClientRect()
      setGlow({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      })
    },
    [reduced],
  )

  return (
    <motion.article
      onMouseMove={onMove}
      whileHover={reduced ? undefined : { y: -6 }}
      whileTap={reduced ? undefined : { scale: 0.994 }}
      transition={cardSpring}
      className="group relative flex h-full flex-col overflow-hidden border border-line bg-surface transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[0_28px_70px_rgb(0_0_0/0.42)]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgb(244 241 234 / 0.07), transparent 58%)`,
        }}
      />
      <div className="project-card-sheen pointer-events-none absolute inset-0 z-10" />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-raised">
        {hasMedia ? (
          <img
            src={project.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center">
            <div className="project-card-grid absolute inset-0" />
            <ProjectMotif id={project.id} />
          </div>
        )}

        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-5">
          <span className="font-mono text-[10px] tracking-[0.24em] text-mute">{project.id}</span>
          <span
            className={cn(
              'font-mono text-[10px] tracking-[0.22em] uppercase',
              isFuture ? 'text-accent' : 'text-mute',
            )}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="relative z-20 flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl tracking-tight text-ink sm:text-[1.7rem]">{project.title}</h2>
          <ArrowUpRight
            size={18}
            strokeWidth={1.4}
            className="mt-1 shrink-0 text-mute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
            aria-hidden="true"
          />
        </div>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">{project.description}</p>

        {hasStack ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack?.map((item) => (
              <li
                key={item}
                className="border border-line px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-mute uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          {hasGitHub ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-mist uppercase transition-colors hover:text-ink"
            >
              <GitBranch size={12} strokeWidth={1.5} />
              GitHub
            </a>
          ) : null}
          {hasLive ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-mist uppercase transition-colors hover:text-ink"
            >
              <Globe size={12} strokeWidth={1.5} />
              Live
            </a>
          ) : null}

          <span className="ml-auto font-mono text-[10px] tracking-[0.16em] text-mute uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {hasCase && project.href ? (
              <MotionLink to={project.href} className="text-mist transition-colors hover:text-ink">
                Open case
              </MotionLink>
            ) : isFuture ? (
              'Queued'
            ) : (
              'In formation'
            )}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
