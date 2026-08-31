import { useCallback, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cardSpring } from '@/components/home/homeMotion'
import { MILESTONES, type Milestone } from '@/lib/journey'
import { cn } from '@/lib/cn'

export function JourneyTimeline() {
  const reduced = useReducedMotion()

  return (
    <div className="relative mt-16 sm:mt-20">
      {/* Central continuous timeline stem (Desktop/Laptop) */}
      <div
        className="journey-stem-line pointer-events-none absolute top-6 bottom-12 left-6 hidden w-px lg:left-1/2 lg:block lg:-translate-x-1/2"
        aria-hidden="true"
      />

      {/* Left continuous timeline stem (Mobile/Tablet) */}
      <div
        className="journey-stem-line pointer-events-none absolute top-6 bottom-12 left-5 w-px lg:hidden sm:left-7"
        aria-hidden="true"
      />

      <div className="relative space-y-12 sm:space-y-16 lg:space-y-24">
        {MILESTONES.map((milestone, index) => {
          const isEven = index % 2 === 0
          return (
            <TimelineEntry
              key={milestone.id}
              milestone={milestone}
              isEven={isEven}
              reduced={Boolean(reduced)}
            />
          )
        })}
      </div>
    </div>
  )
}

type TimelineEntryProps = {
  milestone: Milestone
  isEven: boolean
  reduced: boolean
}

function TimelineEntry({ milestone, isEven, reduced }: TimelineEntryProps) {
  const [glow, setGlow] = useState({ x: 50, y: 30 })

  const isPresent = milestone.state === 'present'
  const isFuture = milestone.state === 'future'

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
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
    <div
      className={cn(
        'relative flex flex-col lg:flex-row lg:items-center',
        isEven ? 'lg:flex-row-reverse' : 'lg:flex-row',
      )}
    >
      {/* Marker node on the timeline stem */}
      <div
        className="absolute left-5 z-20 -translate-x-1/2 lg:left-1/2"
        style={{ top: '2.25rem' }}
      >
        {isPresent ? (
          <div className="relative flex h-8 w-8 items-center justify-center">
            <span
              className={cn(
                'absolute inset-0 rounded-full bg-accent/30',
                !reduced && 'journey-beacon-pulse',
              )}
            />
            <span className="relative flex h-4 w-4 items-center justify-center border border-accent bg-void">
              <span className="h-2 w-2 bg-accent animate-pulse" />
            </span>
          </div>
        ) : isFuture ? (
          <div className="relative flex h-6 w-6 items-center justify-center">
            <span className="h-3 w-3 rotate-45 border border-dashed border-mute bg-void" />
          </div>
        ) : (
          <div className="relative flex h-6 w-6 items-center justify-center">
            <span className="h-2.5 w-2.5 rotate-45 border border-line-strong bg-void transition-colors duration-300 hover:border-ink hover:bg-accent" />
          </div>
        )}
      </div>

      {/* Spacer for 50% width dual layout on desktop */}
      <div className="hidden w-1/2 lg:block" />

      {/* Milestone content card */}
      <div
        className={cn(
          'w-full pl-12 sm:pl-16 lg:w-1/2',
          isEven ? 'lg:pl-0 lg:pr-12 xl:pr-16' : 'lg:pr-0 lg:pl-12 xl:pl-16',
        )}
      >
        <motion.div
          onMouseMove={onMouseMove}
          whileHover={reduced ? undefined : { y: -4 }}
          transition={cardSpring}
          className={cn(
            'group/milestone relative overflow-hidden p-6 sm:p-8 text-left transition-[border-color,box-shadow,background-color] duration-500',
            isPresent
              ? 'border border-accent/40 bg-surface/90 shadow-[0_24px_60px_rgb(0_0_0/0.5)] ring-1 ring-accent/30'
              : isFuture
                ? 'border border-dashed border-line-strong bg-void/60 backdrop-blur-sm'
                : 'border border-line bg-surface/60 backdrop-blur-sm hover:border-line-strong hover:bg-surface/90 hover:shadow-[0_20px_50px_rgb(0_0_0/0.4)]',
          )}
        >
          {/* Spotlight glow on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/milestone:opacity-100"
            style={{
              background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, ${
                isPresent ? 'rgb(196 184 165 / 0.12)' : 'rgb(244 241 234 / 0.06)'
              }, transparent 65%)`,
            }}
          />
          <div className="journey-card-sheen pointer-events-none absolute inset-0" />

          {/* Card header / metadata */}
          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.24em] text-mute">{milestone.id}</span>
              <span className="h-px w-4 bg-line-strong" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                {milestone.era}
              </span>
            </div>

            {isPresent ? (
              <span className="inline-flex items-center gap-1.5 border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-accent uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {milestone.label}
              </span>
            ) : isFuture ? (
              <span className="border border-dashed border-mute/60 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-mute uppercase">
                {milestone.label}
              </span>
            ) : (
              <span className="font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
                {milestone.label}
              </span>
            )}
          </div>

          {/* Title and topic */}
          <div className="relative mt-4">
            <h3 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
              {milestone.title}
            </h3>
            <p className="mt-1 font-mono text-[11px] tracking-[0.18em] text-mist uppercase">
              {milestone.topic}
            </p>
          </div>

          {/* Specialization banner if applicable */}
          {milestone.specialization ? (
            <div className="relative mt-4 border-l-2 border-accent bg-raised/70 px-3.5 py-2.5">
              <p className="font-mono text-[9px] tracking-[0.2em] text-mute uppercase">
                Specialization
              </p>
              <p className="mt-0.5 font-display text-xs tracking-wide text-ink">
                {milestone.specialization}
              </p>
            </div>
          ) : null}

          {/* Honest story */}
          <div className="relative mt-5 border-t border-line/60 pt-4">
            <p className="text-sm leading-relaxed text-mist sm:text-[15px]">
              {milestone.story}
            </p>
          </div>

          {/* Tag highlights */}
          <div className="relative mt-6 flex flex-wrap gap-2">
            {milestone.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'font-mono text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 transition-colors',
                  isPresent
                    ? 'border border-accent/25 bg-void/80 text-ink'
                    : isFuture
                      ? 'border border-dashed border-line text-mute'
                      : 'border border-line/80 bg-void/50 text-mist group-hover/milestone:border-line-strong group-hover/milestone:text-ink',
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
