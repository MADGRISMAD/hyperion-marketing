"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Globe,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  MapPin,
  ShoppingCart,
  Wrench,
  Zap,
  Search,
  PenTool,
  Rocket,
  LifeBuoy,
  Send,
  Loader2,
  FileText,
  Database,
  BarChart3,
  Bell,
} from "lucide-react"
import Navbar, { Logo } from "../components/landing/Navbar"
import Hero from "../components/landing/Hero"
import Intro from "../components/landing/Intro"
import { Parallax, Reveal, CountUp } from "../components/landing/parallax"
import Sparkle from "../components/landing/Sparkle"
import {
  Barcode,
  ChromeBlob,
  ChromeRing,
  ChromeSquiggle,
  DotsIcon,
  Glass,
  LoadingWindow,
  SmileySticker,
  StarSticker,
  WireGlobe,
  WireTorus,
} from "../components/landing/Y2K"
import { TienditaMockup, RestauranteMockup, InternshipsMockup, CaresiaMockup, BeHiveMockup, MiInfoMockup } from "../components/landing/Mockups"

// URLs temporales: cuando tengan dominio propio, cambiarlas solo aquí.
const CARESIA_URL = "https://caresia.mx/"
const MIRESTAURANTE_URL = "https://mirestaurante-ten.vercel.app/"
const BEHIVE_URL = "https://micolmena-eta.vercel.app/"
const MIINFO_URL = "https://miinfo.15-235-62-27.sslip.io/"

const WHATSAPP = "https://wa.me/526645798903?text=Hola%20Hyperion%2C%20me%20interesa%20cotizar%20un%20proyecto"

const tech = "font-tech text-[10px] tracking-[0.2em] text-ink uppercase md:text-[11px]"
const holoBtn =
  "press group inline-flex items-center justify-center gap-2 rounded-full border border-white/90 bg-holo px-6 py-3.5 font-tech text-[11px] tracking-[0.18em] text-ink uppercase shadow-glass"

// Encabezado tipo revista: número de volumen, título de cromo y nota en vidrio
function SectionHead({ index, tag, title, accent, aside }) {
  return (
    <Reveal className="mb-14">
      <div className="flex items-center gap-3">
        <span className={`${tech} rounded-full border border-white/90 bg-glass px-3 py-1 shadow-glass`}>Vol. 10 — {index}</span>
        <span className={tech}>{tag}</span>
        <span className="hidden h-px flex-1 bg-white/80 sm:block" />
        <Sparkle className="twinkle h-6 w-6" />
        <DotsIcon className="hidden sm:grid" />
      </div>
      <div className={`mt-7 grid gap-8 lg:items-end ${aside ? "lg:grid-cols-[1.5fr_1fr]" : ""}`}>
        <h2 className="font-chrome text-[2.6rem] leading-[0.92] uppercase sm:text-6xl lg:text-7xl">
          <span className="chrome-3d">{title}</span>
          {accent && (
            <span className="mt-4 block">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-holo px-4 py-1.5 font-tech text-xs tracking-[0.25em] text-ink shadow-glass md:text-sm">
                <Sparkle className="h-3.5 w-3.5" /> {accent}
              </span>
            </span>
          )}
        </h2>
        {aside && (
          <Glass className="p-5 md:p-6">
            <div className={`${tech} mb-2 text-ink/50`}>{"// nota"}</div>
            <p className="text-ink/75 md:text-lg">{aside}</p>
          </Glass>
        )}
      </div>
    </Reveal>
  )
}

/* ───────────────────────── Marquesina ───────────────────────── */
function Marquee() {
  const items = ["Sistemas a la medida", "Puntos de venta", "Automatizaciones", "Servicio técnico", "Desarrollo web", "Marketing digital"]
  const row = [...items, ...items, ...items]
  const Row = ({ speed, chrome }) => (
    <Parallax speed={speed} axis="x" className="w-full">
      <div className="-ml-[40%] flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            {chrome ? (
              <span className="chrome-3d font-chrome text-3xl uppercase md:text-5xl">{t}</span>
            ) : (
              <span className="font-tech text-sm tracking-[0.3em] text-ink uppercase md:text-base">{t}</span>
            )}
            <Sparkle className={chrome ? "h-7 w-7" : "h-4 w-4"} />
          </span>
        ))}
      </div>
    </Parallax>
  )
  return (
    <div className="relative z-10 overflow-hidden py-6">
      <div className="-rotate-1 border-y border-white/80 bg-glass py-5 shadow-glass">
        <Row speed={-0.6} chrome />
      </div>
      <div className="mt-[-4px] rotate-[0.6deg] border-y border-white/80 bg-holo py-3">
        <Row speed={0.6} />
      </div>
    </div>
  )
}

/* ───────────────────────── Servicios ───────────────────────── */
const services = [
  {
    icon: Code2,
    title: "Sistemas a la medida",
    text: "Software diseñado alrededor de tus procesos, no al revés: ERPs, CRMs, portales, inventarios y paneles de control.",
    points: ["Análisis de tus procesos", "Web y móvil", "Integración con lo que ya usas"],
    href: "/servicios/sistemas-a-medida",
  },
  {
    icon: ShoppingCart,
    title: "Puntos de venta",
    text: "Instalamos y personalizamos puntos de venta para tiendas, restaurantes y comercios, con nuestro propio sistema en la nube.",
    points: ["Lector de código de barras", "Inventario y cortes de caja", "Funciona en PC, tablet o celular"],
    href: "#productos",
  },
  {
    icon: Zap,
    title: "Automatizaciones",
    text: "Eliminamos tareas repetitivas: reportes automáticos, integraciones entre sistemas, bots y flujos de trabajo.",
    points: ["Reportes sin hacerlos a mano", "Conecta tus herramientas", "Menos errores humanos"],
    href: "#automatizaciones",
  },
  {
    icon: Wrench,
    title: "Servicio técnico",
    text: "Soporte, mantenimiento de equipos, redes e instalación. Un equipo que responde cuando lo necesitas.",
    points: ["Mantenimiento de equipos", "Redes e instalación", "Soporte a tus sistemas"],
    href: "#contacto",
  },
]

// Ícono dentro de una gota de cromo
function ChromeIcon({ icon: Icon, size = "h-20 w-20", shape = "drop" }) {
  return (
    <span className={`relative flex shrink-0 items-center justify-center ${size}`}>
      <ChromeBlob shape={shape} className="absolute inset-0 h-full w-full" />
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/90 bg-white/70 backdrop-blur">
        <Icon className="h-4.5 w-4.5 text-ink" strokeWidth={2.2} />
      </span>
    </span>
  )
}

function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden py-24 md:py-32">
      <ChromeSquiggle className="pointer-events-none absolute top-24 -right-16 hidden h-28 w-60 rotate-12 lg:block" />
      <div className="container relative">
        <SectionHead
          index="01"
          tag="Servicios"
          title="Todo lo que tu negocio necesita"
          accent="en tecnología"
          aside="Diseñamos, desarrollamos, instalamos y damos soporte. Un solo equipo que conoce tu negocio y te acompaña de principio a fin."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const featured = i === 0
            return (
              <Parallax key={s.title} axis="x" entry speed={i % 2 ? 0.16 : -0.16}>
                <Reveal delay={(i % 2) * 100} className="h-full">
                  <Link
                    href={s.href}
                    className={`press group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/90 p-7 shadow-glass md:p-8 ${featured ? "bg-holo" : "bg-glass"}`}
                  >
                    <WireTorus className="pointer-events-none absolute -right-8 -bottom-6 h-32 w-48 text-white/80" />
                    <div className="relative mb-6 flex items-start justify-between">
                      <ChromeIcon icon={s.icon} shape={i % 2 ? "pebble" : "drop"} />
                      <div className="flex flex-col items-end gap-2">
                        <span className={`${tech} rounded-full border border-white/90 bg-white/40 px-2.5 py-0.5`}>S/0{i + 1}</span>
                        <Barcode className="h-6" />
                      </div>
                    </div>
                    <h3 className="relative font-chrome text-3xl leading-none text-ink uppercase md:text-4xl">{s.title}</h3>
                    <p className="relative mt-3 text-ink/70">{s.text}</p>
                    <ul className="relative mt-6 flex flex-wrap gap-2">
                      {s.points.map((p) => (
                        <li key={p} className="rounded-full border border-white/90 bg-white/45 px-3 py-1.5 text-[13px] font-medium text-ink">
                          ✦ {p}
                        </li>
                      ))}
                    </ul>
                    <span className="relative mt-auto flex items-center gap-4 pt-8">
                      <span className={tech}>Conocer más</span>
                      <span className="flex flex-1 gap-[3px]" aria-hidden="true">
                        {Array.from({ length: 14 }, (_, k) => (
                          <span key={k} className={`h-2.5 flex-1 -skew-x-12 rounded-[1px] ${k < 9 ? "bg-ink/60" : "bg-white/80"}`} />
                        ))}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/90 bg-white/60 transition group-hover:rotate-[-45deg]">
                        <ArrowRight className="h-4 w-4 text-ink" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </Parallax>
            )
          })}
        </div>

        <Reveal delay={100} className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            { icon: Globe, title: "Desarrollo web", text: "Sitios rápidos y atractivos que convierten visitas en clientes.", href: "/servicios/desarrollo-web" },
            { icon: Megaphone, title: "Marketing digital", text: "Estrategia, contenido y campañas para que tu negocio se vea.", href: "/servicios/marketing-digital" },
          ].map(({ icon, title, text, href }) => (
            <Link key={title} href={href} className="press group block rounded-[22px]">
              <LoadingWindow title={`${title.toLowerCase().replace(" ", "_")}.exe`} bodyClassName="flex items-center gap-4 p-4">
                <ChromeIcon icon={icon} size="h-14 w-14" />
                <div className="flex-1">
                  <div className="font-chrome text-xl text-ink uppercase">{title}</div>
                  <div className="text-sm text-ink/65">{text}</div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </LoadingWindow>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Productos ───────────────────────── */
const products = [
  {
    name: "Mitiendita",
    tld: "",
    href: "https://mitiendita.software",
    color: "#e8750c",
    status: "Disponible",
    tagline: "Tu tienda no cierra aunque la compu falle.",
    description:
      "Punto de venta en la nube para abarrotes y comercios. Abre caja desde el celular, la tablet o la PC sin instalar nada: tus ventas, productos y cortes siempre a la mano.",
    features: [
      "Escanea con lector de código de barras o busca por nombre",
      "Atajos de teclado para cobrar en segundos (F12)",
      "Ventas en espera, descuentos y cortes de caja",
      "Prueba gratis, sin tarjeta",
    ],
    Mockup: TienditaMockup,
  },
  {
    name: "Mirestaurante",
    tld: "",
    href: MIRESTAURANTE_URL,
    cta: "Visitar Mirestaurante",
    color: "#c8341b",
    status: "Beta",
    tagline: "Cada comanda, en su lugar.",
    description:
      "Sistema de comandas para restaurantes: del mesero a la cocina y de la cocina a la caja. Toma pedidos desde el celular y míralos llegar al instante, sin papelitos ni gritos.",
    features: [
      "Pedidos desde el celular, directo a cocina",
      "Mapa de mesas con estado en vivo: libre, pidiendo, listo, comiendo",
      "Pase de cocina con el tiempo de cada comanda",
      "Prueba gratis 14 días, sin instalar nada",
    ],
    Mockup: RestauranteMockup,
  },
  {
    name: "internships",
    tld: ".gg",
    href: "https://internships.gg",
    color: "#059669",
    status: "Disponible",
    tagline: "Sube de nivel tu carrera mientras estudias.",
    description:
      "Plataforma para universitarios con misiones reales en empresas reales: trabajos freelance, remotos y por proyecto. Los estudiantes ganan dinero, juntan XP y llenan su portafolio; las empresas encuentran talento joven.",
    features: ["Misiones freelance, remotas y por proyecto", "XP y rachas que motivan a seguir avanzando", "Sección para empresas que buscan talento"],
    Mockup: InternshipsMockup,
  },
  {
    name: "Caresia",
    tld: "",
    href: CARESIA_URL,
    color: "#2a5d9f",
    status: "Disponible",
    tagline: "Menos papeleo, más consulta.",
    description:
      "Agenda, expedientes e historial clínico para clínicas dentales y consultorios médicos. Todo en un solo lugar, sin instalar nada: funciona desde el navegador.",
    features: [
      "Agenda compartida por día y por profesional",
      "Expediente completo: antecedentes, alergias y búsqueda por CURP",
      "Historial de cada consulta y tratamientos de varias sesiones",
      "Permisos por rol: recepción agenda, el doctor consulta",
    ],
    Mockup: CaresiaMockup,
  },
  {
    name: "Mi Info",
    tld: "",
    href: MIINFO_URL,
    cta: "Visitar Mi Info",
    color: "#1f3a5f",
    status: "Beta",
    tagline: "Tu tarjeta de presentación, en un enlace.",
    description:
      "Tus datos, tus redes y, si quieres, tu agenda en una sola página. La compartes por WhatsApp o en tu perfil, y tus clientes te guardan en su teléfono con un toque.",
    features: [
      "Tarjeta con WhatsApp, teléfono, correo, web y hasta 8 enlaces",
      "Botón para guardar tu contacto en el teléfono",
      "Agenda opcional: tú pones los horarios, tus clientes apartan su cita",
      "Confirmación por correo y enlace para cancelar",
    ],
    Mockup: MiInfoMockup,
  },
  {
    name: "BeHive",
    tld: "",
    href: BEHIVE_URL,
    color: "#b45309",
    status: "Beta",
    tagline: "Mesa de ayuda profesional, con precio en pesos.",
    description:
      "Nuestro sistema de tickets: tickets, SLA, centro de ayuda y reportes en una sola herramienta en español. Pensada para empresas en México y actualmente en beta.",
    features: [
      "Tickets con prioridad, estados y notas internas",
      "SLA, centro de ayuda y reportes en un solo lugar",
      "Todo en español y sin pagar en dólares",
      "Gratis con 1 agente y hasta 10 personas",
    ],
    Mockup: BeHiveMockup,
  },
]

function Products() {
  return (
    <section id="productos" className="y2k-dots relative overflow-hidden py-24 md:py-32">
      <div className="container relative">
        <SectionHead
          index="02"
          tag="Productos propios"
          title="Software propio"
          accent="probado en negocios reales"
          aside="Además de crear sistemas para nuestros clientes, desarrollamos y operamos nuestras propias plataformas. Lo que aprendemos en ellas lo llevamos a cada proyecto."
        />

        {/* Índice rápido */}
        <Reveal className="mb-20 flex flex-wrap gap-2">
          {products.map((p, i) => (
            <a
              key={p.name}
              href={`#producto-${i + 1}`}
              className={`press inline-flex items-center gap-2 rounded-full border border-white/90 bg-glass px-4 py-2 shadow-glass ${tech}`}
            >
              <span className="text-ink/40">0{i + 1}</span>
              <span className="h-2.5 w-2.5 rounded-full ring-2 ring-white" style={{ background: p.color }} />
              {p.name}
              {p.tld}
            </a>
          ))}
        </Reveal>

        <div className="space-y-28 md:space-y-36">
          {products.map((p, i) => {
            const flip = i % 2 === 1
            const beta = p.status === "Beta"
            return (
              <div key={p.name} id={`producto-${i + 1}`} className="grid scroll-mt-28 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
                  <Reveal>
                    <Glass className="relative p-7 md:p-9">
                      <div className="mb-6 flex items-center gap-3">
                        <span className={`${tech} text-ink/50`}>P/0{i + 1}</span>
                        <span className={`${tech} rounded-full border border-white/90 px-3 py-1 ${beta ? "bg-white/50" : "bg-holo"}`}>
                          {beta ? "Beta ✦" : "● En línea"}
                        </span>
                        <span className="h-px flex-1 bg-white/80" />
                        <Barcode className="h-5" />
                      </div>
                      <h3 className="chrome-3d font-chrome text-[2.6rem] leading-none uppercase [overflow-wrap:anywhere] sm:text-5xl xl:text-6xl">
                        {p.name}
                        {p.tld}
                      </h3>
                      <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/50 px-4 py-1.5 font-semibold text-ink">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                        {p.tagline}
                      </p>
                      <p className="mt-5 text-lg leading-relaxed text-ink/70">{p.description}</p>
                      <ul className="mt-6 space-y-2.5">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-ink/85">
                            <Sparkle className="mt-1 h-3.5 w-3.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className={`${holoBtn} mt-8`}>
                        <span className="h-2.5 w-2.5 rounded-full ring-2 ring-white" style={{ background: p.color }} />
                        {p.cta ?? `Visitar ${p.name}${p.tld}`}
                        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Glass>
                  </Reveal>
                </div>

                <div className={`relative min-w-0 ${flip ? "lg:order-1" : ""}`}>
                  <Parallax speed={0.08} className="pointer-events-none absolute inset-0">
                    <ChromeRing className="absolute top-[10%] left-[-6%] h-[80%] w-[112%] opacity-90" />
                    <ChromeBlob
                      shape={flip ? "pebble" : "drop"}
                      className={`float absolute -bottom-6 h-20 w-20 ${flip ? "-right-4" : "-left-4"}`}
                    />
                  </Parallax>
                  <Parallax axis="x" entry speed={flip ? -0.22 : 0.22}>
                    <Reveal delay={150} className="relative">
                      <p.Mockup />
                      {beta && <StarSticker lines={["Beta", "abierta"]} className="float absolute -top-12 -right-4 z-10 h-32 w-32" />}
                    </Reveal>
                  </Parallax>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Automatizaciones ───────────────────────── */
function Automation() {
  const nodes = [
    { icon: ShoppingCart, label: "Nueva venta", meta: "evento" },
    { icon: Database, label: "Inventario", meta: "se actualiza" },
    { icon: FileText, label: "Factura", meta: "se genera" },
    { icon: BarChart3, label: "Reporte diario", meta: "por correo" },
    { icon: Bell, label: "Aviso a tu celular", meta: "al instante" },
  ]
  return (
    <section id="automatizaciones" className="y2k-grid relative overflow-hidden py-24 md:py-32">
      <div className="container relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHead index="03" tag="Automatizaciones" title="Deja que el sistema trabaje" accent="por ti" />
          <Reveal className="-mt-6">
            <p className="text-lg text-ink/70">
              Conectamos tus herramientas para que la información fluya sola: menos captura manual, menos errores y más tiempo para
              atender a tus clientes.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Reportes automáticos por correo", "Inventario sincronizado", "Integraciones entre sistemas", "Respaldos y alertas"].map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-full border border-white/90 bg-glass px-4 py-2.5 text-sm font-medium text-ink shadow-glass">
                  <Sparkle className="h-3.5 w-3.5 shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          {/* Tubo de cromo que une los pasos */}
          <svg className="absolute top-8 bottom-8 left-[38px] w-4" aria-hidden="true">
            <defs>
              <linearGradient id="auto-tube" x1="0" x2="1">
                <stop offset="0" stopColor="#6c66a6" />
                <stop offset="0.35" stopColor="#ffffff" />
                <stop offset="0.6" stopColor="#a8a4d6" />
                <stop offset="1" stopColor="#3b3577" />
              </linearGradient>
            </defs>
            <rect x="2" y="0" width="12" height="100%" rx="6" fill="url(#auto-tube)" />
            <line x1="8" y1="0" x2="8" y2="100%" stroke="#fff" strokeWidth="2" className="flow-line" />
          </svg>
          <div className="space-y-4">
            {nodes.map((n, i) => (
              <Parallax key={n.label} axis="x" entry speed={i % 2 ? -0.12 : 0.12}>
                <Reveal delay={i * 90}>
                  <div
                    className={`relative flex items-center gap-4 rounded-full border border-white/90 p-2 pr-3 shadow-glass ${i === 0 ? "bg-holo" : "bg-glass"}`}
                    style={{ marginLeft: `${(i % 2) * 28}px` }}
                  >
                    <ChromeIcon icon={n.icon} size="h-14 w-14" shape={i % 2 ? "pebble" : "drop"} />
                    <span>
                      <span className="block font-chrome text-lg text-ink uppercase">{n.label}</span>
                      <span className={`${tech} text-ink/55`}>{n.meta}</span>
                    </span>
                    <span className={`${tech} ml-auto flex items-center gap-1.5 rounded-full border border-white/90 bg-white/60 px-2.5 py-1`}>
                      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-forest" /> Auto
                    </span>
                  </div>
                </Reveal>
              </Parallax>
            ))}
          </div>
          <StarSticker lines={["100%", "auto"]} className="float absolute -top-16 -right-6 h-28 w-28" />
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Nosotros + cifras ───────────────────────── */
function About() {
  const stats = [
    { n: 10, s: "+", label: "Años de experiencia" },
    { n: 6, s: "", label: "Productos propios" },
    { n: 100, s: "%", label: "Desarrollo a la medida" },
    { n: 1, s: "", label: "Equipo de principio a fin" },
  ]
  return (
    <section id="nosotros" className="relative overflow-hidden py-24 md:py-32">
      <div className="container grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead index="04" tag="Nosotros" title="10 años construyendo" accent="tecnología que crece" />
          <Reveal className="-mt-6">
            <p className="text-lg text-ink/70">
              Somos un equipo de desarrollo y soporte en Tijuana, Baja California. Trabajamos de cerca con cada cliente para entender su
              operación y entregar soluciones que realmente se usan.
            </p>
            <LoadingWindow title="por_que_hyperion.txt" className="mt-8" bodyClassName="flex items-center gap-5 p-5">
              <Image src="/brand/hyperion-mark.png" alt="" width={273} height={480} className="h-20 w-auto shrink-0" />
              <div>
                <div className={`${tech} text-forest`}>¿Por qué &quot;Hyperion&quot;?</div>
                <p className="mt-1.5 text-sm text-ink/70">
                  Hyperion es el árbol más alto del mundo. Nos gusta la idea: bases sólidas y crecimiento constante. Así construimos el
                  software de nuestros clientes.
                </p>
              </div>
            </LoadingWindow>
          </Reveal>
        </div>
        <div className="relative">
          <SmileySticker className="absolute -top-14 -right-4 z-10 h-28 w-28 md:h-32 md:w-32" />
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <Glass className={`relative h-full overflow-hidden p-6 md:p-8 ${i === 0 ? "bg-holo" : ""}`}>
                  <div className="flex items-center justify-between">
                    <span className={`${tech} text-ink/50`}>0{i + 1}</span>
                    <Sparkle className="h-4 w-4" />
                  </div>
                  <div className="chrome-3d mt-4 font-chrome text-5xl leading-none md:text-7xl">
                    <CountUp to={s.n} suffix={s.s} />
                  </div>
                  <div className={`${tech} mt-4 text-ink/70`}>{s.label}</div>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Proceso ───────────────────────── */
const steps = [
  { icon: Search, title: "Diagnóstico", text: "Escuchamos tu negocio, entendemos tus procesos y definimos qué necesitas realmente." },
  { icon: PenTool, title: "Diseño", text: "Planeamos la solución con un plan de trabajo claro, tiempos y costos definidos." },
  { icon: Rocket, title: "Desarrollo", text: "Construimos en entregas cortas para que veas avances reales desde el inicio." },
  { icon: LifeBuoy, title: "Soporte", text: "Instalamos, capacitamos a tu equipo y seguimos contigo con soporte y mejoras." },
]

function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden py-24 md:py-28">
      <div className="container relative">
        <SectionHead index="05" tag="Cómo trabajamos" title="Un proceso claro" accent="sin sorpresas" />
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Parallax key={s.title} speed={i % 2 ? -0.05 : 0.05}>
              <Reveal delay={i * 100} className="h-full">
                <Glass className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between">
                    <span className="chrome-3d font-chrome text-7xl leading-none">0{i + 1}</span>
                    <ChromeIcon icon={s.icon} size="h-14 w-14" shape={i % 2 ? "pebble" : "drop"} />
                  </div>
                  <h3 className="mt-8 font-chrome text-2xl text-ink uppercase">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink/65">{s.text}</p>
                  <span className="mt-auto flex gap-[3px] pt-6" aria-hidden="true">
                    {Array.from({ length: 4 }, (_, k) => (
                      <span key={k} className={`h-1.5 flex-1 rounded-full ${k <= i ? "bg-holo" : "bg-white/70"}`} />
                    ))}
                  </span>
                </Glass>
              </Reveal>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Contacto ───────────────────────── */
const needs = ["Sistema a la medida", "Punto de venta", "Automatización", "Servicio técnico", "Sitio web / Marketing", "Mirestaurante", "Otro"]

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", need: needs[0], message: "" })
  const [status, setStatus] = useState("idle")

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    const message = `Interés: ${form.need}\nTeléfono: ${form.phone || "—"}\n\n${form.message}`
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message }),
      })
      if (!res.ok) throw new Error("Error al enviar")
      window.location.href = "/gracias"
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  const field =
    "w-full rounded-2xl border border-white/90 bg-white/45 px-4 py-3.5 text-ink placeholder:text-ink/40 outline-none transition focus:bg-white/80 focus:shadow-glass"
  const label = `mb-2 block ${tech}`
  const quick = needs.slice(0, 4)

  return (
    <section id="contacto" className="y2k-dots relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-[-30%] bottom-0 h-64" aria-hidden="true">
        <div className="grid-floor absolute inset-0" />
      </div>
      <div className="container relative grid gap-14 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHead index="06" tag="Contacto" title="Cuéntanos de tu proyecto" />
          <Reveal className="-mt-6">
            <p className="text-lg text-ink/70">Te respondemos con una propuesta clara y sin compromiso.</p>
          </Reveal>
          <Reveal delay={120} className="mt-10 space-y-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="press group flex items-center gap-4 rounded-full border border-white/90 bg-holo p-2 pr-5 shadow-glass"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white ring-2 ring-white">
                <MessageCircle className="h-6 w-6" />
              </span>
              <span className="text-ink">
                <span className="block font-chrome text-lg uppercase">Escríbenos por WhatsApp</span>
                <span className={`${tech} text-ink/60`}>Respuesta rápida</span>
              </span>
              <ArrowUpRight className="ml-auto h-5 w-5 text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {[
              { icon: Mail, label: "Email", value: "info@hyperionmkt.com", href: "mailto:info@hyperionmkt.com" },
              { icon: Phone, label: "Teléfono", value: "+52 664 579 8903", href: "tel:+526645798903" },
              { icon: MapPin, label: "Ubicación", value: "Tijuana, Baja California, México" },
            ].map(({ icon, label: l, value, href }) => {
              const inner = (
                <>
                  <ChromeIcon icon={icon} size="h-12 w-12" />
                  <span>
                    <span className={`block ${tech} text-ink/50`}>{l}</span>
                    <span className="font-medium text-ink">{value}</span>
                  </span>
                </>
              )
              return href ? (
                <a key={l} href={href} className="flex items-center gap-4 rounded-full p-1.5 transition hover:bg-white/40">
                  {inner}
                </a>
              ) : (
                <div key={l} className="flex items-center gap-4 p-1.5">
                  {inner}
                </div>
              )
            })}
          </Reveal>
        </div>

        <Reveal delay={150} className="relative lg:col-span-3">
          <StarSticker lines={["Sin", "compromiso"]} className="float absolute -top-12 -right-4 z-10 h-28 w-28" />
          <form onSubmit={onSubmit}>
            <LoadingWindow title="nuevo_proyecto.exe — cargando futuro…" bodyClassName="p-6 md:p-9">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className={label}>Nombre</span>
                  <input name="name" required value={form.name} onChange={onChange} placeholder="Tu nombre" className={field} />
                </label>
                <label className="block">
                  <span className={label}>Email</span>
                  <input name="email" type="email" required value={form.email} onChange={onChange} placeholder="tu@email.com" className={field} />
                </label>
                <label className="block">
                  <span className={label}>Teléfono (opcional)</span>
                  <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="664 000 0000" className={field} />
                </label>
                <div className="block">
                  <span className={label}>¿Qué necesitas?</span>
                  <div className="flex flex-wrap gap-2">
                    {quick.map((n) => (
                      <button
                        type="button"
                        key={n}
                        onClick={() => setForm({ ...form, need: n })}
                        className={`rounded-full border border-white/90 px-3 py-1.5 text-xs font-semibold transition ${
                          form.need === n ? "bg-ink text-white" : "bg-white/45 text-ink hover:bg-holo"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                    <select
                      name="need"
                      value={quick.includes(form.need) ? "" : form.need}
                      onChange={onChange}
                      aria-label="Otro servicio"
                      className={`rounded-full border border-white/90 px-3 py-1.5 text-xs font-semibold outline-none ${
                        quick.includes(form.need) ? "bg-white/45 text-ink" : "bg-ink text-white"
                      }`}
                    >
                      <option value="" disabled className="bg-white text-ink">
                        Más…
                      </option>
                      {needs.slice(4).map((n) => (
                        <option key={n} value={n} className="bg-white text-ink">
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <label className="mt-5 block">
                <span className={label}>Cuéntanos de tu proyecto</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  placeholder="¿Qué quieres lograr? ¿Qué usas hoy?"
                  className={`${field} resize-none`}
                />
              </label>
              {status === "error" && (
                <p className="mt-4 rounded-2xl border border-white/90 bg-[#ffd9e6] px-4 py-3 text-sm text-ink">
                  No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.
                </p>
              )}
              <button type="submit" disabled={status === "sending"} className={`${holoBtn} mt-8 w-full py-4 disabled:opacity-70`}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Enviando…
                  </>
                ) : (
                  <>
                    Enviar mensaje <Send className="h-4 w-4 transition group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </LoadingWindow>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Pie de página ───────────────────────── */
function Footer() {
  const product = (href, name, beta) => (
    <li key={name} className="flex items-center gap-2">
      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-forest">
        {name}
      </a>
      {beta && <span className="rounded-full bg-holo px-2 text-[9px] font-bold">BETA</span>}
    </li>
  )
  const linkCls = "hover:text-forest"
  return (
    <footer className="relative overflow-hidden pt-16 pb-8">
      <div className="pointer-events-none absolute inset-x-[-25%] bottom-0 h-72" aria-hidden="true">
        <div className="grid-floor absolute inset-0" />
      </div>
      <div className="container relative">
        <Glass className="grid gap-12 p-8 md:grid-cols-[1.4fr_1fr_1fr_auto] md:p-10">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-ink/65">
              10 años desarrollando sistemas a la medida, puntos de venta, automatizaciones y dando servicio técnico a negocios en Tijuana y
              todo México.
            </p>
          </div>
          <div>
            <h4 className={`${tech} mb-4`}>[ Productos ]</h4>
            <ul className="space-y-2.5 text-sm text-ink/75">
              {product("https://mitiendita.software", "Mitiendita")}
              {product(MIRESTAURANTE_URL, "Mirestaurante", true)}
              {product("https://internships.gg", "internships.gg")}
              {product(CARESIA_URL, "Caresia")}
              {product(MIINFO_URL, "Mi Info", true)}
              {product(BEHIVE_URL, "BeHive", true)}
            </ul>
          </div>
          <div>
            <h4 className={`${tech} mb-4`}>[ Servicios ]</h4>
            <ul className="space-y-2.5 text-sm text-ink/75">
              <li><Link href="/servicios/sistemas-a-medida" className={linkCls}>Sistemas a la medida</Link></li>
              <li><Link href="#productos" className={linkCls}>Puntos de venta</Link></li>
              <li><Link href="#automatizaciones" className={linkCls}>Automatizaciones</Link></li>
              <li><Link href="#contacto" className={linkCls}>Servicio técnico</Link></li>
              <li><Link href="/servicios/desarrollo-web" className={linkCls}>Desarrollo web</Link></li>
            </ul>
          </div>
          <div className="hidden flex-col items-center justify-between gap-4 rounded-2xl border border-white/90 bg-white/40 px-4 py-5 md:flex">
            <span className={`${tech} [writing-mode:vertical-rl] rotate-180`}>Hyperion</span>
            <Barcode className="h-14 rotate-90" />
            <WireGlobe className="h-5 w-5 text-ink" />
          </div>
        </Glass>

        {/* Nombre gigante que sube un poco con el scroll */}
        <Parallax speed={-0.12} className="relative mt-14 select-none">
          <ChromeRing className="pointer-events-none absolute top-[5%] left-[-3%] h-[90%] w-[106%]" />
          <div className="chrome-3d relative text-center font-chrome text-[17vw] leading-[0.9] uppercase xl:text-[14rem]" aria-hidden="true">
            Hyperion
          </div>
        </Parallax>

        <div className={`${tech} mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/70 pt-6 text-ink/60 md:flex-row`}>
          <p>© {new Date().getFullYear()} Hyperion Software · Tijuana, B.C.</p>
          <div className="flex items-center gap-6">
            <Link href="/trafico" className="hover:text-ink">Tráfico de nuestros sitios</Link>
            <a href="mailto:info@hyperionmkt.com" className="hover:text-ink">info@hyperionmkt.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="relative min-h-screen text-ink">
      <Intro />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Products />
        <Automation />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="press fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#25d366] text-white shadow-glass"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}
