import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryIds, // 👈 ahora acepta múltiples categorías
  productsIds,
  countryCode,
  minPrice,
  maxPrice
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryIds?: string[]           // 👈 array
  productsIds?: string[]
  countryCode: string,
  minPrice?: number
  maxPrice?: number
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,          // 👈 usa la constante
  }

  if (collectionId) {
    queryParams.collection_id = [collectionId]
  }

  if (categoryIds && categoryIds.length > 0) {
    queryParams.category_id = categoryIds            // 👈 pasa todas las categorías
  }

  if (productsIds?.length) {
    queryParams.id = productsIds
  }

  if (  minPrice !== undefined ) {
    queryParams.order = `price:>=${minPrice}`
  }
  if (  maxPrice !== undefined ) {
    queryParams.order = queryParams.order
      ? `${queryParams.order},price:<=${maxPrice}`
      : `price:<=${maxPrice}`
  }

  // Mapea orden si lo necesitas (puedes dejar que lo resuelva listProductsWithSort también)
  if (sortBy === "created_at") {
    queryParams.order = "created_at"
  }

  const region = await getRegion(countryCode)
  if (!region) return null

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => (
          <li key={p.id}>
            <ProductPreview product={p} region={region} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
