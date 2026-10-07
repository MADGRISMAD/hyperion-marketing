"use client"
import { useEffect, useRef } from "react"

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
    let v = d * speed
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
