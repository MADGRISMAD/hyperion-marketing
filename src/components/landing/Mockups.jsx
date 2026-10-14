// Ilustraciones de interfaz para los productos.
import Image from "next/image"

// Ventana estilo sistema operativo Y2K: barra de título, botones cuadrados y sombra dura.
function Window({ url, children, accent = "#dcd4ff" }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink/15 bg-white shadow-hard-lg">
      <div className="flex items-center gap-3 border-b border-ink/10 px-3 py-2" style={{ background: accent }}>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-[3px] border border-ink/15 bg-white" />
          <span className="h-3 w-3 rounded-[3px] border border-ink/15 bg-white" />
          <span className="h-3 w-3 rounded-[3px] border border-ink/15 bg-ink" />
        </span>
        <div className="flex-1 truncate rounded-md border border-ink/15 bg-white px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-ink">
          ▸ {url}
        </div>
      </div>
      {children}
    </div>
  )
}

export function TienditaMockup() {
  return (
    <div className="relative pt-10 pb-6">
      {/* Página de inicio de Mitiendita al fondo */}
      <div className="absolute top-0 -left-4 w-[62%] -rotate-6 overflow-hidden rounded-xl border border-ink/15 shadow-hard sm:-left-8">
        <Image src="/productos/mitiendita-landing.webp" alt="" width={2000} height={1155} sizes="(min-width: 1024px) 380px, 60vw" className="h-auto w-full" />
      </div>
      {/* Sistema real: pantalla de venta */}
      <div className="relative ml-auto w-[92%]">
        <Window url="mitiendita" accent="#f2a33a">
          <Image
            src="/productos/mitiendita-app.webp"
            alt="Pantalla de venta del punto de venta Mitiendita"
            width={2000}
            height={1161}
            sizes="(min-width: 1024px) 560px, 92vw"
            className="h-auto w-full"
          />
        </Window>
      </div>
      <div className="float absolute -bottom-1 left-2 flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 font-mono text-[11px] font-bold tracking-wide text-ink uppercase shadow-hard sm:left-6">
        <span className="h-2 w-2 rounded-full bg-forest" /> Venta guardada en la nube
      </div>
      <div className="float absolute top-2 right-2 flex h-14 w-14 items-center justify-center rounded-full border border-ink/15 bg-holo font-display text-sm font-bold text-ink shadow-hard [animation-delay:1.5s]">
        +$22
      </div>
    </div>
  )
}

export function RestauranteMockup() {
  return (
    <Window url="mirestaurante" accent="#c8341b">
      <Image
        src="/productos/mirestaurante-landing.webp"
        alt="Pase de cocina y mapa de mesas de Mirestaurante"
        width={2000}
        height={1158}
        sizes="(min-width: 1024px) 560px, 92vw"
        className="h-auto w-full"
      />
    </Window>
  )
}

export function InternshipsMockup() {
  return (
    <Window url="internships.gg" accent="#10b981">
      <Image
        src="/productos/internships-landing.png"
        alt="Página de inicio de internships.gg"
        width={1440}
        height={900}
        sizes="(min-width: 1024px) 560px, 92vw"
        className="h-auto w-full"
      />
    </Window>
  )
}

export function CaresiaMockup() {
  return (
    <Window url="caresia" accent="#2a5d9f">
      <Image
        src="/productos/caresia-landing.webp"
        alt="Agenda de citas de Caresia, software para clínicas dentales y consultorios médicos"
        width={2000}
        height={1159}
        sizes="(min-width: 1024px) 560px, 92vw"
        className="h-auto w-full"
      />
    </Window>
  )
}

export function BeHiveMockup() {
  return (
    <Window url="behive" accent="#b45309">
      <Image
        src="/productos/behive-landing.webp"
        alt="Lista de tickets de BeHive, mesa de ayuda profesional con precio en pesos"
        width={2000}
        height={1163}
        sizes="(min-width: 1024px) 560px, 92vw"
        className="h-auto w-full"
      />
    </Window>
  )
}

export function MiInfoMockup() {
  return (
    <Window url="miinfo" accent="#1f3a5f">
      <Image
        src="/productos/miinfo-landing.webp"
        alt="Página de inicio de Mi Info con una tarjeta de presentación de ejemplo"
        width={2000}
        height={1160}
        sizes="(min-width: 1024px) 560px, 92vw"
        className="h-auto w-full"
      />
    </Window>
  )
}
