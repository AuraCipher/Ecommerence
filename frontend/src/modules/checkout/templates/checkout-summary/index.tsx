import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <span className="h-5 w-5 text-primary">📦</span>
        </div>
        <Heading
          level="h2"
          className="flex flex-row text-2xl font-semibold items-baseline"
        >
          Order Summary
        </Heading>
      </div>
      
      <CartTotals totals={cart} />
      <ItemsPreviewTemplate cart={cart} />
      
      <div className="mt-6">
        <DiscountCode cart={cart} />
      </div>
      
      <div className="mt-6 p-4 bg-primary/5 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-primary/10 rounded">
            <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">Secure Checkout</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
