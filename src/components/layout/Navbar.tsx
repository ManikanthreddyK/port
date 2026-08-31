import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/lib/site'
import { cn } from '@/lib/cn'

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:h-[4.25rem] sm:px-10">
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="group flex items-baseline gap-3"
        >
          <span className="font-display text-sm font-semibold tracking-[0.22em] text-ink">
            {SITE.monogram}
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.22em] text-mute uppercase sm:inline">
            {SITE.shortName}
          </span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                cn(
                  'font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300',
                  isActive ? 'text-ink' : 'text-mute hover:text-ink',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-void md:hidden">
          <nav className="flex min-h-[calc(100vh-4rem)] flex-col gap-1 px-6 py-10" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'py-3 font-display text-3xl tracking-tight',
                    isActive ? 'text-ink' : 'text-mute',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
