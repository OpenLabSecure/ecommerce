import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import PreviewPrice from "./price"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import Thumbnail from "../thumbnail"
import { VariantPrice } from "types/global"
export default async function ProductPreview({
  product,
  isFeatured,
  region,
  price,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  price?: VariantPrice
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  // Si se recibe `price` desde el padre, lo usamos; en caso contrario,
  // calculamos el precio más barato con la utilidad existente.
  const computedPrice = price ?? getProductPrice({ product }).cheapestPrice

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex txt-compact-medium mt-4 justify-between">
          <Text className="text-ui-fg-subtle" data-testid="product-title">
            {product.title}
          </Text>
          <div className="flex items-center gap-x-2">
            {computedPrice && <PreviewPrice price={computedPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}