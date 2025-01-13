import DrinkIcon from "@/icons/drink-icon"
import KeyIcon from "@/icons/key-icon"
import SkullIcon from "@/icons/skull-icon"
import SwordIcon from "@/icons/sword-icon"
import MoneyIcon from "@/icons/money-icon"
import PotionIcon from "@/icons/potion-icon"
import HatIcon from "@/icons/hat-icon"
import { cn } from "@/lib/utils"
import Link from "next/link"
import PlayersIcon from "@/icons/players-icon"

export const revalidate = 0

export interface QuestCardProps {
  label: string
  description: string
  type: "key" | "sword" | "skull" | "money" | "potion" | "hat" | "drink"
  difficulty: 1 | 2 | 3
  players: string
  background?: string
  link: string
}

const questIcons = {
  key: (
    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
  ),
  sword: (
    <SwordIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
  ),
  skull: (
    <SkullIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
  ),
  money: (
    <MoneyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
  ),
  potion: (
    <PotionIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
  ),
  hat: (
    <HatIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
  ),
  drink: (
    <DrinkIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
  ),
}

const QuestCard = ({
  label,
  description,
  type,
  difficulty,
  players,
  background,
  link,
}: QuestCardProps) => {
  const difficultyIcons = Array.from({ length: 3 }, (_, index) => (
    <span
      key={index}
      className={index < difficulty ? "text-brand-main" : "text-[#6A6A6A]"}
    >
      {questIcons[type]}
    </span>
  ))
  return (
    <Link
      href={link}
      className={cn(
        "relative flex h-[161px] w-full max-w-[311px] flex-col items-center justify-center gap-y-2 overflow-hidden rounded-[14px] border-[0.5px] border-white/50 transition-all duration-300 hover:scale-105 sm:h-[103px] sm:max-w-none sm:gap-y-1 md:h-40 md:gap-3 lg:h-[220px] xl:w-[420px] xl:gap-y-4"
      )}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="inline-flex items-center sm:mb-1">{difficultyIcons}</div>
      <span className="max-w-[326px] font-bold uppercase leading-[21px] sm:text-xs sm:leading-[14px] md:text-lg lg:text-[17px] xl:text-2xl xl:leading-[30px]">
        {label}
      </span>
      <p className="text-xs leading-[14px] sm:text-[8px] md:text-xs xl:text-[16px] xl:leading-[19px] -mt-[8px]">
        {description}
      </p>
      <div className="absolute bottom-2.5 w-full flex px-[14px] inline-flex items-center gap-x-[5px] xl:gap-x-[7px] justify-between">
        <p className="text-xs leading-[14px] sm:text-[8px] md:text-xs xl:text-[16px] xl:leading-[19px]">ул. Лидии Базановой, д. 20, оф. 30</p>
        <div className="flex items-center gap-x-[5px]">
          <span className="text-xs leading-[14px] lg:text-[16px] xl:leading-[19px]">
            {players}
          </span>
          <PlayersIcon className="size-[17px] lg:size-[24px]" />
      </div>
      </div>
    </Link>
  )
}

export default QuestCard
