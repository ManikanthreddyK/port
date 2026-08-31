import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ContactChannels } from '@/components/connect/ContactChannels'
import { ContactForm } from '@/components/connect/ContactForm'
import { CONNECT } from '@/lib/connect'
import { gsap, registerGsapPlugins, ScrollTrigger } from '@/lib/gsap'
import '@/components/connect/connect.css'

export function ConnectPage() {
  const pageRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    registerGsapPlugins()
    const page = pageRef.current
    if (!page) return

    const els = Array.from(page.querySelectorAll<HTMLElement>('[data-connect-reveal]'))
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
        Connect
      </p>

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Header preserving exact identity */}
        <header data-connect-reveal>
          <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
            {CONNECT.kicker}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.95] font-bold tracking-[-0.04em] text-ink uppercase">
            {CONNECT.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:mt-8 sm:text-lg">
            {CONNECT.subtitle}
          </p>

          <div className="mt-8 flex items-center gap-4 sm:mt-10">
            <div className="h-px w-14 bg-line-strong" />
            <p className="font-mono text-xs tracking-[0.22em] text-mute uppercase">
              {CONNECT.status}
            </p>
          </div>
        </header>

        {/* Main Content: Channels & Contact Form Grid */}
        <section data-connect-reveal className="mt-16 sm:mt-20 lg:mt-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14 xl:gap-16">
            <div>
              <ContactChannels />
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Ending section */}
        <footer data-connect-reveal className="mt-28 border-t border-line pt-14 sm:mt-32 sm:pt-16">
          <div className="flex flex-col gap-2">
            <p className="font-display text-[clamp(1.75rem,4.5vw,2.85rem)] leading-[1.08] font-bold tracking-[-0.03em] text-ink uppercase">
              The next idea
              <span
                className="connect-cursor ml-1 inline-block h-[0.72em] w-[0.42em] translate-y-[0.08em] bg-accent align-baseline"
                aria-hidden="true"
              />
            </p>
            <p className="font-display text-[clamp(1.75rem,4.5vw,2.85rem)] leading-[1.08] font-bold tracking-[-0.03em] text-mist uppercase">
              Could start here.
            </p>
            <p className="mt-2 font-mono text-xs tracking-[0.2em] text-mute uppercase sm:text-sm">
              Let&apos;s build something meaningful.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-line/60 pt-6 sm:mt-12">
            <span className="font-mono text-[11px] tracking-[0.24em] text-mute uppercase">
              CODE. BUILD. EVOLVE.
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
              05 / 05
            </span>
          </div>
        </footer>
      </div>
    </section>
  )
}
