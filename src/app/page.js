"use client"
import { useState } from "react"
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
} from "lucide-react"

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    window.open(
      `mailto:info@hyperionmkt.com?subject=Nuevo mensaje de ${form.name}&body=${form.message} (${form.email})`,
      "_blank"
    )
  
    setTimeout(() => {
      window.location.href = "/gracias"
    }, 500) // da tiempo a que el mailto se dispare correctamente
  
    setForm({ name: "", email: "", message: "" })
  }
  


  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/70 border-b border-green-950">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-green-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Hyperion Marketing
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#servicios"
              className="text-sm font-medium text-zinc-400 hover:text-green-400 transition-colors"
            >
              Servicios
            </Link>
            <Link href="#vision" className="text-sm font-medium text-zinc-400 hover:text-green-400 transition-colors">
              Nuestra Visión
            </Link>
            <Link
              href="#testimonios"
              className="text-sm font-medium text-zinc-400 hover:text-green-400 transition-colors"
            >
              Testimonios
            </Link>
            <Link href="#contacto" className="text-sm font-medium text-zinc-400 hover:text-green-400 transition-colors">
              Contacto
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="#contacto">
              <Button
                variant="ghost"
                className="hidden sm:inline-flex text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                Contactar
              </Button>
            </Link>
            <Link href="#contacto">
              <Button className="bg-green-500 hover:bg-green-600 text-black font-medium rounded-full px-6">
                Cotizar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Bento Style */}
        <section className="w-full py-20 md:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-green-950/30 to-black/0 pointer-events-none"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400 mb-6">
                <span>Innovación Digital</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent mb-6">
                Soluciones IT a la medida para tu negocio
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl">
                Creamos experiencias digitales que transforman empresas y conectan con sus clientes en la era digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link href="#contacto">
                  <Button className="bg-green-500 hover:bg-green-600 text-black font-medium rounded-full px-8 py-6 text-base">
                    Cotizar Ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#servicios">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-6 text-base border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600"
                  >
                    Explorar Servicios
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {/* Featured Image - Spans 2 columns */}
              <div className="md:col-span-2 rounded-3xl overflow-hidden relative group h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Digital Solutions"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="text-2xl font-bold mb-2">Transformación Digital</h3>
                  <p className="text-zinc-300 mb-4 max-w-md">
                    Llevamos tu negocio al siguiente nivel con soluciones tecnológicas innovadoras.
                  </p>
                  <Link href="#servicios" className="inline-flex items-center text-green-400 hover:text-green-300">
                    Descubrir más <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-zinc-900 rounded-3xl p-8 flex flex-col justify-between border border-zinc-800 hover:border-green-900 transition-colors group">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-1 group-hover:text-green-400 transition-colors">+200%</h3>
                  <p className="text-zinc-400">Aumento promedio en conversiones para nuestros clientes</p>
                </div>
              </div>

              {/* Middle Row - 3 equal cards */}
              <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-colors group">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">Desarrollo Web</h3>
                <p className="text-zinc-400 mb-4">
                  Sitios web modernos y responsivos que convierten visitantes en clientes.
                </p>
                <Link href="#" className="inline-flex items-center text-green-400 hover:text-green-300">
                  Ver más <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-colors group">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  Sistemas a Medida
                </h3>
                <p className="text-zinc-400 mb-4">
                  Soluciones de software personalizadas para optimizar tus procesos de negocio.
                </p>
                <Link href="#" className="inline-flex items-center text-green-400 hover:text-green-300">
                  Ver más <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-colors group">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Megaphone className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  Marketing Digital
                </h3>
                <p className="text-zinc-400 mb-4">
                  Estrategias efectivas para aumentar tu visibilidad online y atraer clientes.
                </p>
                <Link href="#" className="inline-flex items-center text-green-400 hover:text-green-300">
                  Ver más <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              {/* Bottom Row - Testimonial spans 2 columns */}
              <div className="md:col-span-2 bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-colors">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-green-400" />
                  ))}
                </div>
                <p className="text-xl text-zinc-300 mb-6 italic">
                  &quot;Hyperion transformó nuestra presencia online. Nuestro nuevo sitio web ha aumentado las conversiones en un 40% en solo tres meses.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-zinc-800">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Cliente"
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

              <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-colors group">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">Consultoría IT</h3>
                <p className="text-zinc-400 mb-4">
                  Asesoramiento experto para optimizar tu infraestructura tecnológica.
                </p>
                <Link href="#" className="inline-flex items-center text-green-400 hover:text-green-300">
                  Ver más <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Bento Style */}
        <section id="servicios" className="w-full py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400 mb-6">
                <span>Nuestros Servicios</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Soluciones completas para tu presencia digital
              </h2>
              <p className="text-zinc-400 max-w-2xl text-lg">
                Ofrecemos servicios integrales diseñados para impulsar tu negocio en el mundo digital.
              </p>
            </div>

            {/* Services Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Service 1 - Web Development */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all hover:shadow-lg hover:shadow-green-900/10 group">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">Desarrollo Web</h3>
                <p className="text-zinc-400 mb-6">
                  Sitios web modernos y responsivos que convierten visitantes en clientes.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">Diseño personalizado</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">Optimización SEO</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">Experiencia móvil</span>
                  </li>
                </ul>
                <Link href="#">
                  <Button
                    variant="outline"
                    className="w-full border-zinc-700 hover:bg-zinc-800 hover:border-green-800 hover:text-green-400"
                  >
                    Ver más
                  </Button>
                </Link>
              </div>

              {/* Service 2 - Custom Systems */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all hover:shadow-lg hover:shadow-green-900/10 group">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                  Sistemas a Medida
                </h3>
                <p className="text-zinc-400 mb-6">
                  Soluciones de software personalizadas para optimizar tus procesos de negocio.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">Automatización</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">Integración APIs</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">Escalabilidad</span>
                  </li>
                </ul>
                <Link href="#">
                  <Button
                    variant="outline"
                    className="w-full border-zinc-700 hover:bg-zinc-800 hover:border-green-800 hover:text-green-400"
                  >
                    Ver más
                  </Button>
                </Link>
              </div>

              {/* Service 3 - Digital Marketing */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all hover:shadow-lg hover:shadow-green-900/10 group">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <Megaphone className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                  Marketing Digital
                </h3>
                <p className="text-zinc-400 mb-6">
                  Estrategias efectivas para aumentar tu visibilidad online y atraer clientes.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">SEO/SEM</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">Redes Sociales</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">Email Marketing</span>
                  </li>
                </ul>
                <Link href="#">
                  <Button
                    variant="outline"
                    className="w-full border-zinc-700 hover:bg-zinc-800 hover:border-green-800 hover:text-green-400"
                  >
                    Ver más
                  </Button>
                </Link>
              </div>

              {/* Service 4 - IT Consulting */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all hover:shadow-lg hover:shadow-green-900/10 group">
                <div className="rounded-full bg-green-500/10 p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <Settings className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">Consultoría IT</h3>
                <p className="text-zinc-400 mb-6">
                  Asesoramiento experto para optimizar tu infraestructura tecnológica.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">Auditoría técnica</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">Planificación IT</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-zinc-300">Seguridad digital</span>
                  </li>
                </ul>
                <Link href="#">
                  <Button
                    variant="outline"
                    className="w-full border-zinc-700 hover:bg-zinc-800 hover:border-green-800 hover:text-green-400"
                  >
                    Ver más
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Bento Style */}
        <section id="vision" className="w-full py-24 md:py-32 bg-black">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400 mb-6">
                  <span>Nuestra Visión</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                  Impulsamos el crecimiento de tu negocio con tecnología de vanguardia
                </h2>
                <p className="text-zinc-400 mb-8 text-lg">
                  En Hyperion Marketing, combinamos creatividad y tecnología para crear soluciones digitales que
                  transforman negocios y conectan con audiencias en la era digital.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="rounded-full bg-green-500/10 p-2 w-10 h-10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold">Innovación Constante</h3>
                    <p className="text-zinc-400">Nos mantenemos a la vanguardia de las tendencias tecnológicas.</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="rounded-full bg-green-500/10 p-2 w-10 h-10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold">Enfoque en el Cliente</h3>
                    <p className="text-zinc-400">Creamos soluciones centradas en las necesidades de tu audiencia.</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="rounded-full bg-green-500/10 p-2 w-10 h-10 flex items-center justify-center">
                      <BarChart className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold">Resultados Medibles</h3>
                    <p className="text-zinc-400">
                      Nos enfocamos en métricas que impulsan el crecimiento de tu negocio.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="rounded-full bg-green-500/10 p-2 w-10 h-10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold">Seguridad Primero</h3>
                    <p className="text-zinc-400">
                      Implementamos las mejores prácticas de seguridad en todos nuestros proyectos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative h-[600px] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <Image
                  src="/placeholder.svg?height=1200&width=800"
                  alt="Nuestra Visión"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Bento Style */}
        <section id="testimonios" className="w-full py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400 mb-6">
                <span>Testimonios</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Lo que dicen nuestros clientes</h2>
              <p className="text-zinc-400 max-w-2xl text-lg">
                Descubre cómo hemos ayudado a empresas como la tuya a alcanzar sus objetivos digitales.
              </p>
            </div>

            {/* Testimonials Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all hover:shadow-lg hover:shadow-green-900/10">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-green-400" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-8 text-lg">
                  &quot;Hyperion transformó nuestra presencia online. Nuestro nuevo sitio web ha aumentado las conversiones
                  en un 40% en solo tres meses.&quot;
                </p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-zinc-800">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Cliente"
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

              {/* Testimonial 2 */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all hover:shadow-lg hover:shadow-green-900/10">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-green-400" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-8 text-lg">
                  &quot;El sistema de gestión que desarrollaron para nosotros ha optimizado nuestros procesos internos y
                  ahorrado horas de trabajo manual.&quot;
                </p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-zinc-800">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Cliente"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Carlos Rodríguez</h4>
                    <p className="text-sm text-zinc-400">CEO, Innovatech</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all hover:shadow-lg hover:shadow-green-900/10">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-green-400" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-8 text-lg">
                  &quot;La estrategia de marketing digital implementada por Hyperion ha sido clave para nuestro crecimiento.
                  Altamente recomendados.&quot;
                </p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-zinc-800">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Cliente"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Laura Gómez</h4>
                    <p className="text-sm text-zinc-400">Fundadora, EcoStyle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Bento Style */}
        <section id="contacto" className="w-full py-24 md:py-32 bg-gradient-to-b from-black to-zinc-950">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400 mb-2">
                  <span>Contacto</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">¿Listo para impulsar tu negocio?</h2>
                <p className="text-zinc-400 text-lg max-w-lg">
                  Contáctanos hoy mismo para discutir cómo podemos ayudarte a alcanzar tus objetivos digitales. Nuestro
                  equipo de expertos está listo para crear soluciones personalizadas que impulsen tu crecimiento.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-green-500 hover:bg-green-600 text-black font-medium rounded-full px-8 py-6 text-base">
                    Cotizar Ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-6 text-base border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600"
                  >
                    Conoce Nuestros Servicios
                  </Button>
                </div>

                <div className="pt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-500/10 p-2 w-10 h-10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="text-zinc-300">info@hyperionmtk.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-500/10 p-2 w-10 h-10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="text-zinc-300">+52 6645798903</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all hover:shadow-lg hover:shadow-green-900/10">
                <h3 className="text-2xl font-bold mb-6">Envíanos un mensaje</h3>
                <form
  className="space-y-6"
  action="https://formsubmit.co/info@hyperionmkt.com"
  method="POST"
>
  {/* Oculta captcha de FormSubmit */}
  <input type="hidden" name="_captcha" value="false" />
  {/* Redirige después de enviar */}
  <input type="hidden" name="_next" value="https://hyperionmkt.com/gracias" />

  <div className="grid grid-cols-2 gap-6">
    <div className="space-y-2">
      <label htmlFor="first-name" className="text-sm font-medium text-zinc-400">
        Nombre
      </label>
      <Input
        id="first-name"
        name="name"
        required
        placeholder="Tu nombre"
        className="bg-zinc-950 border-zinc-800 focus:border-green-500 focus:ring-green-500/20"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="last-name" className="text-sm font-medium text-zinc-400">
        Apellido
      </label>
      <Input
        id="last-name"
        name="lastname"
        required
        placeholder="Tu apellido"
        className="bg-zinc-950 border-zinc-800 focus:border-green-500 focus:ring-green-500/20"
      />
    </div>
  </div>

  <div className="space-y-2">
    <label htmlFor="email" className="text-sm font-medium text-zinc-400">
      Email
    </label>
    <Input
      id="email"
      name="email"
      type="email"
      required
      placeholder="tu@email.com"
      className="bg-zinc-950 border-zinc-800 focus:border-green-500 focus:ring-green-500/20"
    />
  </div>

  <div className="space-y-2">
    <label htmlFor="message" className="text-sm font-medium text-zinc-400">
      Mensaje
    </label>
    <Textarea
      id="message"
      name="message"
      required
      placeholder="¿Cómo podemos ayudarte?"
      className="min-h-[120px] bg-zinc-950 border-zinc-800 focus:border-green-500 focus:ring-green-500/20"
    />
  </div>

  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-medium">
    Enviar Mensaje
  </Button>
</form>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800 py-12 bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="h-6 w-6 text-green-400" />
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
  )}