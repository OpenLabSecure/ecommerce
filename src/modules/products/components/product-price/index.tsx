import { clx } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@lib/util/money"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  // Obtener la variante actual
  const currentVariant = variant || product.variants?.[0]
  
  // Extraer todos los precios disponibles
  const allPrices = (currentVariant as any)?.prices || []
  
  // Buscar precios en ambas monedas
  const usdPrice = allPrices.find((p: any) => p.currency_code === "usd")
  const penPrice = allPrices.find((p: any) => p.currency_code === "pen")

  // Formatear precios
  const formattedUsdPrice = usdPrice
    ? convertToLocale({
        amount: usdPrice.amount,
        currency_code: "usd",
      })
    : null

  const formattedPenPrice = penPrice
    ? convertToLocale({
        amount: penPrice.amount,
        currency_code: "pen",
      })
    : null

  const hasDiscount = selectedPrice.price_type === "sale"

  return (
    <div className="flex flex-col gap-3">
      {/* Badge de descuento */}
      {hasDiscount && (
        <div className="inline-flex items-center w-fit">
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{selectedPrice.percentage_diff}% OFF
          </span>
        </div>
      )}

      {/* Precios en ambas monedas - Mismo tamaño e importancia */}
      <div className="flex flex-col gap-2">
        {/* Precio en PEN */}
        {formattedPenPrice && (
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full flex-shrink-0">
              <span className="text-white font-bold text-lg">S/</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
                Soles Peruanos
              </span>
              <span className="text-2xl font-bold text-blue-900">
                {formattedPenPrice}
              </span>
            </div>
          </div>
        )}

        {/* Precio en USD */}
        {formattedUsdPrice && (
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full flex-shrink-0">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-xs text-green-600 font-medium uppercase tracking-wide">
                Dólares Americanos
              </span>
              <span className="text-2xl font-bold text-green-900">
                {formattedUsdPrice}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Precio original si hay descuento */}
      {hasDiscount && (
        <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-200">
          <span className="text-sm text-red-600 font-medium">
            Precio original:
          </span>
          <span
            className="text-sm text-red-400 line-through font-medium"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
          <span className="text-xs text-green-600 font-bold ml-auto">
            ¡Ahorras {selectedPrice.original_price_number - selectedPrice.calculated_price_number > 0 
              ? convertToLocale({
                  amount: selectedPrice.original_price_number - selectedPrice.calculated_price_number,
                  currency_code: selectedPrice.currency_code,
                })
              : ''}!
          </span>
        </div>
      )}
    </div>
  )
}