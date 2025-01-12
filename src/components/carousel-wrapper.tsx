import { HeroCarousel } from "./carousel"
import { Suspense } from "react"
import fetchFromStrapi from "@/lib/strapi"

async function getCarouselItems() {
  const response = await fetchFromStrapi("carousel-items", {
    next: {
      tags: ["carousel-items"],
      revalidate: 0,
    },
    cache: "no-store",
  })
	
  return response.data.map((slide: any) => ({
    id: slide.id,
    url: slide.image
    //url: `http://89.104.69.151:1338/uploads/2_6d68ff2a53.png`,
  }))

  return response
}

export async function CarouselWrapper({ mobile }: { mobile?: boolean }) {
  const items = await getCarouselItems()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroCarousel mobile={mobile && mobile} items={items} />
    </Suspense>
  )
}
