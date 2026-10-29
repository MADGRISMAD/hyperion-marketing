"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Scene } from "./parallax"

// Portada en video: una toma continua por Tijuana que avanza (y regresa) con el scroll. La toma dura 10.75 s: del arco de día al
// arco de noche. El video se descarga entero como Blob (así siempre se puede adelantar o regresar sin depender de rangos HTTP),
// los saltos de tiempo no se apilan mientras el decodificador busca, y el celular recibe una versión más ligera.

const DURACION = 10.75
// Tramos del scroll: [unidades de scroll, segundo del video al final del tramo]. Las pausas conservan el mismo segundo.
const TRAMOS = [
  [1, 0], // pausa: arco de día, titular
  [2.4, 6.04], // viaje: de día a noche
  [1, 6.04], // pausa: arco de noche
  [2, DURACION], // viaje: calle de noche hasta la terraza
  [1.2, DURACION], // pausa final
]
const TOTAL = TRAMOS.reduce((a, [u]) => a + u, 0)
const PARADAS = (() => {
  let acc = 0
  let prev = 0
  return TRAMOS.map(([u, t]) => {
    const p0 = acc / TOTAL
    acc += u
    const out = { p0, p1: acc / TOTAL, t0: prev, t1: t }
    prev = t
    return out
  })
})()

function segundo(p) {
  for (const s of PARADAS) {
    if (p <= s.p1) {
      const f = s.p1 === s.p0 ? 1 : (p - s.p0) / (s.p1 - s.p0)
      const e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2
      return s.t0 + (s.t1 - s.t0) * e
    }
  }
  return DURACION
}

// Cada texto vive en una pausa: [inicio, fin] del avance del scroll
const pausa = (i) => [PARADAS[i].p0, PARADAS[i].p1]
const MOMENTOS = [
  { rango: pausa(0) },
  { rango: pausa(2) },
  { rango: pausa(4) },
]

export default function HeroVideo() {
  const video = useRef(null)
  const poster = useRef(null)
  const beats = useRef([])
  const estado = useRef({ listo: false, mostrado: 0, p: 0, reducido: false })
  const [quieto, setQuieto] = useState(false) // «reducir movimiento»: poster fijo y los textos uno tras otro

  useEffect(() => {
    const e = estado.current
    const celular = window.matchMedia("(max-width: 860px), (hover: none) and (pointer: coarse)").matches
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    e.reducido = reducido
    if (reducido) {
      setQuieto(true)
      return
    }
    let vivo = true
    let url = ""
    let raf = 0
    let idle = 0
    // Con ahorro de datos o conexión lenta no se baja el video (5.8–11 MB): se queda el poster y los textos siguen el scroll
    const red = navigator.connection
    const lenta = red && (red.saveData || /2g|3g/.test(red.effectiveType || ""))

    // el video no compite con la carga inicial: se pide cuando la página ya terminó y el navegador está libre
    const cargar = () => {
      if (!vivo || lenta) return
      fetch(celular ? "/video/hero-720.mp4" : "/video/hero-1080.mp4")
      .then((r) => r.blob())
      .then((b) => {
        if (!vivo) return
        url = URL.createObjectURL(b)
        const v = video.current
        v.src = url
        // iOS no pinta el primer cuadro hasta reproducir: play → pause en silencio
        v.play().then(() => v.pause()).catch(() => {})
        v.addEventListener(
          "loadeddata",
          () => {
            e.listo = true
            poster.current?.classList.add("opacity-0")
          },
          { once: true },
        )
      })
      .catch(() => {})
    }
    const programar = () => {
      idle = window.requestIdleCallback ? requestIdleCallback(cargar, { timeout: 2500 }) : setTimeout(cargar, 300)
    }
    if (document.readyState === "complete") programar()
    else window.addEventListener("load", programar, { once: true })

    const paso = () => {
      raf = requestAnimationFrame(paso)
      const v = video.current
      if (!e.listo || !v?.duration) return
      const meta = Math.min(v.duration - 0.05, segundo(e.p))
      e.mostrado += (meta - e.mostrado) * 0.18
      if (Math.abs(meta - e.mostrado) < 0.002) e.mostrado = meta
      // un salto a la vez: si el decodificador sigue buscando, se espera al siguiente cuadro
      if (!v.seeking && Math.abs(v.currentTime - e.mostrado) > 1 / 60) v.currentTime = e.mostrado
    }
    raf = requestAnimationFrame(paso)

    return () => {
      vivo = false
      window.removeEventListener("load", programar)
      if (window.cancelIdleCallback) cancelIdleCallback(idle)
      clearTimeout(idle)
      cancelAnimationFrame(raf)
      if (url) URL.revokeObjectURL(url)
    }
  }, [])

  const alAvanzar = (p, reducido) => {
    estado.current.p = p
    if (reducido) return
    MOMENTOS.forEach((m, i) => {
      const el = beats.current[i]
      if (!el) return
      const [a, b] = m.rango
      const m0 = 0.025 // margen de entrada y salida
      const on = Math.min(1, Math.max(0, (p - (a - m0)) / m0)) * Math.min(1, Math.max(0, (b + m0 - p) / m0))
      const centro = (a + b) / 2
      const t = Math.max(-1, Math.min(1, (p - centro) / ((b - a) / 2 + m0 * 2)))
      el.style.opacity = i === 0 && p < a ? "1" : String(on)
      el.style.transform = `translate3d(0,${(t * -36).toFixed(1)}px,0)`
      el.style.pointerEvents = on > 0.6 ? "auto" : "none"
    })
  }

  return (
    <Scene id="inicio" mode="pin" onProgress={alAvanzar} className="relative bg-[#0c0f0d] text-white" style={quieto ? undefined : { height: `${TOTAL * 45}vh` }}>
      <div className={quieto ? "relative min-h-[100svh] overflow-hidden" : "sticky top-0 h-[100svh] overflow-hidden"}>
        <div className="absolute inset-0" aria-hidden="true">
          <img ref={poster} src="/video/hero-poster.webp" alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500" />
          <video ref={video} muted playsInline preload="auto" tabIndex={-1} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#0c0f0d]/45" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0c0f0d]/70 to-transparent" />
        </div>

        {/* 1 · Titular */}
        <div ref={(el) => (beats.current[0] = el)} className={quieto ? "relative z-10 pt-40" : "absolute inset-x-0 bottom-0 z-10 will-change-transform"}>
          <div className="container pb-16 md:pb-24">
            <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-white/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6fe3a6]" />
              Estudio de software · Tijuana · desde 2016
            </p>
            <h1 className="display mt-6 max-w-4xl text-[clamp(2.7rem,7.2vw,6.4rem)] text-white">Software que hace crecer tu negocio.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 md:text-[1.3rem]">
              Sistemas a la medida, puntos de venta, automatizaciones y servicio técnico. Diez años construyendo para negocios de todo México.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="#contacto" className="btn btn-light">
                Cotizar proyecto
              </Link>
              <Link href="#productos" className="link-arrow text-[15px] text-white">
                Ver productos <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2 · Noche */}
        <div ref={(el) => (beats.current[1] = el)} className={quieto ? "relative z-10 pt-24" : "absolute inset-x-0 bottom-0 z-10 opacity-0 will-change-transform"}>
          <div className="container pb-16 md:pb-24">
            <p className="eyebrow text-white/70">Tijuana</p>
            <h2 className="display mt-4 max-w-3xl text-[clamp(2.3rem,5.6vw,5rem)] text-white">Aquí empezamos. Hoy construimos para todo México.</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">Una década haciendo software para negocios reales: de la caja de una tienda a la agenda de una clínica.</p>
          </div>
        </div>

        {/* 3 · Cierre */}
        <div ref={(el) => (beats.current[2] = el)} className={quieto ? "relative z-10 pt-24" : "absolute inset-x-0 bottom-0 z-10 opacity-0 will-change-transform"}>
          <div className="container pb-16 md:pb-24">
            <p className="eyebrow text-white/70">Lo que hemos construido</p>
            <h2 className="display mt-4 max-w-3xl text-[clamp(2.3rem,5.6vw,5rem)] text-white">Mitiendita, Caresia, Camión TJ y más.</h2>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="#productos" className="btn btn-light">
                Ver productos
              </Link>
              <Link href="#contacto" className="link-arrow text-[15px] text-white">
                Cotizar un proyecto <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  )
}
