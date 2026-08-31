import { useCallback, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { cardSpring } from '@/components/home/homeMotion'
import { CHANNELS, PERSONAL_NOTE } from '@/lib/connect'

export function ContactChannels() {
  const reduced = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText('manikanthreddykomalla@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Personal Note Card */}
      <PersonalNoteCard reduced={Boolean(reduced)} />

      {/* Direct Contact Channels */}
      <div className="space-y-4">
        <p className="font-mono text-[10px] tracking-[0.24em] text-mute uppercase">
          Direct Channels
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {CHANNELS.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              copied={copied}
              onCopy={handleCopyEmail}
              reduced={Boolean(reduced)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function PersonalNoteCard({ reduced }: { reduced: boolean }) {
  const [glow, setGlow] = useState({ x: 50, y: 30 })

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
    <motion.div
      onMouseMove={onMouseMove}
      whileHover={reduced ? undefined : { y: -3 }}
      transition={cardSpring}
      className="group/channel relative overflow-hidden border border-line bg-surface/70 p-6 sm:p-8 text-left backdrop-blur-sm transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[0_20px_50px_rgb(0_0_0/0.4)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/channel:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, rgb(244 241 234 / 0.06), transparent 65%)`,
        }}
      />
      <div className="connect-card-sheen pointer-events-none absolute inset-0" />

      <div className="relative flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.24em] text-accent uppercase">
          {PERSONAL_NOTE.kicker}
        </p>
        <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" />
      </div>

      <h3 className="relative mt-4 font-display text-2xl tracking-tight text-ink sm:text-[1.75rem]">
        {PERSONAL_NOTE.title}
      </h3>

      <div className="relative mt-4 border-t border-line/60 pt-4">
        <p className="text-sm leading-relaxed text-mist">
          {PERSONAL_NOTE.description}
        </p>
      </div>
    </motion.div>
  )
}

type ChannelProps = {
  channel: (typeof CHANNELS)[number]
  copied: boolean
  onCopy: (e: MouseEvent<HTMLButtonElement>) => void
  reduced: boolean
}

function ChannelCard({ channel, copied, onCopy, reduced }: ChannelProps) {
  const [glow, setGlow] = useState({ x: 50, y: 30 })

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (reduced) return
      const rect = event.currentTarget.getBoundingClientRect()
      setGlow({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      })
    },
    [reduced],
  )

  const isEmail = channel.name === 'Email'

  return (
    <motion.a
      href={channel.href}
      target={channel.isExternal ? '_blank' : undefined}
      rel={channel.isExternal ? 'noopener noreferrer' : undefined}
      onMouseMove={onMouseMove}
      whileHover={reduced ? undefined : { y: -4 }}
      whileTap={reduced ? undefined : { scale: 0.99 }}
      transition={cardSpring}
      className="group/channel relative flex flex-col justify-between overflow-hidden border border-line bg-surface p-6 text-left transition-[border-color,box-shadow,background-color] duration-500 hover:border-line-strong hover:bg-surface/90 hover:shadow-[0_20px_50px_rgb(0_0_0/0.4)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/channel:opacity-100"
        style={{
          background: `radial-gradient(360px circle at ${glow.x}% ${glow.y}%, rgb(244 241 234 / 0.07), transparent 60%)`,
        }}
      />
      <div className="connect-card-sheen pointer-events-none absolute inset-0" />

      <div>
        <div className="relative flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.24em] text-mute">{channel.id}</span>
          <span className="flex items-center gap-1 font-mono text-[10px] tracking-[0.16em] text-mist uppercase group-hover/channel:text-ink transition-colors">
            {channel.actionLabel}
            <ArrowUpRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover/channel:translate-x-0.5 group-hover/channel:-translate-y-0.5"
            />
          </span>
        </div>

        <h3 className="relative mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
          {channel.name}
        </h3>
        <p className="relative mt-1.5 font-mono text-[11px] tracking-[0.14em] text-mute uppercase">
          {channel.label}
        </p>

        <p className="relative mt-4 truncate font-mono text-xs text-mist group-hover/channel:text-ink transition-colors">
          {channel.value}
        </p>
      </div>

      {isEmail ? (
        <div className="relative mt-6 pt-3 border-t border-line/60 flex items-center justify-between">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-accent uppercase hover:text-ink transition-colors"
          >
            {copied ? (
              <>
                <Check size={12} strokeWidth={2} />
                Copied to clipboard
              </>
            ) : (
              <>
                <Copy size={12} strokeWidth={1.5} />
                Copy address
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="relative mt-6 pt-3 border-t border-line/60">
          <span className="font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
            Professional Network
          </span>
        </div>
      )}
    </motion.a>
  )
}
