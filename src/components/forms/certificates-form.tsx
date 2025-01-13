"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Textarea } from "../ui/textarea"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTransition, useEffect, useState, ReactNode } from "react"
import { submitForm } from "@/actions/order-certificate"
import { Form } from "../ui/form"
import fetchFromStrapi from "@/lib/strapi"
import InputMask from 'react-input-mask'

const formSchema = z.object({
  name: z.string().min(10, "ФИО должно содержать не менее 10 символов"),
  email: z.string().email("Некорректный адрес электронной почты"), 
  phone: z.string().min(12, "Введите корректный номер телефона").transform(val => val.replace(/[^\d+]/g, '')),
  address: z.string().min(1, "Адрес обязателен для заполнения"),
  shipment: z.boolean().optional(),
  value: z.number().min(0, "Некорректный формат цены"),
  comment: z.string().optional(),
})

export default function CertificatesForm({children}: {children?: ReactNode}) {
  const [certificates, setCertificates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCertificates() {
      try {
        const response = await fetchFromStrapi("certificates")
        const certificateData = response.data
          .map((item) => item)
          .sort((a, b) => a.displayOrder - b.displayOrder)
        setCertificates(certificateData)
      } catch (err) {
        setError("Failed to load certificates")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCertificates()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 4500,
      shipment: false,
    },
  })

  const [isPending, startTransition] = useTransition()

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const result = await submitForm(data)
        if (result.success) {
          form.reset()
          alert("thank you")
        } else {
          alert(result.message)
        }
      } catch (error) {
        alert(`${error}`)
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? children : (
          <Button
            variant={"gradient"}
            size={"lg"}
            className="max-w-[188px] sm:w-[384px] sm:max-w-none"
          >
            Приобрести сертификат
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <span className="pb-5 font-inter text-[17px] font-semibold leading-[21px] text-black sm:pb-[34px] md:pb-10 md:text-[36px] md:leading-[44px]">
          Покупка сертификата
        </span>
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
              <Input
                {...form.register("email")}
                placeholder="Email"
                type="email"
                required
                aria-invalid={!!form.formState.errors.email}
              />
              {form.formState.errors.email && (
                <span className="text-[11px] text-red-500 md:text-[16px]">
                  {form.formState.errors.email.message}
                </span>
              )}
            </div>
            <div className="flex w-full flex-col gap-y-1.5">
              <InputMask
                mask="+7 (999) 999-99-99"
                maskChar={null}
                {...form.register("phone")}
                placeholder="+7 (___) ___-__-__"
                required
              >
                {(inputProps: any) => (
                  <Input 
                    {...inputProps}
                    type="tel"
                    aria-invalid={!!form.formState.errors.phone}
                  />
                )}
              </InputMask>
              {form.formState.errors.phone && (
                <span className="text-[11px] text-red-500 md:text-[16px]">
                  {form.formState.errors.phone.message}
                </span>
              )}
            </div>
            <div className="flex w-full flex-col gap-y-1.5">
              <Input
                {...form.register("address")}
                placeholder="Адрес доставки"
                required
                aria-invalid={!!form.formState.errors.address}
              />
              {form.formState.errors.address && (
                <span className="text-[11px] text-red-500 md:text-[16px]">
                  {form.formState.errors.address.message}
                </span>
              )}
            </div>
            <span className="font-inter text-[11px] leading-[13px] text-black sm:text-[17px] sm:leading-[20px] md:text-[24px] md:leading-[29px]">
              Сумма сертификата
            </span>
            <RadioGroup
              onValueChange={(value) => form.setValue("value", Number(value))}
              defaultValue="4500"
              className="inline-flex w-full items-center justify-between px-5 sm:px-[27px] md:px-[41px]"
            >
              {isLoading ? (
                <div>Loading certificates...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                certificates.map(
                  (
                    cert
                  ) => (
                    <RadioGroupItem
                      key={cert.displayOrder}
                      className="w-full"
                      label={`${cert.value.toLocaleString()} ₽`}
                      value={cert.value.toString()}
                      id={`r${cert.displayOrder}`}
                    />
                  )
                )
              )}
            </RadioGroup>
            <Textarea
              {...form.register("comment")}
              placeholder="Комментарий"
              className="resize-none text-black"
            />

            <Button
              variant="gradient"
              size="lg"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Отправка..." : "Оставить заявку"}
            </Button>

            <p className="text-center font-inter text-[11px] leading-[13px] text-black md:text-[16px] md:leading-[19px]">
              После заказа, если с Вами не связались в течении дня, позвоните
              нам: +7(4822) 630-444
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
