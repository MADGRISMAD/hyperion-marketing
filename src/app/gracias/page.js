import Link from "next/link"

export default function Gracias() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">¡Gracias por tu mensaje!</h1>
        <p className="text-zinc-400">Nos pondremos en contacto contigo pronto.</p>
        <Link href="/">
          <span className="text-green-400 hover:underline">Volver al inicio</span>
        </Link>
      </div>
    </div>
  )
}
