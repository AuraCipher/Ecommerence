import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import { CheckCircleSolid } from "@medusajs/icons"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      {/* Shipping Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <span className="h-5 w-5 text-primary">📍</span>
          </div>
          <h2 className="text-2xl font-semibold">Shipping Information</h2>
        </div>
        <Addresses cart={cart} customer={customer} />
      </div>

      {/* Shipping Method */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <span className="h-5 w-5 text-primary">🚚</span>
          </div>
          <h2 className="text-2xl font-semibold">Shipping Method</h2>
        </div>
        <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <span className="h-5 w-5 text-primary">💳</span>
          </div>
          <h2 className="text-2xl font-semibold">Payment Method</h2>
        </div>
        <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      </div>

      {/* Review */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CheckCircleSolid className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">Review & Confirm</h2>
        </div>
        <Review cart={cart} />
      </div>
    </div>
  )
}
