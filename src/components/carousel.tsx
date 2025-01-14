"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import fetchFromStrapi from "@/lib/strapi"

interface CarouselItem {
  id: number
  image: string
}

interface CarouselProps {
  className?: string
  mobile?: boolean
  items: any[]
}

export async function getCarouselItems() {
  const response = await fetchFromStrapi("carousel-items", {
    next: {
      tags: ["carousel-items"],
      revalidate: 0,
    },
    cache: "no-store",
  })

  return response.data.map((slide: any) => ({
    id: slide.id,
    url: slide.image,
  }))
}

export function HeroCarousel({ className, mobile, items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((current) =>
        current === items.length - 1 ? 0 : current + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [items.length])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  }

  return mobile ? (
    <div className={cn("w-full overflow-hidden", className)}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          <div className="relative flex h-[196px] w-full flex-col overflow-hidden rounded-[10px] sm:h-[404px] sm:rounded-[21px]">
            <div className="absolute left-0 top-0 z-0 h-full w-full">
              <Image
                src={`http://localhost:1338${items[currentIndex].url.url}`}
                alt={items[currentIndex].id.toString()}
                fill
                quality={100}
                className="object-cover"
                priority={currentIndex === 0}
              />
            </div>
            <div
              className="absolute left-0 top-0 z-0 h-full w-full"
              style={{
                background: `linear-gradient(180deg, #151515 0%, rgba(21, 21, 21, 0) 60%, rgba(21, 21, 21, 0.978485) 100%)`,
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  ) : (
    <div className={cn("w-full overflow-hidden", className)}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          <div className="relative flex w-full flex-col overflow-hidden border-2 border-none sm:h-[205px] sm:rounded-[8px] sm:border-[0.65px] sm:border-brand-main sm:shadow-custom-shadow md:rounded-none md:border-none md:shadow-none lg:h-[539px] lg:max-h-[470px] lg:rounded-[30px] lg:shadow-custom-shadow xl:max-h-[539px]">
            <div className="absolute left-0 top-0 z-0 hidden h-full w-full sm:block md:hidden lg:block">
              <Image
                src={`http://localhost:1338${items[currentIndex].url.url}`}
                alt={items[currentIndex].id.toString()}
                fill
                quality={100}
                className="object-cover"
                priority={currentIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#151515] from-40% to-black/0" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
