import { Button } from "@/components/ui/button"
import pirates from "../../../../public/cta_pirates.png"
import Image from "next/image"
import Link from "next/link"

const CtaSection = () => {
  return (
    <div className="relative w-full bg-[url('/cta_background.png')] bg-cover bg-center bg-no-repeat">
      <Image
        src={pirates}
        alt="pirates"
        quality={90}
        className="absolute bottom-0 hidden xl:left-[37px] xl:block"
      />
      <div className="flex flex-col items-center gap-y-1.5 py-[40px] md:gap-y-[15px] lg:gap-y-5 lg:pb-[45px] lg:pt-[74px]">
        <h1 className="pb-1 text-[17px] font-bold leading-[20px] text-brand-main md:text-[27px] md:leading-[33px] lg:pb-0 lg:text-[36px] lg:leading-[45px]">
          Праздник ВКвесте
        </h1>
        <p className="max-w-[236px] text-center text-[11px] leading-[13px] sm:max-w-[356px] md:max-w-none md:text-[18px] md:leading-[22px] lg:text-2xl lg:leading-[29px]">
          Альтернатива стандартным подаркам,
          <br /> переводим фокус с вещей на яркие, наполненные жизнью события
        </p>
        <Button
          className="max-w-[106px] md:mt-[15px] md:max-w-[171px] lg:mt-5 lg:max-w-[228px]"
          size="lg"
        >
          <Link href="/holidays">Подробнее</Link>
        </Button>
      </div>
    </div>
  )
}

export default CtaSection
