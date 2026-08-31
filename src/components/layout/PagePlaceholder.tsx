type PagePlaceholderProps = {
  kicker: string
  title: string
  description: string
}

export function PagePlaceholder({ kicker, title, description }: PagePlaceholderProps) {
  return (
    <section className="flex min-h-[calc(100vh-8.5rem)] flex-col justify-center px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">{kicker}</p>
        <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">{description}</p>
        <div className="mt-12 h-px w-16 bg-line-strong" />
        <p className="mt-6 font-mono text-xs tracking-[0.18em] text-mute uppercase">In composition</p>
      </div>
    </section>
  )
}
