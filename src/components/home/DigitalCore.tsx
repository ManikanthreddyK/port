import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap, registerGsapPlugins, ScrollTrigger } from '@/lib/gsap'
import robotImg from '@/assets/ai_robot_hero.jpg'

export function DigitalCore() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rigRef = useRef<HTMLDivElement>(null)
  const hudRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    registerGsapPlugins()

    const container = containerRef.current
    const rig = rigRef.current
    const hud = hudRef.current
    if (!container || !rig || !hud) return

    // Quick setters for smooth 60fps hardware accelerated motion
    const setRigRotateX = gsap.quickSetter(rig, 'rotateX', 'deg')
    const setRigRotateY = gsap.quickSetter(rig, 'rotateY', 'deg')
    const setRigX = gsap.quickSetter(rig, 'x', 'px')
    const setRigY = gsap.quickSetter(rig, 'y', 'px')

    const setHudScale = gsap.quickSetter(hud, 'scale')
    const setHudRotate = gsap.quickSetter(hud, 'rotate', 'deg')
    const setHudX = gsap.quickSetter(hud, 'x', 'px')
    const setHudY = gsap.quickSetter(hud, 'y', 'px')

    const pointer = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const scroll = { progress: 0 }

    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    const isMobile = window.matchMedia('(max-width: 1023px)').matches
    const dampening = isCoarse ? 0.25 : 0.85
    const travelLimit = isMobile ? 0.45 : 1

    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window
      pointer.x = ((e.clientX / innerWidth) * 2 - 1) * dampening
      pointer.y = ((e.clientY / innerHeight) * 2 - 1) * dampening
    }

    const handlePointerLeave = () => {
      pointer.x = 0
      pointer.y = 0
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave)

    let isVisible = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { rootMargin: '30%' },
    )
    observer.observe(container)

    ScrollTrigger.config({ ignoreMobileResize: true })

    const homePage = document.querySelector('.home-page')
    const scrollTween = gsap.to(scroll, {
      progress: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: homePage ?? container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: isMobile ? 0.6 : 1.2,
        invalidateOnRefresh: true,
      },
    })

    // Animation loop
    const tick = () => {
      if (!isVisible || document.hidden) return

      // Smooth pointer lerp
      current.x += (pointer.x - current.x) * 0.05
      current.y += (pointer.y - current.y) * 0.05

      const p = scroll.progress
      const t = gsap.ticker.time

      // Slow ambient breathing motion
      const floatY = Math.sin(t * 0.35) * 6 * (1 - p * 0.35)
      const floatRotate = Math.sin(t * 0.2) * 1.5

      // Subtle 3D tilt & parallax
      setRigRotateX((current.y * -10 + p * 8) * travelLimit)
      setRigRotateY((current.x * 12 - p * 6) * travelLimit)
      setRigX(current.x * 16 * travelLimit)
      setRigY(current.y * 10 + floatY + p * 32 * travelLimit)

      // Interactive HUD reaction at fingertip
      setHudScale(1 + p * 0.18 + Math.sin(t * 0.6) * 0.02)
      setHudRotate(floatRotate + p * -10)
      setHudX(current.x * -12)
      setHudY(current.y * -8)
    }

    gsap.ticker.add(tick)
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      observer.disconnect()
      scrollTween.scrollTrigger?.kill()
      scrollTween.kill()
    }
  }, [reduced])

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[660px] xl:max-w-[740px] select-none"
      aria-label="Humanoid AI Robot Interface"
    >
      <div className="relative aspect-[4/3] w-full overflow-visible">
        {/* Main 3D Preserve Rig */}
        <div ref={rigRef} className="orbital-preserve relative h-full w-full will-change-transform">
          {/* Base AI Robot Cinematic Image */}
          <div className="relative h-full w-full overflow-hidden rounded-xs">
            <img
              src={robotImg}
              alt="Cinematic Humanoid AI Robot touching digital screen interface"
              className="h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />

            {/* Edge blending vignettes to ensure seamless merger into bg-void */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void/90 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void/70" />
          </div>

          {/* Interactive Digital Interface & HUD at the Robot's Fingertip */}
          {/* Fingertip is located at approximately left: 14.5%, top: 38% */}
          <div
            ref={hudRef}
            className="pointer-events-none absolute left-[14.5%] top-[38%] h-0 w-0 will-change-transform"
          >
            {/* 1. Touch Focal Point & Glow Pulse */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex items-center justify-center">
                {/* Core bright touch node */}
                <span className="h-2 w-2 rounded-full bg-ink shadow-[0_0_12px_rgba(244,241,234,0.85)]" />
                {/* Subtle expanding ping aura */}
                <span className="absolute h-6 w-6 rounded-full border border-ink/40 opacity-75 animate-ping" />
                <span className="absolute h-10 w-10 rounded-full border border-accent/30 opacity-50" />
              </div>
            </div>

            {/* 2. Concentric Thin HUD Rings */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
                {/* Inner Rotating Ring */}
                <svg
                  className="orbital-spin-slow absolute inset-0 h-full w-full"
                  viewBox="0 0 160 160"
                  fill="none"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    stroke="#f4f1ea"
                    strokeOpacity="0.32"
                    strokeWidth="0.8"
                    strokeDasharray="4 8"
                  />
                  <circle cx="80" cy="12" r="1.5" fill="#f4f1ea" fillOpacity="0.7" />
                  <circle cx="148" cy="80" r="1.5" fill="#f4f1ea" fillOpacity="0.7" />
                  <circle cx="80" cy="148" r="1.5" fill="#f4f1ea" fillOpacity="0.7" />
                  <circle cx="12" cy="80" r="1.5" fill="#f4f1ea" fillOpacity="0.7" />
                </svg>

                {/* Outer Reverse Rotating Ring */}
                <svg
                  className="orbital-spin-rev absolute inset-0 h-full w-full"
                  viewBox="0 0 160 160"
                  fill="none"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="76"
                    stroke="#c4b8a5"
                    strokeOpacity="0.22"
                    strokeWidth="0.7"
                    strokeDasharray="2 6"
                  />
                  <line x1="80" y1="2" x2="80" y2="10" stroke="#f4f1ea" strokeOpacity="0.6" strokeWidth="1" />
                  <line x1="150" y1="80" x2="158" y2="80" stroke="#f4f1ea" strokeOpacity="0.6" strokeWidth="1" />
                  <line x1="80" y1="150" x2="80" y2="158" stroke="#f4f1ea" strokeOpacity="0.6" strokeWidth="1" />
                  <line x1="2" y1="80" x2="10" y2="80" stroke="#f4f1ea" strokeOpacity="0.6" strokeWidth="1" />
                </svg>

                {/* Fine Tangent Crosshairs */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 160 160"
                  fill="none"
                >
                  <line x1="80" y1="20" x2="80" y2="140" stroke="#f4f1ea" strokeOpacity="0.18" strokeDasharray="3 5" />
                  <line x1="20" y1="80" x2="140" y2="80" stroke="#f4f1ea" strokeOpacity="0.18" strokeDasharray="3 5" />
                </svg>
              </div>
            </div>

            {/* 3. Minimal Interface Technical Callouts */}
            <div className="absolute top-[-54px] left-[-80px] hidden sm:block">
              <div className="flex items-center gap-2 border border-line-strong bg-void/90 px-2.5 py-1 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[8px] tracking-[0.24em] text-mute uppercase">SYS.INTERFACE // ACTIVE</span>
              </div>
            </div>

            <div className="absolute top-[48px] left-[-72px] hidden sm:block">
              <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.22em] text-mist/70">
                <span>TOUCH.POINT // 0x4E</span>
                <span className="text-mute">•</span>
                <span>LATENCY // 0.8ms</span>
              </div>
            </div>

            {/* 4. Subtle Floating Micro-Particles around interaction field */}
            <div className="absolute top-[-30px] left-[40px] h-1 w-1 rounded-full bg-ink/60 shadow-[0_0_6px_rgba(244,241,234,0.5)]" />
            <div className="absolute top-[35px] left-[-45px] h-1 w-1 rounded-full bg-accent/70 shadow-[0_0_6px_rgba(196,184,165,0.5)]" />
            <div className="absolute top-[-20px] left-[-35px] h-0.5 w-0.5 rounded-full bg-ink/80" />
            <div className="absolute top-[25px] left-[55px] h-0.5 w-0.5 rounded-full bg-ink/80" />
          </div>

          {/* Bottom subtle system telemetry tag */}
          <div className="absolute bottom-3 right-4 hidden sm:flex items-center gap-2 font-mono text-[9px] tracking-[0.26em] text-mute/50 uppercase">
            <span>NEURAL ARCHITECTURE</span>
            <span>//</span>
            <span>MK-AI 2.0</span>
          </div>
        </div>
      </div>

      {/* Mobile-Friendly Simplified Interface Indicator */}
      <div className="mt-3 flex items-center justify-between border-t border-line px-2 pt-2 sm:hidden">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.22em] text-mist uppercase">Neural Interface Active</span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.2em] text-mute">SYS // 01</span>
      </div>
    </div>
  )
}
