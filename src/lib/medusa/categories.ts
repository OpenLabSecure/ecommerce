import { ProductCategoryF } from "types/global"

// lib/medusa/categories.ts
const BASE_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!

type StoreCategory = {
  id: string
  handle: string
  name?: string
  // ...otros campos si los necesitas
}

export async function listCategories(limit = 100): Promise<ProductCategoryF[]> {
  const url = new URL(`${BASE_URL}/store/product-categories`)
  url.searchParams.set("limit", String(limit))
  // opcional: limitar fields para performance
  url.searchParams.set("fields", "id,handle,name")

  const res = await fetch(url.toString(), {
    next: { revalidate: 600 }, // 10 minutos cache
    cache: "force-cache",
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.product_categories ?? []
}

export async function getCategoryByHandle(handle: string): Promise<StoreCategory | null> {
  const url = new URL(`${BASE_URL}/store/product-categories`)
  url.searchParams.set("handle", handle)
  url.searchParams.set("limit", "1")
  url.searchParams.set("fields", "id,handle,name")

  const res = await fetch(url.toString(), {
    next: { revalidate: 300 },
    cache: "force-cache",
  })
  if (!res.ok) return null  
  const data = await res.json()
  return data.product_categories?.[0] ?? null
}
