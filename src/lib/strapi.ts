interface StrapiResponse<T> {
  data: {
    id: number
    attributes: T
  }[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      total: number
    }
  }
}

const STRAPI_URL = "127.0.0.1:1338"
const STRAPI_TOKEN =
  "698b1c5b3ffb7a7e71fbcea5de9e492399f6b277d65b6d4f71d313ea3be6e219a39bb1587ce0bb525cb1dab1cd6c8fa57565e65d2ba20558dded8f2c55364a1dfb73893888d96489bc05aee28ce8def76e8bbea3c4a276195200d63ccf430845d19f44892ae40be8a65f881c954916055541496c763cc05198f89773f5420edb"

export default async function fetchFromStrapi<T>(
  endpoint: string,
  options: RequestInit = {},
  populate?: string
): Promise<StrapiResponse<T>> {
  const response = await fetch(
    `http://${STRAPI_URL}/api/${endpoint}?${populate ? populate : "populate=*"}`,
    {
      headers: {
        ...options.headers,
      },
      ...options,
    }
  )

  console.log(`${STRAPI_URL}/api/${endpoint}`)
  if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`)

  return response.json()
}
