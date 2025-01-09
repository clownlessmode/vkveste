import { Metadata } from "next"
import { getSeoData } from "@/lib/seo"

const DEFAULT_SEO = {
  metaTitle: "Default Title",
  metaDescription: "Default description for the website",
  metaRobots: "index,follow",
}

export async function generateMetadata(path: string): Promise<Metadata> {
  const seoData = (await getSeoData(path)) ?? DEFAULT_SEO
  const imageUrl = seoData.metaImage?.data?.attributes.url

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    keywords: seoData.keywords,
    robots: seoData.metaRobots,
    canonical:
      seoData.canonicalURL || `${process.env.NEXT_PUBLIC_SITE_URL}/${path}`,
    openGraph: imageUrl
      ? {
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`,
              width: seoData.metaImage?.data?.attributes.width,
              height: seoData.metaImage?.data?.attributes.height,
              alt: seoData.metaImage?.data?.attributes.alternativeText,
            },
          ],
        }
      : undefined,
  }
}
