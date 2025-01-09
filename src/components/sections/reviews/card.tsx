import MagicWandIcon from "@/icons/magic-wand-icon"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

export interface ReviewCardProps {
  name: string
  pfp: string | StaticImageData
  date: string
  rating: 1 | 2 | 3 | 4 | 5
  review: string
  link?: string
}

const ReviewCard = ({
  name,
  pfp,
  date,
  rating,
  review,
  link,
}: ReviewCardProps) => {
  const ratingStars = Array.from({ length: 5 }, (_, index) => (
    <MagicWandIcon
      key={index}
      className={`size-3.5 sm:size-2.5 md:size-3.5 lg:size-auto ${index < rating ? "text-brand-main" : "text-[#6A6A6A]"}`}
    />
  ))
  return (
    <div className="flex flex-col gap-2 rounded-[14px] border border-white/50 bg-gray-100 p-3 lg:gap-y-4 lg:pb-3 lg:pl-5 lg:pr-7 lg:pt-[18px]">
      <div className="inline-flex items-center gap-1.5 lg:gap-x-3">
        <Image
          src={pfp}
          className="size-7 rounded-full lg:size-[54px]"
          alt={name}
          width={54}
          height={54}
        />
        <div className="flex flex-col lg:gap-y-[3px]">
          <span className="leading-[29px] sm:text-xs md:text-lg lg:text-2xl">
            {name}
          </span>
          <span className="text-xs leading-[19px] sm:text-[8px] md:text-xs lg:text-base">
            {date}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-[10px]">
        <div className="inline-flex items-center">{ratingStars}</div>
        <p className="line-clamp-2 text-balance text-xs leading-4 sm:text-[8px] sm:leading-[11px] md:text-xs lg:text-base lg:leading-[22px]">
          {review}
        </p>
      </div>
      <Link
        href={link ? link : "/"}
        className="text-balance text-xs sm:text-[8px] sm:leading-[9px] md:text-xs lg:text-base lg:leading-[22px]"
      >
        Читать дальше
      </Link>
    </div>
  )
}

export default ReviewCard
