
import { cache } from "react"

interface ProductFilterParams {
  search?: string
  category_id?: string[]
  min_price?: number
  max_price?: number
  currency_code?: string
  tags?: string[]
  in_stock?: boolean
  limit?: number
  page?: number
  order_by?: string
  sort?: "ASC" | "DESC"
}

interface ProductFilterResponse {
  products: any[]
  metadata: {
    count: number
    total: number
    total_filtered: number
    page: number
    page_size: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
  filters_applied: {
    search: boolean
    handle: boolean
    category_id: boolean
    category_handle: boolean
    status: boolean
    price_range: boolean
    tags: boolean
    in_stock: boolean
  }
}

export const getFilteredProducts = cache(
  async (
    params: ProductFilterParams
  ): Promise<ProductFilterResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    
    // 👇 Validar que existe la publishable key
    if (!publishableKey) {
      console.error("❌ NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is not defined")
      throw new Error("Publishable key is required")
    }
    
    const queryParams = new URLSearchParams()
    
    if (params.search) {
      queryParams.append("search", params.search)
    }
    
    if (params.category_id && params.category_id.length > 0) {
      params.category_id.forEach(id => {
        queryParams.append("category_id", id)
      })
    }
    
    if (params.min_price !== undefined) {
      queryParams.append("min_price", params.min_price.toString())
    }
    
    if (params.max_price !== undefined) {
      queryParams.append("max_price", params.max_price.toString())
    }
    
    if (params.currency_code) {
      queryParams.append("currency_code", params.currency_code)
    }
    
    if (params.tags && params.tags.length > 0) {
      params.tags.forEach(tag => {
        queryParams.append("tags", tag)
      })
    }
    
    if (params.in_stock !== undefined) {
      queryParams.append("in_stock", params.in_stock.toString())
    }
    
    queryParams.append("page", (params.page || 1).toString())
    queryParams.append("limit", (params.limit || 12).toString())
    
    if (params.order_by) {
      queryParams.append("order_by", params.order_by)
    }
    
    if (params.sort) {
      queryParams.append("sort", params.sort)
    }
    
    const url = `${baseUrl}/store/products/filter?${queryParams.toString()}`
    console.log("🔍 Full URL:", url)
    console.log("🔑 Using publishable key:", publishableKey.substring(0, 20) + "...")
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": publishableKey, // 👈 Header requerido por Medusa
        },
        cache: "no-store",
      })
      
      console.log("📡 Response status:", response.status)
      
      if (!response.ok) {
        let errorBody = ""
        try {
          errorBody = await response.text()
          console.error("❌ Error body:", errorBody)
        } catch (e) {
          console.error("❌ Could not read error body")
        }
        
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}\nBody: ${errorBody}`
        )
      }
      
      const data = await response.json()
      console.log("✅ Products fetched successfully:", {
        count: data.metadata?.count,
        total: data.metadata?.total,
        page: data.metadata?.page,
      })
      
      return data
    } catch (error) {
      console.error("❌ Error fetching filtered products:", error)
      throw error
    }
  }
)