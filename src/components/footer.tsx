import InstagramIcon from "@/icons/instagram-icon"
import VkontakteIcon from "@/icons/vkontakte-icon"
import Link from "next/link"
import { MaxWidthWrapper } from "./width-wrapper"

import footer from "@/data/footer"
import getContactData from "@/data/main"
import TelegramIcon from "@/icons/telegram-icon"
import { Button } from "./ui/button"
import Widget from "./widget"

const Footer = async () => {
  const contactData = await getContactData()
  console.log(contactData)
  return (
    <div className="w-full bg-gray-200">
      <MaxWidthWrapper>
        <footer className="inline-flex w-full items-start justify-between pb-5 pt-5 sm:pt-[30px] md:pt-12 lg:pb-[71px] lg:pt-16">
          <div className="flex flex-col gap-y-8 lg:gap-y-[61px]">
            <div className="flex flex-col gap-y-2 text-xs leading-4 sm:gap-3 sm:text-base md:gap-y-5 md:text-[27px] md:leading-[29px] lg:gap-7 lg:text-4xl lg:leading-[43px] xl:gap-y-5 xl:text-[24px] xl:leading-[29px]">
              {footer().main.map((i) => {
                return (
                  <Link
                    key={i.title}
                    className="transition duration-300 hover:opacity-75"
                    href={i.link}
                  >
                    {i.title}
                  </Link>
                )
              })}
            </div>
            <div className="flex flex-col gap-y-2.5">
              <span className="text-xs leading-[19px] text-white/40 md:text-lg lg:text-2xl xl:text-[16px] xl:leading-[19px]">
                © Все права защищены. 2024
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-x-[310px]">
            <Button
              asChild
              variant="gradient"
              size="lg"
              className="mb-[17px] hidden transition duration-300 hover:opacity-75 xl:block"
            >
              <Link href="/booking">Записаться</Link>
            </Button>
            <div className="flex flex-col items-end gap-y-2 lg:gap-y-9">
              <div className="flex flex-col items-end justify-end gap-y-2 md:gap-y-5 lg:gap-7 xl:gap-y-5">
                <Link
                  href={contactData.phone}
                  className="text-xs font-light leading-4 transition duration-300 hover:opacity-75 sm:text-base md:text-2xl md:text-[27px] lg:text-3xl lg:leading-[29px] xl:text-[24px] xl:leading-[29px]"
                >
                  {contactData.phoneFormatted}
                </Link>
                <Link
                  href={`mailto:${contactData.email}`}
                  className="text-xs font-light leading-4 transition duration-300 hover:opacity-75 sm:text-base md:text-2xl md:text-[27px] lg:text-3xl lg:leading-[29px] xl:text-[24px] xl:leading-[29px]"
                >
                  {contactData.email}
                </Link>
                <div className="inline-flex items-center">
                  <Link
                    href="/"
                    className="text-white transition duration-300 hover:opacity-75"
                  >
                    <TelegramIcon className="size-6 sm:size-9 md:size-[57px] lg:size-20 xl:size-[57px]" />
                  </Link>
                  <Link
                    href={contactData.instagram}
                    className="text-white transition duration-300 hover:opacity-75"
                  >
                    <InstagramIcon className="size-6 sm:size-9 md:size-[57px] lg:size-20 xl:size-[57px]" />
                  </Link>
                  <Link
                    href={contactData.vkontakte}
                    className="text-white transition duration-300 hover:opacity-75"
                  >
                    <VkontakteIcon className="size-6 sm:size-9 md:size-[57px] lg:size-20 xl:size-[57px]" />
                  </Link>
                </div>
              </div>
              <Widget />
            </div>
          </div>
        </footer>
      </MaxWidthWrapper>
    </div>
  )
}

export default Footer
