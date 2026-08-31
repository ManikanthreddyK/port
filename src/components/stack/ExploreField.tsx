import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cardSpring } from '@/components/home/homeMotion'
import { EXPLORE_LINKS, EXPLORING } from '@/lib/stack'
import { cn } from '@/lib/cn'

export function ExploreField() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)

  // Compute linked nodes for interactive highlighting
  const linked = new Set<number>()
  if (active !== null) {
    linked.add(active)
    for (const [a, b] of EXPLORE_LINKS) {
      if (a === active) linked.add(b)
      if (b === active) linked.add(a)
    }
  }

  return (
    <div className="mt-10 sm:mt-12">
      {/* Desktop / Laptop: Interactive Living Map */}
      <div
        className="relative hidden min-h-[38rem] overflow-hidden border border-line bg-surface/40 backdrop-blur-sm lg:block"
        onMouseLeave={() => setActive(null)}
      >
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgb(244 241 234 / 3.5%) 1px, transparent 1px), linear-gradient(90deg, rgb(244 241 234 / 3.5%) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient watermark */}
        <p
          className="pointer-events-none absolute top-6 left-6 font-display text-[clamp(4rem,10vw,8rem)] leading-none font-extrabold tracking-[-0.07em] text-ink/[0.025] uppercase select-none"
          aria-hidden="true"
        >
          Living Map
        </p>

        {/* SVG connection lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {EXPLORE_LINKS.map(([a, b]) => {
            const from = EXPLORING[a]
            const to = EXPLORING[b]
            const lit = active !== null && linked.has(a) && linked.has(b) && (a === active || b === active)

            return (
              <line
                key={`${a}-${b}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={cn(lit ? 'stack-link-active' : 'stack-link')}
                stroke={lit ? '#c4b8a5' : '#f4f1ea'}
                strokeOpacity={lit ? 0.75 : 0.14}
                strokeWidth={lit ? 0.28 : 0.16}
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>

        {/* Interactive nodes */}
        {EXPLORING.map((item, index) => {
          const isActive = active === index
          const isLinked = active !== null && linked.has(index)
          const dimmed = active !== null && !isLinked

          return (
            <div
              key={item.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              <div
                className={cn(
                  !reduced && `stack-float stack-float-${['a', 'b', 'c', 'd', 'e', 'f'][index]}`,
                )}
              >
                <motion.button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActive((current) => (current === index ? null : index))}
                  onMouseEnter={() => setActive(index)}
                  whileHover={reduced ? undefined : { y: -4 }}
                  transition={cardSpring}
                  className={cn(
                    'group/node max-w-[14.5rem] border bg-void/90 p-4 text-left backdrop-blur-md transition-[border-color,opacity,box-shadow] duration-500',
                    isActive
                      ? 'border-line-strong shadow-[0_20px_50px_rgb(0_0_0/0.5)] ring-1 ring-accent/30'
                      : 'border-line hover:border-line-strong',
                    dimmed && 'opacity-35',
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          'inline-block h-1.5 w-1.5 rotate-45 transition-colors',
                          isActive ? 'bg-accent scale-125' : 'bg-mute',
                          !reduced && !isActive && 'stack-node-pulse',
                        )}
                      />
                      <span className="font-mono text-[10px] tracking-[0.22em] text-mute">{item.id}</span>
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.16em] text-mute uppercase">
                      Node
                    </span>
                  </span>

                  <span className="mt-2.5 block font-display text-sm font-medium tracking-[0.1em] text-ink uppercase">
                    {item.name}
                  </span>

                  <AnimatePresence>
                    {isActive ? (
                      <motion.span
                        initial={reduced ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={reduced ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-2.5 block overflow-hidden border-t border-line/60 pt-2 text-[13px] leading-relaxed text-mist"
                      >
                        {item.note}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile / Tablet: Responsive interactive stack */}
      <ul className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {EXPLORING.map((item, index) => (
          <li key={item.id}>
            <ExploreCard
              item={item}
              index={index}
              active={active === index}
              onToggle={() => setActive((current) => (current === index ? null : index))}
              reduced={Boolean(reduced)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

type ExploreCardProps = {
  item: (typeof EXPLORING)[number]
  index: number
  active: boolean
  onToggle: () => void
  reduced: boolean
}

function ExploreCard({ item, active, onToggle, reduced }: ExploreCardProps) {
  return (
    <motion.button
      type="button"
      aria-expanded={active}
      onClick={onToggle}
      whileTap={reduced ? undefined : { scale: 0.99 }}
      className={cn(
        'w-full border p-5 text-left transition-[border-color,background-color] duration-500',
        active ? 'border-line-strong bg-raised shadow-lg ring-1 ring-accent/20' : 'border-line bg-surface',
      )}
    >
      <span className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2">
          <span
            className={cn(
              'inline-block h-1.5 w-1.5 rotate-45',
              active ? 'bg-accent' : 'bg-mute',
            )}
          />
          <span className="font-mono text-[10px] tracking-[0.22em] text-mute">{item.id}</span>
        </span>
        <span className="font-mono text-[9px] tracking-[0.16em] text-mute uppercase">Exploring</span>
      </span>

      <span className="mt-3 block font-display text-base tracking-[0.1em] text-ink uppercase">
        {item.name}
      </span>

      <AnimatePresence>
        {active ? (
          <motion.span
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 block overflow-hidden border-t border-line/60 pt-2 text-sm leading-relaxed text-mist"
          >
            {item.note}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  )
}
