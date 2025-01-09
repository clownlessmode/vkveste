import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-[7px] bg-[#EEE] p-2.5 font-inter text-[11px] leading-[13px] placeholder:text-[#121212]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 sm:min-h-[92px] sm:rounded-[10px] sm:p-0 sm:py-2.5 sm:pl-[13px] sm:text-[17px] sm:leading-[20px] md:h-[63px] md:min-h-[140px] md:rounded-[14px] md:px-5 md:py-[17px] md:text-[24px] md:leading-[29px]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
