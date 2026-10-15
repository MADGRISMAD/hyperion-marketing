"use client"
import { useEffect, useRef, useState } from "react"

// Capas del logo: [archivo, clases de animación, retraso]
const LAYERS = [
  ["h", "logo-bar", "0.15s"],
  ["bar-small", "logo-bar logo-bar-top", "0.42s"],
  ["bar-tall", "logo-bar", "0.28s"],
  ["bar-short", "logo-bar", "0.36s"],
  ["tree", "logo-tree", null],
  ["arrow", "logo-arrow", null],
]

// Líneas de la consola de arranque: [milisegundos, texto, muestra OK]
const BOOT = [
  [100, "Hyperion OS v10.0", false],
  [380, "Verificando enlace seguro", true],
  [720, "Cargando módulos: sistemas, POS, automatización", true],
  [1100, "Sincronizando unidad Tijuana", true],
  [1500, "Proyector holográfico", true],
]

// Arranque del sistema: consola, el logo se construye (barras, árbol, flecha), cuenta hasta 100 y vuela a la barra.
export default function Intro() {
  const [phase, setPhase] = useState("in") // in → fly → done
  const mark = useRef(null)
  const counter = useRef(null)
  const bar = useRef(null)
  const flyNow = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    const finish = () => {
      root.classList.remove("intro-active")
      setPhase("done")
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish()
      return
    }
    root.classList.add("intro-active")
    window.scrollTo(0, 0)

    // Contador 000 → 100
    const t0 = performance.now()
    const LOAD = 2200
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / LOAD)
      const eased = 1 - Math.pow(1 - p, 2.2)
      const v = Math.round(eased * 100)
      if (counter.current) counter.current.textContent = String(v).padStart(3, "0")
      if (bar.current) bar.current.style.transform = `scaleX(${eased})`
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    let flyTimer, endTimer
    let started = false
    const fly = () => {
      if (started) return
      started = true
      clearTimeout(flyTimer)
      const target = document.querySelector("[data-logo-target]")
      const el = mark.current
      if (!target || !el) return finish()
      const a = el.getBoundingClientRect()
      const b = target.getBoundingClientRect()
      const scale = b.height / a.height
      const dx = b.left + b.width / 2 - (a.left + a.width / 2)
      const dy = b.top + b.height / 2 - (a.top + a.height / 2)
      el.style.transition = "transform 0.95s cubic-bezier(0.75, 0, 0.15, 1)"
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`
      setPhase("fly")
      endTimer = setTimeout(finish, 1000)
    }
    flyTimer = setTimeout(fly, LOAD + 350)

    // Un clic o una tecla adelantan el vuelo del logo
    flyNow.current = fly
    const skip = () => fly()
    window.addEventListener("keydown", skip, { once: true })

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(flyTimer)
      clearTimeout(endTimer)
      window.removeEventListener("keydown", skip)
      root.classList.remove("intro-active")
    }
  }, [])

  if (phase === "done") return null
  const flying = phase === "fly"

  return (
    <div
      className="intro-failsafe fixed inset-0 z-[100] cursor-pointer"
      aria-hidden="true"
      onClick={() => flyNow.current?.()}
      style={{ pointerEvents: flying ? "none" : "auto" }}
    >
      {/* Antes de hidratar ya se oculta el logo de la barra y se bloquea el scroll */}
      <script dangerouslySetInnerHTML={{ __html: "matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.add('intro-active')" }} />
      <noscript>
        <style>{".intro-failsafe{display:none!important}"}</style>
      </noscript>

      {/* Fondo que se desvanece mientras el logo vuela */}
      <div
        className="absolute inset-0 bg-night transition-opacity duration-700"
        style={{ opacity: flying ? 0 : 1, transitionDelay: flying ? "250ms" : "0ms" }}
      >
        <div className="vignette absolute inset-0" />
      </div>

      <div className={`absolute inset-0 transition-opacity duration-300 ${flying ? "opacity-0" : "opacity-100"}`}>
        {/* Consola de arranque: cada línea aparece a su tiempo */}
        <div className="readout absolute top-6 left-5 space-y-1.5 text-[10px] text-sage md:top-8 md:left-8 md:text-[11px]">
          {BOOT.map(([t, line, ok]) => (
            <div key={line} className="intro-line" style={{ animationDelay: `${t}ms` }}>
              <span className="text-phos/70">&gt;</span> {line}
              {ok && <span className="ml-2 text-phos">[ OK ]</span>}
            </div>
          ))}
        </div>
        <div className="readout absolute top-6 right-5 text-right text-[10px] text-sage md:top-8 md:right-8 md:text-[11px]">
          Lat 32.5149 N
          <br />
          Lon 117.0382 W
        </div>
        <div className="absolute inset-x-5 bottom-6 md:inset-x-8 md:bottom-8">
          <div className="mb-3 flex items-end justify-between">
            <span className="readout text-sage">
              Estableciendo enlace<span className="blink">_</span>
            </span>
            <span className="glow font-display text-5xl font-bold md:text-7xl">
              <span ref={counter}>000</span>%
            </span>
          </div>
          <div className="h-px bg-phos/15">
            <div ref={bar} className="h-full origin-left bg-phos shadow-[0_0_10px_#4dff9a]" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div ref={mark} className="will-change-transform">
          {/* El logo se arma por capas: barras → árbol → flecha (ver globals.css) */}
          <div className="relative aspect-[273/480] h-[170px] drop-shadow-[0_0_14px_rgba(77,255,154,0.55)] md:h-[230px]">
            {LAYERS.map(([src, cls, delay]) => (
              // cada pieza del logo es un molde pintado en fósforo
              <span
                key={src}
                className={`holo-mask logo-part absolute inset-0 h-full w-full ${cls}`}
                style={{ "--mask": `url(/brand/parts/${src}.png)`, ...(delay ? { animationDelay: delay } : {}) }}
              />
            ))}
          </div>
        </div>
        <div className={`mt-6 text-center transition-opacity duration-300 ${flying ? "opacity-0" : "opacity-100"}`}>
          <div className="glow intro-line font-display text-5xl font-bold tracking-[0.12em] md:text-7xl" style={{ animationDelay: "1250ms" }}>
            HYPERION
          </div>
          <div className="readout intro-line mt-3 tracking-[0.6em] text-sage" style={{ animationDelay: "1600ms" }}>
            Software
          </div>
        </div>
      </div>
    </div>
  )
}
