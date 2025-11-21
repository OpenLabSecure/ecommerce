
import { getRegion } from "@lib/data/regions"
import { Pagination } from "@modules/store/components/pagination"
import { getFilteredProducts } from "@lib/data/products-filter"
import ProductPreview from "@modules/products/components/product-preview"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { convertToLocale } from "@lib/util/money"

const PRODUCT_LIMIT = 12

type SearchResultsProps = {
  query: string
  page: number
  countryCode: string
  sortBy?: SortOptions
  categoryIds?: string[]
  minPrice?: number
  maxPrice?: number
}

export default async function SearchResults({
  query,
  page,
  countryCode,
  sortBy = "created_at",
  categoryIds,
  minPrice,
  maxPrice,
}: SearchResultsProps) {
  const region = await getRegion(countryCode)
  
  if (!region) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-xl text-gray-600 mb-2">
          Región no encontrada
        </p>
      </div>
    )
  }

  try {
    // Mapear sortBy a order_by y sort
    let orderBy = "created_at"
    let sort: "ASC" | "DESC" = "DESC"

    if (sortBy === "price_asc") {
      orderBy = "variants.calculated_price.calculated_amount"
      sort = "ASC"
    } else if (sortBy === "price_desc") {
      orderBy = "variants.calculated_price.calculated_amount"
      sort = "DESC"
    } else if (sortBy === "created_at") {
      orderBy = "created_at"
      sort = "DESC"
    }

    const { products, metadata } = await getFilteredProducts({
      search: query,
      category_id: categoryIds,
      min_price: minPrice,
      max_price: maxPrice,
      currency_code: region.currency_code,
      page,
      limit: PRODUCT_LIMIT,
      order_by: orderBy,
      sort,
    })
    
      const totalPages = metadata.total_pages || 0
    if (products.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-xl text-gray-600 mb-2">
            No se encontraron productos
          </p>
          <p className="text-gray-500">
            Intenta con otros términos de búsqueda o ajusta los filtros
          </p>
        </div>
      )
    }

    // Transformar productos para proporcionar un precio preformateado al preview
    const transformedProducts = products.map((p: any) => {
      if (!p.price_range) return p

      const cheapestVariant = {
        calculated_price: {
          calculated_amount: p.price_range.min,
          original_amount: p.price_range.max ?? p.price_range.min,
          currency_code: region.currency_code,
          calculated_price: { price_list_type: "default" },
        },
      }

      const previewPrice = {
        calculated_price_number: p.price_range.min,
        calculated_price: convertToLocale({
          amount: p.price_range.min,
          currency_code: region.currency_code,
        }),
        original_price_number: p.price_range.max ?? p.price_range.min,
        original_price: convertToLocale({
          amount: p.price_range.max ?? p.price_range.min,
          currency_code: region.currency_code,
        }),
        currency_code: region.currency_code,
        price_type: "default",
        percentage_diff: "0%",
      }

      return {
        ...p,
        variants: [cheapestVariant],
        _preview_price: previewPrice,
      }
    })

    return (
      <>
        {/* Contador de resultados */}
        <div className="mb-6 text-sm text-gray-600">
          {metadata.total_filtered} {metadata.total_filtered === 1 ? 'producto encontrado' : 'productos encontrados'}
        </div>

        {/* Grid de productos */}
        <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
          {transformedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} price={product._preview_price} />
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
  } catch (error) {
    console.error("❌ Error in SearchResults:", error)
    
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-xl text-red-600 mb-2">
          Error al cargar productos
        </p>
        <p className="text-gray-500">
          Por favor, intenta de nuevo más tarde
        </p>
      </div>
    )
  }
}