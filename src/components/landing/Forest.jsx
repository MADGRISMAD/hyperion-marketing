import { seeded, sequoia } from "./sequoia"

// Ilustraciones del bosque, generadas de forma determinista (mismo resultado en servidor y cliente).

const f = (n) => Math.round(n * 10) / 10

// Árboles lejanos: siluetas sencillas y anchas.
function conePath(x, base, h, w, rand) {
  const trunkH = h * 0.12
  const steps = 9
  let left = ""
  let right = ""
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const y = base - trunkH - t * (h - trunkH)
    const half = (w / 2) * Math.pow(1 - t, 0.8) * Math.min(1, 0.5 + t * 3)
    const jag = i % 2 ? 0.75 + rand() * 0.15 : 1
    left += `L${f(x - half * jag)} ${f(y)}`
    right = `L${f(x + half * (i % 2 ? 1 : 0.8 + rand() * 0.15))} ${f(y)}` + right
  }
  const tw = Math.max(3, w * 0.08)
  return `M${f(x - tw / 2)} ${f(base)}L${f(x - tw / 2)} ${f(base - trunkH)}${left}L${f(x)} ${f(base - h)}${right}L${f(x + tw / 2)} ${f(base - trunkH)}L${f(x + tw / 2)} ${f(base)}Z`
}

export function ForestLayer({ seed, count, minH, maxH, color, widthRatio = 0.3, className = "" }) {
  const W = 1600
  const H = 600
  const rand = seeded(seed)
  const gap = (W + 200) / count
  let d = ""
  for (let i = 0; i < count; i++) {
    const x = -100 + i * gap + rand() * gap * 0.7
    const h = minH + rand() * (maxH - minH)
    d += conePath(x, H + 2, h, h * widthRatio * (0.85 + rand() * 0.3), rand)
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true">
      <path d={d} fill={color} />
      <rect x="0" y={H} width={W} height="300" fill={color} />
    </svg>
  )
}

// Hyperion: secuoya gigante, con tronco rojizo y follaje en capas.
export function HyperionTree({ className = "" }) {
  const t = sequoia({ seed: 116 })
  return (
    <svg viewBox="0 0 500 1000" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bark" x1="0" x2="1">
          <stop offset="0" stopColor="#6e341b" />
          <stop offset="0.4" stopColor="#a85a34" />
          <stop offset="0.7" stopColor="#8e4727" />
          <stop offset="1" stopColor="#5a2a15" />
        </linearGradient>
      </defs>
      <g fill="#183d2a">
        {t.back.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g stroke="#5a2e1a" strokeLinecap="round" fill="none" strokeWidth="2.5">
        {t.snags.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <path d={t.trunk} fill="url(#bark)" />
      <g fill="none" strokeLinecap="round">
        {t.furrows.map((x, i) => (
          <path key={i} d={x.d} stroke={x.light ? "#d08a5c" : "#4a2010"} strokeOpacity={x.light ? 0.35 : 0.45} strokeWidth={x.w} />
        ))}
      </g>
      <g stroke="#5a2e1a" strokeLinecap="round" fill="none">
        {t.branches.map((b, i) => (
          <path key={i} d={b.d} strokeWidth={b.w} />
        ))}
      </g>
      <g fill="#1f4a33">
        {t.frontDark.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill="#2d6244">
        {t.frontMid.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill="#4c8a5f" opacity="0.85">
        {t.frontLight.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  )
}

// Silueta de secuoya en un solo color (para planos lejanos).
export function SequoiaSilhouette({ seed, color, className = "", style }) {
  const t = sequoia({ seed, crownHalf: 150, step: 0.03 })
  return (
    <svg viewBox="0 0 500 1000" preserveAspectRatio="xMidYMax meet" className={className} style={style} aria-hidden="true">
      <g fill={color}>
        <path d={t.trunk} />
        {[...t.back, ...t.frontDark].map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  )
}
