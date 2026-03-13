"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useEffect, useState } from "react"
import { Home, ShoppingBag, User, Package, Menu, Sparkles, Info } from "lucide-react"
import { createPortal } from "react-dom"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  "New Arrivals": "/store",
  About: "#about",
  Account: "/account",
  Cart: "/cart",
}

const SideMenuIcons = {
    Home: Home,
    Store: Package,
    "New Arrivals": Sparkles,
    About: Info,
    Account: User,
    Cart: ShoppingBag,
  } as const

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-foreground text-sm font-medium tracking-wide p-2 hover:bg-muted rounded-lg"
                >
                  <Menu className="w-5 h-5" />
                </Popover.Button>
              </div>

              {/* Overlay and Menu Panel - Both rendered through portal for proper stacking */}
              {isClient && createPortal(
                <>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div 
                      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" 
                      aria-hidden="true"
                      onClick={close}
                    />
                  </Transition>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition-transform duration-300 ease-out"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition-transform duration-300 ease-in"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <div className="flex flex-col fixed w-[75vw] sm:w-96 h-screen z-50 left-0 top-0 text-sm text-foreground shadow-2xl">
                      <div
                        data-testid="nav-menu-popup"
                        className="flex flex-col h-full bg-gradient-to-br from-card to-card/90 border-r border-border justify-between p-6 shadow-2xl backdrop-blur-xl"
                      >
                        <div className="flex justify-between items-center mb-6">
                          {/* Logo and Name */}
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden bg-transparent">
                              <img src="/assets/logo.png" alt="Dailybudgetmart" className="w-10 h-10 object-contain" />
                            </div>
                            <div>
                              <h2 className="font-serif text-xl tracking-tight text-foreground">
                                Dailybudgetmart
                              </h2>
                              <p className="text-xs text-muted-foreground">Your Budget Store</p>
                            </div>
                          </div>
                          {/* Close Button */}
                          <button 
                            data-testid="close-menu-button" 
                            onClick={close} 
                            className="p-3 hover:bg-white/10 rounded-lg transition-all duration-300 group z-70 relative"
                          >
                            <XMark className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                          </button>
                        </div>
                        <ul className="flex flex-col gap-2 items-start justify-start">
                          {Object.entries(SideMenuItems).map(([name, href]) => {
                            const IconComponent = SideMenuIcons[name as keyof typeof SideMenuIcons]
                            return (
                              <li key={name} className="w-full">
                                <LocalizedClientLink
                                  href={href}
                                  className="flex items-center gap-3 text-sm font-medium hover:bg-white/10 rounded-lg transition-all duration-300 px-3 py-2.5 group"
                                  onClick={close}
                                  data-testid={`${name.toLowerCase()}-link`}
                                >
                                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                                    <IconComponent className="w-4 h-4 text-foreground" />
                                  </div>
                                  <span className="text-foreground group-hover:text-foreground/90 transition-colors">
                                    {name}
                                  </span>
                                </LocalizedClientLink>
                              </li>
                            )
                          })}
                        </ul>
                        <div className="flex flex-col gap-y-4 pt-4 border-t border-border">
                          {/* Menu Actions */}
                          <div className="space-y-1">
                            <LocalizedClientLink
                              href="/account"
                              className="flex items-center gap-3 text-sm font-medium hover:bg-white/10 rounded-lg transition-all duration-300 px-3 py-2.5 group w-full"
                              onClick={close}
                            >
                              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                                <User className="w-4 h-4 text-foreground" />
                              </div>
                              <span className="text-foreground group-hover:text-foreground/90 transition-colors">
                                Account
                              </span>
                            </LocalizedClientLink>
                            <LocalizedClientLink
                              href="/cart"
                              className="flex items-center gap-3 text-sm font-medium hover:bg-white/10 rounded-lg transition-all duration-300 px-3 py-2.5 group w-full"
                              onClick={close}
                            >
                              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors duration-300 relative">
                                <ShoppingBag className="w-4 h-4 text-foreground" />
                              </div>
                              <span className="text-foreground group-hover:text-foreground/90 transition-colors">
                                Cart
                              </span>
                              <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                0
                              </span>
                            </LocalizedClientLink>
                          </div>
                          {/* Country Selector */}
                          <div
                            className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                            onMouseEnter={toggleState.open}
                            onMouseLeave={toggleState.close}
                          >
                            {regions && (
                              <CountrySelect
                                toggleState={toggleState}
                                regions={regions}
                              />
                            )}
                            <ArrowRightMini
                              className={clx(
                                "transition-transform duration-300 w-4 h-4",
                                toggleState.state ? "-rotate-90" : ""
                              )}
                            />
                          </div>
                          <Text className="flex justify-center text-xs text-muted-foreground/70 tracking-wide">
                            © {new Date().getFullYear()} Dailybudgetmart. All rights reserved.
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </>,
                document.body
          )}
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
