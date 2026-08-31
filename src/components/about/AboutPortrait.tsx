import { useCallback, useEffect, useRef, type MouseEvent } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ABOUT } from '@/lib/about'
import { gsap, registerGsapPlugins } from '@/lib/gsap'
import '@/components/about/about.css'

export function AboutPortrait() {
  const reduced = useReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const onMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (reduced) return
      const img = imgRef.current
      if (!img) return
      const rect = event.currentTarget.getBoundingClientRect()
      const mx = ((event.clientX - rect.left) / rect.width - 0.5) * 18
      const my = ((event.clientY - rect.top) / rect.height - 0.5) * 14
      img.style.setProperty('--mx', `${mx}px`)
      img.style.setProperty('--my', `${my}px`)
    },
    [reduced],
  )

  const onLeave = useCallback(() => {
    const img = imgRef.current
    if (!img) return
    img.style.setProperty('--mx', '0px')
    img.style.setProperty('--my', '0px')
  }, [])

  useEffect(() => {
    if (reduced) return
    registerGsapPlugins()
    const scrollLayer = scrollRef.current
    const frame = frameRef.current
    if (!scrollLayer || !frame) return

    const tween = gsap.fromTo(
      scrollLayer,
      { yPercent: -7 },
      {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: frame,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced])

  return (
    <figure className="about-portrait-stage relative mx-auto w-full max-w-md lg:max-w-none">
      <p
        className="about-backdrop-type pointer-events-none absolute -top-10 -right-4 hidden text-[clamp(5rem,12vw,9rem)] uppercase lg:block"
        aria-hidden="true"
      >
        MK
      </p>
      <p
        className="about-backdrop-type pointer-events-none absolute -bottom-12 -left-6 hidden text-[clamp(2.8rem,7vw,5.6rem)] uppercase lg:block"
        aria-hidden="true"
      >
        Practice
      </p>

      <div
        ref={frameRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative bg-raised"
      >
        <div className="pointer-events-none absolute -top-3 -left-3 h-8 w-8 border-t border-l border-line-strong" />
        <div className="pointer-events-none absolute -top-3 -right-3 h-8 w-8 border-t border-r border-line-strong" />
        <div className="pointer-events-none absolute -bottom-3 -left-3 h-8 w-8 border-b border-l border-line-strong" />
        <div className="pointer-events-none absolute -right-3 -bottom-3 h-8 w-8 border-r border-b border-line-strong" />

        <div className="relative overflow-hidden border border-line">
          <div className="pointer-events-none absolute inset-3 z-20 border border-ink/12" />
          <div className="absolute top-5 left-5 z-20 font-mono text-[10px] tracking-[0.24em] text-ink/70">02</div>
          <div className="absolute top-5 right-5 z-20 font-mono text-[10px] tracking-[0.2em] text-ink/55 uppercase">
            Studio
          </div>

          <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5] lg:aspect-[3/4] lg:min-h-[36rem]">
            <div ref={scrollRef} className="absolute inset-[-10%]">
              <img
                ref={imgRef}
                src={ABOUT.portrait.src}
                alt={ABOUT.portrait.alt}
                width={1024}
                height={1536}
                className="about-portrait-img h-full w-full object-cover object-[50%_18%]"
              />
            </div>
            <div className="about-portrait-sheen pointer-events-none absolute inset-0 z-10" />
            <div className="about-portrait-grain pointer-events-none absolute inset-0 z-10" />
            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgb(7_7_8/0.18),transparent_22%,transparent_68%,rgb(7_7_8/0.42))]" />
          </div>
        </div>
      </div>

      <figcaption className="mt-5 flex items-end justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.2em] text-mute uppercase">
          Manikanth Reddy Komalla
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-mute uppercase">Editorial · B&W</span>
      </figcaption>
    </figure>
  )
}
