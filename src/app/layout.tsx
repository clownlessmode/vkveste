import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { headers } from "next/headers"
import { Providers } from "../components/providers"
import NavigationBar from "../components/navbar"
import Footer from "../components/footer"
import { cn } from "@/utils"
import { getSeoData } from "@/lib/seo"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const gilroy = localFont({
  src: [
    {
      path: "./fonts/gilroy-light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/gilroy-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/gilroy-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/gilroy-semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/gilroy-bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/gilroy-extrabold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  display: "swap",
})

const defaultMetadata: Metadata = {
  title: "ВКВЕСТЕ",
  metadataBase: new URL("https://vkveste.ru"),
  description:
    "Способ погрузиться в мир испытаний, где каждый участник может стать героем истории",
  keywords: ["vkveste", "vzaperti", "взаперти", "вквесте", "квесты тверь"],
  openGraph: {
    title: "ВКВЕСТЕ",
    description:
      "Способ погрузиться в мир испытаний, где каждый участник может стать героем истории",
    url: "https://vkveste.ru",
    siteName: "ВКВЕСТЕ",
    locale: "ru",
    type: "website",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const pathname = headersList.get("x-pathname") || "/"
  const normalizedPath = pathname.replace(/^\//, "")
  
  const seoData = await getSeoData(normalizedPath)
  
  if (!seoData) return defaultMetadata

  return {
    ...defaultMetadata,
    title: seoData.metaTitle || defaultMetadata.title,
    description: seoData.metaDescription || defaultMetadata.description,
    ...(seoData.keywords && { keywords: seoData.keywords.split(',').map(k => k.trim()) }),
    ...(seoData.metaRobots && { robots: seoData.metaRobots }),
    ...(seoData.canonicalURL && {
      alternates: {
        canonical: seoData.canonicalURL,
      },
    }),
    openGraph: {
      ...defaultMetadata.openGraph,
      ...(seoData.metaImage?.data && {
        images: [{
          url: `http://localhost:1338${seoData.metaImage.data.attributes.url}`,
          width: seoData.metaImage.data.attributes.width,
          height: seoData.metaImage.data.attributes.height,
          alt: seoData.metaImage.data.attributes.alternativeText,
        }],
      }),
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(gilroy.variable)}>
      <body className="relative mx-auto w-full bg-gray-100 font-gilroy text-white antialiased">
        <Providers>
          <NavigationBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
