import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { AboutInterests } from '@/components/about/AboutInterests'
import { AboutPortrait } from '@/components/about/AboutPortrait'
import { ABOUT } from '@/lib/about'
import { gsap, registerGsapPlugins } from '@/lib/gsap'

export function AboutPage() {
  const pageRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    registerGsapPlugins()
    const page = pageRef.current
    if (!page) return

    const tweens = Array.from(page.querySelectorAll('[data-about-reveal]')).map((el) =>
      gsap.from(el, {
        y: 28,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }),
    )

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill()
        tween.kill()
      })
    }
  }, [reduced])

  return (
    <section ref={pageRef} className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <p
        className="pointer-events-none absolute top-10 left-[-0.08em] hidden font-display text-[clamp(8rem,22vw,18rem)] leading-none font-extrabold tracking-[-0.08em] text-ink/[0.035] uppercase select-none lg:block"
        aria-hidden="true"
      >
        Person
      </p>

      <div className="relative mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start lg:gap-14 xl:gap-20">
        <header data-about-reveal className="lg:col-start-1 lg:pt-2">
          <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">{ABOUT.kicker}</p>
          <h1 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.65rem)] leading-[0.94] font-bold tracking-[-0.04em] text-ink uppercase">
            <span className="block">{ABOUT.title[0]}</span>
            <span className="block">{ABOUT.title[1]}</span>
          </h1>
        </header>

        <aside data-about-reveal className="lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:self-start">
          <AboutPortrait />
        </aside>

        <div className="lg:col-start-1 lg:max-w-xl lg:pb-8">
          <div data-about-reveal className="space-y-5">
            <p className="text-base leading-relaxed text-mist sm:text-lg">{ABOUT.intro}</p>
            <p className="text-base leading-relaxed text-mist sm:text-lg">{ABOUT.focus}</p>
          </div>

          <div data-about-reveal className="mt-14 sm:mt-16">
            <p className="font-mono text-[10px] tracking-[0.28em] text-mute uppercase">Beyond code</p>
            <AboutInterests />
          </div>

          <div data-about-reveal className="mt-14 border-t border-line pt-10 sm:mt-16">
            <p className="font-mono text-[10px] tracking-[0.28em] text-mute uppercase">Where I&apos;m heading</p>
            <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">{ABOUT.heading}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
