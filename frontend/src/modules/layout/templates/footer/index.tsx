import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text } from "@medusajs/ui"
import { Input } from "@medusajs/ui"
import { Button } from "@medusajs/ui"
import { Mail, Twitter, Instagram } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-ui-border-base w-full bg-white text-black">
      <div className="content-container flex flex-col w-full">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-y-12 py-16 lg:py-24">
          {/* Newsletter Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-black/70">Get the latest news and exclusive offers</p>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <LocalizedClientLink
                href="/"
                className="text-xl font-bold text-black hover:text-black/80 transition-colors"
              >
                DailyBudgetMart
              </LocalizedClientLink>
              <p className="text-sm text-black/70 mt-2 max-w-xs">
                Your trusted source for quality products at budget-friendly prices.
              </p>
            </div>

            {/* Shop */}
            <div className="flex flex-col gap-y-3">
              <span className="font-medium text-black">Shop</span>
              <ul className="space-y-2 text-sm text-black/70">
                {productCategories && productCategories?.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <LocalizedClientLink
                      href={`/categories/${category.handle}`}
                      className="hover:text-black transition-colors"
                    >
                      {category.name}
                    </LocalizedClientLink>
                  </li>
                ))}
                {collections && collections.slice(0, 2).map((collection) => (
                  <li key={collection.id}>
                    <LocalizedClientLink
                      href={`/collections/${collection.handle}`}
                      className="hover:text-black transition-colors"
                    >
                      {collection.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div className="flex flex-col gap-y-3">
              <span className="font-medium text-black">Help</span>
              <ul className="space-y-2 text-sm text-black/70">
                <li>
                  <LocalizedClientLink href="/customer-service" className="hover:text-black transition-colors">
                    Customer Service
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/shipping-returns" className="hover:text-black transition-colors">
                    Shipping & Returns
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/size-guide" className="hover:text-black transition-colors">
                    Size Guide
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/faq" className="hover:text-black transition-colors">
                    FAQ
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col gap-y-3">
              <span className="font-medium text-black">Follow Us</span>
              <div className="flex space-x-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/70 hover:text-black transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black/70 hover:text-black transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ui-border-base py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Text className="text-xs text-black/70">
              © {new Date().getFullYear()} DailyBudgetMart. All rights reserved.
            </Text>
            <div className="flex items-center gap-6 text-xs text-black/70">
              <LocalizedClientLink href="/privacy-policy" className="hover:text-black transition-colors">
                Privacy Policy
              </LocalizedClientLink>
              <LocalizedClientLink href="/terms-of-service" className="hover:text-black transition-colors">
                Terms of Service
              </LocalizedClientLink>
              <LocalizedClientLink href="/cookies" className="hover:text-black transition-colors">
                Cookie Policy
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
