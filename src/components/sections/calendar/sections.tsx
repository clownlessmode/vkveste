"use client"

import { cn } from "@/lib/utils"
import { addDays, format, isSameDay, isWeekend } from "date-fns"
import { ru } from "date-fns/locale"
import { useState, useCallback, useMemo, useEffect } from "react"
import BookingForm from "../../forms/booking-form"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"

import DrinkIcon from "@/icons/drink-icon"
import KeyIcon from "@/icons/key-icon"
import SkullIcon from "@/icons/skull-icon"
import SwordIcon from "@/icons/sword-icon"
import MoneyIcon from "@/icons/money-icon"
import PotionIcon from "@/icons/potion-icon"
import HatIcon from "@/icons/hat-icon"

const questIcons = {
  key: <KeyIcon className="size-[15px] xl:size-[17px]" />,
  sword: <SwordIcon className="size-[15px] xl:size-[17px]" />,
  skull: <SkullIcon className="size-[15px] xl:size-[17px]" />,
  money: <MoneyIcon className="size-[15px] xl:size-[17px]" />,
  potion: <PotionIcon className="size-[15px] xl:size-[17px]" />,
  hat: <HatIcon className="size-[15px] xl:size-[17px]" />,
  drink: <DrinkIcon className="size-[15px] xl:size-[17px]" />,
}

interface InlineCalendarProps {
  onSelectDate: (date: Date) => void
}

export function InlineCalendar({ onSelectDate }: InlineCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date()
    setTimeout(() => onSelectDate(today), 0)
    return today
  })

  const dates = useMemo(
    () => Array.from({ length: 30 }, (_, i) => addDays(new Date(), i)),
    []
  )

  const weeks = useMemo(() => {
    const result = []
    let currentWeek = []

    for (const date of dates) {
      currentWeek.push(date)

      if (currentWeek.length === 7) {
        result.push(currentWeek)
        currentWeek = []
      }
    }

    if (currentWeek.length > 0) {
      result.push(currentWeek)
    }

    return result
  }, [dates])

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    onSelectDate(date)
  }

  return (
    //   // <div className="inline-flex items-center gap-x-[4px] overflow-x-scroll px-[17px] xl:overflow-auto xl:px-0">
    //   <div className="flex flex-col gap-y-1">
    //    {weeks.map((week, weekIndex) => (
    //     <div key={weekIndex} className="inline-flex items-center gap-x-[4px] overflow-x-scroll xl:overflow-auto">
    //       {week.map((date) => (
    //         <button
    //           onClick={() => handleDateClick(date)}
    //           className={cn(
    //             "inline-flex size-[38px] w-[38px] shrink-0 items-start rounded-[7px] border border-transparent text-[#909090] xl:size-[44px] xl:w-[44px]",
    //             isSameDay(date, selectedDate)
    //               ? "!border-none !bg-[#F8470F] text-white"
    //               : "",
    //             isWeekend(date) ? "border-[#909090] bg-gray-200" : ""
    //           )}
    //           key={date.toISOString()}
    //         >
    //           <div className="mx-auto flex flex-col items-center justify-center">
    //             <span className="text-[12px] font-semibold leading-[17px] xl:text-[14px] xl:leading-[19.6px]">
    //               {format(date, "d")}
    //             </span>
    //             <span className="text-[12px] leading-[17px] xl:text-[14px] xl:leading-[19.6px]">
    //               {format(date, "eee", { locale: ru }).slice(0, 2).replace("су", "сб")}
    //             </span>
    //           </div>
    //         </button>
    //       ))}
    //     </div>
    //   ))}
    // </div>
    <div className="inline-flex items-center gap-x-[4px] overflow-x-scroll px-[17px] pb-[25px] xl:overflow-auto xl:px-0">
      {dates.map((date) => (
        <button
          onClick={() => handleDateClick(date)}
          className={cn(
            "flex size-[38px] w-[38px] shrink-0 items-start rounded-[7px] border border-transparent text-[#909090] xl:size-[44px] xl:w-[44px]",
            isSameDay(date, selectedDate)
              ? "!border-none !bg-[#F8470F] text-white"
              : "",
            isWeekend(date) ? "border-[#909090] bg-gray-200" : ""
          )}
          key={date.toISOString()}
        >
          <div className="mx-auto flex flex-col items-center justify-center">
            <span className="text-[12px] font-semibold leading-[17px] xl:text-[14px] xl:leading-[19.6px]">
              {format(date, "d")}
            </span>
            <span className="text-[12px] leading-[17px] xl:text-[14px] xl:leading-[19.6px]">
              {format(date, "eee", { locale: ru })
                .slice(0, 2)
                .replace("су", "сб")}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}

interface TimeSlot {
  id: string
  time: string
  price: number
}

interface Quest {
  id: string
  name: string
  timeSlots: TimeSlot[]
  type: "horror" | "drinking" | "quest"
  difficulty: 1 | 2 | 3
  disabled?: boolean
}

interface InlineQuestsProps {
  quests: Quest[]
  selectedDate: Date
  singleQuestId?: string
  initialQuestId?: string | null
}

export function InlineQuests({
  quests,
  selectedDate,
  singleQuestId,
  initialQuestId,
}: InlineQuestsProps) {
  const activeQuests = useMemo(() => {
    const filteredQuests = quests.filter((quest) => !quest.disabled)
    return singleQuestId
      ? filteredQuests.filter((quest) => quest.name === singleQuestId)
      : filteredQuests
  }, [quests, singleQuestId])

  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null)

  useEffect(() => {
    if (initialQuestId) {
      const quest = activeQuests.find((q) => q.id === initialQuestId)
      if (quest) {
        setSelectedQuestId(quest.id)
      }
    } else if (activeQuests.length > 0 && !selectedQuestId) {
      setSelectedQuestId(activeQuests[0].id)
    }
  }, [activeQuests, selectedQuestId, initialQuestId])

  const normalizedDate = useMemo(() => {
    const date = new Date(selectedDate)
    date.setHours(0, 0, 0, 0)
    return date
  }, [selectedDate])

  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: async () => {
      const response = await client.booking.getBookings.$get({
        startDate: format(normalizedDate, "yyyy-MM-dd"),
      })
      const data = await response.json()
      if (data.success) {
        return data.bookings
      }
      setSelectedQuestId(activeQuests[0].id)
      return []
    },
  })

  const bookingsMap = useMemo(() => {
    const map: Record<string, boolean> = {}
    bookingsData?.forEach((booking: any) => {
      const key = `${booking.questName}-${booking.date}-${booking.slot}-${booking.time}`
      map[key] = true
    })
    return map
  }, [bookingsData])

  const isSlotAvailable = useCallback(
    (questName: string, date: string, slotId: string, time: string) => {
      const key = `${questName}-${date}-${slotId}-${time}`
      return !bookingsMap[key]
    },
    [bookingsMap]
  )

  return (
    <div className="flex flex-col gap-y-5 xl:gap-y-[30px]">
      {/* Mobile Quest Selector */}
      {!singleQuestId && (
        <div className="flex gap-[5px] overflow-x-auto md:hidden">
          {activeQuests.map((quest) => (
            <button
              key={quest.id}
              onClick={() =>
                setSelectedQuestId(
                  selectedQuestId === quest.id ? null : quest.id
                )
              }
              className={cn(
                "flex h-[72px] w-full max-w-[140px] shrink-0 flex-col items-center justify-between gap-y-1 rounded-[12px] border border-white/50 bg-black px-2 py-2",
                "text-center text-[12px] font-semibold",
                selectedQuestId === quest.id &&
                  "border-brand-main bg-brand-main/10"
              )}
            >
              {quest.name}
              <div className="inline-flex items-center gap-x-[1px]">
                {Array.from({ length: 3 }, (_, index) => (
                  <span
                    key={index}
                    className={
                      index < quest.difficulty
                        ? "text-brand-main"
                        : "text-[#6A6A6A]"
                    }
                  >
                    {questIcons[quest.type]}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden flex-col gap-y-[30px] md:flex">
        {activeQuests.map((quest) => (
          <QuestTimelineRow
            key={quest.id}
            quest={quest}
            selectedDate={selectedDate}
            isSlotAvailable={isSlotAvailable}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {activeQuests.map(
          (quest) =>
            (singleQuestId || selectedQuestId === quest.id) && (
              <QuestTimelineRow
                key={quest.id}
                quest={quest}
                selectedDate={selectedDate}
                isSlotAvailable={isSlotAvailable}
                isLoading={isLoading}
                isMobile
              />
            )
        )}
      </div>
    </div>
  )
}
interface QuestTimelineRowProps {
  quest: Quest
  selectedDate: string
  isSlotAvailable: (
    questName: string,
    date: Date,
    slotId: string,
    time: string
  ) => boolean
  isLoading: boolean
  isMobile?: boolean
}

function QuestTimelineRow({
  quest,
  selectedDate,
  isSlotAvailable,
  isLoading,
  isMobile,
}: QuestTimelineRowProps) {
  const slotsByPrice = quest.timeSlots.reduce(
    (acc, slot) => {
      if (!acc[slot.price]) acc[slot.price] = []
      acc[slot.price].push(slot)
      return acc
    },
    {} as Record<number, TimeSlot[]>
  )

  return (
    <div className="flex flex-col md:flex-row">
      {!isMobile && (
        <div className="w-[150px] shrink-0">
          <div className="flex h-[80px] w-[160px] flex-col items-center justify-center rounded-[14px] border border-white/50 bg-black p-2 xl:gap-y-2">
            <span className="text-center text-[14px] font-semibold leading-[17px]">
              {quest.name}
            </span>
            <div className="!:*:size-[17px] inline-flex max-h-[17px] items-center gap-x-[1px]">
              {Array.from({ length: 3 }, (_, index) => (
                <span
                  key={index}
                  className={
                    index < quest.difficulty
                      ? "text-brand-main"
                      : "text-[#6A6A6A]"
                  }
                >
                  {questIcons[quest.type]}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "inline-block overflow-auto align-top",
          isMobile ? "w-full" : "w-[calc(100%-150px)]"
        )}
      >
        {isMobile ? (
          <div className="flex flex-col gap-y-[5px]">
            <tr className="flex w-full flex-col gap-y-[5px]">
              {Object.entries(slotsByPrice).map(([price, slots]) => (
                <td
                  key={price}
                  className="h-[80px] w-full rounded-[14px] border border-white/50 bg-black p-[5px]"
                >
                  <div className="flex h-full flex-col items-center justify-center gap-y-0.5 pt-[15px]">
                    <div
                      className={cn(
                        "grid items-center justify-center gap-x-5",
                        slots.length === 1
                          ? "grid-cols-1"
                          : slots.length === 2
                            ? "grid-cols-2"
                            : "grid-cols-3"
                      )}
                    >
                      {slots.map((timeSlot) => {
                        const formattedDate = format(selectedDate, "yyyy-MM-dd")
                        const available = isSlotAvailable(
                          quest.name,
                          formattedDate,
                          `${timeSlot.time}-${timeSlot.price}`,
                          timeSlot.time
                        )

                        return (
                          <BookingForm
                            key={timeSlot.id}
                            questName={quest.name}
                            time={timeSlot.time}
                            questId={quest.id}
                            slot={`${timeSlot.time}-${timeSlot.price}`}
                            price={timeSlot.price}
                            date={formattedDate}
                            disabled={!available}
                          >
                            <button
                              className={cn(
                                "inline-flex max-h-[36px] w-[70px] items-center justify-center rounded-[14px] border border-white/50 text-center text-[13px] font-semibold leading-[34px] text-white transition-colors",
                                available
                                  ? "bg-[#121212] hover:bg-[#1a1a1a]"
                                  : "cursor-not-allowed border-none bg-brand-main text-[#151515]"
                              )}
                              disabled={!available || isLoading}
                            >
                              {isLoading ? (
                                <span className="animate-pulse">...</span>
                              ) : (
                                timeSlot.time
                              )}
                            </button>
                          </BookingForm>
                        )
                      })}
                    </div>
                    <span className="text-[12px] font-semibold leading-[26px] text-brand-main">
                      {price} ₽
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          </div>
        ) : (
          <table className="w-full border-separate border-spacing-x-10">
            <tbody>
              <tr>
                {Object.entries(slotsByPrice).map(([price, slots]) => (
                  <td
                    key={price}
                    className="h-[80px] rounded-[14px] border border-white/50 bg-black p-[5px]"
                    style={{ width: `${slots.length * 80}px` }}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-y-2 pt-[5px]">
                      <div className="flex w-full items-center justify-around">
                        {slots.map((timeSlot) => {
                          const formattedDate = format(
                            selectedDate,
                            "yyyy-MM-dd"
                          )
                          const available = isSlotAvailable(
                            quest.name,
                            formattedDate,
                            `${timeSlot.time}-${timeSlot.price}`,
                            timeSlot.time
                          )

                          return (
                            <BookingForm
                              key={timeSlot.id}
                              questName={quest.name}
                              time={timeSlot.time}
                              questId={quest.id}
                              slot={`${timeSlot.time}-${timeSlot.price}`}
                              price={timeSlot.price}
                              date={formattedDate}
                              disabled={!available}
                            >
                              <button
                                className={cn(
                                  "inline-flex max-h-[36px] w-[70px] items-center justify-center rounded-[14px] border border-white/50 text-center text-[13px] font-semibold leading-[34px] text-white transition-colors",
                                  available
                                    ? "bg-[#121212] hover:bg-[#1a1a1a]"
                                    : "cursor-not-allowed border-none bg-brand-main text-[#151515]"
                                )}
                                disabled={!available || isLoading}
                              >
                                {isLoading ? (
                                  <span className="animate-pulse">...</span>
                                ) : (
                                  timeSlot.time
                                )}
                              </button>
                            </BookingForm>
                          )
                        })}
                      </div>
                      <span className="text-[12px] font-semibold leading-[26px] text-brand-main">
                        {price} ₽
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
