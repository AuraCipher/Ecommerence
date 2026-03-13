import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { ShoppingCart } from "lucide-react"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
  })

  // Get category from product tags or collection
  const category = product.collection?.title || 
    (product.tags && product.tags.length > 0 ? product.tags[0].value : "Essentials")

  return (
    <div 
      className="group cursor-pointer animate-fade-in"
      style={{ animationDelay: `${Math.random() * 0.3}s` }}
    >
      <LocalizedClientLink href={`/products/${product.handle}`} className="block">
        <div className="relative bg-card rounded-lg overflow-hidden border-2 border-border shadow-md transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 lg:group-hover:scale-105">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted/30">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="square"
              isFeatured={isFeatured}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 active:scale-105"
            />
            
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
            
            {/* Quick Add Button - Shows on Hover */}
            <button className="absolute bottom-4 left-4 right-4 bg-primary text-primary-foreground py-3 px-4 rounded-md opacity-0 group-hover:opacity-100 group-active:opacity-100 translate-y-2 group-hover:translate-y-0 group-active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:bg-primary/90">
              <ShoppingCart className="h-4 w-4" />
              Quick Add
            </button>
          </div>

          {/* Product Info */}
          <div className="p-3 sm:p-6 bg-card">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">{category}</p>
            <h3 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            
            <div className="flex items-center gap-2 sm:gap-3">
              {cheapestPrice && (
                <span className="text-lg sm:text-2xl font-semibold text-foreground">
                  {cheapestPrice.calculated_price}
                </span>
              )}
              {variantPrice && variantPrice.price_type === "sale" && (
                <span className="text-muted-foreground line-through text-xs sm:text-sm">
                  {variantPrice.original_price}
                </span>
              )}
            </div>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
