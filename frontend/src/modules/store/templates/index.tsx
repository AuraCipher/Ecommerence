import { Suspense } from "react"
import Link from "next/link"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  limit,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  limit?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "latest"
  const limitNumber = limit ? parseInt(limit) : 12

  return (
    <div className="min-h-screen flex flex-col">
      {/* Store Header - Dramatic Black Theme Effect */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-black via-gray-900 to-background w-full">
        {/* Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        {/* Dramatic Lighting Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-primary/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-2xl" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="w-full px-0 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-8 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium tracking-widest text-white/80">CURATED COLLECTION</span>
              </span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8 animate-fade-in bg-gradient-to-br from-white via-white/90 to-white/60 bg-clip-text text-transparent" style={{ animationDelay: '0.1s' }}>
              Our Store
            </h1>
            
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Handpicked items that embody quality, design, and value
            </p>
            
            {/* Enhanced Decorative Divider */}
            <div className="mt-12 flex items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-white" />
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-white/50 to-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Luxury Design */}
      <section className="w-[96%] mx-auto px-0 sm:px-6 py-12 md:py-16">
        {/* Mobile Filters - Shown at top on mobile */}
        {/*
        <div className="lg:hidden mb-6 animate-fade-in">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex gap-2 flex-wrap">
              <Link
                href="/store?sortBy=latest"
                className={`text-xs py-2 px-3 rounded-full transition-colors ${
                  sort === "latest"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                Latest
              </Link>
              <Link
                href="/store?sortBy=price-low"
                className={`text-xs py-2 px-3 rounded-full transition-colors ${
                  sort === "price-low"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                Price ↑
              </Link>
              <Link
                href="/store?sortBy=price-high"
                className={`text-xs py-2 px-3 rounded-full transition-colors ${
                  sort === "price-high"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                Price ↓
              </Link>
            </div>
          </div>
        </div>
        */}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters - Hidden on mobile, shown as sidebar on desktop */}
          {/*
          <div className="hidden lg:block lg:sticky lg:top-20 w-64 shrink-0">
            <RefinementList sortBy={sort} />
          </div>
          */}
          
          <div className="flex-1">
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
                limit={limitNumber}
              />
            </Suspense>
          </div>
        </div>
      </section>


    </div>
  )
}

export default StoreTemplate
