/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["tvr.mir-kvestov.ru", "localhost"],
  },
}

export default nextConfig
