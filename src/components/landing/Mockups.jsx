// Capturas reales de cada producto, montadas en un monitor de bisel metálico.
import Image from "next/image"

// Bisel de aluminio con pantalla oscura, foco de encendido del color del producto y número de modelo grabado.
function Monitor({ model, color, children }) {
  return (
    <figure className="rounded-[22px] bg-[linear-gradient(180deg,#f3f4f6_0%,#c7cbd3_48%,#8d939e_52%,#d3d6dc_100%)] p-[10px] shadow-[inset_0_1px_0_#fff,inset_0_-1px_0_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.6),0_40px_80px_-30px_rgba(0,0,0,0.9)] md:p-3.5">
      <div className="overflow-hidden rounded-[12px] bg-black ring-1 ring-black">{children}</div>
      <figcaption className="flex items-center justify-between px-2 pt-2.5 pb-0.5 font-mono text-[10px] tracking-[0.2em] text-[#4b4f58] uppercase">
        <span>Hyperion · {model}</span>
        <span className="h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ background: color, color }} aria-hidden="true" />
      </figcaption>
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
