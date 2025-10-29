"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-4 w-full">
      {/* Header - Responsive text size */}
      <Heading 
        level="h2" 
        className="text-2xl leading-8 small:text-[2rem] small:leading-[2.75rem]"
      >
        Resumen
      </Heading>

      {/* Discount Code Section */}
      <div className="w-full">
        <DiscountCode cart={cart} />
      </div>

      <Divider />

      {/* Cart Totals - Scrollable on small screens if needed */}
      <div className="w-full overflow-x-auto">
        <CartTotals totals={cart} />
      </div>

      {/* Checkout Button - Sticky on mobile */}
      <div className="w-full sticky bottom-0 small:static bg-white py-4 small:py-0 -mx-4 px-4 small:mx-0 small:px-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] small:shadow-none">
        <LocalizedClientLink
          href={"/checkout?step=" + step}
          data-testid="checkout-button"
        >
          <Button className="w-full h-10 small:h-12 text-sm small:text-base">
            Ir al pago
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Summary