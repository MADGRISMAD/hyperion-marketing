// Piezas gráficas del estilo póster Y2K: cromo líquido, alambre, stickers holográficos y ventanas de vidrio.
import { useId } from "react"

function ChromeGradients({ id }) {
  return (
    <defs>
      <radialGradient id={`${id}-ball`} cx="34%" cy="28%" r="80%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.18" stopColor="#eceaff" />
        <stop offset="0.42" stopColor="#9b96d0" />
        <stop offset="0.62" stopColor="#3f3982" />
        <stop offset="0.82" stopColor="#b9b4ea" />
        <stop offset="1" stopColor="#ffffff" />
      </radialGradient>
      <linearGradient id={`${id}-tube`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.3" stopColor="#c9c5f0" />
        <stop offset="0.5" stopColor="#4a4490" />
        <stop offset="0.62" stopColor="#a39fdc" />
        <stop offset="1" stopColor="#ffffff" />
      </linearGradient>
    </defs>
  )
}

const BLOBS = {
  drop: "M52 4 C78 6 96 30 92 56 C88 84 62 98 40 92 C16 86 2 62 8 38 C14 16 30 2 52 4 Z",
  pebble: "M30 10 C56 0 92 14 94 44 C96 74 70 96 42 92 C14 88 2 64 6 42 C8 26 16 15 30 10 Z M46 36 C36 38 34 54 44 58 C56 62 64 46 58 39 C55 35 50 35 46 36 Z",
}

// Gota o piedra de cromo líquido
export function ChromeBlob({ shape = "drop", className = "", style }) {
  const id = useId()
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <ChromeGradients id={id} />
      <path d={BLOBS[shape]} fill={`url(#${id}-ball)`} fillRule="evenodd" stroke="rgba(255,255,255,0.85)" strokeWidth="0.8" />
      <ellipse cx="34" cy="26" rx="14" ry="7" fill="#fff" opacity="0.85" transform="rotate(-25 34 26)" />
      <ellipse cx="70" cy="76" rx="6" ry="3" fill="#fff" opacity="0.6" transform="rotate(-30 70 76)" />
    </svg>
  )
}

// Cinta de cromo ondulada (como el remolino de la parte baja del póster)
export function ChromeSquiggle({ className = "", style }) {
  const id = useId()
  const d = "M14 70 C34 20 70 20 84 52 C98 84 134 92 150 58 C164 28 196 26 206 54"
  return (
    <svg viewBox="0 0 220 110" className={className} style={style} aria-hidden="true">
      <ChromeGradients id={id} />
      <path d={d} fill="none" stroke="rgba(58,44,153,0.35)" strokeWidth="24" strokeLinecap="round" transform="translate(0 5)" />
      <path d={d} fill="none" stroke={`url(#${id}-tube)`} strokeWidth="22" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.85" transform="translate(-2 -6)" />
    </svg>
  )
}

// Anillo cromado elíptico que abraza un título
export function ChromeRing({ className = "", style }) {
  const id = useId()
  return (
    <svg viewBox="0 0 800 260" preserveAspectRatio="none" className={className} style={style} aria-hidden="true">
      <ChromeGradients id={id} />
      <ellipse cx="400" cy="130" rx="385" ry="105" fill="none" stroke="rgba(58,44,153,0.25)" strokeWidth="14" transform="rotate(-4 400 130) translate(0 6)" />
      <ellipse cx="400" cy="130" rx="385" ry="105" fill="none" stroke={`url(#${id}-tube)`} strokeWidth="12" transform="rotate(-4 400 130)" />
      <ellipse cx="400" cy="126" rx="384" ry="104" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.9" transform="rotate(-4 400 130)" />
    </svg>
  )
}

// Toroide de alambre (como el de la tarjeta "2024 VISION")
export function WireTorus({ className = "" }) {
  const rings = Array.from({ length: 28 }, (_, k) => {
    const a = (k / 28) * Math.PI * 2
    return { cx: (60 + Math.cos(a) * 36).toFixed(2), cy: (40 + Math.sin(a) * 12).toFixed(2) }
  })
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none" stroke="currentColor" strokeWidth="0.6" aria-hidden="true">
      {rings.map((r, i) => (
        <ellipse key={i} cx={r.cx} cy={r.cy} rx="13" ry="17" />
      ))}
    </svg>
  )
}

// Globo de alambre
export function WireGlobe({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="20" cy="20" r="17" />
      <ellipse cx="20" cy="20" rx="7" ry="17" />
      <path d="M3 20 H37 M6 11 H34 M6 29 H34" />
    </svg>
  )
}

// Rejilla de 2×3 puntos (esquina del póster)
export function DotsIcon({ className = "" }) {
  return (
    <span className={`grid grid-cols-3 gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className="h-2 w-2 rounded-full bg-white shadow-[0_1px_2px_rgba(58,44,153,0.4)]" />
      ))}
    </span>
  )
}

// Código de barras decorativo
export function Barcode({ className = "" }) {
  const bars = [3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1]
  return (
    <span className={`flex items-stretch gap-[2px] ${className}`} aria-hidden="true">
      {bars.map((w, i) => (
        <span key={i} className="bg-ink" style={{ width: w * 1.5 }} />
      ))}
    </span>
  )
}

// Estrella "esponjada" de N puntas
function puffyStar(points, outer, inner, c = 50) {
  let d = ""
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2 - Math.PI / 2
    const b = a + Math.PI / points
    const ox = c + Math.cos(a) * outer
    const oy = c + Math.sin(a) * outer
    const ix = c + Math.cos(b) * inner
    const iy = c + Math.sin(b) * inner
    d += i === 0 ? `M${ox.toFixed(1)} ${oy.toFixed(1)}` : ""
    const nx = c + Math.cos(a + (2 * Math.PI) / points) * outer
    const ny = c + Math.sin(a + (2 * Math.PI) / points) * outer
    d += ` Q${ix.toFixed(1)} ${iy.toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)}`
  }
  return d + " Z"
}

function HoloDefs({ id }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#c6efff" />
        <stop offset="0.3" stopColor="#d6c6ff" />
        <stop offset="0.55" stopColor="#ffd0ef" />
        <stop offset="0.78" stopColor="#bfcaff" />
        <stop offset="1" stopColor="#c9fff1" />
      </linearGradient>
    </defs>
  )
}

// Sticker de estrella holográfica con texto (el "NEXT IS NOW" del póster)
export function StarSticker({ lines = ["El", "futuro", "es hoy"], className = "" }) {
  const id = useId()
  return (
    <div className={`${className.includes("absolute") ? "" : "relative"} ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-[0_16px_26px_rgba(58,44,153,0.45)]" aria-hidden="true">
        <HoloDefs id={id} />
        <path d={puffyStar(6, 48, 22)} fill={`url(#${id})`} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-tech text-[clamp(9px,1.05vw,13px)] leading-[1.25] font-bold text-ink uppercase">
        {lines.map((l) => (
          <span key={l}>{l}</span>
        ))}
        <span className="mt-0.5 tracking-[0.3em]">•••</span>
      </div>
    </div>
  )
}

// Sticker ondulado con carita y texto que gira ("THE FUTURE IS YOURS")
export function SmileySticker({ text = "EL FUTURO ES TUYO ✦ CRÉALO ✦ ", className = "" }) {
  const id = useId()
  const wave = Array.from({ length: 73 }, (_, i) => {
    const a = (i / 72) * Math.PI * 2
    const r = 57 + Math.sin(a * 12) * 2.4
    return `${i ? "L" : "M"}${(60 + Math.cos(a) * r).toFixed(1)} ${(60 + Math.sin(a) * r).toFixed(1)}`
  }).join(" ")
  return (
    <div className={`${className.includes("absolute") ? "" : "relative"} ${className}`}>
      <svg viewBox="0 0 120 120" className="h-full w-full drop-shadow-[0_14px_24px_rgba(58,44,153,0.4)]" aria-hidden="true">
        <HoloDefs id={id} />
        <path d={wave + " Z"} fill={`url(#${id})`} stroke="#fff" strokeWidth="1.5" />
        <g className="spin-slow" style={{ transformOrigin: "60px 60px" }}>
          <path id={`${id}-c`} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" fill="none" />
          <text className="font-tech" fontSize="9" letterSpacing="1.6" fill="#1f1a4d">
            <textPath href={`#${id}-c`}>{text}</textPath>
          </text>
        </g>
        <circle cx="49" cy="54" r="3.6" fill="#1f1a4d" />
        <circle cx="71" cy="54" r="3.6" fill="#1f1a4d" />
        <path d="M45 66 Q60 80 75 66" fill="none" stroke="#1f1a4d" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// Ventana de vidrio con barra "loading future…"
export function LoadingWindow({ title = "cargando_futuro…", children, className = "", bodyClassName = "p-5" }) {
  return (
    <div className={`overflow-hidden rounded-[22px] border border-white/80 bg-glass shadow-glass ${className}`}>
      <div className="flex items-center gap-3 border-b border-white/70 px-4 py-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white">
          <WireGlobe className="h-3.5 w-3.5" />
        </span>
        <span className="font-tech text-[10px] tracking-wider text-ink/70">{title}</span>
        <span className="ml-auto flex gap-[3px]" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={`h-2.5 w-1.5 -skew-x-12 rounded-[1px] ${i < 4 ? "bg-ink/70" : "bg-white/80"}`} />
          ))}
        </span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}

// Panel de vidrio con borde luminoso
export function Glass({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`rounded-[24px] border border-white/80 shadow-glass ${className.includes("bg-holo") ? "" : "bg-glass"} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
