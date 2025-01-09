"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const BASE_URL = "https://tvr.mir-kvestov.ru"
const DEFAULT_PATH = "/companies/vzaperti-tver#quests"

interface QuestMap {
  [key: string]: string
}

const questUrlMap: QuestMap = {
  "uznik-podzemelya": "/quests/vzaperti-uznik-podzemelya",
  "ograblenie-banka": "/quests/vzaperti-ograblenie-banka",
  "texasskaya-reznya": "/quests/vzaperti-texasskaya-reznya",
  piraty: "/quests/vzaperti-piraty",
  professor: "/quests/vzaperti-professor",
  "dikiy-zapad": "/quests/vzaperti-dikiy-zapad",
  "dikaya-banda": "/quests/vzaperti-dikaya-banda",
}

export default function Widget() {
  const pathname = usePathname()
  const questSlug = pathname.split("/").pop()

  const targetUrl =
    questSlug && questUrlMap[questSlug]
      ? `${BASE_URL}${questUrlMap[questSlug]}`
      : `${BASE_URL}${DEFAULT_PATH}`

  return (
    <Link href={targetUrl} target="_blank">
      <Image
        src="https://tvr.mir-kvestov.ru/widgets/8981/img"
        width="388"
        height="171"
        className="h-auto w-[110px] sm:w-[165px] md:w-[264px] lg:w-[352px] xl:w-[207px]"
        alt="Отзывы на Квест в реальности Узник подземелья (Взаперти)"
        title="Отзывы на Квест в реальности Узник подземелья (Взаперти)"
      />
    </Link>
  )
}
