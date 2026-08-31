type ProjectMotifProps = {
  id: string
}

export function ProjectMotif({ id }: ProjectMotifProps) {
  return (
    <svg
      viewBox="0 0 320 200"
      className="project-card-motif h-[72%] w-[72%] text-ink/25"
      aria-hidden="true"
    >
      {id === '01' ? (
        <>
          <rect x="48" y="36" width="224" height="128" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M48 68h224M96 36v128M144 36v128M192 36v128M240 36v128" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="168" cy="116" r="18" fill="none" stroke="currentColor" strokeWidth="1.1" />
        </>
      ) : null}
      {id === '02' ? (
        <>
          <circle cx="92" cy="78" r="26" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="168" cy="108" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="236" cy="72" r="18" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M114 90l22 10M190 86l30-8" stroke="currentColor" strokeWidth="0.8" />
        </>
      ) : null}
      {id === '03' ? (
        <>
          <rect x="86" y="32" width="148" height="136" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M108 64h104M108 88h104M108 112h72M108 136h88" stroke="currentColor" strokeWidth="0.9" />
        </>
      ) : null}
      {id === '04' ? (
        <>
          <path d="M160 28l92 72-92 72-92-72z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M160 64l56 36-56 36-56-36z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="160" cy="100" r="6" fill="currentColor" />
        </>
      ) : null}
    </svg>
  )
}
