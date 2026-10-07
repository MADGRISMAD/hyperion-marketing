// Ilustraciones de interfaz para los productos.
import Image from "next/image"

function Window({ url, children, accent = "#7ee2a8" }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f2c14e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5ad17a]" />
        <div className="ml-3 flex-1 truncate rounded-md bg-slate-100 px-3 py-1 text-xs text-fog/60">
          <span style={{ color: accent }}>●</span> {url}
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
      <div className="absolute top-0 -left-4 w-[62%] -rotate-6 overflow-hidden rounded-xl border border-slate-200 opacity-80 shadow-2xl sm:-left-8">
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
      <div className="float absolute -bottom-1 left-2 flex items-center gap-2 rounded-full border border-slate-200 bg-ink-950/90 px-4 py-2 text-xs font-semibold shadow-xl backdrop-blur sm:left-6">
        <span className="h-2 w-2 rounded-full bg-aqua" /> Venta guardada en la nube
      </div>
      <div className="float absolute top-2 right-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#ffd166] to-[#f2a33a] font-display text-sm font-bold text-[#3b2405] shadow-md [animation-delay:1.5s]">
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
  const rows = [
    ["#128", "Impresora sin conexión", "Alta", "#dc2626"],
    ["#127", "Alta de nuevo usuario", "Media", "#d97706"],
    ["#126", "Duda sobre facturación", "Baja", "#16a34a"],
  ]
  return (
    <Window url="behive" accent="#b45309">
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-display text-2xl font-bold text-fog">
            Be<span className="text-[#b45309]">Hive</span>
          </div>
          <div className="rounded-full bg-[#b45309] px-4 py-1.5 text-[11px] font-semibold text-white">+ Nuevo ticket</div>
        </div>
        <div className="space-y-2">
          {rows.map(([id, t, p, c]) => (
            <div key={id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <span className="text-[11px] font-semibold text-fog/40">{id}</span>
              <span className="flex-1 truncate text-xs font-medium text-fog">{t}</span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ color: c, background: `${c}18` }}>
                {p}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}
