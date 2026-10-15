"use client"
import Link from "next/link"
import { BarChart3, CalendarCheck, ChevronRight, ShoppingBag } from "lucide-react"
import { Move, Scene } from "./parallax"
import { IPhone, MacBook, Notif } from "./Devices"
import caresiaWeb from "../../../public/productos/caresia-web.jpg"
import caresiaMovil from "../../../public/productos/caresia-movil.jpg"
import tienditaMovil from "../../../public/productos/mitiendita-movil.jpg"

// Portada: titular de producto y un escenario con pantallas reales. Al bajar, la MacBook se acerca, los iPhones se abren
// hacia los lados girando y las notificaciones se dispersan; con el cursor, cada capa se mueve según su profundidad.
export default function Hero() {
  return (
    <Scene id="inicio" className="relative overflow-hidden pt-28 pb-10 md:pt-36">
      <div className="container text-center">
        <p className="reveal is-visible inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-graphite shadow-[inset_0_0_0_1px_var(--color-line)]">
          <span className="h-1.5 w-1.5 rounded-full bg-sequoia" />
          Estudio de software · Tijuana · desde 2016
        </p>
        <h1 className="display mx-auto mt-7 max-w-5xl text-[clamp(2.9rem,8.4vw,7.4rem)]">
          Software que hace <span className="grad">crecer</span> tu negocio.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-graphite md:text-[1.35rem]">
          Sistemas a la medida, puntos de venta, automatizaciones y servicio técnico. Diez años construyendo para negocios de todo México.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link href="#contacto" className="btn btn-ink">
            Cotizar proyecto
          </Link>
          <Link href="#productos" className="link-arrow text-[15px] text-cobalt">
            Ver productos <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Escenario */}
      <div className="relative mx-auto mt-14 h-[78vw] max-w-[1240px] md:mt-20 md:h-[min(56vw,720px)]">
        {/* halos de color detrás de las pantallas */}
        <Move y={[0, 120]} range={[0.35, 1]} className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="depth absolute top-[8%] left-[18%] h-[55%] w-[38%] rounded-full bg-[#7fd6a8] opacity-45 blur-[90px]" style={{ "--d": 8 }} />
          <div className="depth absolute top-[18%] right-[16%] h-[55%] w-[36%] rounded-full bg-[#9db5ff] opacity-50 blur-[90px]" style={{ "--d": 12 }} />
          <div className="depth absolute bottom-[4%] left-[42%] h-[40%] w-[26%] rounded-full bg-[#ffc59a] opacity-50 blur-[80px]" style={{ "--d": 6 }} />
        </Move>

        <Move y={[0, -40]} s={[1, 1.07]} range={[0.35, 1]} className="absolute top-0 left-1/2 w-[76%] md:w-[68%]" style={{ translate: "-50% 0" }}>
          <div className="depth" style={{ "--d": 6 }}>
            <MacBook img={caresiaWeb} alt="Caresia, software para clínicas y consultorios, en una laptop" priority sizes="(min-width: 1024px) 840px, 76vw" />
          </div>
        </Move>

        <Move x={[0, -140]} y={[30, -110]} r={[-7, -14]} range={[0.35, 1]} className="absolute bottom-[-4%] left-[1%] w-[24%] md:bottom-[-8%] md:left-[4%] md:w-[17%]">
          <div className="depth" style={{ "--d": 22 }}>
            <IPhone img={caresiaMovil} alt="Caresia en un iPhone" eager />
          </div>
        </Move>
        <Move x={[0, 150]} y={[50, -150]} r={[8, 15]} range={[0.35, 1]} className="absolute right-[1%] bottom-[-8%] w-[24%] md:right-[5%] md:bottom-[-12%] md:w-[17%]">
          <div className="depth" style={{ "--d": 28 }}>
            <IPhone img={tienditaMovil} alt="Mitiendita, punto de venta en la nube, en un iPhone" eager />
          </div>
        </Move>

        {/* notificaciones: la capa más cercana, cada una sale en otra dirección */}
        <Move x={[0, -80]} y={[0, -220]} o={[1, 0]} range={[0.4, 0.95]} className="absolute top-[6%] left-[2%] hidden lg:block">
          <div className="depth" style={{ "--d": 40 }}>
            <Notif app="Mitiendita" color="var(--color-tangerine)" icon={ShoppingBag} title="Venta registrada · $118.50" text="Caja 1 · 4 artículos, guardada en la nube" />
          </div>
        </Move>
        <Move x={[0, 90]} y={[0, -260]} o={[1, 0]} range={[0.4, 0.95]} className="absolute top-[30%] right-[0%] hidden md:block">
          <div className="depth" style={{ "--d": 46 }}>
            <Notif app="Caresia" color="var(--color-cobalt)" icon={CalendarCheck} time="9:41" title="Cita confirmada · 10:30" text="Jorge Medina con la Dra. Ana Ruiz" />
          </div>
        </Move>
        <Move y={[0, -160]} o={[1, 0]} range={[0.45, 0.95]} className="absolute bottom-[10%] left-[14%] hidden lg:block">
          <div className="depth" style={{ "--d": 34 }}>
            <Notif app="Hyperion" color="var(--color-sequoia)" icon={BarChart3} time="21:00" title="Reporte del día enviado" text="Ventas $12,480 · inventario al día" />
          </div>
        </Move>
      </div>
    </Scene>
  )
}
