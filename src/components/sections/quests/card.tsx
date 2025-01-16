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
  index: number
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
  index,
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
        "group relative flex h-[161px] w-full max-w-[311px] flex-col items-center justify-center gap-y-2 overflow-hidden rounded-[14px] border-[0.5px] border-white/50 transition-all duration-300 hover:scale-105 sm:h-[103px] sm:max-w-none sm:gap-y-1 md:h-40 md:gap-3 lg:h-[220px] xl:w-[420px] xl:gap-y-4"
      )}
    >
      {/* Фоновое изображение с затемнением */}
      <div
        className="absolute inset-0 before:absolute before:inset-0 before:z-10 before:bg-black/60"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Контент */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="inline-flex items-center sm:mb-1">
          {difficultyIcons}
        </div>
        <span className="max-w-[326px] font-bold uppercase leading-[21px] sm:text-xs sm:leading-[14px] md:text-lg lg:text-[17px] xl:text-2xl xl:leading-[30px]">
          {label}
        </span>
        <p className="mt-[12px] text-xs leading-[14px] sm:mt-[7.5px] sm:text-[8px] md:mt-[12px] md:text-xs lg:mt-[16px] xl:mt-[16px] xl:text-[16px] xl:leading-[19px]">
          {description}
        </p>
      </div>

      <div className="absolute bottom-2.5 z-20 inline-flex w-full items-center justify-between gap-x-[5px] px-[14px] xl:gap-x-[7px]">
        <p className="text-xs leading-[14px] sm:text-[6px] md:text-[10px] xl:text-[14px] xl:leading-[19px]">
          ул. Лидии Базановой, д. 20, оф. {index > 2 ? "30" : "28"}
        </p>
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
