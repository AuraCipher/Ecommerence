"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { clx } from "@medusajs/ui"

export function ShowMore({
  hasMore,
  currentCount,
  'data-testid': dataTestid
}: {
  hasMore: boolean
  currentCount: number
  'data-testid'?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleShowMore = () => {
    const params = new URLSearchParams(searchParams)
    const currentLimit = parseInt(params.get("limit") || "12")
    const newLimit = currentLimit + 12
    params.set("limit", newLimit.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  if (!hasMore) return null

  return (
    <div className="flex justify-center w-full mt-12" data-testid={dataTestid}>
      <button
        onClick={handleShowMore}
        className={clx(
          "inline-flex items-center justify-center px-8 py-3",
          "rounded-full bg-primary text-primary-foreground",
          "hover:bg-primary/90 transition-colors",
          "text-sm font-medium tracking-wide",
          "animate-fade-in"
        )}
      >
        Show More ({currentCount} shown)
      </button>
    </div>
  )
}