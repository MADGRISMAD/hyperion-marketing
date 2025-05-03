"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import {
  Layers,
  Globe,
  Code,
  Megaphone,
  Settings,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ArrowRight,
  ChevronRight,
  Users,
  BarChart,
  Zap,
  Shield,
  Menu,
  X,
  Award,
  Briefcase,
  Clock,
  Target,
  CheckCircle,
  MessageSquare,
} from "lucide-react"

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        window.location.href = "/gracias"
      } else {
        throw new Error("Error al enviar el mensaje")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-950 to-black text-white">
      {/* Header Mejorado */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800" : "bg-transparent"
      }`}>
        <div className="container flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
              <Layers className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Hyperion Marketing
            </span>
          </div>

          {/* Navegación Móvil */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-green-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Menú Móvil */}
          <div className={`fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl transition-transform duration-300 md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end mb-8">
                <button
                  className="p-2 text-zinc-400 hover:text-green-400"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                <Link
                  href="#servicios"
                  className="text-lg font-medium text-zinc-400 hover:text-green-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Servicios
                </Link>
                <Link
                  href="#vision"
                  className="text-lg font-medium text-zinc-400 hover:text-green-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nuestra Visión
                </Link>
                <Link
                  href="#testimonios"
                  className="text-lg font-medium text-zinc-400 hover:text-green-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonios
                </Link>
                <Link
                  href="#contacto"
                  className="text-lg font-medium text-zinc-400 hover:text-green-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </nav>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#servicios"
              className="text-sm font-medium text-zinc-400 hover:text-green-400 transition-colors"
            >
              Servicios
            </Link>
            <Link
              href="#vision"
              className="text-sm font-medium text-zinc-400 hover:text-green-400 transition-colors"
            >
              Nuestra Visión
            </Link>
            <Link
              href="#testimonios"
              className="text-sm font-medium text-zinc-400 hover:text-green-400 transition-colors"
            >
              Testimonios
            </Link>
            <Link
              href="#contacto"
              className="text-sm font-medium text-zinc-400 hover:text-green-400 transition-colors"
            >
              Contacto
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="#contacto">
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                Contactar
              </Button>
            </Link>
            <Link href="#contacto">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-full px-6 transition-all duration-300 hover:scale-105">
                Cotizar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Bento Style */}
        <section className="w-full py-20 md:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 to-black/0 pointer-events-none"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-400 mb-6">
                <span>Transformando Negocios Digitalmente</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent mb-6">
                Soluciones IT que Impulsan tu Negocio
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl">
                Somos expertos en crear experiencias digitales que transforman empresas y conectan con sus clientes en la era digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link href="#contacto">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-full px-8 py-6 text-base transition-all duration-300 hover:scale-105">
                    Cotizar Ahora
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="#servicios">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-6 text-base border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:scale-105"
                  >
                    Explorar Servicios
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <div className="text-3xl font-bold text-green-400 mb-2">+200</div>
                <div className="text-zinc-400">Clientes Satisfechos</div>
              </div>
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <div className="text-3xl font-bold text-green-400 mb-2">+500</div>
                <div className="text-zinc-400">Proyectos Completados</div>
              </div>
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <div className="text-3xl font-bold text-green-400 mb-2">+15</div>
                <div className="text-zinc-400">Años de Experiencia</div>
              </div>
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <div className="text-3xl font-bold text-green-400 mb-2">+50</div>
                <div className="text-zinc-400">Expertos en Equipo</div>
              </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {/* Featured Image - Spans 2 columns */}
              <div className="md:col-span-2 rounded-3xl overflow-hidden relative group h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent z-10"></div>
                <Image
                  src="/hero-image.jpg"
                  alt="Soluciones digitales innovadoras"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="text-2xl font-bold mb-2">Transformación Digital</h3>
                  <p className="text-zinc-300 mb-4 max-w-md">
                    Llevamos tu negocio al siguiente nivel con soluciones tecnológicas innovadoras.
                  </p>
                  <Link href="#servicios" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
                    Descubrir más <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-zinc-900/50 rounded-3xl p-8 flex flex-col justify-between border border-zinc-800 hover:border-green-900 transition-all duration-300 group hover:shadow-lg hover:shadow-green-900/20">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-1 group-hover:text-green-400 transition-colors">+200%</h3>
                  <p className="text-zinc-400">Aumento promedio en conversiones para nuestros clientes</p>
                </div>
              </div>

              {/* Middle Row - 3 equal cards */}
              <div className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all duration-300 group hover:shadow-lg hover:shadow-green-900/20">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">Desarrollo Web</h3>
                <p className="text-zinc-400 mb-4">
                  Sitios web modernos y responsivos que convierten visitantes en clientes.
                </p>
                <Link href="#" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
                  Ver más <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Link>
              </div>

              <div className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all duration-300 group hover:shadow-lg hover:shadow-green-900/20">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  Sistemas a Medida
                </h3>
                <p className="text-zinc-400 mb-4">
                  Soluciones de software personalizadas para optimizar tus procesos de negocio.
                </p>
                <Link href="#" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
                  Ver más <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Link>
              </div>

              <div className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all duration-300 group hover:shadow-lg hover:shadow-green-900/20">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Megaphone className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  Marketing Digital
                </h3>
                <p className="text-zinc-400 mb-4">
                  Estrategias efectivas para aumentar tu visibilidad online y atraer clientes.
                </p>
                <Link href="#" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
                  Ver más <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Link>
              </div>

              {/* Bottom Row - Testimonial spans 2 columns */}
              <div className="md:col-span-2 bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-green-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xl text-zinc-300 mb-6 italic">
                  &quot;Hyperion transformó nuestra presencia online. Nuestro nuevo sitio web ha aumentado las conversiones en un 40% en solo tres meses.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-zinc-800">
                    <Image
                      src="/testimonial-1.jpg"
                      alt="Ana Martínez"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Ana Martínez</h4>
                    <p className="text-sm text-zinc-400">Directora de Marketing, TechSolutions</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all duration-300 group hover:shadow-lg hover:shadow-green-900/20">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">Consultoría IT</h3>
                <p className="text-zinc-400 mb-4">
                  Asesoramiento experto para optimizar tu infraestructura tecnológica.
                </p>
                <Link href="#" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
                  Ver más <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full py-20 bg-zinc-900/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegirnos?</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Nos destacamos por nuestra experiencia, innovación y compromiso con el éxito de nuestros clientes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Experiencia Comprobada</h3>
                <p className="text-zinc-400">Más de 15 años transformando negocios digitalmente.</p>
              </div>
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Enfoque en Resultados</h3>
                <p className="text-zinc-400">Nos enfocamos en métricas que impulsan el crecimiento.</p>
              </div>
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
                <p className="text-zinc-400">Procesos optimizados para resultados más rápidos.</p>
              </div>
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Soporte Continuo</h3>
                <p className="text-zinc-400">Acompañamiento constante en cada etapa del proyecto.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="w-full py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestro Proceso</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Un enfoque estructurado para garantizar el éxito de tu proyecto.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-green-400">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Análisis</h3>
                  <p className="text-zinc-400">Evaluamos tus necesidades y objetivos.</p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-zinc-800"></div>
              </div>
              <div className="relative">
                <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-green-400">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Planificación</h3>
                  <p className="text-zinc-400">Diseñamos la estrategia perfecta para ti.</p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-zinc-800"></div>
              </div>
              <div className="relative">
                <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-green-400">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Desarrollo</h3>
                  <p className="text-zinc-400">Implementamos la solución paso a paso.</p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-zinc-800"></div>
              </div>
              <div>
                <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-green-400">4</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Optimización</h3>
                  <p className="text-zinc-400">Mejoramos continuamente los resultados.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="w-full py-20 bg-zinc-900/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para transformar tu negocio?</h2>
                <p className="text-zinc-400 mb-8">
                  Contáctanos hoy mismo para discutir cómo podemos ayudarte a alcanzar tus objetivos digitales.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-zinc-400">info@hyperionmkt.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Teléfono</h3>
                      <p className="text-zinc-400">+52 6645798903</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 rounded-2xl p-8 border border-zinc-800 shadow-lg shadow-zinc-900/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Envíanos un mensaje</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-zinc-400">
                        Nombre
                      </label>
                      <div className="relative">
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-zinc-900/50 border-zinc-800 focus:border-green-500 focus:ring-green-500/20 pl-10"
                          placeholder="Tu nombre completo"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Users className="h-5 w-5 text-zinc-500" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-400">
                        Email
                      </label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-zinc-900/50 border-zinc-800 focus:border-green-500 focus:ring-green-500/20 pl-10"
                          placeholder="tu@email.com"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-zinc-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-400">
                      Mensaje
                    </label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        className="w-full min-h-[150px] bg-zinc-900/50 border-zinc-800 focus:border-green-500 focus:ring-green-500/20 pl-10 pt-3"
                        placeholder="¿Cómo podemos ayudarte?"
                      />
                      <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-zinc-500" />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg px-8 py-6 text-base transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-green-500/20"
                  >
                    Enviar Mensaje
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800 py-12 bg-zinc-950">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  Hyperion Marketing
                </span>
              </div>
              <p className="text-sm text-zinc-400">
                Soluciones digitales innovadoras que impulsan el crecimiento de tu negocio y mejoran la experiencia de
                tus clientes.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-zinc-500 hover:text-green-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-zinc-500 hover:text-green-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-zinc-500 hover:text-green-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-zinc-500 hover:text-green-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Servicios</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-green-400 transition-colors">
                    Desarrollo Web
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-green-400 transition-colors">
                    Sistemas a Medida
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-green-400 transition-colors">
                    Marketing Digital
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-green-400 transition-colors">
                    Consultoría IT
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-green-400 transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-green-400 transition-colors">
                    Nuestra Visión
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-green-400 transition-colors">
                    Casos de Éxito
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-green-400 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Contacto</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <Mail className="h-5 w-5 text-zinc-400" />
                  <span className="text-zinc-400">info@hyperionmtk.com</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Phone className="h-5 w-5 text-zinc-400" />
                  <span className="text-zinc-400">+52 6645798903</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} Hyperion Marketing. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}