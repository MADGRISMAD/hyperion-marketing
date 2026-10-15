"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronDown, LayoutGrid, List, Play, Settings } from "lucide-react"

// Coordenadas reales de Tijuana: la "base" de la operación
export const LAT = "32.5149 N"
export const LON = "117.0382 W"

const menu = [
  { href: "#contacto", label: "Cotizar proyecto", icon: Play },
  { href: "#servicios", label: "Servicios", icon: List },
  { href: "#productos", label: "Productos", icon: LayoutGrid },
  { href: "#automatizaciones", label: "Automatización", icon: Settings },
]

// Globo de alambre que gira, con dos órbitas (canvas 2D: unas cuantas líneas por cuadro)
export function HoloGlobe({ className = "" }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const g = c.getContext("2d")
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const S = c.clientWidth || 160
    c.width = c.height = S * dpr
    g.scale(dpr, dpr)
    const R = S * 0.32
    const cx = S / 2
    const cy = S / 2
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(c)
    const tilt = 0.38
    const orbit = (rx, ry, a, s) => [cx + Math.cos(s) * rx * Math.cos(a) - Math.sin(s) * ry * Math.sin(a), cy + Math.cos(s) * rx * Math.sin(a) + Math.sin(s) * ry * Math.cos(a)]
    const draw = (now) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      const rot = reduced ? 0.6 : now / 4000
      g.clearRect(0, 0, S, S)
      g.lineWidth = 0.8
      // proyecta un punto de la esfera; z > 0 es la cara de enfrente
      const P = (lat, lon) => {
        const x = Math.cos(lat) * Math.sin(lon + rot)
        const y = Math.sin(lat)
        const z = Math.cos(lat) * Math.cos(lon + rot)
        return [cx + x * R, cy - (y * Math.cos(tilt) - z * Math.sin(tilt)) * R, y * Math.sin(tilt) + z * Math.cos(tilt)]
      }
      const line = (pts) => {
        for (let i = 1; i < pts.length; i++) {
          g.strokeStyle = pts[i - 1][2] > 0 ? "rgba(170,255,205,0.8)" : "rgba(120,255,180,0.16)"
          g.beginPath()
          g.moveTo(pts[i - 1][0], pts[i - 1][1])
          g.lineTo(pts[i][0], pts[i][1])
          g.stroke()
        }
      }
      for (let la = -60; la <= 60; la += 30) line(Array.from({ length: 49 }, (_, i) => P((la * Math.PI) / 180, (i / 48) * Math.PI * 2)))
      for (let lo = 0; lo < 180; lo += 30) line(Array.from({ length: 49 }, (_, i) => P((i / 48) * Math.PI * 2, (lo * Math.PI) / 180)))
      g.strokeStyle = "rgba(170,255,205,0.5)"
      for (const [rx, ry, a] of [[R * 1.45, R * 0.42, -0.4], [R * 1.3, R * 0.3, 0.55]]) {
        g.beginPath()
        g.ellipse(cx, cy, rx, ry, a, 0, Math.PI * 2)
        g.stroke()
      }
      const [sx, sy] = orbit(R * 1.45, R * 0.42, -0.4, reduced ? 1 : now / 1400)
      g.fillStyle = "#4dff9a"
      g.beginPath()
      g.arc(sx, sy, 2.4, 0, Math.PI * 2)
      g.fill()
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])
  return <canvas ref={ref} className={`block aspect-square w-full ${className}`} aria-hidden="true" />
}

// Mapa de calles de la zona (trazos fijos) con la mira al centro
export function MiniMap({ className = "", night = false }) {
  const [roads] = useState(() => {
    let s = 42
    const r = () => ((s = (s * 16807) % 2147483647), (s - 1) / 2147483646)
    const out = []
    for (let i = 0; i < 14; i++) {
      const y = r() * 100
      out.push(`M0 ${y.toFixed(1)} C 30 ${(y + (r() - 0.5) * 30).toFixed(1)}, 70 ${(y + (r() - 0.5) * 30).toFixed(1)}, 100 ${(y + (r() - 0.5) * 20).toFixed(1)}`)
      const x = r() * 100
      out.push(`M${x.toFixed(1)} 0 C ${(x + (r() - 0.5) * 30).toFixed(1)} 40, ${(x + (r() - 0.5) * 30).toFixed(1)} 60, ${(x + (r() - 0.5) * 20).toFixed(1)} 100`)
    }
    return out
  })
  const stroke = night ? "rgba(140,255,190,0.6)" : "rgba(220,255,233,0.35)"
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden="true">
      <rect width="100" height="100" fill={night ? "#03130a" : "#08150f"} />
      {roads.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={stroke} strokeWidth={i % 5 === 0 ? 1.6 : 0.6} vectorEffect="non-scaling-stroke" />
      ))}
      <circle cx="50" cy="50" r="16" fill="none" stroke="rgba(160,255,200,0.45)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
      <path d="M50 38 V46 M50 54 V62 M38 50 H46 M54 50 H62" stroke="#dcffe9" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

// Dispositivo de muñeca que proyecta el holograma (solo escritorio)
function WristDevice() {
  return (
    <div className="relative h-[290px] w-[500px]">
      {/* correa con textura */}
      <div className="absolute top-[20%] -left-[45%] h-[60%] w-[175%] rounded-[44px] bg-[repeating-linear-gradient(90deg,#0b110d_0_7px,#121b15_7px_10px)] shadow-[inset_0_8px_24px_rgba(0,0,0,0.85),0_30px_60px_rgba(0,0,0,0.7)]" />
      {/* cuerpo */}
      <div className="absolute inset-0 rounded-[30px] bg-[linear-gradient(160deg,#313a32_0%,#161c18_45%,#090c0a_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-2px_0_rgba(0,0,0,0.6),0_0_0_1px_#000,0_40px_80px_-20px_rgba(0,0,0,0.9)]">
        {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((p) => (
          <span key={p} className={`absolute ${p} h-2 w-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#77807a,#1a201b)]`} />
        ))}
        <div className="flex h-full gap-3">
          {/* pantalla de visión nocturna */}
          <div className="relative flex-1 overflow-hidden rounded-[14px] border-2 border-black shadow-[inset_0_0_34px_rgba(77,255,154,0.3)]">
            <MiniMap night className="absolute inset-0 h-full w-full" />
            <div className="scan absolute inset-0" />
            <div className="readout absolute top-3 left-3 text-[10px] leading-relaxed text-phos">
              HY-OS
              <span className="mt-0.5 flex items-center gap-1.5">
                <span className="pulse h-1.5 w-1.5 rounded-full bg-phos" /> En línea
              </span>
            </div>
            <div className="readout absolute bottom-3 left-3 text-[10px] leading-relaxed text-mint/85">
              Lat {LAT}
              <br />
              Lon {LON}
            </div>
            <div className="absolute top-3 right-3 h-8 w-12 border border-phos/50" />
          </div>
          {/* botones */}
          <div className="flex w-12 flex-col items-center justify-center gap-3">
            {["▲", "■", "▼"].map((b, i) => (
              <span
                key={b}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_0_1px_#000] ${
                  i === 1 ? "bg-[#3a1212] text-alert" : "bg-[#1c231e] text-mint/70"
                }`}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Portada: menú de pausa holográfico proyectado desde la muñeca, sobre la ciudad de noche
export default function Hero() {
  const [active, setActive] = useState(0)
  const panel = useRef(null)
  const device = useRef(null)
  const beam = useRef(null)
  const items = useRef([])

  // Inclinación con el cursor y el scroll: panel, haz y dispositivo a distinta profundidad (el dispositivo es lo más cercano)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 1024) return
    const m = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e) => {
      m.tx = (e.clientX / window.innerWidth) * 2 - 1
      m.ty = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    let raf
    const tick = () => {
      raf = requestAnimationFrame(tick)
      m.x += (m.tx - m.x) * 0.07
      m.y += (m.ty - m.y) * 0.07
      const sy = Math.min(window.scrollY, window.innerHeight * 1.2)
      if (panel.current)
        panel.current.style.transform = `translate3d(${m.x * -10}px, ${m.y * -8 - sy * 0.15}px, 0) rotateY(${-12 + m.x * 5}deg) rotateX(${4 - m.y * 4}deg) rotateZ(1.5deg)`
      if (device.current) device.current.style.transform = `translate3d(${m.x * -36}px, ${m.y * -22 + sy * 0.3}px, 0) rotate(-18deg) scale(0.82)`
      if (beam.current) beam.current.style.transform = `translate3d(${m.x * -22}px, ${m.y * -14 + sy * 0.06}px, 0)`
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  // Flechas arriba/abajo recorren el menú, como en un juego
  const onKeyDown = (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
    e.preventDefault()
    const next = (active + (e.key === "ArrowDown" ? 1 : menu.length - 1)) % menu.length
    setActive(next)
    items.current[next]?.focus()
  }

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="container relative flex min-h-[100svh] flex-col justify-center pt-24 pb-16 [perspective:1800px] lg:pt-24 lg:pb-24">
        {/* Haz de luz del proyector (escritorio) */}
        <div
          ref={beam}
          className="pointer-events-none absolute bottom-[12%] left-[6%] hidden h-[64%] w-[30%] bg-[linear-gradient(55deg,rgba(77,255,154,0.24),rgba(77,255,154,0.05)_70%,transparent)] blur-[5px] [clip-path:polygon(0_100%,26%_100%,100%_6%,100%_80%)] lg:block"
          aria-hidden="true"
        />

        {/* Panel holográfico */}
        <div ref={panel} className="flicker relative z-10 lg:ml-[19%] lg:[transform:rotateY(-12deg)_rotateX(4deg)_rotateZ(1.5deg)] lg:will-change-transform">
          <div className="hud scan grid gap-6 p-5 sm:p-7 lg:grid-cols-[160px_1fr_220px] lg:gap-7 lg:p-8">
            <span className="brackets" />

            {/* Columna izquierda: expediente de la operación */}
            <div className="hidden flex-col justify-between border-r border-phos/15 pr-6 lg:flex">
              <div>
                <div className="readout leading-relaxed text-sage">
                  Operación
                  <br />
                  <span className="glow-soft text-[13px] text-mint">Crecimiento</span>
                </div>
                <span className="mt-3 block h-0.5 w-8 bg-sage/60" />
                <ul className="readout mt-8 space-y-2 text-[10px] text-sage/90">
                  <li>Sistema Hyperion</li>
                  <li>Protocolo a la medida</li>
                  <li>Enlace seguro</li>
                  <li>Unidad Tijuana</li>
                </ul>
              </div>
              <div className="readout text-[10px] text-sage/80">
                Activo desde
                <div className="glow mt-1 font-display text-3xl font-bold tracking-normal">2016</div>
              </div>
            </div>

            {/* Centro: título y menú */}
            <div className="min-w-0">
              <div className="readout flex items-center gap-2 text-sage lg:hidden">
                <span className="pulse h-1.5 w-1.5 rounded-full bg-phos" /> Hyperion OS · en línea
              </div>
              <div className="glow mt-3 font-display text-[14.5vw] leading-[0.85] font-bold tracking-[0.04em] uppercase sm:text-8xl lg:mt-0 lg:text-[6rem] xl:text-[7rem]">
                Hyperion
              </div>
              <h1 className="glow-soft mt-3 font-display text-lg font-medium tracking-[0.06em] text-mint/90 uppercase sm:text-2xl">
                Software que hace crecer tu negocio
              </h1>

              <nav aria-label="Accesos rápidos" className="mt-7 space-y-2.5" onKeyDown={onKeyDown}>
                {menu.map(({ href, label, icon: Icon }, i) => (
                  <Link
                    key={href}
                    href={href}
                    ref={(el) => (items.current[i] = el)}
                    data-active={active === i ? "" : undefined}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="menu-item text-lg sm:text-[1.6rem]"
                  >
                    <Icon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={2.2} fill={i === 0 ? "currentColor" : "none"} />
                    {label}
                  </Link>
                ))}
              </nav>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-sage">
                Sistemas a la medida, puntos de venta, automatizaciones y servicio técnico. Diez años ayudando a negocios a vender más y
                trabajar menos.
              </p>
            </div>

            {/* Columna derecha: el sistema en tiempo real */}
            <div className="grid grid-cols-[96px_1fr] items-center gap-4 lg:block lg:border-l lg:border-phos/15 lg:pl-6">
              <HoloGlobe className="max-w-[160px] lg:mx-auto" />
              <div>
                <div className="font-display text-lg font-bold tracking-[0.08em] text-mint lg:mt-3">HYPERION OS</div>
                <ul className="readout mt-1.5 space-y-1 text-[10px] leading-relaxed text-sage">
                  <li>Inteligencia de negocio</li>
                  <li>En tiempo real</li>
                  <li>Soporte de principio a fin</li>
                  <li className="flex items-center gap-1.5 text-phos">
                    <span className="pulse h-1.5 w-1.5 rounded-full bg-phos" /> En línea
                  </li>
                </ul>
              </div>
              <div className="relative mt-4 hidden aspect-[4/3] overflow-hidden border border-phos/25 lg:block">
                <MiniMap className="absolute inset-0 h-full w-full" />
                <span className="readout absolute bottom-1.5 left-2 text-[9px] text-mint/70">Tijuana, B.C.</span>
              </div>
              <dl className="readout mt-4 hidden grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[10px] text-sage lg:grid">
                <dt>Lat</dt>
                <dd className="text-mint">{LAT}</dd>
                <dt>Lon</dt>
                <dd className="text-mint">{LON}</dd>
                <dt>Sync</dt>
                <dd className="text-phos">100%</dd>
              </dl>
              <div className="readout mt-5 hidden text-[9px] leading-relaxed text-sage/70 lg:block">
                Precisión
                <br />
                Soporte
                <br />
                Siempre un paso adelante
              </div>
            </div>
          </div>
        </div>

        {/* Dispositivo de muñeca (escritorio): lo más cercano a la cámara */}
        <div ref={device} className="pointer-events-none absolute bottom-[-7%] left-[-6%] z-20 hidden origin-bottom-left lg:block" style={{ transform: "rotate(-18deg)" }}>
          <WristDevice />
        </div>

        <a href="#servicios" className="readout absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 text-sage hover:text-mint md:flex">
          Desplaza para continuar <ChevronDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
