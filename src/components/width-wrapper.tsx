import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface MaxWidthWrapperProps {
  className?: string
  children: ReactNode
}

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-[460px] px-1 sm:px-5 md:max-w-[680px] lg:max-w-[900px] xl:max-w-[1340px]",
        className
      )}
    >
      {children}
    </div>
  )
}
