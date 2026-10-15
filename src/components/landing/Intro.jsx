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

// Cortina de entrada: el logo se construye (barras, árbol, flecha), cuenta hasta 100 y vuela a la barra.
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
        className="bg-sunset absolute inset-0 transition-opacity duration-700"
        style={{ opacity: flying ? 0 : 1, transitionDelay: flying ? "250ms" : "0ms" }}
      />

      <div className={`absolute inset-0 transition-opacity duration-300 ${flying ? "opacity-0" : "opacity-100"}`}>
        <div className="spec absolute top-5 left-5 text-paper/50 md:top-8 md:left-8">
          hyperion_software.exe
        </div>
        <div className="spec absolute top-5 right-5 text-paper/50 md:top-8 md:right-8">
          Tijuana · MX
        </div>
        <div className="absolute inset-x-5 bottom-6 md:inset-x-8 md:bottom-8">
          <div className="mb-3 flex items-end justify-between font-mono uppercase">
            <span className="text-[11px] tracking-widest text-paper/55">
              Cargando<span className="blink">_</span>
            </span>
            <span className="chrome font-display text-5xl font-extrabold md:text-7xl">
              <span ref={counter}>000</span>
              %
            </span>
          </div>
          <div className="h-px bg-paper/15">
            <div ref={bar} className="h-full origin-left bg-coral" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div ref={mark} className="will-change-transform">
          {/* El logo se arma por capas: barras → árbol → flecha (ver globals.css) */}
          <div className="relative aspect-[273/480] h-[170px] md:h-[230px]">
            {LAYERS.map(([src, cls, delay]) => (
              // cada pieza del logo es un molde pintado en cromo
              <span
                key={src}
                className={`chrome-mask logo-part absolute inset-0 h-full w-full ${cls}`}
                style={{ "--mask": `url(/brand/parts/${src}.png)`, ...(delay ? { animationDelay: delay } : {}) }}
              />
            ))}
            <span className="absolute top-[27%] left-[99%]">
              <span className="logo-spark glint block" style={{ "--s": "64px" }} />
            </span>
          </div>
        </div>
        <div className={`mt-6 text-center transition-opacity duration-300 ${flying ? "opacity-0" : "opacity-100"}`}>
          <div className="overflow-hidden py-2 font-display text-5xl font-extrabold md:text-7xl">
            {"HYPERION".split("").map((c, i) => (
              <span key={i} className="intro-letter chrome" style={{ animationDelay: `${1250 + i * 55}ms` }}>
                {c}
              </span>
            ))}
          </div>
          <div className="mt-2 overflow-hidden font-mono text-xs tracking-[0.6em] text-paper/60 uppercase md:text-sm">
            <span className="intro-letter" style={{ animationDelay: "1800ms" }}>
              Software
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
