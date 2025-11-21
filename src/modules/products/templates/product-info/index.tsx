"use client"

import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { FileText, Eye } from "lucide-react"
//import StockIndicator from "@modules/products/components/stock-indicator"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {

  console.log("product", product)

  // Extraer la marca de la metadata
  const brand = product.metadata?.marca as string | undefined
  const aboutProduct = product.metadata?.acerca_del_producto as string | undefined
  const infoProduct = product.metadata?.informacion_oficial as string | undefined
  const firstVariant = product.variants?.[0]

  const handleViewInfo = () => {
    if (infoProduct) {
      window.open(infoProduct, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        {/* Marca del equipo */}
        {brand && (
          <div className="flex items-center gap-2">
            <Text className="text-sm font-semibold text-ui-fg-subtle uppercase tracking-wide">
              {brand}
            </Text>
          </div>
        )}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>
         {/* Indicador de Stock
        {firstVariant && (
          <StockIndicator 
            variant={firstVariant} 
            showQuantity={true}
          />
        )} */}
        
        {/* Acerca del producto */}
        {aboutProduct && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <Text
              className="text-medium text-ui-fg-subtle whitespace-pre-line leading-relaxed"
              data-testid="product-description"
            >
              <span className="font-semibold text-blue-900 block mb-2">
                Acerca del producto:
              </span>
              {aboutProduct}
            </Text>
          </div>
        )}

        {/* Informacion del producto como pdf */}
        {infoProduct && (
          <button 
            onClick={handleViewInfo}
            className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group cursor-pointer"
          >
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Ver Información</span>
            <Eye className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductInfo