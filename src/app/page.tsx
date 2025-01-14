import CertificatesSection from "@/components/sections/certificates/section"
import QuestSection from "@/components/sections/quests/section"
import ReviewsSection from "@/components/sections/reviews/section"
import { Button } from "@/components/ui/button"
import { MaxWidthWrapper } from "@/components/width-wrapper"
import { LogoIcon, LogoText } from "../icons/logo"

import { CarouselWrapper } from "@/components/carousel-wrapper"
import RequestForm from "@/components/forms/request-form"
import Image from "next/image"
import Link from "next/link"
import findUsPattern from "../../public/find-us-pattern.png"
import { getQuestsData } from "@/components/forms/request-form-server"

export default async function Home() {
  const quests = await getQuestsData()

  return (
    <main className="flex flex-col gap-y-[60px] pb-16 sm:gap-20 lg:gap-[120px] lg:gap-y-[160px] lg:pb-[160px]">
      <section className="relative w-full overflow-x-hidden">
        <MaxWidthWrapper className="absolute inset-0 hidden max-h-[207px] sm:mt-[70px] sm:block md:hidden lg:mt-[60px] lg:block lg:max-h-[470px] xl:mt-[140px] xl:max-h-[539px]">
          <CarouselWrapper />
        </MaxWidthWrapper>
        <MaxWidthWrapper>
          <div className="mt-[60px] w-full sm:p-6 lg:p-[50px] xl:mt-[140px] xl:pb-[69px] xl:pl-[103px]">
            <div className="w-full px-3 pb-2 sm:px-0 lg:max-w-[607px]">
              <div className="relative z-10 flex w-full flex-col px-[14px] pb-6 sm:px-0 sm:pb-5 md:gap-y-[18px] xl:gap-y-5 xl:pb-10">
                <LogoText className="mt-[18px] hidden h-[50px] w-[509px] text-brand-main md:block" />
                <div className="relative block h-[196px] w-full sm:hidden sm:h-[404px] md:block lg:hidden">
                  <CarouselWrapper mobile />
                </div>
                <h1 className="z-[5] -mt-3 text-[17px] font-semibold leading-[21px] sm:mt-0 sm:text-[20px] sm:leading-[25px] md:-mt-8 md:text-[27px] md:leading-[33px] lg:mt-0 xl:text-[36px] xl:leading-[44px]">
                  Захватывающие квесты в Твери!
                </h1>
                <p className="text-balance text-xs leading-[14px] sm:text-[11px] sm:leading-[13px] md:text-[18px] md:leading-[22px] xl:text-2xl xl:leading-[29px]">
                  Способ погрузиться в мир испытаний, где каждый
                  <br /> участник может стать героем истории
                </p>
              </div>
              <div className="relative z-10 grid grid-flow-row grid-cols-2 gap-[12px] px-[14px] sm:max-w-[298px] sm:gap-x-2.5 sm:px-0 md:max-w-full xl:max-w-[590px] xl:gap-x-6 xl:gap-y-[22px]">
                <Button
                  asChild
                  size="lg"
                  className="!px-[68px] transition duration-300"
                >
                  <Link href="/booking">Записаться</Link>
                </Button>
                <Button asChild size="lg" className="transition duration-300">
                  <Link href="#quests">Выбрать игру</Link>
                </Button>
                <Button
                  asChild
                  variant="glowing"
                  size="sm"
                  className="col-span-2 transition duration-300"
                >
                  <Link href="#reviews">Нас рекомендуют</Link>
                </Button>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <div id="quests">
        <QuestSection />
      </div>
      <CertificatesSection type="secondary" />
      <div id="reviews">
        <ReviewsSection />
      </div>
      <section>
        <MaxWidthWrapper className="relative">
          <h2 className="pb-5 text-center text-[17px] font-bold leading-[21px] lg:pb-10 lg:text-[36px] lg:leading-[45px]">
            Где нас найти?
          </h2>
          <Image
            src={findUsPattern}
            alt="pattern"
            className="absolute -top-5 w-full sm:-left-5 md:-top-10 xl:-top-16"
          />
          <div className="relative flex h-full w-full flex-col items-start gap-x-10 gap-y-3 overflow-hidden rounded-xl border border-white/50 bg-gray-100 px-4 pb-5 pt-3 sm:mt-5 sm:px-5 sm:pb-5 sm:pt-4 md:mt-5 md:rounded-[14px] md:px-9 md:pb-9 md:pt-6 lg:p-10 xl:flex-row">
            <div className="relative z-10 flex !h-max flex-col gap-y-[5px] pb-5 lg:h-full lg:pb-10 xl:hidden">
              <span className="text-xs font-bold md:text-lg lg:text-2xl lg:leading-[30px]">
                Г. Тверь
              </span>
              <span className="text-xs md:text-lg lg:text-2xl lg:leading-[29px]">
                ул. Лидии Базановой, 20 оф30
              </span>
            </div>
            <div className="relative h-full w-full overflow-hidden rounded-lg lg:rounded-[14px]">
            <iframe
                src="https://yandex.ru/map-widget/v1/?ll=35.916239%2C56.850903&mode=poi&poi%5Bpoint%5D=35.912228%2C56.850894&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D69967307679&utm_source=share&z=15.8"
                width="100%"
                height="00%"
                allowFullScreen
                className="relative z-[5] h-[180px] rounded-[14px] sm:h-[244px] md:h-[375px] lg:h-[500px]"
              />
            </div>
            <div className="z-[5] flex w-full flex-col justify-between xl:h-[500px]">
              <div className="hidden !h-max flex-col gap-y-[5px] lg:h-full xl:flex">
                <span className="text-2xl font-bold lg:leading-[30px]">
                  Г. Тверь
                </span>
                <span className="text-xs md:text-lg lg:text-2xl lg:leading-[29px]">
                  ул. Лидии Базановой, 20 оф30
                </span>
              </div>
              <div className="flex flex-col gap-5 md:gap-10 lg:gap-y-[42px]">
                <h3 className="mt-2 text-xs font-bold leading-4 sm:text-lg md:text-[27px] md:leading-9 lg:text-[36px] lg:leading-[50px]">
                  Нужна{" "}
                  <span className="text-brand-main">
                    помощь с выбором?
                    <br />
                  </span>
                  Мы поможем!
                </h3>
                <div className="flex w-full flex-col gap-y-2.5 md:gap-y-5">
                  <Button asChild variant={"outline"} size={"lg"}>
                    <Link href="tel:+74822630444">+7 (4822) 630-444</Link>
                  </Button>
                  <RequestForm quests={quests} />
                </div>
              </div>
            </div>
            <LogoIcon className="absolute right-4 top-3 z-[5] h-5 w-3.5 text-brand-main sm:h-[30px] sm:w-5 md:h-12 md:w-[30px] lg:right-12 lg:top-6 lg:h-16 lg:w-10" />
            <svg
              width="1300"
              height="180"
              viewBox="0 0 1300 180"
              fill="none"
              className="absolute left-0 top-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1301 179.5L0 67.6484V-2.99951H1301V179.5Z"
                fill="black"
              />
            </svg>
          </div>
        </MaxWidthWrapper>
      </section>
    </main>
  )
}
