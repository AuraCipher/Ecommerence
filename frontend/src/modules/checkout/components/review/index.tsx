"use client"

import { Heading, Text, clx } from "@medusajs/ui"
import { CheckCircleSolid } from "@medusajs/icons"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Review
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircleSolid className="h-5 w-5 text-primary" />
                </div>
                <Text className="text-lg font-semibold">Ready to Complete Your Order</Text>
              </div>
              <Text className="text-sm text-muted-foreground">
                By clicking the Place Order button, you confirm that you have read, understand and accept our Terms of Use, Terms of Sale and Returns Policy and acknowledge that you have read our Privacy Policy.
              </Text>
            </div>
            
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-1 w-24 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full" />
              </div>
              <Text className="text-sm text-muted-foreground">
                Your order will be processed securely and you'll receive a confirmation email shortly.
              </Text>
            </div>
            
            <PaymentButton cart={cart} data-testid="submit-order-button" />
          </div>
        </>
      )}
    </div>
  )
}

export default Review
