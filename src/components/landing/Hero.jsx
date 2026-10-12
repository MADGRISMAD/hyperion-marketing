"use client"
import { useRef } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight, ArrowDownRight, Code2, ShoppingCart, Zap, Wrench } from "lucide-react"
import { useScrollFrame } from "./parallax"

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false })

// Sticker circular que gira (texto sobre una ruta)
function SpinBadge() {
  return (
    <div className="relative h-28 w-28 md:h-32 md:w-32">
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#c6f432" stroke="#0b1a12" strokeWidth="2" />
        <text className="font-mono" fontSize="10.5" fontWeight="700" letterSpacing="2.2" fill="#0b1a12">
          <textPath href="#badge-circle">10 AÑOS ✦ HACIENDO SOFTWARE ✦ HECHO EN MX ✦</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center font-display leading-none text-ink">
        <span className="text-3xl font-bold md:text-4xl">10</span>
        <span className="font-mono text-[9px] font-bold tracking-widest">AÑOS</span>
      </div>
    </div>
  )
}

const strip = [
  [Code2, "Sistemas a la medida"],
  [ShoppingCart, "Puntos de venta"],
  [Zap, "Automatizaciones"],
  [Wrench, "Servicio técnico"],
]

export default function Hero() {
  const content = useRef(null)

  useScrollFrame((y, vh, reduced) => {
    const el = content.current
    // Solo en pantallas grandes: en móvil la escena 3D va debajo del texto y se encimarían
    if (!el || y > vh * 1.5 || window.innerWidth < 1024) return
    const p = Math.min(1, y / (vh * 0.85))
    el.style.opacity = String(1 - p * 0.9)
    if (!reduced) el.style.transform = `translate3d(0,${(y * 0.25).toFixed(1)}px,0)`
  })

  return (
    <section id="inicio" className="y2k-dots relative overflow-hidden pt-24 md:pt-28">
      <div className="container relative grid items-center gap-4 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:gap-8">
        {/* Texto */}
        <div ref={content} className="relative z-10 pt-6 will-change-transform lg:col-span-7 lg:pt-0">
          <div className="mb-7 flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-wider text-ink uppercase">
            <span className="rounded-full border-[1.5px] border-ink bg-white px-3 py-1">[ Hyperion Software ]</span>
            <span className="rounded-full border-[1.5px] border-ink px-3 py-1">Est. 2016</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-ink px-3 py-1 text-lime">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-lime" /> Tijuana → MX
            </span>
          </div>

          <h1 className="font-display text-[12.5vw] leading-[0.9] font-bold tracking-tight text-ink uppercase sm:text-7xl lg:text-[5.4rem] xl:text-[6.4rem]">
            <span className="block">Software</span>
            <span className="text-outline block">que hace</span>
            <span className="my-1 inline-block -rotate-2 rounded-xl border-[1.5px] border-ink bg-lime px-3 shadow-hard md:px-4">crecer</span>
            <span className="block">tu negocio</span>
          </h1>

          <p className="mt-8 max-w-xl text-base text-ink/75 sm:text-lg">
            Desarrollamos <strong className="text-ink">sistemas a la medida</strong>, <strong className="text-ink">puntos de venta</strong> y{" "}
            <strong className="text-ink">automatizaciones</strong>, y damos <strong className="text-ink">servicio técnico</strong>. Diez años
            ayudando a negocios a vender más y trabajar menos.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#contacto"
              className="press group inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-ink bg-lime px-7 py-4 font-mono text-sm font-bold tracking-wider text-ink uppercase shadow-hard"
            >
              Cotiza tu proyecto
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="#productos"
              className="press inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-ink bg-white px-7 py-4 font-mono text-sm font-bold tracking-wider text-ink uppercase shadow-hard"
            >
              Ver productos <ArrowDownRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Escena 3D */}
        <div className="relative -mx-4 h-[420px] sm:mx-0 sm:h-[540px] lg:col-span-5 lg:h-[calc(100svh-8rem)] lg:max-h-[760px]">
          <HeroScene />
          <div className="pointer-events-none absolute top-2 right-4 md:top-6 md:right-2">
            <SpinBadge />
          </div>
          <div className="pointer-events-none absolute bottom-6 left-4 rounded-lg border-[1.5px] border-ink bg-white px-3 py-2 font-mono text-[10px] leading-relaxed tracking-wider text-ink uppercase shadow-hard md:left-2">
            <div className="text-forest">● 6 productos en línea</div>
            <div className="text-ink/60">Hecho por nuestro equipo</div>
          </div>
        </div>
      </div>

      {/* Franja de servicios */}
      <div className="relative z-10 mt-6 border-y-[1.5px] border-ink lg:mt-0">
        <div className="grid grid-cols-2 gap-[1.5px] bg-ink md:grid-cols-4">
          {strip.map(([Icon, label], i) => (
            <Link
              key={label}
              href="#servicios"
              className="group flex items-center gap-3 bg-paper px-4 py-5 font-mono text-[11px] tracking-wider text-ink uppercase transition hover:bg-lime md:px-8 md:text-xs"
            >
              <span className="text-ink/40">0{i + 1}</span>
              <Icon className="h-4 w-4 shrink-0 text-forest" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
