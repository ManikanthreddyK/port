import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ExploreField } from '@/components/stack/ExploreField'
import { FoundationGrid } from '@/components/stack/FoundationGrid'
import { NextPath } from '@/components/stack/NextPath'
import { STACK } from '@/lib/stack'
import { gsap, registerGsapPlugins, ScrollTrigger } from '@/lib/gsap'
import '@/components/stack/stack.css'

export function StackPage() {
  const pageRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    registerGsapPlugins()
    const page = pageRef.current
    if (!page) return

    const els = Array.from(page.querySelectorAll<HTMLElement>('[data-stack-reveal]'))
    gsap.set(els, { y: 24, opacity: 0 })

    const tweens: ReturnType<typeof gsap.to>[] = []

    const play = (el: HTMLElement, delay = 0) => {
      tweens.push(
        gsap.to(el, {
          y: 0,
          opacity: 1,
          delay,
          duration: 0.95,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }),
      )
    }

    const triggers = els.map((el, index) => {
      const top = el.getBoundingClientRect().top
      if (top < window.innerHeight * 0.92) {
        play(el, 0.08 + index * 0.06)
        return null
      }

      return ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => play(el),
      })
    })

    return () => {
      triggers.forEach((trigger) => trigger?.kill())
      tweens.forEach((tween) => tween.kill())
    }
  }, [reduced])

  return (
    <section ref={pageRef} className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      {/* Background ambient watermark */}
      <p
        className="pointer-events-none absolute top-8 left-[-0.08em] hidden font-display text-[clamp(8rem,20vw,16rem)] leading-none font-extrabold tracking-[-0.08em] text-ink/[0.035] uppercase select-none lg:block"
        aria-hidden="true"
      >
        Stack
      </p>

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Header preserving exact identity */}
        <header data-stack-reveal>
          <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
            {STACK.kicker}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.95] font-bold tracking-[-0.04em] text-ink uppercase">
            {STACK.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:mt-8 sm:text-lg">
            {STACK.subtitle}
          </p>

          <div className="mt-8 flex items-center gap-4 sm:mt-10">
            <div className="h-px w-14 bg-line-strong" />
            <p className="font-mono text-xs tracking-[0.22em] text-mute uppercase">
              {STACK.status}
            </p>
          </div>
        </header>

        {/* Section 01: Current Foundation */}
        <section data-stack-reveal className="mt-20 sm:mt-24" aria-labelledby="foundation-heading">
          <p className="font-mono text-[10px] tracking-[0.28em] text-mute uppercase">Section 01</p>
          <h2 id="foundation-heading" className="mt-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Current foundation
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mist">
            Technologies I currently have some knowledge of. Hover or tap a card for an honest stage — not a score.
          </p>
          <FoundationGrid />
        </section>

        {/* Section 02: What I'm Exploring */}
        <section data-stack-reveal className="mt-24 sm:mt-28" aria-labelledby="explore-heading">
          <p className="font-mono text-[10px] tracking-[0.28em] text-mute uppercase">Section 02</p>
          <h2 id="explore-heading" className="mt-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            What I&apos;m exploring
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mist">
            A field of interests, not a finished map. Touch a node to see how the questions connect.
          </p>
          <ExploreField />
        </section>

        {/* Section 03: What's Next */}
        <section data-stack-reveal className="mt-24 sm:mt-28" aria-labelledby="next-heading">
          <p className="font-mono text-[10px] tracking-[0.28em] text-mute uppercase">Section 03</p>
          <h2 id="next-heading" className="mt-3 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            What&apos;s next
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mist">
            A direction. Not a certification plan. Each step recedes a little further into the work still ahead.
          </p>
          <NextPath />
        </section>

        {/* Ending section */}
        <footer data-stack-reveal className="mt-28 border-t border-line pt-14 sm:mt-32 sm:pt-16">
          <div className="flex flex-col gap-2">
            <p className="font-display text-[clamp(1.75rem,4.5vw,2.85rem)] leading-[1.08] font-bold tracking-[-0.03em] text-ink uppercase">
              Still loading.
              <span
                className="stack-cursor ml-1 inline-block h-[0.72em] w-[0.42em] translate-y-[0.08em] bg-accent align-baseline"
                aria-hidden="true"
              />
            </p>
            <p className="font-display text-[clamp(1.75rem,4.5vw,2.85rem)] leading-[1.08] font-bold tracking-[-0.03em] text-mist uppercase">
              Still learning.
            </p>
            <p className="font-display text-[clamp(1.75rem,4.5vw,2.85rem)] leading-[1.08] font-bold tracking-[-0.03em] text-mute uppercase">
              Still evolving.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-line/60 pt-6 sm:mt-12">
            <span className="font-mono text-[11px] tracking-[0.24em] text-mute uppercase">
              CODE. BUILD. EVOLVE.
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
              03 / 05
            </span>
          </div>
        </footer>
      </div>
    </section>
  )
}
