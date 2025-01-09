import { MaxWidthWrapper } from "@/components/width-wrapper"

import CertificatesSection from "@/components/sections/certificates/section"
import QuestSection from "@/components/sections/quests/section"

export default function CertificatePage() {
  return (
    <div className="flex flex-col gap-y-3 pb-16 sm:gap-y-5 md:gap-y-10 lg:gap-y-[160px] lg:pb-[160px] xl:gap-y-[140px]">
      <section className="pt-14 xl:pt-[140px]">
        <MaxWidthWrapper>
          <div className="flex flex-col gap-y-3 text-center lg:gap-y-5 xl:text-left">
            <h1 className="text-[28px] font-semibold text-brand-main sm:text-[33px] md:text-[54px] lg:text-[72px] lg:leading-[87px]">
              Эмоции вместо вещей
            </h1>
            <h2 className="text-xs font-semibold text-brand-main md:text-lg lg:text-[36px] lg:leading-[44px]">
              Подарите вашему близкому человеку яркие эмоции
            </h2>
            <p className="text-xs font-normal md:text-lg lg:text-2xl lg:leading-[29px]">
              Этот сертификат подходит для оплаты любых квестов в течение года с
              момента покупки. Для применения сертификата выберите его в
              качестве способа оплаты при бронировании.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>
      <div className="pb-[60px] sm:pb-0">
        <CertificatesSection />
      </div>
      <QuestSection />
    </div>
  )
}
