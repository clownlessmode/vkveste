import { cache } from "react"

interface SeoData {
  url: string
  metaTitle: string
  metaDescription: string
  metaImage?: {
    data?: {
      attributes: {
        url: string
        width: number
        height: number
        alternativeText?: string
      }
    }
  }
  keywords?: string
  metaRobots?: string
  canonicalURL?: string
}


interface StrapiResponse {
  data: Array<{
    id: number
    documentId: string
    attributes: SeoData
    createdAt: string
    updatedAt: string
    publishedAt: string
  }>
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export const getSeoData = cache(
  async (path: string): Promise<SeoData | null> => {
    try {
      const normalizedPath = path.startsWith("/") ? path.slice(1) : path

      const response = await fetch(
        `http://localhost:1338/api/seos?filters[url]=${normalizedPath}&populate=*`,
        { next: { revalidate: 3600 } }
      )

      if (!response.ok) return null

      const data: StrapiResponse = await response.json()
      return data.data[0]?.attributes ?? null
    } catch (error) {
      console.error("Error fetching SEO data:", error)
      return null
    }
  }
)
