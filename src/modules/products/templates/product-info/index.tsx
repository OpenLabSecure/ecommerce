import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
//import StockIndicator from "@modules/products/components/stock-indicator"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {

  console.log("product", product)

  // Extraer la marca de la metadata
  const brand = product.metadata?.marca as string | undefined
  const aboutProduct = product.metadata?.acerca_del_producto as string | undefined
  const firstVariant = product.variants?.[0]
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
        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          Acerca del producto:
          {aboutProduct}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
