import CertificatesSection from "@/components/sections/certificates/section"
import QuestSection from "@/components/sections/quests/section"
import { Button } from "@/components/ui/button"
import { MaxWidthWrapper } from "@/components/width-wrapper"

import baloons from "../../../public/holidays_baloons.png"
import Image from "next/image"
import RequestForm from "@/components/forms/request-form"

export default function HolidaysPage() {
  return (
    <div className="flex flex-col gap-y-[60px] pb-16 pt-[60px] sm:gap-20 sm:pt-20 lg:gap-[120px] lg:gap-y-[160px] lg:pb-[160px] lg:pt-[120px] xl:pt-[140px]">
      <section className="relative overflow-x-clip">
        <Image
          src={baloons}
          alt="baloons"
          quality={90}
          placeholder="blur"
          className="absolute -right-[70%] top-[44px] z-0 hidden h-[500px] md:-right-[20%] lg:-right-[15%] lg:h-auto xl:block"
        />
        <MaxWidthWrapper>
          <div className="relative z-10 flex flex-col gap-y-4 md:gap-y-6 lg:gap-y-10">
            <h1 className="text-[28px] font-bold text-brand-main sm:text-[33px] md:text-[54px] lg:text-[72px] lg:leading-[89px]">
              Праздники в квесте
            </h1>
            <h2 className="text-[17px] font-semibold md:text-[27px] lg:text-[36px] lg:leading-[44px]">
              Альтернатива стандартным подаркам, переводим фокус
              <br /> с вещей на яркие, наполненные жизнью события
            </h2>
            <p className="max-w-[1042px] text-xs md:text-lg lg:text-2xl lg:leading-[29px]">
              Активный отдых с друзьями, проведение дня рождения, выпускных и
              корпоративов — это отличное решение для создания незабываемых
              моментов! Мы позаботимся обо всех организационных деталях:
              предоставим воздушные шарики, уютное место и отличное настроение
              благодаря профессиональной команде. Дополнительно мы предлагаем
              фотовизуальные решения для запечатления ваших эмоций, а также
              тематические декорации, которые подчеркнут атмосферу праздника.
              Ваши лучшие воспоминания начинаются здесь!
            </p>
            <div className="mt-4">
              <span className="text-xs leading-[29px] md:text-lg lg:text-2xl">
                Забронировать банкетную зону
              </span>
              <div className="mx-auto mt-2 flex max-w-[200px] flex-col gap-x-3 gap-y-2 sm:max-w-full sm:flex-row md:mx-0 md:flex-col lg:mt-4 lg:max-w-[384px] lg:max-w-[512px] lg:gap-y-5">
                <Button size="lg" variant="outline" className="w-full">
                  +7 (4822) 630-444
                </Button>
                <RequestForm />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <QuestSection />
      <CertificatesSection type="secondary" />
    </div>
  )
}
