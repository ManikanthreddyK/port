import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { gsap, registerGsapPlugins } from '@/lib/gsap'
import { MotionLink, cardSpring } from '@/components/home/homeMotion'
import { PROJECTS, PROJECT_STATUS_LABEL } from '@/lib/projects'

const FEATURED = PROJECTS.slice(0, 3)

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    registerGsapPlugins()
    const section = sectionRef.current
    if (!section) return

    const items = section.querySelectorAll('[data-featured-card]')
    const tween = gsap.from(items, {
      y: 22,
      duration: 0.85,
      stagger: 0.08,
      ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: {
        trigger: section,
        start: 'top 88%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced])

  return (
    <section ref={sectionRef} className="home-featured mx-auto max-w-[1440px] px-6 pb-16 sm:px-8 lg:px-12 lg:pb-24">
      <div className="mb-8 flex items-end justify-between gap-6">
        <p className="font-mono text-[10px] tracking-[0.28em] text-mute uppercase">Selected work</p>
        <MotionLink
          to="/projects"
          whileHover={reduced ? undefined : { y: -1 }}
          className="hidden font-mono text-[10px] tracking-[0.2em] text-mist uppercase transition-colors hover:text-ink sm:inline"
        >
          Index
        </MotionLink>
      </div>

      <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
        {FEATURED.map((project) => (
          <li key={project.id} data-featured-card>
            <MotionLink
              to="/projects"
              whileHover={reduced ? undefined : { y: -6 }}
              whileTap={reduced ? undefined : { scale: 0.992 }}
              transition={cardSpring}
              className="group flex min-h-[180px] flex-col justify-between border border-line bg-surface p-6 hover:border-line-strong sm:min-h-[210px] sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] tracking-[0.24em] text-mute">{project.id}</span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.4}
                  className="text-mute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                />
              </div>
              <div>
                <h2 className="font-display text-xl tracking-[0.08em] text-ink uppercase sm:text-2xl">
                  {project.title}
                </h2>
                <p className="mt-2 font-mono text-[10px] tracking-[0.22em] text-mute uppercase">
                  {PROJECT_STATUS_LABEL[project.status]}
                </p>
              </div>
            </MotionLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
