"use client"
import { LogoFull } from "@/icons/logo"
import { MaxWidthWrapper } from "./width-wrapper"
import Link from "next/link"
import { Button } from "./ui/button"
import { MenuIcon, XIcon } from "lucide-react"
import { useState, useEffect } from "react"
import navbar from "@/data/navbar"
import { use } from "react"

const navbarData = navbar()

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = use(navbarData)
  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])
  return (
    <nav className="sticky inset-x-0 top-0 z-[250] w-full bg-gray-100 pt-4 lg:pt-[6px]">
      <MaxWidthWrapper>
        <div className="flex w-full items-center justify-between pb-2 md:block lg:flex">
          <Link className="block w-max md:hidden xl:block" href="/">
            <LogoFull className="h-10 w-[166px] lg:w-[300px]" />
          </Link>
          <div className="hidden w-full items-center justify-between gap-x-5 whitespace-nowrap md:flex lg:justify-end lg:gap-x-[30px]">
            {navigation.main.map((i, index) => {
              return (
                <Link
                  key={index}
                  href={i.link}
                  className="text-lg leading-[29px] text-white transition duration-300 hover:opacity-75 lg:text-2xl"
                >
                  {i.title}
                </Link>
              )
            })}
            <Button
              asChild
              className="!px-5 !py-2.5 !text-lg transition duration-300 hover:opacity-75 lg:!px-[26px] lg:!py-[13px] lg:!text-2xl"
              variant={"gradient"}
            >
              <Link href="/booking">Записаться</Link>
            </Button>
          </div>
          <button onClick={toggleMenu} className="relative md:hidden">
            <MenuIcon className="!h-6 !w-[30px] !text-[#F8BC0F]"></MenuIcon>
          </button>
        </div>
      </MaxWidthWrapper>
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-10 transition-all duration-300 ${
          isOpen 
            ? "visible opacity-100" 
            : "invisible opacity-0 delay-300"
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`fixed right-0 top-0 block h-full pl-[30px] pr-2.5 bg-brand-main transition-all duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto flex w-full flex-col items-end gap-y-[23px] whitespace-nowrap pr-2.5 pt-5 md:hidden lg:justify-end lg:gap-x-[30px]">
            <button onClick={toggleMenu}>
              <MenuIcon className="!h-6 !w-[30px] !text-[#151515]" />
            </button>
            {navigation.main.map((i, index) => {
              return (
                <Link
                  onClick={toggleMenu}
                  key={index}
                  href={i.link}
                  className="text-[18px] leading-[22px] text-black"
                >
                  {i.title}
                </Link>
              )
            })}
            <Link
              onClick={toggleMenu}
              href="/booking"
              className="rounded-[8px] bg-[#F8470F] px-5 py-2.5 text-[18px] font-semibold leading-[22px] text-white"
            >
              Записаться
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
