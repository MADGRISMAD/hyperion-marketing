"use client"
import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Cog,
  Code2,
  Globe,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  MapPin,
  ShoppingCart,
  Wrench,
  Sprout,
  Trees,
  GitBranch,
  Sun,
  Send,
  Loader2,
} from "lucide-react"
import Navbar, { AltitudeMeter, Logo } from "../components/landing/Navbar"
import Hero from "../components/landing/Hero"
import { Parallax, Reveal, CountUp } from "../components/landing/parallax"
import { ForestLayer, TreeRings, Fireflies } from "../components/landing/Forest"
import { TienditaMockup, RestauranteMockup, IntershipsMockup } from "../components/landing/Mockups"

const WHATSAPP = "https://wa.me/526645798903?text=Hola%20Hyperion%2C%20me%20interesa%20cotizar%20un%20proyecto"

function trackGlow(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
}

function SectionTag({ children }) {
  return (
    <span className="mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-amber uppercase">
      <span className="h-px w-8 bg-amber/60" />
      {children}
    </span>
  )
}

/* ───────────────────────── Marquesina ───────────────────────── */
function Marquee() {
  const items = ["Sistemas a la medida", "Puntos de venta", "Automatizaciones", "Servicio técnico", "Desarrollo web", "Marketing digital"]
  const row = [...items, ...items]
  return (
    <div className="relative z-10 -mt-10 overflow-hidden border-y border-white/5 bg-forest-900/80 py-5 backdrop-blur">
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl text-cream/80 italic md:text-3xl">
            {t}
            <Trees className="h-5 w-5 text-amber/70" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── Historia del nombre ───────────────────────── */
function NameStory() {
  return (
    <section id="nombre" className="relative overflow-hidden py-24 md:py-32">
      <Parallax speed={-0.25} axis="x" className="pointer-events-none absolute top-16 left-0 w-full select-none">
        <div className="font-display text-[22vw] leading-none font-bold whitespace-nowrap text-white/[0.025]">HYPERION · 116 m · HYPERION</div>
      </Parallax>

      <div className="container relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionTag>El origen del nombre</SectionTag>
            <h2 className="font-display text-4xl leading-tight font-semibold md:text-6xl">
              Nombrados por el <span className="italic text-gradient">gigante</span> del bosque.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-lg leading-relaxed text-cream/70">
              <strong className="text-cream">Hyperion</strong> es una secuoya roja escondida en los bosques del norte de California.
              Con más de <strong className="text-amber">115 metros</strong> de altura, es el árbol vivo más alto que se conoce
              en el planeta. Lleva siglos creciendo en silencio, un anillo a la vez.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-lg leading-relaxed text-cream/70">
              Así entendemos la tecnología: raíces sólidas, crecimiento constante y la ambición de llegar más alto.
              Llevamos <strong className="text-cream">10 años</strong> sumando anillos, ayudando a negocios a crecer con
              software que aguanta cualquier tormenta.
            </p>
          </Reveal>
          <Reveal delay={280} className="mt-10 grid grid-cols-3 gap-4">
            {[
              ["Raíces", "Bases técnicas sólidas"],
              ["Tronco", "Sistemas estables"],
              ["Copa", "Crecimiento sin límite"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-display text-xl text-amber">{t}</div>
                <div className="mt-1 text-xs text-cream/60">{d}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <Parallax speed={0.12} className="absolute inset-0">
            <div className="absolute inset-[8%] rounded-full bg-amber/20 blur-3xl" />
          </Parallax>
          <Parallax speed={-0.08}>
            <Reveal className="relative">
              <TreeRings className="spin-slow w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="rounded-2xl bg-forest-950/70 px-6 py-4 backdrop-blur-md">
                  <div className="font-display text-6xl font-bold text-cream">10</div>
                  <div className="text-xs tracking-[0.25em] text-amber uppercase">anillos · años</div>
                </div>
              </div>
            </Reveal>
          </Parallax>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Cifras ───────────────────────── */
function Stats() {
  const stats = [
    { n: 10, s: "+", label: "Años de experiencia" },
    { n: 3, s: "", label: "Productos propios" },
    { n: 116, s: " m", label: "De inspiración" },
    { n: 100, s: "%", label: "Hecho a la medida" },
  ]
  return (
    <section className="relative py-10">
      <div className="container">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="bg-forest-900 p-8 text-center md:p-10">
            <div className="font-display text-5xl font-semibold text-gradient md:text-6xl">
              <CountUp to={s.n} suffix={s.s} />
            </div>
            <div className="mt-2 text-sm text-cream/60">{s.label}</div>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Productos ───────────────────────── */
const products = [
  {
    name: "mitiendita",
    tld: ".software",
    href: "https://mitiendita.software",
    color: "#f2a33a",
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
    name: "mirestaurante",
    tld: ".software",
    href: null,
    color: "#f2a65a",
    status: "Próximamente",
    tagline: "Tu restaurante, en orden.",
    description:
      "Mesas, comandas y cocina conectadas en un solo sistema. Estamos afinando los últimos detalles; déjanos tus datos y sé de los primeros en probarlo.",
    features: ["Mapa de mesas", "Comandas directas a cocina", "Cuentas y cobro ágil"],
    Mockup: RestauranteMockup,
  },
  {
    name: "interships",
    tld: ".gg",
    href: "https://interships.gg",
    color: "#9b8cff",
    status: "Disponible",
    tagline: "Nuestra plataforma en línea.",
    description:
      "Una plataforma web diseñada, desarrollada y operada por nuestro equipo de principio a fin: la prueba de que construimos productos digitales que escalan.",
    features: ["Diseño y desarrollo propio", "Infraestructura escalable", "Evolución continua"],
    Mockup: IntershipsMockup,
  },
]

function Products() {
  return (
    <section id="productos" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(126,226,168,0.08),transparent_60%)]" />
      <div className="container relative">
        <Reveal className="mx-auto mb-24 max-w-3xl text-center">
          <SectionTag>Nuestros productos</SectionTag>
          <h2 className="font-display text-4xl leading-tight font-semibold md:text-6xl">
            Frutos del <span className="italic text-gradient-moss">mismo árbol</span>.
          </h2>
          <p className="mt-6 text-lg text-cream/65">
            Además de crear software para nuestros clientes, construimos nuestras propias plataformas. Lo que aprendemos en
            ellas lo llevamos a cada proyecto.
          </p>
        </Reveal>

        <div className="space-y-28 md:space-y-36">
          {products.map((p, i) => {
            const flip = i % 2 === 1
            return (
              <div key={p.name} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
                  <Reveal>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="font-display text-sm text-cream/40">0{i + 1}</span>
                      <span
                        className="rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase"
                        style={{ borderColor: `${p.color}55`, color: p.color, background: `${p.color}12` }}
                      >
                        {p.status}
                      </span>
                    </div>
                    <h3 className="font-display text-[1.7rem] font-semibold break-words sm:text-4xl md:text-5xl">
                      {p.name}
                      <span style={{ color: p.color }}>{p.tld}</span>
                    </h3>
                    <p className="mt-3 font-display text-2xl text-cream/80 italic">{p.tagline}</p>
                    <p className="mt-6 text-lg leading-relaxed text-cream/65">{p.description}</p>
                    <ul className="mt-8 space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-cream/85">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: `${p.color}22` }}>
                            <Sprout className="h-3.5 w-3.5" style={{ color: p.color }} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10">
                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-forest-950 transition hover:scale-[1.03]"
                          style={{ background: p.color }}
                        >
                          Visitar {p.name}
                          {p.tld}
                          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <Link
                          href="#contacto"
                          className="group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 font-semibold transition hover:scale-[1.03]"
                          style={{ borderColor: p.color, color: p.color }}
                        >
                          Quiero enterarme primero
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </Reveal>
                </div>

                <div className={`relative min-w-0 ${flip ? "lg:order-1" : ""}`}>
                  <Parallax speed={0.18} className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-[5%] rounded-full blur-[90px]" style={{ background: `${p.color}30` }} />
                  </Parallax>
                  <Parallax speed={-0.12} rotate={flip ? 0.004 : -0.004}>
                    <Reveal delay={150} className="relative">
                      <p.Mockup />
                      {p.status === "Próximamente" && (
                        <div className="float absolute -top-5 -right-3 rotate-6 rounded-xl bg-amber px-4 py-2 font-display text-sm font-bold text-forest-950 shadow-xl">
                          ¡Muy pronto!
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

/* ───────────────────────── Servicios ───────────────────────── */
const services = [
  {
    icon: Code2,
    title: "Sistemas a la medida",
    text: "Software diseñado alrededor de tus procesos, no al revés. ERPs, CRMs, portales y paneles de control.",
    href: "/servicios/sistemas-a-medida",
    big: true,
  },
  {
    icon: ShoppingCart,
    title: "Puntos de venta",
    text: "Instalamos y personalizamos sistemas POS para tiendas, restaurantes y comercios.",
  },
  {
    icon: Cog,
    title: "Automatizaciones",
    text: "Eliminamos tareas repetitivas: integraciones, reportes automáticos, bots y flujos de trabajo.",
  },
  {
    icon: Wrench,
    title: "Servicio técnico",
    text: "Soporte, mantenimiento de equipos, redes e instalación. Estamos cuando nos necesitas.",
  },
  {
    icon: Globe,
    title: "Desarrollo web",
    text: "Sitios rápidos y atractivos que convierten visitas en clientes.",
    href: "/servicios/desarrollo-web",
  },
  {
    icon: Megaphone,
    title: "Marketing digital",
    text: "Estrategia, contenido y campañas para que tu negocio se vea y se elija.",
    href: "/servicios/marketing-digital",
    wide: true,
  },
]

function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden py-24 md:py-32">
      <Parallax speed={0.3} axis="x" className="pointer-events-none absolute top-24 -left-1/4 w-[150%] select-none">
        <div className="font-display text-[16vw] leading-none font-bold whitespace-nowrap text-white/[0.025] italic">servicios · servicios · servicios</div>
      </Parallax>
      <div className="container relative">
        <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionTag>Lo que hacemos</SectionTag>
            <h2 className="font-display text-4xl leading-tight font-semibold md:text-6xl">
              Un ecosistema completo para <span className="italic text-gradient">tu negocio</span>.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg text-cream/65">
              Del primer servidor a la última automatización: diseñamos, construimos, instalamos y damos soporte. Un solo
              equipo que conoce tu negocio de raíz.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon
            const card = (
              <div
                onMouseMove={trackGlow}
                className={`glow-card group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 transition duration-500 hover:-translate-y-1 hover:border-amber/40 ${s.big ? "lg:row-span-2" : ""}`}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber/25 to-bark/25 ring-1 ring-amber/30 transition group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-6 w-6 text-amber" />
                </div>
                <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-cream/65">{s.text}</p>
                {s.big && (
                  <div className="mt-8 space-y-3">
                    {["Análisis de tus procesos", "Desarrollo web y móvil", "Integración con lo que ya usas", "Soporte y evolución continua"].map((t) => (
                      <div key={t} className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm text-cream/80">
                        <GitBranch className="h-4 w-4 text-moss" /> {t}
                      </div>
                    ))}
                  </div>
                )}
                {s.href && (
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber">
                    Conocer más <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                )}
                <Boxes className="pointer-events-none absolute -right-6 -bottom-6 h-32 w-32 text-white/[0.03] transition duration-700 group-hover:rotate-12" />
              </div>
            )
            return (
              <Reveal key={s.title} delay={(i % 3) * 100} className={s.big ? "lg:row-span-2" : s.wide ? "lg:col-span-3" : ""}>
                {s.href ? (
                  <Link href={s.href} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Banda parallax del bosque ───────────────────────── */
function ForestBand() {
  return (
    <section className="grain relative h-[90vh] min-h-[560px] overflow-hidden" aria-label="10 años de experiencia">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#040906_0%,#0d2219_40%,#1d3b2c_75%,#2c4a36_100%)]" />
      <Parallax speed={0.5} className="absolute inset-0">
        <div className="absolute top-[30%] left-1/2 h-[50vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(214,255,230,0.18),transparent_70%)]" />
      </Parallax>
      <Parallax speed={0.25} className="absolute inset-x-0 top-0 -bottom-[30%]">
        <ForestLayer seed={71} count={30} minH={420} maxH={640} color="#2a4a3e" className="opacity-70" />
      </Parallax>
      <Parallax speed={0.14} className="absolute inset-x-0 top-0 -bottom-[30%]">
        <ForestLayer seed={83} count={22} minH={560} maxH={860} color="#152c22" />
      </Parallax>
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <Parallax speed={-0.15}>
          <Reveal>
            <Trees className="mx-auto mb-6 h-10 w-10 text-amber" />
            <blockquote className="mx-auto max-w-4xl font-display text-3xl leading-tight font-medium text-cream md:text-6xl">
              “Las raíces profundas sostienen a los <span className="italic text-gradient">árboles más altos</span>.”
            </blockquote>
            <p className="mt-8 text-sm tracking-[0.3em] text-cream/60 uppercase">10 años creciendo junto a nuestros clientes</p>
          </Reveal>
        </Parallax>
      </div>
      <Parallax speed={0.05} className="pointer-events-none absolute inset-x-0 -top-[10%] -bottom-[10%] z-20">
        <ForestLayer seed={97} count={6} minH={760} maxH={1100} widthRatio={0.2} color="#040906" skipCenter={560} />
      </Parallax>
      <Fireflies count={18} seed={5} />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-forest-950 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-forest-950 to-transparent" />
    </section>
  )
}

/* ───────────────────────── Proceso ───────────────────────── */
const steps = [
  { icon: Sprout, title: "Semilla", sub: "Diagnóstico", text: "Escuchamos tu negocio, entendemos tus procesos y definimos qué necesitas realmente." },
  { icon: GitBranch, title: "Raíces", sub: "Diseño", text: "Planeamos la arquitectura, el diseño y un plan de trabajo claro con tiempos y costos." },
  { icon: Trees, title: "Tronco", sub: "Desarrollo", text: "Construimos en entregas cortas para que veas avances reales desde la primera semana." },
  { icon: Sun, title: "Copa", sub: "Lanzamiento y soporte", text: "Instalamos, capacitamos a tu equipo y seguimos contigo con soporte y mejoras." },
]

function Process() {
  return (
    <section id="proceso" className="relative py-24 md:py-32">
      <div className="container">
        <Reveal className="mx-auto mb-20 max-w-3xl text-center">
          <SectionTag>Cómo trabajamos</SectionTag>
          <h2 className="font-display text-4xl leading-tight font-semibold md:text-6xl">
            De la <span className="italic text-gradient-moss">semilla</span> a la <span className="italic text-gradient">copa</span>.
          </h2>
        </Reveal>

        <div className="relative mx-auto max-w-5xl">
          <div className="bark-texture absolute top-0 bottom-0 left-6 w-1.5 rounded-full opacity-70 md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-16">
            {steps.map((s, i) => {
              const Icon = s.icon
              const right = i % 2 === 1
              return (
                <div key={s.title} className="relative grid items-center gap-6 pl-20 md:grid-cols-2 md:gap-20 md:pl-0">
                  <div className="absolute top-2 left-6 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-forest-950 bg-gradient-to-br from-amber to-bark shadow-[0_0_30px_rgba(242,166,90,0.45)] md:top-1/2 md:left-1/2 md:-translate-y-1/2">
                    <Icon className="h-6 w-6 text-forest-950" />
                  </div>
                  <Parallax speed={right ? -0.06 : 0.06} className={right ? "md:col-start-2" : "md:text-right"}>
                    <Reveal delay={80}>
                      <div className="text-xs font-semibold tracking-[0.3em] text-amber uppercase">
                        Paso 0{i + 1} · {s.sub}
                      </div>
                      <h3 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{s.title}</h3>
                      <p className="mt-3 text-cream/65">{s.text}</p>
                    </Reveal>
                  </Parallax>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Contacto ───────────────────────── */
const needs = ["Sistema a la medida", "Punto de venta", "Automatización", "Servicio técnico", "Sitio web / Marketing", "mirestaurante.software", "Otro"]

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
    "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-cream placeholder:text-cream/30 outline-none transition focus:border-amber/60 focus:ring-4 focus:ring-amber/10"

  return (
    <section id="contacto" className="relative overflow-hidden py-24 md:py-32">
      <Parallax speed={0.2} className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-moss/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-bark/15 blur-[120px]" />
      </Parallax>
      <div className="container relative grid gap-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Reveal>
            <SectionTag>Contacto</SectionTag>
            <h2 className="font-display text-4xl leading-tight font-semibold md:text-6xl">
              Planta la <span className="italic text-gradient">semilla</span> de tu proyecto.
            </h2>
            <p className="mt-6 text-lg text-cream/65">
              Cuéntanos qué necesitas y te respondemos con una propuesta clara. Sin compromiso.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10 space-y-4">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-[#25d366]/30 bg-[#25d366]/10 p-5 transition hover:border-[#25d366]/60">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25d366] text-forest-950">
                <MessageCircle className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-semibold">Escríbenos por WhatsApp</span>
                <span className="text-sm text-cream/60">Respuesta rápida</span>
              </span>
              <ArrowUpRight className="ml-auto h-5 w-5 text-[#25d366] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {[
              { icon: Mail, label: "Email", value: "info@hyperionmkt.com", href: "mailto:info@hyperionmkt.com" },
              { icon: Phone, label: "Teléfono", value: "+52 664 579 8903", href: "tel:+526645798903" },
              { icon: MapPin, label: "Ubicación", value: "Tijuana, Baja California, México" },
            ].map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber/10 ring-1 ring-amber/20">
                    <Icon className="h-5 w-5 text-amber" />
                  </span>
                  <span>
                    <span className="block text-sm text-cream/50">{label}</span>
                    <span className="font-medium">{value}</span>
                  </span>
                </>
              )
              return href ? (
                <a key={label} href={href} className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-white/[0.03]">
                  {inner}
                </a>
              ) : (
                <div key={label} className="flex items-center gap-4 p-2">
                  {inner}
                </div>
              )
            })}
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-3">
          <form onSubmit={onSubmit} className="relative rounded-3xl border border-white/10 bg-forest-900/70 p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-cream/60">Nombre</span>
                <input name="name" required value={form.name} onChange={onChange} placeholder="Tu nombre" className={field} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-cream/60">Email</span>
                <input name="email" type="email" required value={form.email} onChange={onChange} placeholder="tu@email.com" className={field} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-cream/60">Teléfono (opcional)</span>
                <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="664 000 0000" className={field} />
              </label>
              <div className="block">
                <span className="mb-2 block text-sm text-cream/60">¿Qué necesitas?</span>
                <div className="flex flex-wrap gap-2">
                  {needs.slice(0, 4).map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setForm({ ...form, need: n })}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${form.need === n ? "border-amber bg-amber text-forest-950" : "border-white/15 text-cream/70 hover:border-amber/50"}`}
                    >
                      {n}
                    </button>
                  ))}
                  <select
                    name="need"
                    value={needs.slice(0, 4).includes(form.need) ? "" : form.need}
                    onChange={onChange}
                    aria-label="Otro servicio"
                    className={`rounded-full border bg-transparent px-3 py-1.5 text-xs outline-none ${needs.slice(0, 4).includes(form.need) ? "border-white/15 text-cream/70" : "border-amber bg-amber text-forest-950"}`}
                  >
                    <option value="" disabled className="bg-forest-900 text-cream">Más…</option>
                    {needs.slice(4).map((n) => (
                      <option key={n} value={n} className="bg-forest-900 text-cream">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm text-cream/60">Cuéntanos de tu proyecto</span>
              <textarea name="message" required rows={5} value={form.message} onChange={onChange} placeholder="¿Qué quieres lograr? ¿Qué usas hoy?" className={`${field} resize-none`} />
            </label>
            {status === "error" && (
              <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber to-bark px-8 py-4 font-semibold text-forest-950 shadow-[0_10px_40px_-10px_rgba(242,166,90,0.8)] transition hover:scale-[1.01] disabled:opacity-70"
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
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Pie de página ───────────────────────── */
function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#030604] pt-20 pb-10">
      <svg className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full opacity-[0.12]" viewBox="0 0 1600 160" preserveAspectRatio="none" aria-hidden="true">
        {[...Array(14)].map((_, i) => {
          const x = 60 + i * 115
          return (
            <path
              key={i}
              d={`M${x} 0 C ${x + 20} 50, ${x - 40} 80, ${x - 10} 160 M${x} 0 C ${x + 40} 40, ${x + 70} 90, ${x + 50} 150 M${x} 20 C ${x - 30} 50, ${x - 60} 70, ${x - 70} 120`}
              fill="none"
              stroke="#b8552b"
              strokeWidth="2"
            />
          )
        })}
      </svg>
      <div className="container relative">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-5 max-w-sm text-cream/55">
              10 años creando sistemas a la medida, puntos de venta, automatizaciones y servicio técnico. Tecnología con
              raíces profundas.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[0.25em] text-amber uppercase">Productos</h4>
            <ul className="space-y-2.5 text-cream/65">
              <li><a href="https://mitiendita.software" target="_blank" rel="noopener noreferrer" className="hover:text-cream">mitiendita.software</a></li>
              <li className="flex items-center gap-2">mirestaurante.software <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[10px] text-amber">Pronto</span></li>
              <li><a href="https://interships.gg" target="_blank" rel="noopener noreferrer" className="hover:text-cream">interships.gg</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[0.25em] text-amber uppercase">Servicios</h4>
            <ul className="space-y-2.5 text-cream/65">
              <li><Link href="/servicios/sistemas-a-medida" className="hover:text-cream">Sistemas a la medida</Link></li>
              <li><Link href="#servicios" className="hover:text-cream">Puntos de venta</Link></li>
              <li><Link href="#servicios" className="hover:text-cream">Automatizaciones</Link></li>
              <li><Link href="#servicios" className="hover:text-cream">Servicio técnico</Link></li>
              <li><Link href="/servicios/desarrollo-web" className="hover:text-cream">Desarrollo web</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-cream/40 md:flex-row">
          <p>© {new Date().getFullYear()} Hyperion Marketing · Tijuana, B.C.</p>
          <p className="flex items-center gap-2">
            <Trees className="h-4 w-4 text-amber/60" /> Inspirados en el árbol más alto del mundo
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-forest-950 text-cream">
      <Navbar />
      <AltitudeMeter />
      <main>
        <Hero />
        <Marquee />
        <NameStory />
        <Stats />
        <Products />
        <Services />
        <ForestBand />
        <Process />
        <Contact />
      </main>
      <Footer />
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-forest-950 shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}
