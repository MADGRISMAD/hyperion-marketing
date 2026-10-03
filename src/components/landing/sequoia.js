// Generador determinista de una secuoya (mismo resultado en servidor y cliente).
// Devuelve solo datos (paths y colores) para que el componente los dibuje en SVG.

export function seeded(seed) {
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

// Mechón de follaje: elipse aplanada con borde dentado (agujas), más irregular por abajo.
function padPath(cx, cy, rx, ry, rand) {
  const n = 40
  const rot = (rand() - 0.5) * 0.25
  let d = ""
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2
    const below = Math.sin(a) > 0
    const spike = k % 2 === 0 ? 1 + rand() * (below ? 0.28 : 0.14) : 0.8 + rand() * 0.08
    const wob = 1 + 0.12 * Math.sin(a * 3 + rot * 10)
    const x = Math.cos(a) * rx * spike * wob
    const y = Math.sin(a) * ry * spike * wob * (below ? 1.15 : 1)
    const px = cx + x * Math.cos(rot) - y * Math.sin(rot)
    const py = cy + x * Math.sin(rot) + y * Math.cos(rot)
    d += `${k ? "L" : "M"}${f(px)} ${f(py)}`
  }
  return d + "Z"
}

export function sequoia({ seed = 116, width = 500, height = 1000, crownHalf = 170, step = 0.017 } = {}) {
  const rand = seeded(seed)
  const cx = width / 2
  const base = height
  const h = height * 0.98
  const top = base - h
  const sway = (t) => Math.sin(t * 2.4) * 5

  // Tronco con raíces ensanchadas
  const left = []
  const right = []
  const steps = 30
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const y = base - t * h * 0.97
    const flare = Math.pow(Math.max(0, 1 - t / 0.07), 2) * 40
    const half = 7 + 44 * Math.pow(1 - t, 1.2) + flare
    left.push([cx + sway(t) - half - (rand() - 0.5) * 1.5, y])
    right.push([cx + sway(t) + half + (rand() - 0.5) * 1.5, y])
  }
  let trunk = `M${f(left[0][0])} ${f(base)}`
  left.forEach(([x, y]) => (trunk += `L${f(x)} ${f(y)}`))
  for (let i = right.length - 1; i >= 0; i--) trunk += `L${f(right[i][0])} ${f(right[i][1])}`
  trunk += "Z"

  // Vetas de la corteza
  const furrows = []
  for (let j = 0; j < 16; j++) {
    const u = -0.85 + (j / 15) * 1.7 + (rand() - 0.5) * 0.06
    let d = ""
    const tEnd = 0.45 + rand() * 0.45
    for (let i = 0; i <= 20; i++) {
      const t = (i / 20) * tEnd
      const y = base - t * h * 0.97
      const flare = Math.pow(Math.max(0, 1 - t / 0.07), 2) * 40
      const half = 7 + 44 * Math.pow(1 - t, 1.2) + flare
      d += `${i ? "L" : "M"}${f(cx + sway(t) + u * half + (rand() - 0.5) * 1.2)} ${f(y)}`
    }
    furrows.push({ d, light: j % 3 === 1, w: 0.8 + rand() * 1.4 })
  }

  // Ramas y follaje
  const branches = []
  const back = []
  const front = []
  const snags = []
  const profile = (t) => Math.min(1, 0.35 + (t - 0.36) * 4) * Math.pow(1 - t, 0.3)

  for (let t = 0.24; t < 0.36; t += 0.03) {
    const side = rand() < 0.5 ? -1 : 1
    const y = base - t * h
    const x0 = cx + sway(t) + side * (7 + 44 * Math.pow(1 - t, 1.2)) * 0.8
    const L = 18 + rand() * 22
    snags.push(`M${f(x0)} ${f(y)}L${f(x0 + side * L)} ${f(y - 6 - rand() * 8)}`)
  }

  for (let t = 0.36; t <= 0.985; t += step) {
    const sides = rand() < 0.85 ? [-1, 1] : [rand() < 0.5 ? -1 : 1]
    for (const side of sides) {
      const tt = t + (rand() - 0.5) * 0.012
      const y = base - tt * h
      const p = profile(tt)
      const L = Math.max(14, crownHalf * p * (0.65 + rand() * 0.45))
      const x0 = cx + sway(tt)
      const ex = x0 + side * L
      const ey = y + L * (0.1 + rand() * 0.12)
      branches.push({ d: `M${f(x0)} ${f(y)}Q${f(x0 + side * L * 0.45)} ${f(y - L * 0.12)} ${f(ex)} ${f(ey)}`, w: 1.5 + p * 3 })
      const pads = 3 + Math.floor(rand() * 2 + p * 2)
      for (let k = 1; k <= pads; k++) {
        const q = 0.15 + (k / pads) * 0.9
        const px = x0 + side * L * q
        const py = y + (ey - y) * q * q - L * 0.04 + 6
        const rx = (20 + rand() * 14) * (0.6 + p * 0.8)
        const ry = rx * (0.42 + rand() * 0.1)
        const pad = { cx: px, cy: py, rx, ry }
        ;(rand() < 0.3 ? back : front).push(pad)
      }
    }
  }

  // Punta
  for (let i = 0; i < 4; i++) {
    front.push({ cx: cx + sway(1) + (rand() - 0.5) * 6, cy: top + 6 + i * 13, rx: 7 + i * 4, ry: 6 + i * 2 })
  }

  const draw = (pads, mul = 1, dy = 0, dx = 0) =>
    pads.map((p) => padPath(p.cx + dx * p.rx, p.cy + dy * p.ry, p.rx * mul, p.ry * mul, rand))

  return {
    trunk,
    furrows,
    snags,
    branches,
    back: draw(back),
    frontDark: draw(front),
    frontMid: draw(front, 0.78, -0.35, 0.08),
    frontLight: draw(
      front.filter(() => rand() < 0.7),
      0.48,
      -0.6,
      0.22
    ),
  }
}
