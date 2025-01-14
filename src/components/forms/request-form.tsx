"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { submitForm } from "@/actions/create-request"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "../ui/form"
import { PhoneInput } from "../ui/phone-input"
import { cn } from "@/utils"
import { QuestCardProps } from "../sections/quests/card"
import KeyIcon from "@/icons/key-icon"
import SwordIcon from "@/icons/sword-icon"
import SkullIcon from "@/icons/skull-icon"
import MoneyIcon from "@/icons/money-icon"
import PotionIcon from "@/icons/potion-icon"
import HatIcon from "@/icons/hat-icon"
import DrinkIcon from "@/icons/drink-icon"

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
  comment: z.string().optional(),
  questName: z.string().optional(),
})

interface RequestFormProps {
  className?: string
  quests: QuestCardProps[]
}
const questIcons = {
  key: <KeyIcon className="size-[16px]" />,
  sword: <SwordIcon className="size-[16px]" />,
  skull: <SkullIcon className="size-[16px]" />,
  money: <MoneyIcon className="size-[16px]" />,
  potion: <PotionIcon className="size-[16px]" />,
  hat: <HatIcon className="size-[16px]" />,
  drink: <DrinkIcon className="size-[16px]" />,
}
export default function RequestForm({ className, quests }: RequestFormProps) {
  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false)
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false)

  const handleOpenFirstDialog = () => {
    setIsFirstDialogOpen(true)
  }

  const handleCloseFirstDialog = () => {
    setIsFirstDialogOpen(false)
    form.reset()
  }

  const handleOpenSecondDialog = () => {
    setIsFirstDialogOpen(false)
    setIsSecondDialogOpen(true)
  }

  const handleCloseSecondDialog = () => {
    setIsSecondDialogOpen(false)
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const [isPending, startTransition] = useTransition()

  function formatPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(/[^\d]/g, "")
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const result = await submitForm({
          name: data.name,
          phone: formatPhoneNumber(data.phone),
          comment: data.comment,
          questName: data.questName,
        })
        if (result.success) {
          form.reset()
          handleOpenSecondDialog()
        } else {
          alert(result.message)
        }
      } catch (error) {
        alert(`${error}`)
      }
    })
  }
  const difficultyIcons = Array.from({ length: 3 }, (_, index) => (
    <span
      key={index}
      className={
        index < quests[index].difficulty ? "text-brand-main" : "text-[#6A6A6A]"
      }
    >
      {questIcons[quests[index].type]}
    </span>
  ))
  return (
    <>
      <Dialog open={isFirstDialogOpen} onOpenChange={setIsFirstDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"gradient"}
            size={"lg"}
            className={cn("w-full", className)}
          >
            Оставить заявку
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <span className="pb-5 font-inter text-[17px] font-semibold leading-[21px] text-black sm:pb-[34px] md:pb-10 md:text-[36px] md:leading-[44px]">
            Оставить заявку
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

              <Textarea
                {...form.register("comment")}
                placeholder="Комментарий"
                className="resize-none text-black"
              />

              <div className="flex w-full flex-col gap-y-1.5">
                <p className="text-center text-[24px] font-semibold leading-[29px] text-black">
                  Укажите тему
                </p>
                <div className="flex flex-col gap-x-2.5 gap-y-2.5 md:grid md:grid-cols-4">
                  {quests.map((quest) => (
                    <div
                      key={quest.id}
                      onClick={() => form.setValue("questName", quest.label)}
                      className={cn(
                        "flex h-[57px] w-full cursor-pointer flex-row items-center justify-between rounded-[14px] bg-[#EEEEEE] px-[40px] transition-all md:h-[72px] md:flex-col md:p-[10px]",
                        form.watch("questName") === quest.label &&
                          "ring-2 ring-brand-main"
                      )}
                    >
                      <p className="flex h-full items-center justify-center text-center text-[12px] font-semibold leading-[14px] text-black">
                        {quest.label}
                      </p>
                      <div className="flex flex-row gap-1">
                        {Array.from({ length: 3 }, (_, index) => (
                          <span
                            key={index}
                            className={cn(
                              index < quest.difficulty
                                ? "text-brand-main"
                                : "text-[#6A6A6A]",
                              "flex flex-row gap-1"
                            )}
                          >
                            {questIcons[quest.type]}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={() => form.setValue("questName", "Прочее")}
                    className={cn(
                      "flex h-[57px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#EEEEEE] transition-all md:h-[72px]",
                      form.watch("questName") === "Прочее" &&
                        "ring-2 ring-brand-main"
                    )}
                  >
                    <p className="text-center text-[12px] font-semibold text-black">
                      Прочее
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-center font-inter text-[11px] leading-[13px] text-black md:text-[16px] md:leading-[19px]">
                С Вами свяжутся в течении дня
              </p>
              <Button
                variant="gradient"
                size="lg"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Отправка..." : "Отправить"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSecondDialogOpen} onOpenChange={setIsSecondDialogOpen}>
        <DialogContent className="flex h-[183px] max-w-[400px] flex-col items-center justify-center rounded-[14px] border-[2.5px] border-[#F9800F] text-center">
          <svg
            width="104"
            height="98"
            viewBox="0 0 104 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.6812 54.6474L35.7043 65.1658C36.5994 65.837 37.7192 66.1363 38.8298 66.0014C39.9404 65.8664 40.9558 65.3075 41.6641 64.4415L78.0688 19.9473"
              stroke="url(#paint0_linear_934_134)"
              stroke-width="8.81385"
              stroke-linecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_934_134"
                x1="32.133"
                y1="30.1503"
                x2="78.2957"
                y2="66.3793"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F6A819" />
                <stop offset="1" stop-color="#F8470F" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-inter text-[24px] font-semibold text-black">
            Успешно забронировано
          </span>
        </DialogContent>
      </Dialog>
    </>
  )
}
