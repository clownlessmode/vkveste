import { Button } from "../../ui/button"
import { MaxWidthWrapper } from "../../width-wrapper"
import QuestCard from "./card"

import KeyIcon from "@/icons/key-icon"
import fetchFromStrapi from "@/lib/strapi"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import quest_background from "../../../../public/quests_background.png"

interface QuestCardProps {
  label: string
  description: string
  type: string
  difficulty: number
  players: string
  background: string
  link: string
  order: number
}
;[]

async function QuestSection() {
  const response = await fetchFromStrapi("quests", {
    next: {
      tags: ["quests"],
      revalidate: 0,
    },
    cache: "no-store",
  })

  const quests = response.data
  const mappedQuests: QuestCardProps[] = quests
    .map((quest) => ({
      label: quest.name,
      description: quest.quote,
      type: quest.statistics.type,
      difficulty: quest.statistics.difficulty,
      players: quest.statistics.players,
      background: `http://89.104.69.151:1338${quest.cover.url}`,
      link: `/quest/${quest.slug}`,
      order: quest.order,
    }))
    .sort((a, b) => a.order - b.order)

  return (
    <>
      <section className="relative mx-auto inline-flex w-full items-center pb-[60px] sm:pb-[80px] md:pb-[120px] lg:pb-[140px]">
        <MaxWidthWrapper>
          <h2 className="pb-5 text-center text-[17px] font-bold leading-[21px] md:text-[27px] lg:pb-10 lg:text-[36px] lg:leading-[45px]">
            Наши квесты
          </h2>
          <div className="flex flex-col items-center gap-y-5">
            <div className="grid w-full place-items-center gap-2.5 text-center sm:grid-cols-2 sm:place-items-stretch md:gap-4 lg:grid-flow-row xl:grid-cols-3">
              {mappedQuests.map((quest,index) => (
                <QuestCard key={quest.label} {...quest} index={index}/>
              ))}
              <div className="hidden max-w-[311px] sm:block sm:max-w-none">
                <div
                  className={cn(
                    "relative flex h-40 w-full flex-col items-center justify-center gap-y-4 rounded-[14px] border-[0.5px] border-white/50 bg-[#151515] sm:h-[103px] lg:h-[220px]"
                  )}
                  style={{
                    clipPath: "polygon(0 0, 100% 1%, 100% 89%, 0 70%)",
                  }}
                >
                  <div className="inline-flex items-center text-[#6A6A6A]">
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                  </div>
                  <span className="max-w-[326px] text-xs font-bold uppercase leading-[30px] md:text-lg lg:text-2xl">
                    В разработке
                  </span>
                </div>
              </div>
              <div className="hidden max-w-[311px] sm:max-w-none xl:block">
                <div
                  className={cn(
                    "relative flex h-40 w-full flex-col items-center justify-center gap-y-4 rounded-[14px] border-[0.5px] border-white/50 bg-[#151515] sm:h-[103px] lg:h-[220px]"
                  )}
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 30%, 100% 100%, 54% 100%, 0 90%, 0% 70%, 0% 30%)",
                  }}
                >
                  <div className="inline-flex items-center text-[#6A6A6A]">
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                    <KeyIcon className="size-[19px] sm:size-[13px] md:size-5 lg:size-[26px]" />
                  </div>
                  <span className="max-w-[326px] text-xs font-bold uppercase leading-[30px] md:text-lg lg:text-2xl">
                    В разработке
                  </span>
                </div>
              </div>
            </div>
            <Button
              asChild
              variant={"gradient"}
              size="lg"
              className="hidden transition duration-300 hover:opacity-75 sm:block"
            >
              <Link href="/booking">Записаться</Link>
            </Button>
          </div>
        </MaxWidthWrapper>
        <Image
          src={quest_background}
          alt="background"
          placeholder="blur"
          className="absolute inset-x-0 bottom-[44px] top-1/2 z-[-5] mx-auto h-full w-full object-cover object-center -translate-y-1/2 sm:h-auto lg:top-0 lg:translate-y-0 xl:top-[40px]"
        />
      </section>
    </>
  )
}

export default QuestSection
