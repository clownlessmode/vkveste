"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface VideoDialogProps {
  children: React.ReactNode
  videoSrc: string
  className?: string
}

export function VideoDialog({
  children,
  videoSrc,
  className,
}: VideoDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "border-none bg-transparent p-0 shadow-none",
          "max-h-[90vh] w-[90vw]",
          "sm:w-[80vw]",
          className
        )}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[8px] bg-transparent p-5 md:rounded-[14px]">
          <video
            src={videoSrc}
            controls
            autoPlay={isOpen}
            className="mx-auto h-auto w-full rounded-[8px] md:rounded-[14px]"
            playsInline
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
