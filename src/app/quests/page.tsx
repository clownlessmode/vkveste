import QuestSection from "@/components/sections/quests/section"
import { Button } from "@/components/ui/button"
import { MaxWidthWrapper } from "@/components/width-wrapper"

import element_1 from "../../../public/quests_element_1.png"
import element_1m from "../../../public/quests_element_mobile.png"
import element_2 from "../../../public/quests_element_2.png"
import Image from "next/image"
import ReviewsSection from "@/components/sections/reviews/section"
import CtaSection from "@/components/sections/cta/section"

export default function QuestsPage() {
  return (
    <div className="flex flex-col gap-y-[60px] py-[60px] xl:gap-y-[140px] xl:py-[140px]">
      <section className="relative pt-[60px] sm:pt-[82px] xl:pb-[245px]">
        <MaxWidthWrapper>
          <div className="flex flex-col items-center justify-center gap-y-1 sm:items-start sm:justify-start sm:gap-y-2.5 md:items-center md:justify-center lg:items-start lg:justify-start lg:gap-y-5">
            <h1 className="text-[33px] font-bold leading-[41px] text-brand-main sm:text-[33px] sm:leading-[40px] md:text-[54px] md:leading-[68px] lg:text-[72px] lg:leading-[89px]">
              Квесты
            </h1>
            <h3 className="text-[17px] font-semibold leading-[21px] sm:text-[16px] sm:leading-[20px] md:text-[27px] md:leading-[33px] lg:text-[36px] lg:leading-[44px]">
              Откройся новым приключениям
            </h3>
            <p className="text-center text-[12px] leading-[14px] sm:text-start sm:text-[11px] sm:leading-[13px] md:text-center md:text-[18px] md:leading-[22px] lg:text-start lg:text-[24px] lg:leading-[29px]">
              Детективные квесты, жуткие хоррор квесты, экшен
              <br /> и перформансы
            </p>
            <Image
              src={element_1m}
              alt="Chest"
              placeholder="blur"
              className="pointer-events-none -right-0 block max-w-none sm:hidden"
            />
            <Button
              variant={"gradient"}
              size="lg"
              className="mt-5 w-full max-w-[200px] sm:max-w-[575px]"
            >
              Оставить заявку
            </Button>
          </div>
        </MaxWidthWrapper>
        <Image
          src={element_2}
          alt="Arrow"
          placeholder="blur"
          className="pointer-events-none absolute -left-[113px] top-10 w-[193px] max-w-none sm:hidden xl:left-0 xl:top-[113px] xl:block xl:w-auto"
        />
        <Image
          src={element_1}
          alt="Chest"
          placeholder="blur"
          className="pointer-events-none absolute -top-[13px] right-0 hidden max-w-none xl:block"
        />
      </section>
      <QuestSection />
      <CtaSection />
      <ReviewsSection />
    </div>
  )
}
