import { useId } from "react"

// Destello cromado de 4 puntas
export default function Sparkle({ className = "", style }) {
  const id = useId()
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#b7b1e6" />
          <stop offset="0.55" stopColor="#ffffff" />
          <stop offset="1" stopColor="#8a83c9" />
        </linearGradient>
      </defs>
      <path
        d="M12 0 C12.9 7.2 16.8 11.1 24 12 C16.8 12.9 12.9 16.8 12 24 C11.1 16.8 7.2 12.9 0 12 C7.2 11.1 11.1 7.2 12 0 Z"
        fill={`url(#${id})`}
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="0.4"
      />
    </svg>
  )
}
