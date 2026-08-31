import { useCallback, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cardSpring } from '@/components/home/homeMotion'
import { FOUNDATION, type FoundationItem } from '@/lib/stack'

const FLOAT_CLASSES = [
  'stack-float stack-float-a',
  'stack-float stack-float-b',
  'stack-float stack-float-c',
  'stack-float stack-float-d',
  'stack-float stack-float-e',
  'stack-float stack-float-f',
] as const

export function FoundationGrid() {
  const reduced = useReducedMotion()

  return (
    <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
      {FOUNDATION.map((item, index) => (
        <li key={item.id} className={reduced ? undefined : FLOAT_CLASSES[index]}>
          <FoundationCard item={item} reduced={Boolean(reduced)} />
        </li>
      ))}
    </ul>
  )
}

type CardProps = {
  item: FoundationItem
  reduced: boolean
}

function FoundationCard({ item, reduced }: CardProps) {
  const [open, setOpen] = useState(false)
  const [glow, setGlow] = useState({ x: 50, y: 40 })

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (reduced) return
      const rect = event.currentTarget.getBoundingClientRect()
      setGlow({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      })
    },
    [reduced],
  )

  return (
    <motion.button
      type="button"
      aria-expanded={open}
      data-open={open ? 'true' : 'false'}
      onClick={() => setOpen((value) => !value)}
      onMouseMove={onMouseMove}
      onBlur={() => setOpen(false)}
      whileHover={reduced ? undefined : { y: -5 }}
      whileTap={reduced ? undefined : { scale: 0.992 }}
      transition={cardSpring}
      className="group/tool relative flex h-full w-full flex-col overflow-hidden border border-line bg-surface p-6 text-left transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[0_24px_60px_rgb(0_0_0/0.45)] sm:p-7"
    >
      {/* Dynamic mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tool:opacity-100"
        style={{
          background: `radial-gradient(360px circle at ${glow.x}% ${glow.y}%, rgb(244 241 234 / 0.07), transparent 60%)`,
        }}
      />
      <div className="stack-card-sheen pointer-events-none absolute inset-0" />

      {/* Header bar */}
      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.24em] text-mute">{item.id}</span>
        {item.focus ? (
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            In focus
          </span>
        ) : (
          <span className="h-px w-6 bg-line-strong transition-[width] duration-500 group-hover/tool:w-10 group-hover/tool:bg-ink/40" />
        )}
      </div>

      {/* Language name & level */}
      <h3 className="relative mt-8 font-display text-3xl tracking-tight text-ink sm:text-[2.1rem]">
        {item.name}
      </h3>
      <p className="relative mt-2 font-mono text-[10px] tracking-[0.18em] text-mist uppercase">
        {item.level}
      </p>

      {/* Honest description revealed on hover/tap */}
      <div className="stack-note relative">
        <div className="stack-note-inner max-w-sm pt-2">
          <div className="mb-2 h-px w-8 bg-line-strong" />
          <p className="text-sm leading-relaxed text-mist">{item.note}</p>
        </div>
      </div>
    </motion.button>
  )
}
