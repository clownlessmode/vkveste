"use client"

import {
  InlineCalendar,
  InlineQuests,
} from "@/components/sections/calendar/sections"
import { MaxWidthWrapper } from "@/components/width-wrapper"
import fetchFromStrapi from "@/lib/strapi"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

interface StrapiQuest {
  id: number
  name: string
  slug: string
  statistics: {
    type: "key" | "sword" | "skull" | "money" | "potion" | "hat" | "drink"
    difficulty: number
    players: string
  }
  timelines: Array<{
    days: string[]
  }>
  disabled: boolean
}

interface TransformedQuest {
  id: string
  name: string
  type: "key" | "sword" | "skull" | "money" | "potion" | "hat" | "drink"
  difficulty: 1 | 2 | 3
  timeSlots: Array<{
    id: string
    time: string
    price: number
  }>
}

export default function QuestsPage() {
  const searchParams = useSearchParams()
  const initialQuestId = searchParams.get("questId")

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [quests, setQuests] = useState<StrapiQuest[]>([])
  const [contact, setContact] = useState([])

  useEffect(() => {
    const fetchQuests = async () => {
      const response = await fetchFromStrapi("quests", {
        next: { tags: ["quests"] },
      })
      setQuests(response.data)
    }
    const fetchContact = async () => {
      const response = await fetchFromStrapi("contact")
      setContact(response.data)
    }
    fetchQuests()
    fetchContact()
  }, [])

  const transformedQuests: TransformedQuest[] = useMemo(() => {
    return quests.map((quest) => ({
      id: String(quest.id),
      name: quest.name,
      type: quest.statistics.type,
      difficulty: quest.statistics.difficulty as 1 | 2 | 3,
      timeSlots: [
        { id: "1", time: "10:00", price: 3000 },
        { id: "2", time: "12:00", price: 3000 },
        { id: "3", time: "14:00", price: 3500 },
        { id: "4", time: "16:00", price: 3500 },
        { id: "5", time: "18:00", price: 4000 },
        { id: "6", time: "20:00", price: 4000 },
      ],
      disabled: quest.disabled,
    }))
  }, [quests])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <div className="flex flex-col py-[50px] xl:py-[140px]">
      <MaxWidthWrapper className="!max-w-[1480px]">
        <div className="mb-5 flex flex-col gap-y-2.5 border-b border-white/30 pb-2.5 xl:mb-2.5 xl:pb-3">
          <div className="inline-flex items-center justify-between pb-0 text-[#909090] xl:pb-2.5">
            <span className="text-[17px] font-medium leading-[25.15px] xl:text-[24px] xl:leading-[48px]">
              Расписание - {format(selectedDate, "d MMMM", { locale: ru })} -{" "}
              {format(
                new Date(selectedDate.getTime() + 29 * 24 * 60 * 60 * 1000),
                "d MMMM",
                { locale: ru }
              )}
            </span>
            <span className="hidden text-[16px] leading-[24px] xl:block">
              Стоимость игры указана за команду
            </span>
          </div>
          <InlineCalendar onSelectDate={handleDateSelect} />
        </div>
        <div className="flex flex-col gap-y-[7px]">
          <span className="hidden text-[24px] font-medium leading-[48px] text-[#909090] xl:block">
            Квесты
          </span>
          <InlineQuests
            quests={transformedQuests}
            selectedDate={selectedDate}
            initialQuestId={initialQuestId}
          />
        </div>
        <p className="w-full pt-2.5 text-center text-[12px] sm:pt-10 sm:text-[14px]">
          При записи на вечерние сеансы (после 21.00) обязательна предоплата{" "}
          {contact.baseQuestPrice} рублей
        </p>
      </MaxWidthWrapper>
    </div>
  )
}
