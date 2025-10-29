import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div className="w-full">
      {/* Subtotals Section */}
      <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-sm small:text-base">
            Subtotal (excl. envío e impuestos)
          </span>
          <span 
            className="text-sm small:text-base font-medium"
            data-testid="cart-subtotal" 
            data-value={item_subtotal || 0}
          >
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-sm small:text-base">Envío</span>
          <span 
            className="text-sm small:text-base font-medium"
            data-testid="cart-shipping" 
            data-value={shipping_subtotal || 0}
          >
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>

        {/* Discount - Only show if exists */}
        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span className="text-sm small:text-base">Descuento</span>
            <span
              className="text-ui-fg-interactive text-sm small:text-base font-medium"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}

        {/* Taxes */}
        <div className="flex items-center justify-between">
          <span className="text-sm small:text-base">Impuestos</span>
          <span 
            className="text-sm small:text-base font-medium"
            data-testid="cart-taxes" 
            data-value={tax_total || 0}
          >
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full border-b border-gray-200 my-4" />

      {/* Total Section */}
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium">
        <span className="text-base small:text-lg font-semibold">Total</span>
        <span
          className="text-lg small:text-xl font-bold"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>

      {/* Bottom Divider */}
      <div className="h-px w-full border-b border-gray-200 mt-4" />
    </div>
  )
}

export default CartTotals