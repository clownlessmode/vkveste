import QuestSection from "@/components/sections/quests/section"
import { Button } from "@/components/ui/button"
import { MaxWidthWrapper } from "@/components/width-wrapper"

import element_1 from "../../../public/quests_element_1.png"
import element_1m from "../../../public/element_1m.png"
import element_2 from "../../../public/quests_element_2.png"
import Image from "next/image"
import ReviewsSection from "@/components/sections/reviews/section"
import CtaSection from "@/components/sections/cta/section"
import RequestForm from "@/components/forms/request-form"
import { getQuestsData } from "@/components/forms/request-form-server"

export default async function QuestsPage() {
  const quests = await getQuestsData()

  return (
    <div className="flex flex-col gap-y-[60px] py-[60px] xl:gap-y-[140px] xl:py-[140px]">
      <section className="relative pt-[60px] sm:pt-[82px] xl:pb-[245px]">
        <MaxWidthWrapper className="flex w-full justify-center text-left sm:justify-start sm:text-left md:justify-center md:text-center lg:justify-start">
          <div className="flex max-w-[260px] flex-col items-center justify-center gap-y-1 sm:max-w-[260px] sm:items-start sm:justify-start sm:gap-y-2.5 md:max-w-[500px] md:items-center md:justify-center lg:max-w-[553px] lg:items-start lg:justify-start lg:gap-y-5 xl:max-w-[607px]">
            <h1 className="text-[33px] font-bold leading-[41px] text-brand-main sm:text-[33px] sm:leading-[40px] md:text-[54px] md:leading-[68px] lg:text-[72px] lg:leading-[89px]">
              Квесты
            </h1>
            <h3 className="text-[17px] font-semibold leading-[21px] sm:text-[16px] sm:leading-[20px] md:text-[27px] md:leading-[33px] lg:text-[36px] lg:leading-[44px]">
              Откройся новым приключениям
            </h3>
            <p className="text-center text-[12px] leading-[14px] sm:text-start sm:text-[11px] sm:leading-[13px] md:text-center md:text-[18px] md:leading-[22px] lg:text-start lg:text-[24px] lg:leading-[29px]">
              Приключенческие квесты, жуткие хоррор квесты, экшен и перформансы
            </p>
            <Image
              src={element_1m}
              alt="Chest"
              placeholder="blur"
              className="pointer-events-none absolute -right-[20px] bottom-[40px] block h-auto w-[300px] max-w-none sm:hidden md:bottom-[60px] md:block md:w-[800px] lg:hidden"
            />

            <RequestForm
              quests={quests}
              className="mt-[204px] h-[37px] w-full max-w-[200px] sm:mt-[10px] sm:h-[40px] sm:max-w-[575px] md:mt-[520px] md:h-[60px] md:max-w-[320px] lg:mt-5 lg:h-[58px] lg:max-w-[427px] xl:h-[80px] xl:max-w-[590px]"
            />
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
          className="pointer-events-none absolute hidden h-auto sm:right-0 sm:top-1/3 sm:block sm:w-[200px] md:top-[240px] md:hidden md:w-[70vw] lg:right-0 lg:top-[110px] lg:block lg:w-[400px] xl:top-0 xl:w-[700px]"
        />
      </section>
      <QuestSection />
      <CtaSection />
      <ReviewsSection />
    </div>
  )
}
