import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { MotionLink, MotionNavLink, hoverLift } from '@/components/home/homeMotion'

const LINKS = [
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Stack', path: '/stack' },
] as const

export function HomeNav() {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 bg-void/90 backdrop-blur-sm">
      <div className="mx-auto grid h-[4.5rem] max-w-[1440px] grid-cols-[1fr_auto] items-center px-6 sm:px-8 lg:grid-cols-3 lg:px-12">
        <MotionLink
          to="/"
          whileHover={reduced ? undefined : { opacity: 0.72 }}
          transition={hoverLift}
          className="font-display text-[13px] font-semibold tracking-[0.28em] text-ink uppercase"
        >
          Manikanth
        </MotionLink>

        <p className="hidden text-center font-mono text-[10px] tracking-[0.28em] text-mute uppercase lg:block">
          Student <span className="mx-1.5 text-line-strong">•</span> Builder
          <span className="mx-1.5 text-line-strong">•</span> AI Explorer
        </p>

        <div className="hidden items-center justify-end gap-8 lg:flex">
          <nav className="flex items-center gap-7" aria-label="Primary">
            {LINKS.map((link) => (
              <MotionNavLink
                key={link.path}
                to={link.path}
                whileHover={reduced ? undefined : { y: -1 }}
                transition={hoverLift}
                className={({ isActive }) =>
                  cn(
                    'inline-block font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300',
                    isActive ? 'text-ink' : 'text-mute hover:text-ink',
                  )
                }
              >
                {link.label}
              </MotionNavLink>
            ))}
          </nav>
          <MotionLink
            to="/connect"
            whileHover={reduced ? undefined : { y: -1 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            transition={hoverLift}
            className="group inline-flex items-center gap-2 border border-line-strong px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-ink uppercase transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void"
          >
            Let&apos;s Connect
            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </MotionLink>
        </div>

        <button
          type="button"
          className="justify-self-end text-ink lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-void lg:hidden">
          <p className="px-6 pt-6 font-mono text-[10px] tracking-[0.24em] text-mute uppercase sm:px-8">
            Student • Builder • AI Explorer
          </p>
          <nav className="flex flex-col gap-1 px-6 py-8 sm:px-8" aria-label="Mobile">
            {LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-3xl tracking-tight text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/connect"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-fit items-center gap-2 border border-ink px-4 py-2.5 font-mono text-[11px] tracking-[0.18em] text-ink uppercase"
            >
              Let&apos;s Connect
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
