import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { easeOutQuint } from '@/components/home/homeMotion'

interface IntroExperienceProps {
  onEnter: () => void
  isEntered: boolean
}

export function IntroExperience({ onEnter, isEntered }: IntroExperienceProps) {
  const reduced = useReducedMotion()
  const [isExiting, setIsExiting] = useState(false)
  const isTriggeredRef = useRef(false)

  // Handle entry initiation with locked transition sequence
  const handleTriggerEnter = useCallback(() => {
    if (isTriggeredRef.current || isEntered) return
    isTriggeredRef.current = true
    setIsExiting(true)

    if (reduced) {
      onEnter()
      return
    }

    // Complete cinematic dispersal and reveal main home page
    const timer = window.setTimeout(() => {
      onEnter()
    }, 950)

    return () => window.clearTimeout(timer)
  }, [isEntered, onEnter, reduced])

  useEffect(() => {
    if (isEntered || isExiting) return

    // Wheel event listener (detect downward scroll with gentle threshold)
    let accumulatedDelta = 0
    const onWheel = (e: WheelEvent) => {
      if (isTriggeredRef.current) return
      if (e.deltaY > 12 || e.deltaX > 20) {
        handleTriggerEnter()
      } else {
        accumulatedDelta += Math.abs(e.deltaY)
        if (accumulatedDelta > 24) {
          handleTriggerEnter()
        }
      }
    }

    // Touch event listener (detect swipe gesture)
    let touchStartY = 0
    let touchStartX = 0
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY
        touchStartX = e.touches[0].clientX
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (isTriggeredRef.current) return
      if (e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY
        const deltaX = Math.abs(touchStartX - e.touches[0].clientX)
        if (deltaY > 20 || (deltaY < -20 && deltaX < 25)) {
          handleTriggerEnter()
        }
      }
    }

    // Keyboard navigation (Down arrow, Right arrow, Space, Enter, PageDown)
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTriggeredRef.current) return
      if (['ArrowDown', 'ArrowRight', ' ', 'Enter', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        handleTriggerEnter()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isEntered, isExiting, handleTriggerEnter])

  if (isEntered && !isExiting) {
    return null
  }

  const exitTransition = {
    duration: reduced ? 0.2 : 0.85,
    ease: easeOutQuint,
  }

  return (
    <AnimatePresence mode="wait">
      {!isEntered && (
        <motion.div
          key="cinematic-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: reduced ? 0.2 : 0.95,
              ease: easeOutQuint,
            },
          }}
          className={`fixed inset-0 z-50 flex min-h-dvh flex-col justify-between overflow-hidden bg-void px-6 py-8 select-none sm:px-10 sm:py-10 lg:px-16 lg:py-12 ${
            isExiting ? 'pointer-events-none cursor-default' : 'cursor-pointer'
          }`}
          onClick={handleTriggerEnter}
          role="region"
          aria-label="Welcome Introduction"
        >
          {/* Ambient Background Grid / Accents */}
          <motion.div
            animate={
              isExiting
                ? { opacity: 0, scale: 1.04, filter: 'blur(6px)' }
                : { opacity: 1, scale: 1, filter: 'blur(0px)' }
            }
            transition={exitTransition}
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            {/* Fine framing lines */}
            <div className="absolute top-0 left-0 h-full w-[1px] bg-line opacity-60" />
            <div className="absolute top-0 right-0 h-full w-[1px] bg-line opacity-60" />
            <div className="absolute top-1/2 left-0 h-[1px] w-full bg-line/40 -translate-y-1/2" />

            {/* Subtle corner registration marks */}
            <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.3em] text-mute/50">
              01 // INDEX
            </div>
            <div className="absolute top-6 right-6 font-mono text-[9px] tracking-[0.3em] text-mute/50">
              PORTFOLIO // 2025
            </div>
            <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-[0.3em] text-mute/50">
              SYS.ONLINE
            </div>
            <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.3em] text-mute/50">
              MK // HYD
            </div>

            {/* Ambient radial illumination */}
            <div className="absolute top-1/2 left-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/[0.018] blur-3xl" />
          </motion.div>

          {/* Top Bar / Identity Kicker */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={
              isExiting
                ? { opacity: 0, y: -16, filter: 'blur(4px)' }
                : { opacity: 1, y: 0, filter: 'blur(0px)' }
            }
            transition={{ duration: 0.7, delay: 0.1, ease: easeOutQuint }}
            className="relative z-10 flex items-center justify-between"
          >
            <span className="font-mono text-[10px] tracking-[0.32em] text-accent uppercase">
              Selected Works &amp; Exploration
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleTriggerEnter()
              }}
              className="group inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.24em] text-mute hover:text-ink transition-colors cursor-pointer"
            >
              <span>[ ENTER SITE ]</span>
            </button>
          </motion.div>

          {/* Center Stage: Prominent Name with Subtle Blur-to-Focus Entrance & Triangular Dispersal Exit */}
          <div className="relative z-10 my-auto flex flex-col items-center text-center">
            {/* Subtle Identity Line */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={
                isExiting
                  ? { opacity: 0, y: -18, filter: 'blur(6px)' }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={{ duration: 0.8, delay: 0.12, ease: easeOutQuint }}
              className="mb-4 font-mono text-[10px] font-medium tracking-[0.36em] text-mute uppercase sm:mb-6 sm:text-xs"
            >
              CODE. BUILD. EVOLVE.
            </motion.p>

            {/* Prominent Name */}
            <div className="font-display text-[clamp(2.75rem,8.5vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.04em] text-ink uppercase">
              {/* Line 1: MANIKANTH — Calm Blur-to-Focus Fade-in, Subtle Upward Glide on Exit */}
              <motion.div
                initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                animate={
                  isExiting
                    ? {
                        opacity: 0,
                        y: -30,
                        filter: 'blur(8px)',
                      }
                    : {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                      }
                }
                transition={isExiting ? exitTransition : { duration: 0.95, delay: 0.2, ease: easeOutQuint }}
                className="block will-change-transform"
              >
                MANIKANTH
              </motion.div>

              {/* Line 2: REDDY KOMALLA — Disperses outward to the left (REDDY) and right (KOMALLA) on exit */}
              <div className="mt-1 flex flex-wrap items-center justify-center gap-x-[0.28em] text-ink/90 sm:mt-2">
                <motion.span
                  initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                  animate={
                    isExiting
                      ? {
                          opacity: 0,
                          x: -36,
                          y: 6,
                          filter: 'blur(8px)',
                        }
                      : {
                          opacity: 1,
                          x: 0,
                          y: 0,
                          filter: 'blur(0px)',
                        }
                  }
                  transition={isExiting ? exitTransition : { duration: 0.95, delay: 0.28, ease: easeOutQuint }}
                  className="inline-block will-change-transform"
                >
                  REDDY
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                  animate={
                    isExiting
                      ? {
                          opacity: 0,
                          x: 36,
                          y: 6,
                          filter: 'blur(8px)',
                        }
                      : {
                          opacity: 1,
                          x: 0,
                          y: 0,
                          filter: 'blur(0px)',
                        }
                  }
                  transition={isExiting ? exitTransition : { duration: 0.95, delay: 0.32, ease: easeOutQuint }}
                  className="inline-block will-change-transform"
                >
                  KOMALLA
                </motion.span>
              </div>
            </div>

            {/* Role & Engineering Focus */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                isExiting
                  ? { opacity: 0, y: 16, filter: 'blur(4px)' }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={{ duration: 0.75, delay: 0.4, ease: easeOutQuint }}
              className="mt-6 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.24em] text-mist uppercase sm:mt-8 sm:text-[11px]"
            >
              <span>Computer Science</span>
              <span className="h-1 w-1 rounded-full bg-accent/60" />
              <span>Intelligent Systems</span>
              <span className="h-1 w-1 rounded-full bg-accent/60" />
              <span>Full-Stack</span>
            </motion.div>
          </div>

          {/* Bottom Interactive Controls */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={
              isExiting
                ? { opacity: 0, y: 16, filter: 'blur(4px)' }
                : { opacity: 1, y: 0, filter: 'blur(0px)' }
            }
            transition={{ duration: 0.7, delay: 0.45, ease: easeOutQuint }}
            className="relative z-10 flex flex-col items-center justify-between gap-4 sm:flex-row"
          >
            {/* Scroll Indicator */}
            <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.26em] text-mute uppercase">
              <span className="intro-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
              <span>SCROLL TO ENTER</span>
              <ArrowDown size={12} className="intro-bounce-arrow text-mist" />
            </div>

            {/* Click to Enter Action Button */}
            <button
              type="button"
              disabled={isExiting}
              onClick={(e) => {
                e.stopPropagation()
                handleTriggerEnter()
              }}
              className="group inline-flex items-center gap-2.5 border border-line-strong bg-surface/80 px-5 py-2.5 font-mono text-[10px] tracking-[0.22em] text-ink uppercase backdrop-blur-sm transition-all duration-300 hover:border-ink hover:bg-ink hover:text-void disabled:opacity-50 cursor-pointer"
            >
              <span>ENTER EXPERIENCE</span>
              <ArrowRight
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
