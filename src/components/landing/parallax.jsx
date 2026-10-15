"use client"
import { createContext, useContext, useEffect, useRef } from "react"

// Motor de parallax ligero: un solo listener de scroll + requestAnimationFrame
// que actualiza transformaciones directamente en el DOM (sin re-renders).
const subscribers = new Set()
let ticking = false
let started = false
let reducedMotion = false

function frame() {
  ticking = false
  const y = window.scrollY
  const vh = window.innerHeight
  subscribers.forEach((fn) => fn(y, vh))
}

function requestFrame() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(frame)
  }
}

function start() {
  if (started) return
  started = true
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  window.addEventListener("scroll", requestFrame, { passive: true })
  window.addEventListener("resize", requestFrame)
}

export function useScrollFrame(fn) {
  const fnRef = useRef(fn)
  fnRef.current = fn
  useEffect(() => {
    start()
    const sub = (y, vh) => fnRef.current(y, vh, reducedMotion)
    subscribers.add(sub)
    requestFrame()
    return () => subscribers.delete(sub)
  }, [])
}

/**
 * mode "page":   desplazamiento = scrollY * speed (ideal para el hero)
 * mode "center": desplazamiento = distancia del centro del bloque al centro de la pantalla * speed
 */
export function Parallax({
  speed = 0.2,
  mode = "center",
  axis = "y",
  rotate = 0,
  entry = false,
  className = "",
  innerClassName = "",
  style,
  children,
}) {
  const wrap = useRef(null)
  const inner = useRef(null)

  useScrollFrame((y, vh, reduced) => {
    const el = inner.current
    const w = wrap.current
    if (!el || !w) return
    if (reduced) {
      el.style.transform = ""
      return
    }
    let d
    if (mode === "page") {
      if (y > vh * 2) return
      d = y
    } else {
      const r = w.getBoundingClientRect()
      if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return
      d = r.top + r.height / 2 - vh / 2
    }
    // entry: solo se desplaza mientras entra a la pantalla; ya centrado queda en su lugar
    let v = (entry ? Math.max(0, d) : d) * speed
    if (axis === "x") {
      // En pantallas chicas el desplazamiento horizontal se limita para no recortar el contenido
      const max = window.innerWidth < 768 ? 22 : 140
      v = Math.max(-max, Math.min(max, v))
    }
    const t = axis === "x" ? `translate3d(${v.toFixed(1)}px,0,0)` : `translate3d(0,${v.toFixed(1)}px,0)`
    el.style.transform = rotate ? `${t} rotate(${(d * rotate).toFixed(2)}deg)` : t
  })

  return (
    <div ref={wrap} className={className} style={style}>
      <div ref={inner} className={`h-full w-full will-change-transform ${innerClassName}`}>
        {children}
      </div>
    </div>
  )
}

export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

export function CountUp({ to, suffix = "", duration = 1600 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (now) => {
        const p = Math.min(1, (now - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = `${Math.round(to * eased)}${suffix}`
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to, suffix, duration])
  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  )
}

// ── Escenas: parallax en capas que se mueven en cualquier dirección ──
// Una <Scene> mide una sola vez por cuadro cuánto ha avanzado en pantalla (0 → 1) y se lo pasa a sus <Move>.
// mode "pass": 0 cuando asoma por abajo, 1 cuando sale por arriba. mode "pin": 0 → 1 mientras la sección está fija
// (para secciones altas con un contenedor sticky adentro).
const SceneCtx = createContext(null)
const clamp01 = (v) => Math.max(0, Math.min(1, v))
const lerp = (a, b, t) => a + (b - a) * t

export function Scene({ as: Tag = "section", mode = "pass", onProgress, className = "", children, ...rest }) {
  const ref = useRef(null)
  const layers = useRef(new Set())
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress
  useScrollFrame((y, vh, reduced) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.bottom < -vh || r.top > vh * 2) return
    const p = mode === "pin" ? clamp01(-r.top / Math.max(1, r.height - vh)) : clamp01((vh - r.top) / (vh + r.height))
    onProgressRef.current?.(p, reduced)
    layers.current.forEach((fn) => fn(reduced ? 0.5 : p, reduced))
  })
  return (
    <SceneCtx.Provider value={layers.current}>
      <Tag ref={ref} className={className} {...rest}>
        {children}
      </Tag>
    </SceneCtx.Provider>
  )
}

/**
 * Capa que se mueve con el avance de su escena. Cada eje es [desde, hasta]: x/y en px (o "vw"/"%" con unit),
 * r en grados, s escala, o opacidad. `range` limita el tramo de la escena en el que ocurre el movimiento.
 */
export function Move({ x, y, r, s, o, unit = "px", range = [0, 1], className = "", style, children, as: Tag = "div", ...rest }) {
  const layers = useContext(SceneCtx)
  const ref = useRef(null)
  const cfg = useRef(null)
  cfg.current = { x, y, r, s, o, unit, range } // los arreglos cambian de identidad en cada render: se leen al vuelo
  useEffect(() => {
    if (!layers) return
    const fn = (p, reduced) => {
      const { x, y, r, s, o, unit, range } = cfg.current
      const el = ref.current
      if (!el) return
      if (reduced) {
        el.style.transform = ""
        el.style.opacity = ""
        return
      }
      const t = clamp01((p - range[0]) / (range[1] - range[0]))
      const parts = []
      if (x || y) parts.push(`translate3d(${x ? lerp(x[0], x[1], t).toFixed(2) : 0}${unit}, ${y ? lerp(y[0], y[1], t).toFixed(2) : 0}${unit}, 0)`)
      if (r) parts.push(`rotate(${lerp(r[0], r[1], t).toFixed(2)}deg)`)
      if (s) parts.push(`scale(${lerp(s[0], s[1], t).toFixed(4)})`)
      el.style.transform = parts.join(" ")
      if (o) el.style.opacity = lerp(o[0], o[1], t).toFixed(3)
    }
    layers.add(fn)
    return () => layers.delete(fn)
  }, [layers])
  return (
    <Tag ref={ref} className={`will-change-transform ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  )
}

// Variables --mx/--my (-1 → 1) con la posición del cursor, suavizadas; las usan las capas .depth del CSS
export function useMouseDepth() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const root = document.documentElement.style
    const m = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e) => {
      m.tx = (e.clientX / window.innerWidth) * 2 - 1
      m.ty = (e.clientY / window.innerHeight) * 2 - 1
    }
    let raf
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const dx = m.tx - m.x
      const dy = m.ty - m.y
      if (Math.abs(dx) < 0.0005 && Math.abs(dy) < 0.0005) return
      m.x += dx * 0.08
      m.y += dy * 0.08
      root.setProperty("--mx", m.x.toFixed(4))
      root.setProperty("--my", m.y.toFixed(4))
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
    }
  }, [])
}
