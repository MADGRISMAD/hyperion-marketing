"use client"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, CheckCircle2, Wrench, Zap, ShoppingCart, Code2 } from "lucide-react"
import { Parallax, useScrollFrame } from "./parallax"

function Card({ className = "", children }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 ${className}`}>
      {children}
    </div>
  )
}

export default function Hero() {
  const content = useRef(null)

  useScrollFrame((y, vh, reduced) => {
    const el = content.current
    if (!el || y > vh * 1.5) return
    const p = Math.min(1, y / (vh * 0.8))
    el.style.opacity = String(1 - p)
    if (!reduced) el.style.transform = `translate3d(0,${(y * 0.3).toFixed(1)}px,0)`
  })

  return (
    <section id="inicio" className="relative w-full overflow-hidden pt-28 pb-24 lg:min-h-[100svh] lg:pt-32">
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef4ff] via-white to-white" />
      <Parallax mode="page" speed={0.25} className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute top-[18%] right-[-6%] h-[520px] w-[620px] rounded-[48px] bg-[#dfe9ff] lg:right-[2%]" />
      </Parallax>

      <div className="container relative z-10 grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        {/* Texto */}
        <div ref={content} className="text-center will-change-transform lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-volt/30 bg-volt/10 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand uppercase">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-aqua" />
            10 años desarrollando software
          </div>
          <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-fog sm:text-6xl xl:text-7xl">
            Tecnología que hace <span className="text-brand">crecer</span> tu negocio.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-fog/70 sm:text-lg lg:mx-0">
            Desarrollamos <strong className="text-fog">sistemas a la medida</strong>, <strong className="text-fog">puntos de venta</strong> y{" "}
            <strong className="text-fog">automatizaciones</strong>, y damos <strong className="text-fog">servicio técnico</strong> para que
            vendas más y trabajes menos.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="#contacto"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold text-white shadow-md shadow-blue-900/20 transition hover:scale-[1.03]"
            >
              Cotiza tu proyecto
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="#productos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-8 py-4 font-semibold text-fog backdrop-blur transition hover:border-brand hover:text-brand"
            >
              Ver nuestros productos
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 text-left text-sm sm:flex sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start">
            {[
              [Code2, "Sistemas a medida"],
              [ShoppingCart, "Puntos de venta"],
              [Zap, "Automatizaciones"],
              [Wrench, "Servicio técnico"],
            ].map(([Icon, t]) => (
              <div key={t} className="flex items-center gap-2 whitespace-nowrap text-fog/70">
                <Icon className="h-4 w-4 shrink-0 text-brand" /> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Interfaces flotantes con parallax */}
        <div className="relative mx-auto h-[380px] w-full max-w-[600px] sm:h-[480px] lg:h-[540px]">
          <Parallax mode="page" speed={-0.08} className="absolute top-[12%] left-0 w-[92%] sm:left-[4%]">
            <Card className="overflow-hidden">
              <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5a]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f2c14e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#5ad17a]" />
                <span className="ml-3 truncate rounded-md bg-slate-100 px-3 py-0.5 text-[11px] text-fog/60">mitiendita.software</span>
              </div>
              <Image
                src="/productos/mitiendita-app.webp"
                alt="Punto de venta mitiendita.software"
                width={2000}
                height={1161}
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className="h-auto w-full"
              />
            </Card>
          </Parallax>

          <Parallax mode="page" speed={-0.22} className="absolute top-0 right-0 w-[52%] sm:w-[44%]">
            <Card className="p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-aqua">
                <Zap className="h-4 w-4" /> Automatización activa
              </div>
              {["Venta registrada", "Inventario actualizado", "Reporte enviado por correo"].map((t, i) => (
                <div key={t} className="flex items-center gap-2 py-1 text-[11px] text-fog/80 sm:text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-aqua" style={{ opacity: 1 - i * 0.15 }} />
                  {t}
                </div>
              ))}
            </Card>
          </Parallax>

          <Parallax mode="page" speed={-0.32} className="absolute bottom-[4%] left-0 w-[50%] sm:bottom-[6%] sm:w-[42%]">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10">
                  <Wrench className="h-4 w-4 text-brand" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-fog">Servicio técnico</div>
                  <div className="text-[11px] text-fog/50">Equipo listo para ayudarte</div>
                </div>
              </div>
            </Card>
          </Parallax>

          <Parallax mode="page" speed={-0.16} className="absolute right-[2%] bottom-0 hidden w-[46%] sm:block">
            <Card className="p-4 font-mono text-[11px] leading-relaxed">
              <div className="text-fog/40">// tu proceso, automatizado</div>
              <div>
                <span className="text-[#7c3aed]">await</span> <span className="text-[#1d4ed8]">automatizar</span>
                <span className="text-fog/70">(</span>
                <span className="text-[#15803d]">&quot;cortes de caja&quot;</span>
                <span className="text-fog/70">)</span>
              </div>
            </Card>
          </Parallax>

          <Parallax mode="page" speed={-0.4} className="absolute top-[6%] left-[2%] hidden sm:block">
            <div className="float flex h-14 w-14 items-center justify-center rounded-full bg-[#ffc94d] font-display text-sm font-bold text-[#5a3a00] shadow-md">
              +$22
            </div>
          </Parallax>
        </div>
      </div>

      <a href="#servicios" className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs tracking-widest text-fog/50 uppercase lg:flex" aria-label="Ver servicios">
        Conoce más
        <ChevronDown className="scroll-cue h-5 w-5" />
      </a>
          </section>
  )
}
