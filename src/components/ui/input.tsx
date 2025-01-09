import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <span className="relative w-full">
        {props.required && (
          <span className="sm:leading-[20px]font-black absolute right-[17px] translate-y-1/2 text-[11px] leading-[14px] text-[#121212]/50 sm:text-[16px] md:text-[24px] md:leading-[29px]">
            *
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex w-full rounded-[7px] bg-[#EEE] p-2.5 font-inter text-[11px] leading-[13px] text-[#121212] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-[#121212]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-[10px] sm:p-0 sm:py-2.5 sm:pl-[13px] sm:text-[17px] sm:leading-[20px] md:h-[63px] md:rounded-[14px] md:px-5 md:py-[17px] md:text-[24px] md:leading-[29px]",
            className
          )}
          ref={ref}
          {...props}
        />
      </span>
    )
  }
)
Input.displayName = "Input"

export { Input }
