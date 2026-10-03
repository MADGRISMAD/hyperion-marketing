// Siluetas de secuoyas generadas de forma determinista (mismo resultado en servidor y cliente).

const W = 1600
const H = 900

function seeded(seed) {
  let s = seed
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const f = (n) => Math.round(n * 10) / 10

// Secuoya: tronco recto y esbelto, copa columnar con ramas escalonadas.
export function redwoodPath(x, base, h, w, rand) {
  const trunkH = h * 0.2
  const trunkW = Math.max(2, w * 0.09)
  const steps = Math.max(10, Math.round(h / 12))
  const left = []
  const right = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const y = base - trunkH - t * (h - trunkH)
    const profile = Math.pow(1 - t, 0.7) * Math.min(1, 0.35 + t * 3.5)
    const half = (w / 2) * profile
    const droop = h * 0.014
    if (i % 2 === 0) {
      left.push([x - half * (0.8 + rand() * 0.4), y + droop])
      right.push([x + half * (0.5 + rand() * 0.2), y])
    } else {
      left.push([x - half * (0.5 + rand() * 0.2), y])
      right.push([x + half * (0.8 + rand() * 0.4), y + droop])
    }
  }
  let d = `M${f(x - trunkW / 2)} ${f(base)}L${f(x - trunkW / 2)} ${f(base - trunkH)}`
  left.forEach(([px, py]) => (d += `L${f(px)} ${f(py)}`))
  d += `L${f(x)} ${f(base - h)}`
  for (let i = right.length - 1; i >= 0; i--) d += `L${f(right[i][0])} ${f(right[i][1])}`
  d += `L${f(x + trunkW / 2)} ${f(base - trunkH)}L${f(x + trunkW / 2)} ${f(base)}Z`
  return d
}

export function forestPath({ seed, count, minH, maxH, widthRatio = 0.16, base = H, ground = 0, skipCenter = 0 }) {
  const rand = seeded(seed)
  let d = ""
  const gap = (W + 200) / count
  for (let i = 0; i < count; i++) {
    const x = -100 + i * gap + rand() * gap * 0.8
    if (skipCenter && Math.abs(x - W / 2) < skipCenter) continue
    const h = minH + rand() * (maxH - minH)
    const b = base - rand() * ground
    d += redwoodPath(x, b + 4, h, h * widthRatio * (0.8 + rand() * 0.4), rand)
  }
  return d
}

export function ForestLayer({ seed, count, minH, maxH, color, widthRatio, ground = 0, skipCenter, groundHeight = 0, className = "" }) {
  const d = forestPath({ seed, count, minH, maxH, widthRatio, ground, skipCenter })
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <path d={d} fill={color} />
      {groundHeight > 0 && <rect x="0" y={H - groundHeight} width={W} height={groundHeight + 400} fill={color} />}
      <rect x="0" y={H} width={W} height="600" fill={color} />
    </svg>
  )
}

// Hyperion: el árbol gigante central, con brillo de borde.
export function HyperionTree({ className = "" }) {
  const rand = seeded(116)
  const d = redwoodPath(W / 2, H + 4, 840, 170, rand)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="hyperion-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#13261d" />
          <stop offset="1" stopColor="#08120d" />
        </linearGradient>
        <filter id="hyperion-glow" x="-50%" y="-10%" width="200%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <path d={d} fill="#f2a65a" opacity="0.35" filter="url(#hyperion-glow)" />
      <path d={d} fill="url(#hyperion-fill)" />
      <rect x="0" y={H} width={W} height="600" fill="#08120d" />
    </svg>
  )
}

export function Stars({ count = 120, seed = 7 }) {
  const rand = seeded(seed)
  const stars = Array.from({ length: count }, () => ({
    cx: f(rand() * W),
    cy: f(rand() * H * 0.65),
    r: f(0.4 + rand() * 1.4),
    o: f(0.3 + rand() * 0.7),
    delay: f(rand() * 5),
  }))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#fff7e6" opacity={s.o} className="twinkle" style={{ animationDelay: `${s.delay}s` }} />
      ))}
    </svg>
  )
}

export function Fireflies({ count = 26, seed = 33 }) {
  const rand = seeded(seed)
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="firefly"
          style={{
            left: `${f(rand() * 100)}%`,
            top: `${f(45 + rand() * 50)}%`,
            animationDelay: `${f(rand() * 8)}s, ${f(rand() * 3)}s`,
            animationDuration: `${f(10 + rand() * 10)}s, ${f(2 + rand() * 3)}s`,
          }}
        />
      ))}
    </div>
  )
}

// Anillos de crecimiento: uno por cada año de experiencia.
export function TreeRings({ rings = 10, className = "" }) {
  const rand = seeded(2016)
  const paths = Array.from({ length: rings }, (_, i) => {
    const r = 22 + i * 17
    const pts = 48
    let d = ""
    const phase = rand() * Math.PI * 2
    for (let k = 0; k <= pts; k++) {
      const a = (k / pts) * Math.PI * 2
      const wob = 1 + 0.035 * Math.sin(a * 3 + phase) + 0.02 * Math.sin(a * 7 + phase * 2)
      const px = 200 + Math.cos(a) * r * wob
      const py = 200 + Math.sin(a) * r * wob
      d += `${k ? "L" : "M"}${f(px)} ${f(py)}`
    }
    return d + "Z"
  })
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="wood" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#e7a467" />
          <stop offset="0.7" stopColor="#b25a2c" />
          <stop offset="1" stopColor="#5a2614" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="196" fill="#3b1a0e" />
      <circle cx="200" cy="200" r="188" fill="url(#wood)" />
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={i === rings - 1 ? "#ffe2b8" : "#5a2614"}
          strokeOpacity={i === rings - 1 ? 0.95 : 0.55}
          strokeWidth={i === rings - 1 ? 3 : 1.6}
          className="ring-draw"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
      <circle cx="200" cy="200" r="6" fill="#5a2614" />
    </svg>
  )
}
