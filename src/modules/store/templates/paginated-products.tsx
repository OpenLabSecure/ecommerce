import { getFilteredProducts } from "@lib/data/products-filter"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { convertToLocale } from "@lib/util/money"// Importar la utilidad de formato

const PRODUCT_LIMIT = 12

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryIds,
  productsIds,
  countryCode,
  minPrice,
  maxPrice,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryIds?: string[]
  productsIds?: string[]
  countryCode: string
  minPrice?: number
  maxPrice?: number
}) {
  const region = await getRegion(countryCode)
  if (!region) return null

  // Mapear sortBy a los parámetros `order_by` y `sort` de getFilteredProducts
  let orderBy = "created_at"
  let sort: "ASC" | "DESC" = "DESC"

  if (sortBy === "price_asc") {
    orderBy = "variants.calculated_price.calculated_amount"
    sort = "ASC"
  } else if (sortBy === "price_desc") {
    orderBy = "variants.calculated_price.calculated_amount"
    sort = "DESC"
  }

  // Combinar collectionId y categoryIds en un solo array para el filtro
  const allCategoryIds = categoryIds ? [...categoryIds] : []
  if (collectionId) {
    allCategoryIds.push(collectionId)
  }

  // Llamada a getFilteredProducts con los parámetros correctos
  const { products: rawProducts, metadata } = await getFilteredProducts({
    page,
    limit: PRODUCT_LIMIT,
    category_id: allCategoryIds.length > 0 ? allCategoryIds : undefined,
    min_price: minPrice,
    max_price: maxPrice,
    currency_code: region.currency_code,
    order_by: orderBy,
    sort,
    // Nota: `productsIds` no es un filtro estándar en `getFilteredProducts`.
    // Si necesitas filtrar por IDs de producto, tendrías que añadir ese
    // parámetro al endpoint del backend y a la función `getFilteredProducts`.
  })

  // Transformar los productos para que coincidan con la estructura esperada
  const products = rawProducts.map((p: any) => {
    if (!p.price_range) {
      return p
    }

     // Crear una pseudo-variante con el precio más bajo
    const cheapestVariant = {
      calculated_price: {
        calculated_amount: p.price_range.min,
        original_amount: p.price_range.max ?? p.price_range.min,
        currency_code: region.currency_code,
        calculated_price: { price_list_type: "default" },
      },
    }

    // Construir un objeto de precio que coincida con `VariantPrice` para pasar
    // directamente a `ProductPreview`/`PreviewPrice` si se desea.
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
      // Campo auxiliar para pasar el precio preformateado al preview
      _preview_price: previewPrice,
    }
  })

  const totalPages = metadata.total_pages || 0
  

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => (
          <li key={p.id}>
            <ProductPreview product={p as any} region={region} price={p._preview_price} />
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

// import { listProductsWithSort } from "@lib/data/products"
// import { getRegion } from "@lib/data/regions"
// import ProductPreview from "@modules/products/components/product-preview"
// import { Pagination } from "@modules/store/components/pagination"
// import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

// const PRODUCT_LIMIT = 12

// type PaginatedProductsParams = {
//   limit: number
//   collection_id?: string[]
//   category_id?: string[]
//   id?: string[]
//   order?: string
// }

// export default async function PaginatedProducts({
//   sortBy,
//   page,
//   collectionId,
//   categoryIds, // 👈 ahora acepta múltiples categorías
//   productsIds,
//   countryCode,
//   minPrice,
//   maxPrice
// }: {
//   sortBy?: SortOptions
//   page: number
//   collectionId?: string
//   categoryIds?: string[]           // 👈 array
//   productsIds?: string[]
//   countryCode: string,
//   minPrice?: number
//   maxPrice?: number
// }) {
//   const queryParams: PaginatedProductsParams = {
//     limit: PRODUCT_LIMIT,          // 👈 usa la constante
//   }

//   if (collectionId) {
//     queryParams.collection_id = [collectionId]
//   }

//   if (categoryIds && categoryIds.length > 0) {
//     queryParams.category_id = categoryIds            // 👈 pasa todas las categorías
//   }

//   if (productsIds?.length) {
//     queryParams.id = productsIds
//   }

//   if (  minPrice !== undefined ) {
//     queryParams.order = `price:>=${minPrice}`
//   }
//   if (  maxPrice !== undefined ) {
//     queryParams.order = queryParams.order
//       ? `${queryParams.order},price:<=${maxPrice}`
//       : `price:<=${maxPrice}`
//   }

//   // Mapea orden si lo necesitas (puedes dejar que lo resuelva listProductsWithSort también)
//   if (sortBy === "created_at") {
//     queryParams.order = "created_at"
//   }

//   const region = await getRegion(countryCode)
//   if (!region) return null

//   const {
//     response: { products, count },
//   } = await listProductsWithSort({
//     page,
//     queryParams,
//     sortBy,
//     countryCode,
//   })

//   const totalPages = Math.ceil(count / PRODUCT_LIMIT)

//   return (
//     <>
//       <ul
//         className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
//         data-testid="products-list"
//       >
//         {products.map((p) => (
//           <li key={p.id}>
//             <ProductPreview product={p} region={region} />
//           </li>
//         ))}
//       </ul>

//       {totalPages > 1 && (
//         <Pagination
//           data-testid="product-pagination"
//           page={page}
//           totalPages={totalPages}
//         />
//       )}
//     </>
//   )
// }
