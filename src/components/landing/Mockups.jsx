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
      {/* Página de mitiendita.software al fondo */}
      <div className="absolute top-0 -left-4 w-[62%] -rotate-6 overflow-hidden rounded-xl border border-slate-200 opacity-80 shadow-2xl sm:-left-8">
        <Image src="/productos/mitiendita-landing.webp" alt="" width={2000} height={1155} sizes="(min-width: 1024px) 380px, 60vw" className="h-auto w-full" />
      </div>
      {/* Sistema real: pantalla de venta */}
      <div className="relative ml-auto w-[92%]">
        <Window url="mitiendita.software" accent="#f2a33a">
          <Image
            src="/productos/mitiendita-app.webp"
            alt="Pantalla de venta del punto de venta mitiendita.software"
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
  const tables = [
    ["1", "libre"], ["2", "ocupada"], ["3", "cuenta"], ["4", "ocupada"],
    ["5", "libre"], ["6", "ocupada"], ["7", "libre"], ["8", "cuenta"],
  ]
  const color = { libre: "#7ee2a8", ocupada: "#f2a65a", cuenta: "#ff8a6b" }
  return (
    <Window url="mirestaurante.software" accent="#f2a65a">
      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-5 sm:p-4">
        <div className="sm:col-span-3">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-fog/50">Salón principal</div>
          <div className="grid grid-cols-4 gap-2">
            {tables.map(([n, s]) => (
              <div
                key={n}
                className="flex aspect-square flex-col items-center justify-center rounded-full border-2 bg-slate-50"
                style={{ borderColor: color[s] }}
              >
                <span className="font-display text-lg font-bold">{n}</span>
                <span className="text-[8px] uppercase" style={{ color: color[s] }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <div className="text-[10px] uppercase tracking-widest text-fog/50">Cocina</div>
          {[["Mesa 2", "Tacos al pastor x3", "8 min"], ["Mesa 4", "Enchiladas suizas", "12 min"], ["Mesa 6", "Pozole grande", "4 min"]].map(([m, o, t]) => (
            <div key={m} className="rounded-lg border-l-2 border-[#d9480f] bg-slate-50 p-2">
              <div className="flex justify-between text-[10px]"><span className="font-bold">{m}</span><span className="text-brand">{t}</span></div>
              <div className="truncate text-[10px] text-fog/60">{o}</div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}

export function IntershipsMockup() {
  return (
    <Window url="interships.gg" accent="#9b8cff">
      <div className="relative overflow-hidden p-5">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#9b8cff]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-aqua/10 blur-3xl" />
        <div className="relative">
          <div className="mb-1 font-display text-2xl font-bold">interships<span className="text-[#9b8cff]">.gg</span></div>
          <div className="mb-4 h-2 w-40 rounded bg-slate-200" />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                <div
                  className="mb-2 aspect-video rounded-lg"
                  style={{ background: `linear-gradient(135deg, hsl(${250 + i * 30} 60% 45%), hsl(${200 + i * 40} 60% 20%))` }}
                />
                <div className="mb-1 h-1.5 w-3/4 rounded bg-slate-300" />
                <div className="h-1.5 w-1/2 rounded bg-slate-200" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <div className="rounded-full bg-[#9b8cff] px-4 py-1.5 text-[11px] font-bold text-white">Entrar</div>
            <div className="rounded-full border border-slate-300 px-4 py-1.5 text-[11px]">Explorar</div>
          </div>
        </div>
      </div>
    </Window>
  )
}
