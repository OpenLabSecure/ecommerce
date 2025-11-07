"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  // CAMBIO PRINCIPAL: Configuración de caché
  const isDevelopment = process.env.NODE_ENV === "development"

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
          ...queryParams,
        },
        headers,
        next: isDevelopment
          ? { revalidate: 0 } // Sin caché en desarrollo
          : { revalidate: 60, tags: ["products"] }, // 60 segundos en producción
        cache: isDevelopment ? "no-store" : "force-cache",
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = (page - 1) * limit

  const nextPage = count > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}



// Agregar esta función al final del archivo existente

/**
 * Busca productos por término de búsqueda
 */
export const searchProducts = async ({
  query,
  page = 1,
  limit = 12,
  countryCode,
  regionId,
}: {
  query: string
  page?: number
  limit?: number
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const offset = (page - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else if (regionId) {
    region = await retrieveRegion(regionId)
  }

  if (!region) {
    console.error("❌ No se encontró la región")
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  // 🔍 Debug: Ver qué parámetros se están enviando
  const queryParams = {
    q: query,
    limit,
    offset,
    region_id: region.id,
    fields:
      "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
  }

  console.log("🔍 Búsqueda con parámetros:", queryParams)

  try {
    const result = await sdk.client.fetch<{
      products: HttpTypes.StoreProduct[]
      count: number
    }>(`/store/products`, {
      method: "GET",
      query: queryParams,
      headers,
      next,
      cache: "no-store",
    })

    console.log(`✅ Búsqueda exitosa: ${result.count} productos encontrados`)

    const nextPage = result.count > offset + limit ? page + 1 : null

    return {
      response: {
        products: result.products || [],
        count: result.count || 0,
      },
      nextPage,
    }
  } catch (error) {
    console.error("❌ Error en búsqueda:", error)
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }
}