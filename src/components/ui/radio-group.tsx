"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import * as React from "react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string
  }
>(({ className, label, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "flex max-w-[63px] items-center justify-center rounded-[7px] border border-[#121212]/50 py-2.5 font-inter text-[11px] leading-[13px] text-[#121212]/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:border-transparent aria-checked:bg-yellow-500 aria-checked:bg-gradient-to-b aria-checked:from-brand-main aria-checked:to-[#F6A819] aria-checked:font-semibold aria-checked:text-white dark:text-zinc-50 dark:focus-visible:ring-zinc-300 sm:max-w-[85px] sm:rounded-[10px] sm:text-[17px] sm:leading-[20px] md:max-w-[130px] md:rounded-[14px] md:py-[17px] md:text-[24px] md:leading-[29px]",
        className
      )}
      {...props}
    >
      <span>{label}</span>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
