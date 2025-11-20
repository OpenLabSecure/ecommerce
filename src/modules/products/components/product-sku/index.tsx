import { HttpTypes } from "@medusajs/types"
import { Package } from "lucide-react"

interface ProductSkuProps {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}

export default function ProductSku({ product, variant }: ProductSkuProps) {
  // Obtener la variante actual
  const currentVariant = variant || product.variants?.[0]
  
  // Extraer el SKU
  const sku = (currentVariant as any)?.sku
  
  // Si no hay SKU, no mostrar nada
  if (!sku) {
    return null
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-center w-8 h-8 bg-gray-600 rounded-full flex-shrink-0">
        <Package className="w-4 h-4 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
          Código SKU
        </span>
        <span className="text-sm font-bold text-gray-900 font-mono">
          {sku}
        </span>
      </div>
    </div>
  )
}