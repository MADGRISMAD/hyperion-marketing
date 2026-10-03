// Ilustraciones de interfaz hechas con CSS para los productos.

function Window({ url, children, accent = "#7ee2a8" }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-forest-900/90 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f2c14e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5ad17a]" />
        <div className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-xs text-cream/60">
          <span style={{ color: accent }}>●</span> {url}
        </div>
      </div>
      {children}
    </div>
  )
}

export function TienditaMockup() {
  const products = [
    ["Refresco 600ml", "$22"],
    ["Pan dulce", "$12"],
    ["Leche 1L", "$28"],
    ["Café molido", "$89"],
    ["Galletas", "$18"],
    ["Huevo 12 pz", "$46"],
  ]
  return (
    <Window url="mitiendita.software" accent="#7ee2a8">
      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-5 sm:p-4">
        <div className="grid grid-cols-3 gap-2 sm:col-span-3">
          {products.map(([n, p], i) => (
            <div key={n} className="rounded-xl border border-white/5 bg-white/[0.04] p-2.5">
              <div
                className="mb-2 aspect-[4/3] rounded-lg"
                style={{ background: `linear-gradient(135deg, hsl(${140 + i * 25} 45% 30%), hsl(${150 + i * 25} 50% 18%))` }}
              />
              <div className="truncate text-[10px] text-cream/70">{n}</div>
              <div className="text-xs font-bold text-moss">{p}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col rounded-xl sm:col-span-2 border border-white/5 bg-black/30 p-3">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-cream/50">Ticket #1042</div>
          {[["Leche 1L", "x2", "$56"], ["Pan dulce", "x4", "$48"], ["Café molido", "x1", "$89"]].map(([n, q, t]) => (
            <div key={n} className="flex justify-between border-b border-dashed border-white/10 py-1.5 text-[10px] text-cream/80">
              <span className="truncate">{n} <span className="text-cream/40">{q}</span></span>
              <span>{t}</span>
            </div>
          ))}
          <div className="mt-auto pt-3">
            <div className="flex items-end justify-between">
              <span className="text-[10px] text-cream/50">Total</span>
              <span className="font-display text-2xl font-bold text-cream">$193</span>
            </div>
            <div className="mt-2 rounded-lg bg-moss py-2 text-center text-[11px] font-bold text-forest-950">Cobrar</div>
          </div>
        </div>
      </div>
    </Window>
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
          <div className="mb-2 text-[10px] uppercase tracking-widest text-cream/50">Salón principal</div>
          <div className="grid grid-cols-4 gap-2">
            {tables.map(([n, s]) => (
              <div
                key={n}
                className="flex aspect-square flex-col items-center justify-center rounded-full border-2 bg-white/[0.03]"
                style={{ borderColor: color[s] }}
              >
                <span className="font-display text-lg font-bold">{n}</span>
                <span className="text-[8px] uppercase" style={{ color: color[s] }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <div className="text-[10px] uppercase tracking-widest text-cream/50">Cocina</div>
          {[["Mesa 2", "Tacos al pastor x3", "8 min"], ["Mesa 4", "Enchiladas suizas", "12 min"], ["Mesa 6", "Pozole grande", "4 min"]].map(([m, o, t]) => (
            <div key={m} className="rounded-lg border-l-2 border-amber bg-white/[0.04] p-2">
              <div className="flex justify-between text-[10px]"><span className="font-bold">{m}</span><span className="text-amber">{t}</span></div>
              <div className="truncate text-[10px] text-cream/60">{o}</div>
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
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#9b8cff]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-moss/20 blur-3xl" />
        <div className="relative">
          <div className="mb-1 font-display text-2xl font-bold">interships<span className="text-[#9b8cff]">.gg</span></div>
          <div className="mb-4 h-2 w-40 rounded bg-white/10" />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
                <div
                  className="mb-2 aspect-video rounded-lg"
                  style={{ background: `linear-gradient(135deg, hsl(${250 + i * 30} 60% 45%), hsl(${200 + i * 40} 60% 20%))` }}
                />
                <div className="mb-1 h-1.5 w-3/4 rounded bg-white/20" />
                <div className="h-1.5 w-1/2 rounded bg-white/10" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <div className="rounded-full bg-[#9b8cff] px-4 py-1.5 text-[11px] font-bold text-forest-950">Entrar</div>
            <div className="rounded-full border border-white/15 px-4 py-1.5 text-[11px]">Explorar</div>
          </div>
        </div>
      </div>
    </Window>
  )
}
