// Capturas reales de cada producto, en una pantalla holográfica con cabecera de transmisión.
import Image from "next/image"

// Marco: cabecera con el código y la señal "en vivo", la captura limpia (legible) y un velo verde muy leve con líneas de barrido.
function Monitor({ model, color, children }) {
  return (
    <figure className="hud sweep relative p-2 md:p-2.5">
      <span className="brackets" />
      <figcaption className="readout flex items-center justify-between px-2 pt-1 pb-2.5 text-[10px] text-sage">
        <span>Transmisión · {model}</span>
        <span className="flex items-center gap-1.5 text-mint">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} aria-hidden="true" />
          En vivo
        </span>
      </figcaption>
      <div className="scan relative overflow-hidden border border-phos/20">
        {children}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(77,255,154,0.06),transparent_40%,rgba(3,8,6,0.25))]" />
      </div>
    </figure>
  )
}

const shot = (src, alt, w, h) => (
  <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 1024px) 600px, 92vw" className="h-auto w-full" />
)

export const TienditaMockup = () => (
  <Monitor model="HY-01" color="#e8750c">
    {shot("/productos/mitiendita-app.webp", "Pantalla de venta del punto de venta Mitiendita", 2000, 1161)}
  </Monitor>
)
export const RestauranteMockup = () => (
  <Monitor model="HY-02" color="#c8341b">
    {shot("/productos/mirestaurante-landing.webp", "Pase de cocina y mapa de mesas de Mirestaurante", 2000, 1158)}
  </Monitor>
)
export const InternshipsMockup = () => (
  <Monitor model="HY-03" color="#10b981">
    {shot("/productos/internships-landing.png", "Página de inicio de internships.gg", 1440, 900)}
  </Monitor>
)
export const CaresiaMockup = () => (
  <Monitor model="HY-04" color="#2a5d9f">
    {shot("/productos/caresia-landing.webp", "Agenda de citas de Caresia, software para clínicas dentales y consultorios médicos", 2000, 1159)}
  </Monitor>
)
export const MiInfoMockup = () => (
  <Monitor model="HY-05" color="#1f3a5f">
    {shot("/productos/miinfo-landing.webp", "Página de inicio de Mi Info con una tarjeta de presentación de ejemplo", 2000, 1160)}
  </Monitor>
)
export const BeHiveMockup = () => (
  <Monitor model="HY-06" color="#b45309">
    {shot("/productos/behive-landing.webp", "Lista de tickets de BeHive, mesa de ayuda profesional con precio en pesos", 2000, 1163)}
  </Monitor>
)
