'use client'

import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useState } from "react"
import { InlineCalendar, InlineQuests } from "./sections"
import { MaxWidthWrapper } from "@/components/width-wrapper"

interface QuestCalendarProps {
  transformedQuests: any[]
  contact: { baseQuestPrice: number }
}

export function QuestCalendar({ transformedQuests, contact }: QuestCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <div className="flex flex-col py-[50px] xl:py-[140px]">
      <MaxWidthWrapper className="!max-w-[1480px]">
        <div className="mb-5 flex flex-col gap-y-2.5 border-b border-white/30 pb-2.5 xl:mb-2.5 xl:pb-3">
          <div className="inline-flex items-center justify-between pb-0 text-[#909090] xl:pb-10">
            <span className="text-[17px] font-medium leading-[25.15px] xl:text-[24px] xl:leading-[48px]">
              Расписание - {format(selectedDate, "d MMMM", { locale: ru })}
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