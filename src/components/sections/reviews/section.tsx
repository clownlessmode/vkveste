import { Button } from "../../ui/button"
import { MaxWidthWrapper } from "../../width-wrapper"
import ReviewCard, { ReviewCardProps } from "./card"
import Link from "next/link"

import ju from "../../../../public/avatars/a-1.png"
import vi from "../../../../public/avatars/a-2.png"
import ma from "../../../../public/avatars/a-3.png"
import al from "../../../../public/avatars/a-5.png"
import an from "../../../../public/avatars/a-6.png"
import zl from "../../../../public/avatars/a-7.png"

const ReviewsSection = () => {
  const reviews: ReviewCardProps[] = [
    {
      pfp: zl,
      name: "Злата С.",
      date: "1 сентября 2024",
      rating: 5,
      link:"https://yandex.ru/maps/org/69967307679/reviews?reviews%5BpublicId%5D=xp1npjez6hjn8gxx811d27qd4g&si=hkvdfuwu4477r2wa0w940et65m&utm_source=review",
      review:
        "Прошли почти все квесты у них. Очень нравится. Ездим специально ради квестов из...",
    },
    {
      pfp: ju,
      name: "Джулиана К.",
      date: "11 ноября 2024",
      rating: 5,
      link:"https://yandex.ru/maps/org/69967307679/reviews?reviews%5BpublicId%5D=m16au15j98cvx2vjhc535g64tw&si=hkvdfuwu4477r2wa0w940et65m&utm_source=review",
      review:
        "Сначала все казалось спокойным, а потом нас сильно удивили, но весьма приятно. Квест...",
    },
    {
      pfp: vi,
      name: "Виолетта С",
      date: "13 марта 2024",
      rating: 5,
      link:"https://yandex.ru/maps/org/69967307679/reviews?reviews%5BpublicId%5D=aybah4v001xa7cef8x0bq29u5w&si=hkvdfuwu4477r2wa0w940et65m&utm_source=review",
      review:
        "Ляя,ну эмоции конечно зашкаливают,что во время игры ,что после. Мнее все понравилось...",
    },
    {
      pfp: al,
      name: "Александр Б.",
      date: "1 сентября 2024",
      rating: 5,
      link:"https://yandex.ru/maps/org/69967307679/reviews?reviews%5BpublicId%5D=bepfmdwxyh3vernczqv3h390c0&si=hkvdfuwu4477r2wa0w940et65m&utm_source=review",
      review:
        "То что надо!!! Как для детского досуга,так и для взрослого. Веселуха на любой вкус...",
    },
    {
      pfp: ma,
      name: "Мария Ш.",
      date: "27 августа 2024",
      rating: 5,
      link:"https://yandex.ru/maps/org/69967307679/reviews?reviews%5BpublicId%5D=gavmvzpc543qmbtk4kjc35rbdw&si=hkvdfuwu4477r2wa0w940et65m&utm_source=review",
      review: "ЭТО САМОЕ ЛУЧШЕЕ МЕСТО ДЛЯ РАЗВЛЕЧЕНИЙ!!!",
    },
    {
      pfp: an,
      name: "Андрей Ш",
      date: "5 июля 2024",
      rating: 5,
      link:"https://yandex.ru/maps/org/69967307679/reviews?reviews%5BpublicId%5D=qa4fm3nw5yakjru2nue8j2g2w8&si=hkvdfuwu4477r2wa0w940et65m&utm_source=review",
      review:
        "Лучшие квесты в Твери. Всем советую, был на квесте «техасская резня бензопилой»...",
    },
  ]
  return (
    <section>
      <MaxWidthWrapper className="">
        <h2 className="leading-[21px pb-5 text-center text-[17px] font-bold lg:pb-10 lg:text-[36px] lg:leading-[45px]">
          Отзывы игроков
        </h2>
        <div className="grid gap-5 pb-5 sm:grid-cols-2 sm:gap-3 lg:gap-5 xl:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
        <div className="inline-flex w-full flex-col items-end justify-end gap-y-3 sm:flex-row sm:items-center sm:gap-2.5 lg:gap-x-5">
          <Button
            asChild
            className="h-12 w-max px-12 transition duration-300 hover:opacity-75 sm:px-8 lg:h-[60px]" 
            variant={"glowing"}
          >
            <Link href="https://yandex.ru/profile/69967307679">
              Открыть Яндекс отзывы
            </Link>
          </Button>
          <Button
            asChild
            className="h-12 w-max px-12 transition duration-300 hover:opacity-75 sm:px-8 lg:h-[60px]" 
          >
            <Link href="https://yandex.ru/profile/69967307679">
              Оставить отзыв
            </Link>
          </Button>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default ReviewsSection
