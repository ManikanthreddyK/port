import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cardSpring } from '@/components/home/homeMotion'
import { NEXT } from '@/lib/stack'
import { cn } from '@/lib/cn'

export function NextPath() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="relative mt-10 sm:mt-12">
      {/* Visual vertical horizon vector line */}
      <div
        className="stack-horizon pointer-events-none absolute top-4 bottom-8 left-[1.18rem] w-px sm:left-[1.65rem]"
        aria-hidden="true"
      />

      <ol className="relative space-y-3 sm:space-y-4">
        {NEXT.map((item, index) => {
          const isOpen = open === index
          const fade = index / (NEXT.length - 1)

          return (
            <motion.li
              key={item.id}
              whileHover={reduced ? undefined : { x: 6 }}
              transition={cardSpring}
              className={cn(!reduced && index % 2 === 1 && 'sm:ml-6 lg:ml-12')}
              style={{ opacity: reduced ? 1 : 1 - fade * 0.22 }}
            >
              <motion.button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen((current) => (current === index ? null : index))}
                whileTap={reduced ? undefined : { scale: 0.994 }}
                className={cn(
                  'group relative flex w-full items-start gap-4 border border-dashed bg-void/70 p-5 text-left backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-500 hover:border-line-strong hover:bg-surface sm:gap-6 sm:p-6',
                  isOpen
                    ? 'border-line-strong bg-surface/90 shadow-[0_16px_40px_rgb(0_0_0/0.3)] ring-1 ring-accent/25'
                    : 'border-line',
                )}
              >
                {/* Custom geometric step node */}
                <span className="relative mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                  <span
                    className={cn(
                      'absolute inset-0 rotate-45 border transition-colors duration-300',
                      isOpen ? 'border-accent' : 'border-line-strong group-hover:border-ink/50',
                    )}
                  />
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rotate-45 transition-colors duration-300',
                      isOpen ? 'bg-accent scale-125' : 'bg-mute group-hover:bg-ink',
                    )}
                  />
                </span>

                {/* Content body */}
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-mute">{item.id}</span>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-mute uppercase">
                      {item.tag}
                    </span>
                  </span>

                  <span className="mt-2 block font-display text-xl tracking-tight text-ink sm:text-2xl">
                    {item.name}
                  </span>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.span
                        initial={reduced ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={reduced ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-3 block max-w-xl overflow-hidden border-t border-line/60 pt-2.5 text-sm leading-relaxed text-mist"
                      >
                        {item.note}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              </motion.button>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
