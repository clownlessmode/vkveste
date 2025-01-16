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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    })
    return config
  },
}

export default nextConfig
