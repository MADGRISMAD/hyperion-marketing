/** @type {import('next').NextConfig} */
const faro = "https://faro.15-235-62-27.sslip.io"
const nextConfig = {
  // El blog de Hyperion lo escribe y publica FaroContenido; aquí solo se le da la ruta /blog en este dominio.
  async rewrites() {
    return [
      { source: "/blog", destination: `${faro}/x/hyperionmkt.com` },
      { source: "/blog/:path*", destination: `${faro}/x/hyperionmkt.com/:path*` },
    ]
  },
}

export default nextConfig
