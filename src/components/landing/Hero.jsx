"use client"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Wrench, Zap, ShoppingCart, Code2 } from "lucide-react"
import { Parallax, useScrollFrame } from "./parallax"
import { HyperionTree, SequoiaSilhouette } from "./Forest"

function Card({ className = "", children }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white/95 shadow-xl shadow-slate-900/10 ${className}`}>{children}</div>
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
    <section id="inicio" className="relative w-full overflow-hidden pt-28 lg:min-h-[100svh] lg:pt-24">
      {/* Fondo: cielo de día y bosque lejano */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#dceafc] via-[#eef5fd] to-white" />
      <Parallax mode="page" speed={0.45} className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] right-[22%] h-44 w-44 rounded-full bg-[#fff1bd] opacity-80 blur-2xl" />
      </Parallax>
      <Parallax mode="page" speed={0.32} className="pointer-events-none absolute inset-0">
        {[[3, 4, 34], [13, 16, 28], [17, 27, 38], [19, 50, 30], [29, 63, 36], [37, 76, 30], [41, 88, 40]].map(([seed, left, hgt]) => (
          <SequoiaSilhouette key={seed} seed={seed} color="#e1ecef" className="absolute bottom-0 w-auto" style={{ left: `${left}%`, height: `${hgt}%` }} />
        ))}
      </Parallax>
      <Parallax mode="page" speed={0.22} className="pointer-events-none absolute inset-0">
        <SequoiaSilhouette seed={7} color="#d6e5e7" className="absolute bottom-0 left-[-4%] h-[56%] w-auto" />
        <SequoiaSilhouette seed={31} color="#d3e3e4" className="absolute bottom-0 left-[38%] hidden h-[48%] w-auto lg:block" />
        <SequoiaSilhouette seed={59} color="#c8dbdc" className="absolute right-[-2%] bottom-0 h-[70%] w-auto" />
      </Parallax>

      <div className="container relative z-10 grid gap-6 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1.05fr_1fr] lg:items-end">
        {/* Texto */}
        <div ref={content} className="text-center will-change-transform lg:self-center lg:pb-20 lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-volt/30 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand uppercase">
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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-4 font-semibold text-fog transition hover:border-brand hover:text-brand"
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

        {/* Hyperion con tarjetas flotantes */}
        <div className="relative mx-auto h-[460px] w-full max-w-[560px] sm:h-[600px] lg:h-[calc(100svh-7rem)] lg:max-h-[860px] lg:max-w-none">
          <Parallax mode="page" speed={0.12} className="absolute inset-0">
            <HyperionTree className="absolute inset-0 h-full w-full" />
          </Parallax>

          <Parallax mode="page" speed={-0.18} className="absolute top-[30%] left-0 w-[58%] sm:w-[46%] lg:left-[-4%]">
            <Card className="p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-aqua">
                <Zap className="h-4 w-4" /> Automatización activa
              </div>
              {["Venta registrada", "Inventario actualizado", "Reporte enviado"].map((t) => (
                <div key={t} className="flex items-center gap-2 py-0.5 text-[11px] text-fog/80 sm:text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-aqua" />
                  {t}
                </div>
              ))}
            </Card>
          </Parallax>

          <Parallax mode="page" speed={-0.28} className="absolute top-[52%] right-0 w-[56%] sm:w-[44%] lg:right-[-2%]">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10">
                  <ShoppingCart className="h-4 w-4 text-brand" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-fog">Venta cobrada</div>
                  <div className="text-[11px] text-fog/50">mitiendita.software · $193.00</div>
                </div>
              </div>
            </Card>
          </Parallax>

          <Parallax mode="page" speed={-0.12} className="absolute bottom-[14%] left-[4%] hidden w-[42%] sm:block">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d9480f]/10">
                  <Wrench className="h-4 w-4 text-[#d9480f]" />
                </span>
                <div>
                  <div className="text-xs font-semibold text-fog">Servicio técnico</div>
                  <div className="text-[11px] text-fog/50">Equipo listo para ayudarte</div>
                </div>
              </div>
            </Card>
          </Parallax>

          <Parallax mode="page" speed={-0.35} className="absolute top-[14%] right-[8%] hidden sm:block">
            <div className="float flex h-14 w-14 items-center justify-center rounded-full bg-[#ffc94d] font-display text-sm font-bold text-[#5a3a00] shadow-md">
              +$22
            </div>
          </Parallax>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-b from-transparent to-white" />
    </section>
  )
}
