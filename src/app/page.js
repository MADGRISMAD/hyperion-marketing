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
import { TienditaMockup, RestauranteMockup, InternshipsMockup, CaresiaMockup, BeHiveMockup, MiInfoMockup } from "../components/landing/Mockups"

// URLs temporales: cuando tengan dominio propio, cambiarlas solo aquí.
const CARESIA_URL = "https://caresia.mx/"
const MIRESTAURANTE_URL = "https://mirestaurante-ten.vercel.app/"
const BEHIVE_URL = "https://micolmena-eta.vercel.app/"
const MIINFO_URL = "https://miinfo.15-235-62-27.sslip.io/"

const WHATSAPP = "https://wa.me/526645798903?text=Hola%20Hyperion%2C%20me%20interesa%20cotizar%20un%20proyecto"

// Encabezado de sección: índice en mono + título grande
function SectionHead({ index, tag, children, aside, center = false }) {
  return (
    <div className={`mb-14 grid gap-6 lg:items-end ${aside ? "lg:grid-cols-[1.4fr_1fr]" : ""} ${center ? "text-center" : ""}`}>
      <Reveal>
        <div className={`mb-5 flex items-center gap-3 font-mono text-xs tracking-widest text-ink uppercase ${center ? "justify-center" : ""}`}>
          <span className="rounded-md border-[1.5px] border-ink bg-lime px-2 py-0.5 font-bold">{index}</span>
          <span>{tag}</span>
          <span className="hidden h-[1.5px] w-16 bg-ink sm:block" />
        </div>
        <h2 className="font-display text-[2.1rem] leading-[0.95] font-bold tracking-tight text-ink uppercase sm:text-5xl lg:text-6xl">
          {children}
        </h2>
      </Reveal>
      {aside && (
        <Reveal delay={100}>
          <p className="text-lg text-ink/70">{aside}</p>
        </Reveal>
      )}
    </div>
  )
}

/* ───────────────────────── Marquesina ───────────────────────── */
function Marquee() {
  const items = ["Sistemas a la medida", "Puntos de venta", "Automatizaciones", "Servicio técnico", "Desarrollo web", "Marketing digital"]
  const row = [...items, ...items, ...items]
  const Row = ({ speed, filled }) => (
    <Parallax speed={speed} axis="x" className="w-full">
      <div className="-ml-[40%] flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className={`flex items-center gap-8 font-display text-2xl font-bold uppercase md:text-4xl ${filled ? "text-ink" : "text-outline"}`}
          >
            {t}
            <span className="text-forest" style={{ WebkitTextStroke: 0 }}>✦</span>
          </span>
        ))}
      </div>
    </Parallax>
  )
  return (
    <div className="relative z-10 overflow-hidden">
      <div className="-rotate-1 border-y-[1.5px] border-ink bg-lime py-4">
        <Row speed={-0.6} filled />
      </div>
      <div className="mt-[-6px] rotate-[0.6deg] border-y-[1.5px] border-ink bg-white py-4 [--outline-bg:#fff]">
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

function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden py-24 md:py-32">
      <div className="container relative">
        <SectionHead
          index="01"
          tag="Servicios"
          aside="Diseñamos, desarrollamos, instalamos y damos soporte. Un solo equipo que conoce tu negocio y te acompaña de principio a fin."
        >
          Todo lo que tu negocio <span className="text-outline">necesita</span> en tecnología
        </SectionHead>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon
            const featured = i === 0
            return (
              <Parallax key={s.title} axis="x" entry speed={i % 2 ? 0.16 : -0.16}>
                <Reveal delay={(i % 2) * 100} className="h-full">
                  <Link
                    href={s.href}
                    className={`press group relative flex h-full flex-col rounded-2xl border-[1.5px] border-ink p-7 shadow-hard md:p-8 ${featured ? "bg-lime" : "bg-white"}`}
                  >
                    <div className="mb-8 flex items-start justify-between">
                      <span className="flex h-14 w-14 items-center justify-center rounded-xl border-[1.5px] border-ink bg-paper">
                        <Icon className="h-6 w-6 text-forest" strokeWidth={2.2} />
                      </span>
                      <span className="font-mono text-xs tracking-widest text-ink/60">S/0{i + 1}</span>
                    </div>
                    <h3 className="font-display text-2xl leading-tight font-bold text-ink uppercase md:text-[1.7rem]">{s.title}</h3>
                    <p className="mt-3 text-ink/70">{s.text}</p>
                    <ul className="mt-6 space-y-2 font-mono text-[13px] text-ink">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2">
                          <span className="text-forest">✦</span> {p}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto flex items-center justify-between border-t-[1.5px] border-ink pt-4 font-mono text-xs font-bold tracking-wider text-ink uppercase [margin-top:2rem]">
                      Conocer más
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-ink bg-white transition group-hover:rotate-[-45deg]">
                        <ArrowRight className="h-4 w-4" />
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
          ].map(({ icon: Icon, title, text, href }) => (
            <Link key={title} href={href} className="press group flex items-center gap-5 rounded-2xl border-[1.5px] border-ink bg-paper p-5 shadow-hard">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-ink bg-white">
                <Icon className="h-5 w-5 text-forest" />
              </span>
              <div className="flex-1">
                <div className="font-display text-sm font-bold text-ink uppercase">{title}</div>
                <div className="text-sm text-ink/60">{text}</div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
    <section id="productos" className="y2k-dots relative overflow-hidden border-y-[1.5px] border-ink py-24 md:py-32">
      <div className="container relative">
        <SectionHead
          index="02"
          tag="Productos propios"
          aside="Además de crear sistemas para nuestros clientes, desarrollamos y operamos nuestras propias plataformas. Lo que aprendemos en ellas lo llevamos a cada proyecto."
        >
          Software propio, <span className="text-outline">probado</span> en negocios reales
        </SectionHead>

        {/* Índice rápido */}
        <Reveal className="mb-20 flex flex-wrap gap-2">
          {products.map((p, i) => (
            <a
              key={p.name}
              href={`#producto-${i + 1}`}
              className="press inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-white px-3.5 py-1.5 font-mono text-xs font-bold text-ink shadow-hard"
            >
              <span className="h-2.5 w-2.5 rounded-full border border-ink" style={{ background: p.color }} />
              {p.name}
              {p.tld}
            </a>
          ))}
        </Reveal>

        <div className="space-y-28 md:space-y-36">
          {products.map((p, i) => {
            const flip = i % 2 === 1
            return (
              <div key={p.name} id={`producto-${i + 1}`} className="grid scroll-mt-28 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
                  <Reveal>
                    <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-widest uppercase">
                      <span className="text-ink/50">P/0{i + 1}</span>
                      <span
                        className={`rounded-md border-[1.5px] border-ink px-2 py-0.5 font-bold text-ink ${p.status === "Beta" ? "bg-white" : "bg-lime"}`}
                      >
                        {p.status === "Beta" ? "Beta ✦" : "● En línea"}
                      </span>
                    </div>
                    <h3 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl xl:text-6xl">
                      {p.name}
                      <span style={{ color: p.color }}>{p.tld}</span>
                    </h3>
                    <p className="mt-4 inline-block border-b-[3px] pb-1 text-xl font-semibold text-ink" style={{ borderColor: p.color }}>
                      {p.tagline}
                    </p>
                    <p className="mt-5 text-lg leading-relaxed text-ink/70">{p.description}</p>
                    <ul className="mt-7 space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-ink/85">
                          <span className="mt-0.5 text-sm" style={{ color: p.color }}>
                            ✦
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press group mt-9 inline-flex items-center gap-2 rounded-xl border-[1.5px] border-ink px-6 py-3.5 font-mono text-sm font-bold tracking-wider text-white uppercase shadow-hard"
                      style={{ background: p.color }}
                    >
                      {p.cta ?? `Visitar ${p.name}${p.tld}`}
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Reveal>
                </div>

                <div className={`relative min-w-0 ${flip ? "lg:order-1" : ""}`}>
                  <Parallax speed={0.08} className="pointer-events-none absolute inset-0">
                    <div
                      className="absolute inset-x-[4%] inset-y-[6%] rounded-3xl border-[1.5px] border-dashed border-ink/40"
                      style={{ background: `${p.color}14` }}
                    />
                  </Parallax>
                  <Parallax axis="x" entry speed={flip ? -0.22 : 0.22}>
                    <Reveal delay={150} className="relative">
                      <p.Mockup />
                      {p.status === "Beta" && (
                        <div className="float absolute -top-5 -right-3 rotate-6 rounded-lg border-[1.5px] border-ink bg-lime px-4 py-2 font-display text-sm font-bold text-ink uppercase shadow-hard">
                          Beta ✦
                        </div>
                      )}
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
    <section id="automatizaciones" className="y2k-grid relative overflow-hidden bg-white py-24 [--outline-bg:#fff] md:py-32">
      <div className="container relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHead index="03" tag="Automatizaciones">
            Deja que el sistema haga el <span className="text-outline">trabajo</span> repetitivo
          </SectionHead>
          <Reveal className="-mt-6">
            <p className="text-lg text-ink/70">
              Conectamos tus herramientas para que la información fluya sola: menos captura manual, menos errores y más tiempo para
              atender a tus clientes.
            </p>
            <ul className="mt-8 grid gap-3 font-mono text-sm sm:grid-cols-2">
              {["Reportes automáticos por correo", "Inventario sincronizado", "Integraciones entre sistemas", "Respaldos y alertas"].map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-lg border-[1.5px] border-ink bg-paper px-3 py-2.5 text-ink">
                  <span className="text-forest">✦</span> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <svg className="absolute top-6 bottom-6 left-[34px] w-2" aria-hidden="true">
            <line x1="4" y1="0" x2="4" y2="100%" stroke="#0b1a12" strokeWidth="2" className="flow-line" />
          </svg>
          <div className="space-y-4">
            {nodes.map((n, i) => {
              const Icon = n.icon
              return (
                <Parallax key={n.label} axis="x" entry speed={i % 2 ? -0.12 : 0.12}>
                  <Reveal delay={i * 90}>
                    <div
                      className={`relative flex items-center gap-4 rounded-xl border-[1.5px] border-ink p-3.5 shadow-hard ${i === 0 ? "bg-lime" : "bg-white"}`}
                      style={{ marginLeft: `${(i % 2) * 28}px` }}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-ink bg-paper">
                        <Icon className="h-5 w-5 text-forest" />
                      </span>
                      <span>
                        <span className="block font-display text-sm font-bold text-ink uppercase">{n.label}</span>
                        <span className="font-mono text-[11px] text-ink/60">{n.meta}</span>
                      </span>
                      <span className="ml-auto flex items-center gap-1.5 rounded-md border-[1.5px] border-ink bg-white px-2 py-1 font-mono text-[10px] font-bold text-ink uppercase">
                        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-forest" /> Auto
                      </span>
                    </div>
                  </Reveal>
                </Parallax>
              )
            })}
          </div>
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
    <section id="nosotros" className="relative border-y-[1.5px] border-ink py-24 md:py-32">
      <div className="container grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead index="04" tag="Nosotros">
            10 años construyendo tecnología para <span className="text-outline">negocios</span> que quieren crecer
          </SectionHead>
          <Reveal className="-mt-6">
            <p className="text-lg text-ink/70">
              Somos un equipo de desarrollo y soporte en Tijuana, Baja California. Trabajamos de cerca con cada cliente para entender su
              operación y entregar soluciones que realmente se usan.
            </p>
            <div className="mt-8 flex items-center gap-5 rounded-2xl border-[1.5px] border-ink bg-white p-5 shadow-hard">
              <Image src="/brand/hyperion-mark.png" alt="" width={273} height={480} className="h-20 w-auto shrink-0" />
              <div>
                <div className="font-mono text-xs font-bold tracking-widest text-forest uppercase">¿Por qué &quot;Hyperion&quot;?</div>
                <p className="mt-1.5 text-sm text-ink/70">
                  Hyperion es el árbol más alto del mundo. Nos gusta la idea: bases sólidas y crecimiento constante. Así construimos el
                  software de nuestros clientes.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-[1.5px] overflow-hidden rounded-2xl border-[1.5px] border-ink bg-ink shadow-hard-lg">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className={`p-6 md:p-9 ${i === 0 ? "bg-lime" : "bg-white"}`}>
              <div className="font-mono text-[11px] tracking-widest text-ink/50 uppercase">0{i + 1}</div>
              <div className="mt-3 font-display text-5xl font-bold tracking-tight text-ink md:text-7xl">
                <CountUp to={s.n} suffix={s.s} />
              </div>
              <div className="mt-2 font-mono text-xs text-ink/70 uppercase">{s.label}</div>
            </Reveal>
          ))}
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
    <section id="proceso" className="relative py-24 md:py-28">
      <div className="container">
        <SectionHead index="05" tag="Cómo trabajamos">
          Un proceso <span className="text-outline">claro</span>, sin sorpresas
        </SectionHead>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <Parallax key={s.title} speed={i % 2 ? -0.05 : 0.05}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border-[1.5px] border-ink bg-white p-6 shadow-hard [--outline-bg:#fff]">
                    <div className="flex items-start justify-between">
                      <span className="text-outline font-display text-6xl leading-none font-bold">0{i + 1}</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border-[1.5px] border-ink bg-lime">
                        <Icon className="h-5 w-5 text-ink" />
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-xl font-bold text-ink uppercase">{s.title}</h3>
                    <p className="mt-2 text-sm text-ink/65">{s.text}</p>
                  </div>
                </Reveal>
              </Parallax>
            )
          })}
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
    "w-full rounded-xl border-[1.5px] border-ink bg-paper px-4 py-3.5 text-ink placeholder:text-ink/35 outline-none transition focus:bg-white focus:shadow-hard"
  const label = "mb-2 block font-mono text-[11px] font-bold tracking-widest text-ink uppercase"
  const quick = needs.slice(0, 4)

  return (
    <section id="contacto" className="y2k-dots relative overflow-hidden border-t-[1.5px] border-ink py-24 md:py-32">
      <div className="container relative grid gap-14 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHead index="06" tag="Contacto">
            Cuéntanos de tu <span className="text-outline">proyecto</span>
          </SectionHead>
          <Reveal className="-mt-6">
            <p className="text-lg text-ink/70">Te respondemos con una propuesta clara y sin compromiso.</p>
          </Reveal>
          <Reveal delay={120} className="mt-10 space-y-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="press group flex items-center gap-4 rounded-2xl border-[1.5px] border-ink bg-[#25d366] p-4 shadow-hard"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border-[1.5px] border-ink bg-white">
                <MessageCircle className="h-6 w-6 text-ink" />
              </span>
              <span className="text-ink">
                <span className="block font-display text-sm font-bold uppercase">Escríbenos por WhatsApp</span>
                <span className="font-mono text-xs">Respuesta rápida</span>
              </span>
              <ArrowUpRight className="ml-auto h-5 w-5 text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {[
              { icon: Mail, label: "Email", value: "info@hyperionmkt.com", href: "mailto:info@hyperionmkt.com" },
              { icon: Phone, label: "Teléfono", value: "+52 664 579 8903", href: "tel:+526645798903" },
              { icon: MapPin, label: "Ubicación", value: "Tijuana, Baja California, México" },
            ].map(({ icon: Icon, label: l, value, href }) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[1.5px] border-ink bg-white">
                    <Icon className="h-5 w-5 text-forest" />
                  </span>
                  <span>
                    <span className="block font-mono text-[11px] tracking-widest text-ink/50 uppercase">{l}</span>
                    <span className="font-medium text-ink">{value}</span>
                  </span>
                </>
              )
              return href ? (
                <a key={l} href={href} className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-white">
                  {inner}
                </a>
              ) : (
                <div key={l} className="flex items-center gap-4 p-2">
                  {inner}
                </div>
              )
            })}
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-3">
          <form onSubmit={onSubmit} className="relative overflow-hidden rounded-2xl border-[1.5px] border-ink bg-white shadow-hard-lg">
            <div className="flex items-center justify-between border-b-[1.5px] border-ink bg-lime px-5 py-3 font-mono text-xs font-bold tracking-widest text-ink uppercase">
              <span>nuevo_proyecto.txt</span>
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-[3px] border-[1.5px] border-ink bg-white" />
                <span className="h-3 w-3 rounded-[3px] border-[1.5px] border-ink bg-ink" />
              </span>
            </div>
            <div className="p-6 md:p-9">
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
                        className={`rounded-full border-[1.5px] border-ink px-3 py-1.5 font-mono text-[11px] font-bold transition ${
                          form.need === n ? "bg-ink text-lime" : "bg-paper text-ink hover:bg-lime"
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
                      className={`rounded-full border-[1.5px] border-ink px-3 py-1.5 font-mono text-[11px] font-bold outline-none ${
                        quick.includes(form.need) ? "bg-paper text-ink" : "bg-ink text-lime"
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
                <p className="mt-4 rounded-xl border-[1.5px] border-ink bg-[#ffd9d2] px-4 py-3 text-sm text-ink">
                  No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="press group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border-[1.5px] border-ink bg-lime px-8 py-4 font-mono text-sm font-bold tracking-wider text-ink uppercase shadow-hard disabled:opacity-70"
              >
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
            </div>
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
      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-forest hover:underline">
        {name}
      </a>
      {beta && <span className="rounded border border-ink px-1.5 text-[9px] font-bold">BETA</span>}
    </li>
  )
  return (
    <footer className="relative overflow-hidden border-t-[1.5px] border-ink bg-white pt-16 pb-8 [--outline-bg:#fff]">
      <div className="container relative">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-5 max-w-sm text-ink/60">
              10 años desarrollando sistemas a la medida, puntos de venta, automatizaciones y dando servicio técnico a negocios en Tijuana y
              todo México.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-xs font-bold tracking-widest text-ink uppercase">[ Productos ]</h4>
            <ul className="space-y-2.5 font-mono text-sm text-ink/75">
              {product("https://mitiendita.software", "Mitiendita")}
              {product(MIRESTAURANTE_URL, "Mirestaurante", true)}
              {product("https://internships.gg", "internships.gg")}
              {product(CARESIA_URL, "Caresia")}
              {product(MIINFO_URL, "Mi Info", true)}
              {product(BEHIVE_URL, "BeHive", true)}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-xs font-bold tracking-widest text-ink uppercase">[ Servicios ]</h4>
            <ul className="space-y-2.5 font-mono text-sm text-ink/75">
              <li><Link href="/servicios/sistemas-a-medida" className="hover:text-forest hover:underline">Sistemas a la medida</Link></li>
              <li><Link href="#productos" className="hover:text-forest hover:underline">Puntos de venta</Link></li>
              <li><Link href="#automatizaciones" className="hover:text-forest hover:underline">Automatizaciones</Link></li>
              <li><Link href="#contacto" className="hover:text-forest hover:underline">Servicio técnico</Link></li>
              <li><Link href="/servicios/desarrollo-web" className="hover:text-forest hover:underline">Desarrollo web</Link></li>
            </ul>
          </div>
        </div>

        {/* Nombre gigante que sube un poco con el scroll */}
        <Parallax speed={-0.12} className="mt-16 select-none">
          <div className="text-outline text-center font-display text-[14.5vw] leading-[0.85] font-bold tracking-tighter uppercase xl:text-[12.5rem]" aria-hidden="true">
            Hyperion
          </div>
        </Parallax>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-[1.5px] border-ink pt-6 font-mono text-xs text-ink/60 uppercase md:flex-row">
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
    <div className="relative min-h-screen bg-paper text-ink">
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
        className="press fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-2xl border-[1.5px] border-ink bg-[#25d366] text-ink shadow-hard"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}
