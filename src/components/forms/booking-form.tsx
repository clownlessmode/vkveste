"use client"

import { submitForm } from "@/actions/create-booking"
import { sendEmail } from "@/actions/send-mail"
import { client } from "@/lib/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import React, { ReactNode, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Form } from "../ui/form"
import { Input } from "../ui/input"
import { PhoneInput } from "../ui/phone-input"
import { Textarea } from "../ui/textarea"
import fetchFromStrapi from "@/lib/strapi"

interface Promocode {
  id: number
  code: string
  discount: number
  isActive: boolean
}

const formSchema = z.object({
  name: z.string().min(10, "ФИО должно содержать не менее 10 символов"),
  phone: z
    .string()
    .min(12, "Номер телефона должен содержать не менее 11 цифр")
    .refine(
      (value) => {
        const digitsOnly = value.replace(/\D/g, "")
        return digitsOnly.length === 11 && digitsOnly.startsWith("7")
      },
      { message: "Некорректный номер телефона" }
    ),
  promocode: z.string().optional(),
  comment: z.string().optional(),
})

const BookingForm = React.memo(function BookingForm({
  children,
  questName,
  questId,
  slot,
  price,
  time,
  date,
  disabled,
}: {
  children: ReactNode
  questName: string
  questId: string
  slot: string
  time: string
  price: number
  date: string
  disabled?: boolean
}) {
  const [discountedPrice, setDiscountedPrice] = useState(price)
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null)
  const [promocode, setPromocode] = useState<string>()

  const validatePromocode = async (code: string) => {
    if (!code) return

    try {
      const response = await fetchFromStrapi<Promocode>("promocodes")
      const promocodes = response.data.map((item) => ({
        ...item,
        id: item.id,
      }))

      const foundPromocode = promocodes.find(
        (promo) =>
          promo.code.toLowerCase() === code.toLowerCase() && promo.isActive
      )

      if (foundPromocode) {
        const discount = foundPromocode.discount
        const newPrice = price * (1 - discount / 100)
        setDiscountedPrice(newPrice)
        setAppliedDiscount(discount)
        setPromocode(foundPromocode.code)
        return true
      } else {
        setDiscountedPrice(price)
        setAppliedDiscount(null)
        return false
      }
    } catch (error) {
      console.error("Error validating promocode:", error)
      return false
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const [isPending, startTransition] = useTransition()
  const [isSuccess, setSuccess] = useState<boolean>(false)
  const [isMainDialogOpen, setMainDialogOpen] = useState<boolean>(false)

  const API_BASE_URL = `http://localhost:1338`

  const mutation = useMutation({
    mutationFn: async ({
      questName,
      date,
      time,
      slot,
      price,
      name,
      phone,
    }: {
      questName: string
      date: string
      time: string
      slot: string
      price: number
      name: string
      phone: string
    }) => {
      const priceString =
        price !== null && price !== undefined ? String(price) : "0"
      const gameDateTime = new Date(`${date} ${time}`).toISOString()

      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            customerName: name,
            phoneNumber: phone,
            quest: questName,
            totalAmount: discountedPrice,
            discountedPrice: discountedPrice,
            gameDateTime,
            bookingStatus: "На рассмотрении",
            discount: appliedDiscount,
            promoCode: promocode,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create booking")
      }

      sendEmail({
        name: name,
        quest: questName,
        gamedatetime: `${date} ${time}`,
        phonenumber: phone,
      })
      return await client.booking.create.$post({
        questName,
        date,
        time,
        slot,
        price: discountedPrice.toString(),
      })
    },
    onSuccess: async () => {
      console.log("Booking successful")
    },
  })

  function formatPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(/[^\d]/g, "")
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const formattedPhone = formatPhoneNumber(data.phone)

        await mutation.mutate({
          questName,
          date,
          time,
          slot,
          price: discountedPrice,
          name: data.name,
          phone: data.phone,
        })

        const result = await submitForm({
          name: data.name,
          phone: formattedPhone,
          price: discountedPrice,
          date,
          time,
          quest: questName,
          promocode: promocode,
          comment: data.comment,
        })

        if (result.success) {
          form.reset()
          setMainDialogOpen(false)
          setSuccess(true)
        } else {
          alert(result.message)
        }
      } catch (error) {
        alert(`Error: ${error}`)
      }
    })
  }

  return (
    <>
      <Dialog open={isSuccess} onOpenChange={setSuccess}>
        <DialogContent className="max-h-[90vh] !max-w-[320px] overflow-y-auto !rounded-[14px] !p-0">
          <div className="flex w-full flex-col items-center gap-y-2.5 rounded-[14px] border-[2.5px] border-[#F9800F] bg-white py-[25px]">
            <svg
              width="105"
              height="98"
              viewBox="0 0 105 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.6875 54.6474L35.7107 65.1658C36.6058 65.837 37.7255 66.1363 38.8361 66.0014C39.9467 65.8664 40.9622 65.3075 41.6704 64.4415L78.0752 19.9473"
                stroke="url(#paint0_linear_934_130)"
                stroke-width="8.81385"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_934_130"
                  x1="32.1394"
                  y1="30.1503"
                  x2="78.302"
                  y2="66.3793"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F6A819" />
                  <stop offset="1" stop-color="#F8470F" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-center text-[24px] font-semibold leading-[24.4px] text-black">
              Успешно
              <br />
              забронировано
            </span>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isMainDialogOpen} onOpenChange={setMainDialogOpen}>
        <DialogTrigger asChild onClick={() => setMainDialogOpen(true)}>
          {children}
        </DialogTrigger>
        <DialogContent>
          <span className="max-w-[220px] pb-5 text-center font-inter text-[17px] font-semibold leading-[21px] text-black sm:max-w-[340px] sm:pb-[34px] md:pb-10 md:text-[36px] md:leading-[44px]">
            {questName}
          </span>
          <div className="grid w-full grid-flow-row grid-cols-2 justify-between gap-y-2.5 pb-2.5 sm:pb-[26px] md:pb-10">
            <div className="flex flex-col gap-y-0.5">
              <h4 className="text-[16px] font-medium text-black">Дата</h4>
              <span className="inline-flex items-center gap-x-0.5 font-inter text-black md:gap-x-[5px]">
                <svg
                  className="size-[13px] sm:size-[18px] md:size-[27px]"
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5625 5.625V3.375M8.4375 5.625V3.375M3.65625 9H23.3438M3.375 11.2995C3.375 8.92012 3.375 7.72988 3.8655 6.82088C4.30903 6.01009 4.99724 5.36007 5.832 4.9635C6.795 4.5 8.055 4.5 10.575 4.5H16.425C18.945 4.5 20.205 4.5 21.168 4.9635C22.0151 5.37075 22.7025 6.021 23.1345 6.81975C23.625 7.731 23.625 8.92125 23.625 11.3006V16.8266C23.625 19.206 23.625 20.3962 23.1345 21.3052C22.691 22.116 22.0028 22.7661 21.168 23.1626C20.205 23.625 18.945 23.625 16.425 23.625H10.575C8.055 23.625 6.795 23.625 5.832 23.1615C4.99741 22.7652 4.30921 22.1156 3.8655 21.3052C3.375 20.394 3.375 19.2037 3.375 16.8244V11.2995Z"
                    stroke="black"
                    strokeWidth="1.6875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[11px] leading-[13px] sm:text-[16px] sm:leading-[19px] md:text-[24px] md:leading-[29px]">
                  {format(date, "dd.MM.yy")}
                </span>
              </span>
            </div>
            <span className="text-end text-[17px] font-semibold leading-[21px] text-black md:text-[24px] md:leading-[29px]">
              {appliedDiscount ? (
                <>
                  <span className="mr-2 text-gray-400 line-through">
                    {price} ₽
                  </span>
                  {discountedPrice} ₽
                </>
              ) : (
                `${price} ₽`
              )}
            </span>
            <div className="flex flex-col gap-y-0.5">
              <h4 className="text-[16px] font-medium text-black">Время</h4>
              <span className="inline-flex items-center gap-x-0.5 font-inter text-black md:gap-x-[5px]">
                <svg
                  className="size-[13px] sm:size-[18px] md:size-[27px]"
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 23.625C19.0919 23.625 23.625 19.0919 23.625 13.5C23.625 7.90812 19.0919 3.375 13.5 3.375C7.90812 3.375 3.375 7.90812 3.375 13.5C3.375 19.0919 7.90812 23.625 13.5 23.625Z"
                    stroke="black"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.375 9V14.625H18"
                    stroke="black"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[11px] leading-[13px] sm:text-[16px] sm:leading-[19px] md:text-[24px] md:leading-[29px]">
                  {time}
                </span>
              </span>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center gap-y-2.5 md:gap-y-5"
            >
              <div className="flex w-full flex-col gap-y-1.5">
                <Input
                  {...form.register("name")}
                  placeholder="ФИО"
                  required
                  aria-invalid={!!form.formState.errors.name}
                />
                {form.formState.errors.name && (
                  <span className="text-[11px] text-red-500 md:text-[16px]">
                    {form.formState.errors.name.message}
                  </span>
                )}
              </div>
              <div className="flex w-full flex-col gap-y-1.5">
                <PhoneInput
                  {...form.register("phone", {
                    onChange: (event) => {
                      form.setValue("phone", event.target.value)
                    },
                  })}
                  aria-invalid={!!form.formState.errors.phone}
                  required
                />
                {form.formState.errors.phone && (
                  <span className="text-[11px] text-red-500 md:text-[16px]">
                    {form.formState.errors.phone.message}
                  </span>
                )}
              </div>
              <Input
                {...form.register("promocode", {
                  onChange: async (e) => {
                    const isValid = await validatePromocode(e.target.value)
                    if (!isValid && e.target.value) {
                      form.setError("promocode", {
                        type: "manual",
                        message: "Недействительный промокод",
                      })
                    } else {
                      form.clearErrors("promocode")
                    }
                  },
                })}
                placeholder="Промокод для получения скидки"
                aria-invalid={!!form.formState.errors.promocode}
              />

              <Textarea
                {...form.register("comment")}
                placeholder="Комментарий"
                className="resize-none"
              />

              <p className="text-center font-inter text-[11px] leading-[13px] text-black md:text-[16px] md:leading-[19px]">
                Если у вас не получится прийти, пожалуйста, отмените игру
                заранее по телефону +7(4822) 630-444
              </p>

              <Button
                variant="gradient"
                size="lg"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Отправка..." : "Записаться"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
})

export default BookingForm
