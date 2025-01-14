/** @type {import('next').NextConfig} */
const nextConfig = {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "89.104.69.151",
    },
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["tvr.mir-kvestov.ru", "89.104.69.151", "89.104.69.151"],
  },
}

export default nextConfig
