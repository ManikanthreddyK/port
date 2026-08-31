import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { PROJECTS } from '@/lib/projects'
import { gsap, registerGsapPlugins } from '@/lib/gsap'

export function ProjectsPage() {
  const listRef = useRef<HTMLUListElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    registerGsapPlugins()
    const list = listRef.current
    if (!list) return

    const items = list.querySelectorAll('[data-project-card]')
    const tween = gsap.from(items, {
      y: 22,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: {
        trigger: list,
        start: 'top 90%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced])

  return (
    <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">01 — Projects</p>
        <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Selected work
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
          Four systems in formation — study, conversation, analysis, and play. None are shipped. Each is being shaped
          with intent.
        </p>

        <ul ref={listRef} className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2 md:gap-5">
          {PROJECTS.map((project) => (
            <li key={project.slug} data-project-card>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
