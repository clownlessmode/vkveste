import { Button } from "@/components/ui/button"
import { MaxWidthWrapper } from "@/components/width-wrapper"
import KeyIcon from "@/icons/key-icon"
import PlayersIcon from "@/icons/players-icon"
import { getQuest, getQuests } from "@/lib/quests"
import { notFound } from "next/navigation"
import Image from "next/image"
import fetchFromStrapi from "@/lib/strapi"
import ReviewsSection from "@/components/sections/reviews/section"
import QuestSection from "@/components/sections/quests/section"
import CertificatesForm from "@/components/forms/certificates-form"
import Link from "next/link"
import { ShareButton } from "@/components/ui/share-button"
import SwordIcon from "@/icons/sword-icon"
import SkullIcon from "@/icons/skull-icon"
import MoneyIcon from "@/icons/money-icon"
import PotionIcon from "@/icons/potion-icon"
import HatIcon from "@/icons/hat-icon"
import DrinkIcon from "@/icons/drink-icon"

interface Quest {
  name: string
  slug: string
  quote: string
  lore: string
  requirements: string[]
  statistics: {
    players: {
      min: number
      max: number
    }
    difficulty: number
    duration: number
    played: number
    rating: {
      value: number
      count: number
    }
  }
  cover: {
    data: {
      attributes: {
        url: string
      }
    }
  }
}

interface QuestPageProps {
  params: {
    slug: string
  }
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

const ratings = [
  {
    rating: "9.85",
    count: "51",
  },
  {
    rating: "8.77",
    count: "30",
  },
  {
    rating: "9.8",
    count: "54",
  },
  {
    rating: "8.9",
    count: "28",
  },
  {
    rating: "8.9",
    count: "21",
  },
  {
    rating: "8.2",
    count: "14",
  },
  {
    rating: "8.89",
    count: "11",
  },
]

export default async function QuestPage({ params }: QuestPageProps) {
  const response = await fetchFromStrapi("quests", {
    next: {
      tags: ["quests"],
      revalidate: 0,
    },
    cache: "no-store",
  })
  const quest = response.data.find((q) => q.slug === params.slug)
  if (!quest) notFound()

  const data = quest
  const quests = response.data
  const currentIndex = quests.findIndex((q) => q.slug === params.slug)
  const prevQuest =
    currentIndex > 0 ? quests[currentIndex - 1] : quests[quests.length - 1]
  const nextQuest =
    currentIndex < quests.length - 1 ? quests[currentIndex + 1] : quests[0]

  const difficultyIcons = Array.from({ length: 3 }, (_, index) => (
    <span
      key={index}
      className={
        index < data.statistics.difficulty
          ? "text-brand-main"
          : "text-[#6A6A6A]"
      }
    >
      {questIcons[data.statistics.type]}
    </span>
  ))
  return (
    <div className="flex flex-col gap-y-[60px] pb-16 pt-[60px] sm:gap-20 sm:pt-20 lg:gap-[120px] lg:gap-y-[160px] lg:pb-[160px] lg:pt-[120px] xl:pt-[140px]">
      <section className="relative">
        <MaxWidthWrapper className="relative">
          <div className="md:border-tranparent relative flex h-full w-full flex-col overflow-hidden border-brand-main p-2 sm:rounded-xl sm:border-2 sm:p-6 sm:shadow-custom-shadow md:gap-5 md:border-transparent md:p-12 md:shadow-none lg:border-brand-main lg:p-12 lg:shadow-custom-shadow xl:max-h-[697px] xl:gap-y-20 xl:rounded-[30px] xl:px-[98px] xl:pb-[81px] xl:pt-[49px]">
            <div className="relative z-30 flex flex-col gap-y-1 lg:gap-y-5">
              <h1 className="font-inter text-[28px] font-bold leading-8 text-brand-main sm:text-[33px] sm:leading-10 md:text-[54px] md:leading-[64px] xl:text-[72px] xl:leading-[87px]">
                {data.name}
              </h1>
            </div>
            <div className="relative z-30 mt-40 inline-flex w-full max-w-[632px] justify-between sm:mt-5 sm:flex-col md:mt-80 md:flex-row lg:mt-10 lg:flex-col xl:mt-0 xl:flex-row">
              <div className="flex flex-col sm:gap-0.5 md:gap-4 lg:gap-y-5">
                <span className="inline-flex items-center gap-x-5">
                  <span className="font-inter text-xs font-semibold leading-4 sm:text-[11px] md:text-lg md:leading-[22px] lg:text-2xl lg:leading-[29px]">
                    {data.statistics.playersAllTime} человек сыграло
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 xl:gap-x-5">
                  <span className="font-inter text-xs font-semibold leading-4 sm:text-[11px] md:text-lg md:leading-[22px] lg:text-2xl lg:leading-[29px]">
                    Время
                  </span>
                  <span className="font-inter text-xs leading-[29px] sm:text-[11px] md:text-lg xl:text-2xl">
                    {data.statistics.length} мин
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 xl:gap-x-5">
                  <span className="font-inter text-xs font-semibold leading-4 sm:text-[11px] md:text-lg md:leading-[22px] lg:text-2xl lg:leading-[29px]">
                    Игроков
                  </span>
                  <span className="inline-flex items-center gap-0.5 font-inter text-xs leading-[29px] sm:text-[11px] md:text-lg xl:gap-x-2 xl:text-2xl">
                    {data.statistics.players}
                    <PlayersIcon className="size-3.5 md:size-6 xl:size-[29px]" />
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 xl:gap-x-5">
                  <span className="font-inter text-xs font-semibold leading-4 sm:text-[11px] md:text-lg md:leading-[22px] lg:text-2xl lg:leading-[29px]">
                    Сложность
                  </span>
                  <span className="inline-flex items-center">
                    {difficultyIcons}
                  </span>
                </span>
              </div>

              <div className="flex flex-col sm:gap-0.5 md:gap-1.5 lg:mt-8 lg:gap-y-1">
                <span className="bg-gradient-to-b from-brand-main via-[#F8BC0F] to-[#F6A819] bg-clip-text pl-1 font-inter text-sm font-semibold text-transparent sm:text-[17px] md:text-2xl md:leading-8 lg:text-[36px] xl:leading-[44px]">
                  {ratings[data.order - 1]?.rating ?? 0}
                </span>
                <span className="pl-[1px] font-inter text-xs font-semibold leading-4 sm:text-[11px] md:text-lg md:leading-[22px] lg:text-2xl lg:leading-[29px]">
                  Рейтинг квеста
                </span>
                <span className="font-inter text-[9px] leading-[10px] md:text-xs lg:text-[16px] xl:leading-[19px]">
                  На основе {ratings[data.order - 1]?.count ?? 0}{" "}
                  {(ratings[data.order - 1]?.count ?? 0) === 1
                    ? "оценки"
                    : (ratings[data.order - 1]?.count ?? 0) % 10 === 1 &&
                        (ratings[data.order - 1]?.count ?? 0) % 100 !== 11
                      ? "оценки"
                      : (ratings[data.order - 1]?.count ?? 0) % 10 >= 2 &&
                          (ratings[data.order - 1]?.count ?? 0) % 10 <= 4 &&
                          ((ratings[data.order - 1]?.count ?? 0) % 100 < 10 ||
                            (ratings[data.order - 1]?.count ?? 0) % 100 >= 20)
                        ? "оценок"
                        : "оценок"}
                </span>
              </div>
            </div>

            <div className="relative z-[101] mt-2 inline-flex items-center gap-2.5 md:gap-5 xl:gap-x-5">
              <Button
                asChild
                size="lg"
                variant="gradient"
                className="w-full max-w-[268px] hover:opacity-75"
              >
                <Link href="/booking">Записаться</Link>
              </Button>
              <CertificatesForm>
                <Button
                  size="lg"
                  variant={"glowing"}
                  className="w-full max-w-[251px]"
                >
                  Подарить
                </Button>
              </CertificatesForm>
              <ShareButton />
            </div>

            <div className="absolute inset-0 size-full h-60 sm:h-full md:mt-32 md:h-[406px] lg:top-0 lg:mt-0 lg:h-full">
              <div className="bg-quest-1 relative h-full w-full">
                <div className="bg-quest-2 sm:bg-quest-1 md:bg-quest-2 lg:bg-quest-1 absolute inset-0 z-20 size-full"></div>
                {data.name === "Техасская резня бензопилой" && (
                  <button>
                    <svg
                      width="116"
                      height="116"
                      viewBox="0 0 116 116"
                      fill="none"
                      className="absolute inset-y-0 left-1/2 right-[252px] top-1/2 z-30 size-14 -translate-x-1/2 -translate-y-1/2 sm:left-2/3 sm:-translate-x-0 md:left-1/2 md:h-auto md:w-auto md:-translate-x-1/2 lg:left-[60%] lg:translate-x-0 xl:left-[70%]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.4452 22.3369C21.5844 21.1663 21.9948 20.0443 22.6437 19.0601C23.2927 18.0759 24.1623 17.2567 25.1834 16.6676C26.2045 16.0784 27.3489 15.7356 28.5258 15.6664C29.7026 15.5972 30.8794 15.8034 31.9625 16.2688C37.4377 18.6094 49.7079 25.5837 65.2777 34.5698C80.8526 43.5611 91.8082 50.0016 96.5668 53.5641C100.629 56.611 100.64 62.6533 96.5719 65.7106C91.8597 69.2525 80.6736 75.783 64.913 84.8877C49.137 93.9924 37.3758 100.706 31.9522 103.016C27.2813 105.011 22.0535 101.985 21.4452 96.9481C20.7337 91.0605 22.2773 78.7437 22.2773 60.689C22.2773 42.6446 20.7285 28.2297 21.4452 22.3369Z"
                        fill="url(#paint0_linear_1_1536)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1_1536"
                          x1="59.5107"
                          y1="15.6533"
                          x2="59.5107"
                          y2="103.637"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FACC07" />
                          <stop offset="0.5" stop-color="#F8BC0F" />
                          <stop offset="1" stop-color="#F6A819" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </button>
                )}
                <Image
                  src={`http://localhost:1338${data.cover.url}`}
                  alt="Image"
                  className="absolute inset-0 z-10 size-full object-cover"
                  width={2400}
                  height={1200}
                  quality={100}
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-[100] hidden size-full items-center justify-between lg:flex">
            <Link
              href={`/quest/${prevQuest.slug}`}
              className="-ml-[10px] flex h-[50px] w-[60px] rotate-180 items-center justify-center rounded-[14px] border-[2px] border-[#F8BC0F] bg-[#0D0D0D] transition-all duration-300 hover:scale-105 xl:-ml-[25px] xl:h-[80px] xl:w-[90px]"
            >
              <svg
                width="24"
                height="15"
                viewBox="0 0 36 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="xl:h-[22px] xl:w-[36px]"
              >
                <path
                  d="M25.2874 0C25.8369 6.85624e-05 26.3795 0.123675 26.8748 0.361677C27.3702 0.59968 27.8057 0.945991 28.1492 1.375L34.9325 9.85417C35.1929 10.1793 35.3347 10.5835 35.3347 11C35.3347 11.4165 35.1929 11.8207 34.9325 12.1458L28.1492 20.6232C27.8059 21.0525 27.3704 21.3992 26.8751 21.6375C26.3797 21.8758 25.8371 21.9997 25.2874 22H2.33403C1.98872 21.9998 1.6505 21.9021 1.3583 21.7181C1.0661 21.5341 0.831801 21.2713 0.682378 20.96C0.532955 20.6487 0.474484 20.3015 0.513697 19.9585C0.552909 19.6154 0.688212 19.2904 0.904026 19.0208L7.32069 11L0.904026 2.97917C0.698468 2.72327 0.565383 2.41687 0.518665 2.09198C0.471948 1.76709 0.513312 1.43561 0.638438 1.13216C0.763564 0.82871 0.967863 0.564418 1.23 0.366881C1.49214 0.169343 1.80251 0.0458054 2.12869 0.00916688L2.33403 0H25.2874Z"
                  fill="#F8BC0F"
                />
              </svg>
            </Link>

            <Link
              href={`/quest/${nextQuest.slug}`}
              className="-mr-[10px] flex h-[50px] w-[60px] items-center justify-center rounded-[14px] border-[2px] border-[#F8BC0F] bg-[#0D0D0D] transition-all duration-300 hover:scale-105 xl:-mr-[25px] xl:h-[80px] xl:w-[90px]"
            >
              <svg
                width="24"
                height="15"
                viewBox="0 0 36 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="xl:h-[22px] xl:w-[36px]"
              >
                <path
                  d="M25.2874 0C25.8369 6.85624e-05 26.3795 0.123675 26.8748 0.361677C27.3702 0.59968 27.8057 0.945991 28.1492 1.375L34.9325 9.85417C35.1929 10.1793 35.3347 10.5835 35.3347 11C35.3347 11.4165 35.1929 11.8207 34.9325 12.1458L28.1492 20.6232C27.8059 21.0525 27.3704 21.3992 26.8751 21.6375C26.3797 21.8758 25.8371 21.9997 25.2874 22H2.33403C1.98872 21.9998 1.6505 21.9021 1.3583 21.7181C1.0661 21.5341 0.831801 21.2713 0.682378 20.96C0.532955 20.6487 0.474484 20.3015 0.513697 19.9585C0.552909 19.6154 0.688212 19.2904 0.904026 19.0208L7.32069 11L0.904026 2.97917C0.698468 2.72327 0.565383 2.41687 0.518665 2.09198C0.471948 1.76709 0.513312 1.43561 0.638438 1.13216C0.763564 0.82871 0.967863 0.564418 1.23 0.366881C1.49214 0.169343 1.80251 0.0458054 2.12869 0.00916688L2.33403 0H25.2874Z"
                  fill="#F8BC0F"
                />
              </svg>
            </Link>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper>
          <div className="inset-0 z-[999] mt-3 flex size-full items-center justify-between lg:hidden">
            <Link
              href={`/quest/${prevQuest.slug}`}
              className="flex h-[50px] w-[60px] rotate-180 items-center justify-center rounded-[14px] border-[2px] border-[#F8BC0F] bg-[#0D0D0D] transition-all duration-300 hover:scale-105 xl:h-[80px] xl:w-[90px]"
            >
              <svg
                width="24"
                height="15"
                viewBox="0 0 36 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="xl:h-[22px] xl:w-[36px]"
              >
                <path
                  d="M25.2874 0C25.8369 6.85624e-05 26.3795 0.123675 26.8748 0.361677C27.3702 0.59968 27.8057 0.945991 28.1492 1.375L34.9325 9.85417C35.1929 10.1793 35.3347 10.5835 35.3347 11C35.3347 11.4165 35.1929 11.8207 34.9325 12.1458L28.1492 20.6232C27.8059 21.0525 27.3704 21.3992 26.8751 21.6375C26.3797 21.8758 25.8371 21.9997 25.2874 22H2.33403C1.98872 21.9998 1.6505 21.9021 1.3583 21.7181C1.0661 21.5341 0.831801 21.2713 0.682378 20.96C0.532955 20.6487 0.474484 20.3015 0.513697 19.9585C0.552909 19.6154 0.688212 19.2904 0.904026 19.0208L7.32069 11L0.904026 2.97917C0.698468 2.72327 0.565383 2.41687 0.518665 2.09198C0.471948 1.76709 0.513312 1.43561 0.638438 1.13216C0.763564 0.82871 0.967863 0.564418 1.23 0.366881C1.49214 0.169343 1.80251 0.0458054 2.12869 0.00916688L2.33403 0H25.2874Z"
                  fill="#F8BC0F"
                />
              </svg>
            </Link>

            <Link
              href={`/quest/${nextQuest.slug}`}
              className="flex h-[50px] w-[60px] items-center justify-center rounded-[14px] border-[2px] border-[#F8BC0F] bg-[#0D0D0D] transition-all duration-300 hover:scale-105 xl:h-[80px] xl:w-[90px]"
            >
              <svg
                width="24"
                height="15"
                viewBox="0 0 36 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="xl:h-[22px] xl:w-[36px]"
              >
                <path
                  d="M25.2874 0C25.8369 6.85624e-05 26.3795 0.123675 26.8748 0.361677C27.3702 0.59968 27.8057 0.945991 28.1492 1.375L34.9325 9.85417C35.1929 10.1793 35.3347 10.5835 35.3347 11C35.3347 11.4165 35.1929 11.8207 34.9325 12.1458L28.1492 20.6232C27.8059 21.0525 27.3704 21.3992 26.8751 21.6375C26.3797 21.8758 25.8371 21.9997 25.2874 22H2.33403C1.98872 21.9998 1.6505 21.9021 1.3583 21.7181C1.0661 21.5341 0.831801 21.2713 0.682378 20.96C0.532955 20.6487 0.474484 20.3015 0.513697 19.9585C0.552909 19.6154 0.688212 19.2904 0.904026 19.0208L7.32069 11L0.904026 2.97917C0.698468 2.72327 0.565383 2.41687 0.518665 2.09198C0.471948 1.76709 0.513312 1.43561 0.638438 1.13216C0.763564 0.82871 0.967863 0.564418 1.23 0.366881C1.49214 0.169343 1.80251 0.0458054 2.12869 0.00916688L2.33403 0H25.2874Z"
                  fill="#F8BC0F"
                />
              </svg>
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <div className="flex flex-col gap-y-5">
            <h2 className="font-inter font-semibold text-brand-main md:text-lg lg:text-[36px]">
              Сюжет
            </h2>
            <p
              className="font-inter text-sm leading-4 lg:text-2xl lg:leading-[29px]"
              dangerouslySetInnerHTML={{ __html: data.lore }}
            />
            <span className="inline-flex items-center gap-3 pt-5 lg:gap-x-5">
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[29px] w-[15px] shrink-0 lg:size-auto"
              >
                <path
                  d="M24.0922 8.75C24.5294 8.75005 24.9609 8.84838 25.355 9.0377C25.749 9.22702 26.0955 9.50249 26.3687 9.84375L31.7645 16.5885C31.9716 16.8472 32.0844 17.1687 32.0844 17.5C32.0844 17.8313 31.9716 18.1528 31.7645 18.4115L26.3687 25.1548C26.0956 25.4963 25.7492 25.7721 25.3552 25.9616C24.9611 26.1512 24.5295 26.2498 24.0922 26.25H5.83388C5.55921 26.2498 5.29017 26.1721 5.05774 26.0257C4.82531 25.8794 4.63893 25.6704 4.52007 25.4227C4.40121 25.1751 4.3547 24.899 4.3859 24.6261C4.41709 24.3532 4.52471 24.0946 4.69638 23.8802L9.80055 17.5L4.69638 11.1198C4.53287 10.9162 4.42701 10.6725 4.38985 10.4141C4.35269 10.1556 4.38559 9.89196 4.48512 9.65058C4.58465 9.4092 4.74716 9.19897 4.95568 9.04184C5.1642 8.8847 5.41109 8.78644 5.67055 8.75729L5.83388 8.75H24.0922Z"
                  fill="#F8BC0F"
                />
              </svg>
              <span className="font-inter text-xs leading-4 lg:text-2xl lg:leading-[29px]">
                Для посещения квеста обязательно предварительная запись по
                телефону или через сайт
              </span>
            </span>
          </div>
        </MaxWidthWrapper>
      </section>
      <ReviewsSection />
      <QuestSection />
    </div>
  )
}
