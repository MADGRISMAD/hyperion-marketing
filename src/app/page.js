"use client"
import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  MessageCircle,
  ShoppingCart,
  Wrench,
  Zap,
  Search,
  PenTool,
  Rocket,
  LifeBuoy,
  Loader2,
  Send,
} from "lucide-react"
import Navbar, { Logo } from "../components/landing/Navbar"
import Hero, { HoloGlobe } from "../components/landing/Hero"
import Intro from "../components/landing/Intro"
import CityScene from "../components/landing/CityScene"
import { Parallax, Reveal, CountUp } from "../components/landing/parallax"
import { TienditaMockup, RestauranteMockup, InternshipsMockup, CaresiaMockup, BeHiveMockup, MiInfoMockup } from "../components/landing/Mockups"

// URLs temporales: cuando tengan dominio propio, cambiarlas solo aquí.
const CARESIA_URL = "https://caresia.mx/"
const MIRESTAURANTE_URL = "https://mirestaurante-ten.vercel.app/"
const BEHIVE_URL = "https://micolmena-eta.vercel.app/"
const MIINFO_URL = "https://miinfo.15-235-62-27.sslip.io/"

const WHATSAPP = "https://wa.me/526645798903?text=Hola%20Hyperion%2C%20me%20interesa%20cotizar%20un%20proyecto"

// Encabezado de sección: código del sistema, titular con brillo y una nota
function SectionHead({ index, tag, title, text, compact = false }) {
  return (
    <Reveal className={`mb-12 grid gap-6 md:mb-16 lg:items-end ${compact ? "" : "lg:grid-cols-[1.3fr_1fr]"}`}>
      <div>
        <div className="readout flex items-center gap-3 text-sage">
          <span className="text-phos">§{index}</span>
          <span className="h-px w-10 bg-phos/40" />
          <span>{tag}</span>
        </div>
        <h2
          className={`glow mt-5 font-display text-[2.3rem] leading-[0.95] font-bold tracking-[0.02em] uppercase sm:text-6xl ${compact ? "lg:text-[3.6rem]" : "lg:text-[4.4rem]"}`}
        >
          {title}
        </h2>
      </div>
      {text && <p className="max-w-md text-[17px] leading-relaxed text-sage lg:justify-self-end">{text}</p>}
    </Reveal>
  )
}

/* ───────────────────────── Marquesina ───────────────────────── */
function Ticker() {
  const items = ["Sistemas a la medida", "Puntos de venta", "Automatizaciones", "Servicio técnico", "Desarrollo web", "Marketing digital"]
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-phos/20 bg-night/80 py-4" aria-hidden="true">
      <div className="marquee flex w-max items-center whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="readout flex items-center gap-6 px-6 text-[13px] text-mint">
            <span className="text-phos">▸</span> {t}
            <span className="text-sage/50">{`// TX-${String(i + 1).padStart(3, "0")}`}</span>
          </span>
        ))}
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
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHead
          index="01"
          tag="Módulos"
          title="Todo lo que tu negocio necesita"
          text="Diseñamos, desarrollamos, instalamos y damos soporte. Un solo equipo que conoce tu negocio y te acompaña de principio a fin."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <Parallax key={s.title} speed={i % 2 ? -0.06 : 0.04}>
                <Reveal delay={(i % 2) * 90} className="h-full">
                  <Link href={s.href} className="group hud sweep scan flex h-full flex-col p-6 transition-[box-shadow,border-color] duration-200 hover:border-phos/70 hover:shadow-[0_0_50px_-10px_rgba(77,255,154,0.5)] md:p-8">
                    <span className="brackets" />
                    <div className="readout flex items-center justify-between text-sage">
                      <span>Mód-0{i + 1}</span>
                      <span className="flex items-center gap-1.5 text-phos">
                        <span className="pulse h-1.5 w-1.5 rounded-full bg-phos" /> Activo
                      </span>
                    </div>
                    <div className="mt-7 flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-phos/40 text-phos">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="font-display text-2xl leading-tight font-bold tracking-[0.04em] text-mint uppercase md:text-3xl">{s.title}</h3>
                    </div>
                    <p className="mt-4 leading-relaxed text-sage">{s.text}</p>
                    <ul className="readout mt-6 space-y-2 text-[11px] text-mint/80">
                      {s.points.map((p) => (
                        <li key={p}>
                          <span className="text-phos">▸</span> {p}
                        </li>
                      ))}
                    </ul>
                    <span className="readout mt-auto flex items-center gap-2 pt-8 text-phos">
                      Desplegar módulo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              </Parallax>
            )
          })}
        </div>
        <Reveal className="readout mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sage">
          <span>Módulos extra:</span>
          {[
            ["/servicios/desarrollo-web", "Desarrollo web"],
            ["/servicios/marketing-digital", "Marketing digital"],
            ["/servicios/consultoria-it", "Consultoría IT"],
          ].map(([href, l]) => (
            <Link key={href} href={href} className="text-mint underline decoration-phos/40 underline-offset-4 hover:decoration-phos">
              {l}
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

// Cada producto es un expediente: ficha a un lado y la transmisión de la pantalla real al otro, a distinta profundidad
function Products() {
  return (
    <section id="productos" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHead
          index="02"
          tag="Expedientes"
          title="Software propio"
          text="Además de crear sistemas para nuestros clientes, desarrollamos y operamos nuestras propias plataformas. Lo que aprendemos en ellas lo llevamos a cada proyecto."
        />
        <Reveal as="nav" aria-label="Productos" className="readout mb-16 flex flex-wrap gap-2">
          {products.map((p, i) => (
            <a key={p.name} href={`#producto-${i + 1}`} className="border border-phos/25 bg-night/70 px-3 py-2 text-mint/80 transition-colors hover:border-phos hover:text-mint">
              <span className="text-phos">EXP-0{i + 1}</span> {p.name}
              {p.tld}
            </a>
          ))}
        </Reveal>

        <div className="space-y-24 md:space-y-36">
          {products.map((p, i) => {
            const flip = i % 2 === 1
            const beta = p.status === "Beta"
            return (
              <article key={p.name} id={`producto-${i + 1}`} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
                <Parallax speed={0.05} className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
                  <Reveal>
                    <div className="hud sweep scan p-6 md:p-8">
                      <span className="brackets" />
                      <div className="readout flex items-center justify-between text-sage">
                        <span>Expediente 0{i + 1}</span>
                        <span className={`flex items-center gap-1.5 ${beta ? "text-amber" : "text-phos"}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${beta ? "bg-amber" : "pulse bg-phos"}`} />
                          {beta ? "Beta abierta" : "En línea"}
                        </span>
                      </div>
                      <h3 className="glow mt-5 font-display text-[2.2rem] leading-none font-bold tracking-[0.03em] uppercase [overflow-wrap:anywhere] sm:text-5xl xl:text-6xl">
                        {p.name}
                        {p.tld}
                      </h3>
                      <p className="mt-4 font-display text-xl font-medium tracking-[0.02em] text-mint">{p.tagline}</p>
                      <p className="mt-3 leading-relaxed text-sage">{p.description}</p>
                      <ul className="mt-6 border-t border-phos/15">
                        {p.features.map((f, k) => (
                          <li key={f} className="grid grid-cols-[42px_1fr] gap-2 border-b border-phos/15 py-2.5 text-[15px] text-mint/90">
                            <span className="readout pt-0.5 text-phos/80">▸ {String(k + 1).padStart(2, "0")}</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn-hud group mt-8">
                        {p.cta ?? `Visitar ${p.name}${p.tld}`}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </Reveal>
                </Parallax>
                <Parallax speed={-0.08} className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
                  <Reveal delay={120}>
                    <div className={flip ? "lg:[transform:perspective(1600px)_rotateY(7deg)]" : "lg:[transform:perspective(1600px)_rotateY(-7deg)]"}>
                      <p.Mockup />
                    </div>
                  </Reveal>
                </Parallax>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Automatizaciones ───────────────────────── */
// Red de datos: cada nodo pasa la señal al siguiente
function Automation() {
  const nodes = [
    ["Nueva venta", "Entrada"],
    ["Inventario", "Se actualiza"],
    ["Factura", "Se genera"],
    ["Reporte diario", "Por correo"],
    ["Aviso a tu celular", "Al instante"],
  ]
  return (
    <section id="automatizaciones" className="relative py-24 md:py-32">
      <div className="container grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead compact index="03" tag="Red automática" title="Deja que el sistema trabaje" />
          <Reveal className="-mt-4 md:-mt-8">
            <p className="max-w-lg text-[17px] leading-relaxed text-sage">
              Conectamos tus herramientas para que la información fluya sola: menos captura manual, menos errores y más tiempo para
              atender a tus clientes.
            </p>
            <ul className="readout mt-8 grid gap-3 text-[11px] text-mint/85 sm:grid-cols-2">
              {["Reportes automáticos por correo", "Inventario sincronizado", "Integraciones entre sistemas", "Respaldos y alertas"].map((t) => (
                <li key={t} className="border border-phos/20 bg-night/70 px-3 py-2.5">
                  <span className="text-phos">✓</span> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Parallax speed={-0.06}>
          <Reveal delay={120} className="hud sweep scan relative mx-auto w-full max-w-md p-6">
            <span className="brackets" />
            <div className="readout mb-5 flex items-center justify-between text-sage">
              <span>Flujo · venta → aviso</span>
              <span className="text-phos">Latencia 0.2 s</span>
            </div>
            <div className="relative">
              <svg className="absolute top-5 bottom-5 left-[19px] w-[3px]" aria-hidden="true">
                <line x1="1.5" y1="0" x2="1.5" y2="100%" stroke="rgba(124,255,180,0.25)" strokeWidth="3" />
                <line x1="1.5" y1="0" x2="1.5" y2="100%" stroke="#4dff9a" strokeWidth="3" strokeLinecap="round" className="flow-line" />
              </svg>
              <ol className="relative space-y-3">
                {nodes.map(([label, meta], i) => (
                  <li key={label} className="flex items-center gap-4 border border-phos/20 bg-night/80 p-2.5 pr-4">
                    <span className="readout flex h-7 w-7 shrink-0 items-center justify-center border border-phos bg-[#0c2a1b] text-[10px] text-phos shadow-[0_0_12px_rgba(77,255,154,0.35)]">
                      {i + 1}
                    </span>
                    <span className="flex-1 font-display text-base font-semibold tracking-[0.04em] text-mint uppercase md:text-lg">{label}</span>
                    <span className="readout text-[10px] text-sage">{meta}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Parallax>
      </div>
    </section>
  )
}

/* ───────────────────────── Nosotros + cifras ───────────────────────── */
function About() {
  const stats = [
    { n: 10, s: "+", label: "Años de experiencia", bar: 100 },
    { n: 6, s: "", label: "Productos propios", bar: 60 },
    { n: 100, s: "%", label: "Desarrollo a la medida", bar: 100 },
    { n: 1, s: "", label: "Equipo de principio a fin", bar: 100 },
  ]
  return (
    <section id="nosotros" className="relative py-24 md:py-32">
      <div className="container grid gap-14 lg:grid-cols-2 lg:gap-20 [&>*]:min-w-0">
        <div>
          <SectionHead compact index="04" tag="Unidad" title="10 años construyendo" />
          <Reveal className="-mt-4 space-y-6 md:-mt-8">
            <p className="max-w-lg text-[17px] leading-relaxed text-sage">
              Somos un equipo de desarrollo y soporte en Tijuana, Baja California. Trabajamos de cerca con cada cliente para entender su
              operación y entregar soluciones que realmente se usan.
            </p>
            <div className="hud flex max-w-lg gap-5 p-5">
              <span className="brackets" />
              <Logo holo compact className="shrink-0 [&>span:last-child]:hidden" />
              <p className="text-[15px] leading-relaxed text-sage">
                <strong className="font-semibold text-mint">¿Por qué &quot;Hyperion&quot;?</strong> Hyperion es el árbol más alto del mundo.
                Nos gusta la idea: bases sólidas y crecimiento constante. Así construimos el software de nuestros clientes.
              </p>
            </div>
          </Reveal>
        </div>
        <Parallax speed={-0.05}>
          <Reveal className="hud sweep scan p-6 md:p-8">
            <span className="brackets" />
            <div className="readout mb-6 flex items-center justify-between text-sage">
              <span>Lecturas del sistema</span>
              <span className="flex items-center gap-1.5 text-phos">
                <span className="pulse h-1.5 w-1.5 rounded-full bg-phos" /> Sync 100%
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="glow font-display text-5xl leading-none font-bold tabular-nums md:text-6xl">
                    <CountUp to={s.n} suffix={s.s} />
                  </dd>
                  <dt className="readout mt-3 text-[10px] text-sage">{s.label}</dt>
                  <div className="mt-3 flex gap-[3px]" aria-hidden="true">
                    {Array.from({ length: 10 }, (_, k) => (
                      <span key={k} className={`h-1.5 flex-1 ${k < s.bar / 10 ? "bg-phos shadow-[0_0_6px_#4dff9a]" : "bg-phos/15"}`} />
                    ))}
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-8 grid grid-cols-[88px_1fr] items-center gap-4 border-t border-phos/15 pt-6">
              <HoloGlobe />
              <p className="readout text-[10px] leading-relaxed text-sage">
                Base de operaciones: Tijuana, B.C.
                <br />
                Atendemos negocios en todo México
              </p>
            </div>
          </Reveal>
        </Parallax>
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
        <SectionHead index="05" tag="Fases de misión" title="Un proceso claro" text="Sin sorpresas: sabes qué sigue, cuánto cuesta y cuándo llega." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <Parallax key={s.title} speed={i % 2 ? -0.04 : 0.04}>
                <Reveal delay={i * 90} className="hud sweep h-full p-6">
                  <span className="brackets" />
                  <div className="flex items-center justify-between">
                    <span className="readout text-phos">Fase 0{i + 1}</span>
                    <Icon className="h-5 w-5 text-sage" />
                  </div>
                  <div className="mt-4 flex gap-[3px]" aria-hidden="true">
                    {steps.map((_, k) => (
                      <span key={k} className={`h-1 flex-1 ${k <= i ? "bg-phos" : "bg-phos/15"}`} />
                    ))}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-[0.04em] text-mint uppercase">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-sage">{s.text}</p>
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
    "w-full border border-phos/25 bg-[#020a06]/90 px-4 py-3.5 text-[16px] text-mint placeholder:text-sage/50 outline-none transition-[border-color,box-shadow] focus:border-phos focus:shadow-[0_0_18px_-4px_rgba(77,255,154,0.6)]"
  const label = "readout mb-2 block text-sage"

  return (
    <section id="contacto" className="relative py-24 md:py-32">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHead compact index="06" tag="Enlace seguro" title="Cuéntanos de tu proyecto" />
          <Reveal className="-mt-4 md:-mt-8">
            <p className="text-[17px] text-sage">Te respondemos con una propuesta clara y sin compromiso.</p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group hud mt-8 flex items-center gap-4 p-4 transition-[border-color] hover:border-phos"
            >
              <span className="brackets" />
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#25d366] text-white">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block font-display text-lg font-bold tracking-[0.04em] text-mint uppercase">Escríbenos por WhatsApp</span>
                <span className="readout text-[10px] text-sage">Canal directo · respuesta rápida</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-phos transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <dl className="mt-4">
              {[
                ["Email", "info@hyperionmkt.com", "mailto:info@hyperionmkt.com"],
                ["Teléfono", "+52 664 579 8903", "tel:+526645798903"],
                ["Base", "Tijuana, Baja California, México"],
              ].map(([l, value, href]) => (
                <div key={l} className="grid grid-cols-[100px_1fr] items-baseline border-b border-phos/15 py-4">
                  <dt className="readout text-sage">{l}</dt>
                  <dd className="text-mint">
                    {href ? (
                      <a href={href} className="underline decoration-phos/40 underline-offset-4 hover:decoration-phos">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="hud sweep scan p-6 md:p-9">
            <span className="brackets" />
            <div className="readout mb-6 flex items-center justify-between text-sage">
              <span>Canal cifrado · nuevo proyecto</span>
              <span className="flex items-center gap-1.5 text-phos">
                <span className="pulse h-1.5 w-1.5 rounded-full bg-phos" /> Listo
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className={label}>Nombre</span>
                <input name="name" required value={form.name} onChange={onChange} autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className={label}>Email</span>
                <input name="email" type="email" required value={form.email} onChange={onChange} autoComplete="email" className={field} />
              </label>
              <label className="block md:col-span-2">
                <span className={label}>Teléfono (opcional)</span>
                <input name="phone" type="tel" value={form.phone} onChange={onChange} autoComplete="tel" className={field} />
              </label>
            </div>
            <fieldset className="mt-6">
              <legend className={label}>¿Qué necesitas?</legend>
              <div className="flex flex-wrap gap-2">
                {needs.map((n) => (
                  <label
                    key={n}
                    className={`cursor-pointer border px-3.5 py-2 text-[13px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-mint ${
                      form.need === n ? "border-phos bg-phos text-[#021008]" : "border-phos/25 text-mint/80 hover:border-phos/60"
                    }`}
                  >
                    <input type="radio" name="need" value={n} checked={form.need === n} onChange={onChange} className="sr-only" />
                    {n}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="mt-6 block">
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
              <p role="alert" className="mt-4 border border-alert/50 bg-alert/10 px-4 py-3 text-sm text-mint">
                No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.
              </p>
            )}
            <button type="submit" disabled={status === "sending"} className="btn-hud mt-8 w-full disabled:opacity-70">
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Transmitiendo…
                </>
              ) : (
                <>
                  Transmitir mensaje <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Pie de página ───────────────────────── */
function Footer() {
  const product = (href, name, beta) => (
    <li key={name}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-mint">
        {name}
      </a>
      {beta && <span className="readout ml-2 text-[9px] text-amber">Beta</span>}
    </li>
  )
  const linkCls = "transition-colors hover:text-mint"
  return (
    <footer className="relative overflow-hidden border-t border-phos/20 bg-night/85 pt-16">
      <div className="container">
        <div className="grid gap-12 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo holo />
            <p className="mt-5 max-w-sm text-sage">
              10 años desarrollando sistemas a la medida, puntos de venta, automatizaciones y dando servicio técnico a negocios en Tijuana y
              todo México.
            </p>
          </div>
          <div>
            <h4 className="readout mb-4 text-phos">Productos</h4>
            <ul className="space-y-2.5 text-sm text-sage">
              {product("https://mitiendita.software", "Mitiendita")}
              {product(MIRESTAURANTE_URL, "Mirestaurante", true)}
              {product("https://internships.gg", "internships.gg")}
              {product(CARESIA_URL, "Caresia")}
              {product(MIINFO_URL, "Mi Info", true)}
              {product(BEHIVE_URL, "BeHive", true)}
            </ul>
          </div>
          <div>
            <h4 className="readout mb-4 text-phos">Servicios</h4>
            <ul className="space-y-2.5 text-sm text-sage">
              <li><Link href="/servicios/sistemas-a-medida" className={linkCls}>Sistemas a la medida</Link></li>
              <li><Link href="#productos" className={linkCls}>Puntos de venta</Link></li>
              <li><Link href="#automatizaciones" className={linkCls}>Automatizaciones</Link></li>
              <li><Link href="#contacto" className={linkCls}>Servicio técnico</Link></li>
              <li><Link href="/servicios/desarrollo-web" className={linkCls}>Desarrollo web</Link></li>
            </ul>
          </div>
        </div>

        <div className="glow select-none text-center font-display text-[15vw] leading-[0.8] font-bold tracking-[0.06em] uppercase opacity-90 xl:text-[13rem]" aria-hidden="true">
          Hyperion
        </div>

        <div className="readout flex flex-col items-center justify-between gap-4 border-t border-phos/15 py-7 text-sage md:flex-row">
          <p>© {new Date().getFullYear()} Hyperion Software · Tijuana, B.C.</p>
          <div className="flex items-center gap-6">
            <Link href="/trafico" className="hover:text-mint">Tráfico de nuestros sitios</Link>
            <a href="mailto:info@hyperionmkt.com" className="hover:text-mint">info@hyperionmkt.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <CityScene />
      <Intro />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
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
        className="fixed right-5 bottom-5 z-50 flex h-13 w-13 items-center justify-center bg-[#25d366] text-white shadow-[0_0_0_3px_#030806,0_0_0_4px_rgba(77,255,154,0.5),0_12px_30px_-8px_rgba(0,0,0,0.7)] rounded-full transition-transform active:scale-95"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  )
}
