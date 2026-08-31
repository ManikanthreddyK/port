import { motion, useReducedMotion } from 'framer-motion'
import { INTERESTS } from '@/lib/about'
import { cardSpring } from '@/components/home/homeMotion'

export function AboutInterests() {
  const reduced = useReducedMotion()

  return (
    <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
      {INTERESTS.map((interest, index) => (
        <li
          key={interest.id}
          className={index === INTERESTS.length - 1 ? 'sm:col-span-2' : undefined}
        >
          <motion.div
            whileHover={reduced ? undefined : { y: -4 }}
            whileTap={reduced ? undefined : { scale: 0.99 }}
            transition={cardSpring}
            className="group flex h-full cursor-default items-center justify-between gap-4 border border-line bg-surface px-4 py-4 transition-[border-color,background-color] duration-500 hover:border-line-strong hover:bg-raised"
          >
            <span className="font-mono text-[10px] tracking-[0.22em] text-mute">{interest.id}</span>
            <span className="flex-1 font-display text-sm tracking-[0.14em] text-ink uppercase">
              {interest.label}
            </span>
            <span className="h-px w-4 bg-line-strong transition-[width] duration-500 group-hover:w-9" />
          </motion.div>
        </li>
      ))}
    </ul>
  )
}
