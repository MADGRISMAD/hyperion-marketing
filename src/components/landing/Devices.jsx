// Dispositivos hechos en CSS para mostrar las capturas reales de los productos.
import Image from "next/image"

// MacBook: pantalla con bisel negro y muesca, y la base de aluminio un poco más ancha
export function MacBook({ src, alt, w = 1800, h = 1125, priority = false, eager = false, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-[14px] bg-[#0d0d0f] p-[1.6%] shadow-[0_0_0_1px_#2a2a2e,0_50px_90px_-40px_rgba(17,17,20,0.55)] md:rounded-[20px]">
        <span className="absolute top-[1.6%] left-1/2 z-10 h-[2.2%] w-[11%] -translate-x-1/2 rounded-b-[6px] bg-[#0d0d0f]" aria-hidden="true" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-[#1a1a1d]">
          <Image src={src} alt={alt} width={w} height={h} priority={priority} loading={priority ? undefined : eager ? "eager" : "lazy"} sizes="(min-width: 1024px) 900px, 92vw" className="h-full w-full object-cover object-top" />
        </div>
      </div>
      {/* base */}
      <div className="relative -mx-[6%] h-[13px] rounded-b-[16px] bg-[linear-gradient(180deg,#e9e9ec_0%,#c8c8cd_55%,#9d9da3_100%)] shadow-[0_18px_30px_-14px_rgba(17,17,20,0.45)] md:h-[18px]" aria-hidden="true">
        <span className="absolute top-0 left-1/2 h-[45%] w-[14%] -translate-x-1/2 rounded-b-[10px] bg-[#b4b4ba]" />
      </div>
    </div>
  )
}

// iPhone: marco de titanio, pantalla redondeada y la isla dinámica. Con `children` en lugar de `src` se dibuja la pantalla a mano.
export function IPhone({ src, alt, w = 785, h = 1700, priority = false, eager = false, className = "", children }) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[17%/8%] bg-[linear-gradient(135deg,#5b5b60,#2b2b2f_40%,#5d5d62)] p-[3%] shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_50px_80px_-35px_rgba(17,17,20,0.6)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[14%/6.6%] bg-black">
        {children ?? (
          <Image src={src} alt={alt} width={w} height={h} priority={priority} loading={priority ? undefined : eager ? "eager" : "lazy"} sizes="(min-width: 1024px) 320px, 45vw" className="h-full w-full object-cover object-top" />
        )}
        <span className="absolute top-[2.2%] left-1/2 h-[3.6%] w-[30%] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
      </div>
    </div>
  )
}

// Notificación de iOS: ícono de color de la app, nombre, hora y mensaje
export function Notif({ app, color, time = "ahora", title, text, icon: Icon, className = "", style }) {
  return (
    <div className={`notif flex w-[300px] items-start gap-3 p-3.5 ${className}`} style={style}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] text-white" style={{ background: color }}>
        {Icon ? <Icon className="h-5 w-5" strokeWidth={2.2} /> : app[0]}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="flex items-baseline justify-between gap-2 text-[12px] text-mist">
          <span className="font-semibold tracking-wide uppercase">{app}</span>
          <span>{time}</span>
        </span>
        <span className="mt-1 block text-[14px] font-semibold text-ink">{title}</span>
        {text && <span className="mt-0.5 block text-[13px] text-graphite">{text}</span>}
      </span>
    </div>
  )
}
