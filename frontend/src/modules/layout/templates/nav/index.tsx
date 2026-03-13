import { Suspense } from "react"
import { Menu, User, ShoppingBag } from "lucide-react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-10 group">
      <header className="relative h-20 mx-auto border-b bg-background/95 backdrop-blur border-border transition-all duration-300">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* Left Side: Menu + Logo */}
          <div className="flex items-center gap-3">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
            
            {/* Logo */}
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2"
              data-testid="nav-store-link"
            >
              <img src="/assets/logo.png" alt="Dailybudgetmart" className="w-10 h-10 object-contain" />
              <h1 className="font-serif text-xl md:text-2xl tracking-tight">
                Dailybudgetmart
              </h1>
            </LocalizedClientLink>
          </div>



          {/* Right Side: Action Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="flex items-center text-sm font-medium tracking-wide hover:text-foreground transition-colors luxury-link p-2 rounded-lg hover:bg-muted"
                href="/account"
                data-testid="nav-account-link"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center gap-2 text-sm font-medium tracking-wide hover:text-foreground transition-colors"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
