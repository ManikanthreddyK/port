export function DigitalCore() {
  // Video path — the MP4 already present in /public
  const videoSrc =
    '/From Klickpin.com- 31 Creative vision board ideas that help you create a polished look with very simple and affordable details for busy people who.mp4'

  return (
    <div
      className="relative mx-auto w-full max-w-[620px] xl:max-w-[680px] select-none overflow-hidden rounded-xs bg-void"
      style={{ aspectRatio: '3 / 4' }}
      role="img"
      aria-label="Hero visual"
    >
      {/* Video — autoplay, muted, loop, playsInline */}
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: 'center 15%' }}
      />

      {/* Cinematic vignettes — same as the original robot image overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/50 via-transparent to-void/75" />
    </div>
  )
}
