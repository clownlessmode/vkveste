/** @type {import('next').NextConfig} */
const nextConfig = {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
    },
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["tvr.mir-kvestov.ru", "localhost", "localhost"],
  },
}

export default nextConfig
