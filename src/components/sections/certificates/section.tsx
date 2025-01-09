import { MaxWidthWrapper } from "@/components/width-wrapper"
import Image from "next/image"

import box_background from "../../../../public/box_background.png"
import box_certificate from "../../../../public/box_certificate.png"
import CertificatesForm from "../../forms/certificates-form"

const CertificatesSection = ({
  type = "main",
}: {
  type?: "main" | "secondary"
}) => {
  return (
    <section className="relative overflow-hidden">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center gap-y-2 lg:gap-y-10">
          {type === "secondary" && (
            <div className="flex w-full flex-col items-center gap-y-1.5 sm:gap-y-2 lg:gap-5">
              <h2 className="text-[17px] font-bold leading-[21px] md:text-[27px] lg:text-[36px] lg:leading-[45px]">
                Эмоции вместо вещей
              </h2>
              <p className="mt-1 text-center text-xs leading-[14px] lg:text-2xl lg:leading-[29px]">
                Подарите вашему близкому человеку яркие впечатления
              </p>
            </div>
          )}
          <div className="mt-5 flex flex-col items-center">
            <Image
              src={box_background}
              alt="box"
              placeholder="blur"
              className="absolute w-[200%] max-w-[1940px] xl:w-full"
            />
            <Image
              src={box_certificate}
              alt="box"
              placeholder="blur"
              className="z-[50] pt-20 sm:pt-40 md:pt-60 lg:pt-[171px]"
            />
          </div>
          <div className="flex flex-col items-center gap-y-3 sm:gap-y-5">
            <h3 className="text-center text-xs leading-[29px] sm:text-lg lg:text-2xl">
              Доставка по городу{" "}
              <span className="font-semibold">бесплатно</span>
            </h3>
            {type === "main" && (
              <p className="text-center font-inter text-[9px] leading-[11px] lg:text-[16px] lg:leading-[19px]">
                Доплату за игру, стоимость которой превышает номинал
                сертификата, нужно произвести на месте перед ее началом
              </p>
            )}
          </div>
          <CertificatesForm />
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default CertificatesSection
