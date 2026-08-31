import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/lib/site'
import { cn } from '@/lib/cn'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 sm:px-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-display text-lg tracking-[0.18em] text-ink uppercase">{SITE.mantra}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">
            {SITE.name}
            <span className="mx-2 text-line-strong">/</span>
            {SITE.role}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                cn(
                  'font-mono text-[10px] tracking-[0.18em] uppercase transition-colors',
                  isActive ? 'text-ink' : 'text-mute hover:text-ink',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-line px-6 py-5 sm:px-10">
        <p className="font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
          © {year} {SITE.shortName}
        </p>
        <Link
          to="/connect"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-mute uppercase transition-colors hover:text-ink"
        >
          Connect
          <ArrowUpRight size={12} strokeWidth={1.5} />
        </Link>
      </div>
    </footer>
  )
}
