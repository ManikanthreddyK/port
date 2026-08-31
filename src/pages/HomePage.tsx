import { useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, RotateCcw } from 'lucide-react'
import { DigitalCore } from '@/components/home/DigitalCore'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { HomeNav } from '@/components/home/HomeNav'
import { IntroExperience } from '@/components/home/IntroExperience'
import { MotionLink, hoverLift, easeOutQuint } from '@/components/home/homeMotion'
import '@/components/home/home.css'

// In-memory SPA session flag:
// Resets to false on browser refresh / new direct visit to '/',
// but persists as true across client-side SPA route navigation.
let hasEnteredInSpaSession = false

export function HomePage() {
  const reduced = useReducedMotion()
  const [introKey, setIntroKey] = useState(0)
  const [isEntered, setIsEntered] = useState(() => hasEnteredInSpaSession)

  useEffect(() => {
    if (!isEntered) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isEntered])

  const handleEnter = useCallback(() => {
    hasEnteredInSpaSession = true
    setIsEntered(true)
  }, [])

  const handleReplayIntro = useCallback(() => {
    hasEnteredInSpaSession = false
    setIntroKey((prev) => prev + 1)
    setIsEntered(false)
  }, [])

  return (
    <div className="home-page min-h-dvh bg-void">
      {/* Feature 01: Cinematic Intro Experience with Triangular Dispersal */}
      <IntroExperience key={introKey} onEnter={handleEnter} isEntered={isEntered} />

      {/* Main Home Page Experience (Emerges seamlessly from behind the intro) */}
      <motion.div
        initial={isEntered ? false : { opacity: 0, scale: 0.985, filter: 'blur(4px)' }}
        animate={
          isEntered
            ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, scale: 0.985, filter: 'blur(4px)' }
        }
        transition={{
          duration: reduced ? 0.2 : 0.95,
          delay: reduced ? 0 : 0.15,
          ease: easeOutQuint,
        }}
        className="relative"
      >
        <HomeNav />

        <section className="mx-auto grid min-h-[calc(100dvh-4.5rem)] max-w-[1440px] items-center gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-8 lg:px-12 lg:py-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] xl:gap-14">
          <div className="max-w-2xl">
            <h1 className="font-display text-[clamp(3.4rem,9.5vw,8.25rem)] leading-[0.86] font-bold tracking-[-0.045em] text-ink uppercase">
              Code.
              <br />
              Build.
              <br />
              Evolve.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-mist sm:mt-10 sm:text-lg">
              Exploring software, intelligent systems, and ideas that become real experiences.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 sm:mt-12">
              <MotionLink
                to="/projects"
                whileHover={reduced ? undefined : { y: -1 }}
                whileTap={reduced ? undefined : { scale: 0.985 }}
                transition={hoverLift}
                className="group inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[11px] tracking-[0.16em] text-void uppercase"
              >
                Explore My Work
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </MotionLink>
              <MotionLink
                to="/about"
                whileHover={reduced ? undefined : { y: -1 }}
                whileTap={reduced ? undefined : { scale: 0.985 }}
                transition={hoverLift}
                className="group inline-flex items-center gap-2 border border-line-strong px-5 py-3 font-mono text-[11px] tracking-[0.16em] text-ink uppercase transition-colors duration-300 hover:border-ink"
              >
                About Me
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </MotionLink>
            </div>
          </div>

          <div className="w-full lg:justify-self-end">
            <div className="mb-3 flex items-center justify-between px-2 font-mono text-[10px] tracking-[0.3em] uppercase lg:mb-4">
              <span className="text-mute">Intelligent Systems</span>
              {/* Subtle minimal replay intro trigger */}
              <button
                type="button"
                onClick={handleReplayIntro}
                className="group flex items-center gap-1.5 text-mute/60 transition-colors hover:text-ink cursor-pointer"
                title="Replay intro experience"
              >
                <RotateCcw size={11} className="transition-transform duration-300 group-hover:-rotate-90" />
                <span className="tracking-[0.2em]">[ REPLAY INTRO ]</span>
              </button>
            </div>
            {/* Feature 02: Cinematic Humanoid AI Robot with Fingertip Interface */}
            <DigitalCore />
          </div>
        </section>

        <FeaturedWork />
      </motion.div>
    </div>
  )
}
