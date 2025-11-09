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
  url.searchParams.set("fields", "id,handle,name,parent_category_id,*category_children,*category_children.category_children")
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
    },
    next: { revalidate: 600 }, // 10 minutos cache
    cache: "force-cache",
  })
  console.log(1)
  if (!res.ok) {
    const dataE = await res.json()
    console.error("Failed to fetch categories TYPE:", dataE.type)
    console.error("Failed to fetch categories mensaje   :", dataE.message)
    return []
  }
    console.log(2)
  const data = await res.json()
  console.log(3)
  console.log("Fetched categoriesXD:", data)
  return data.product_categories ?? []
}

export async function getCategoryByHandle(handle: string): Promise<StoreCategory | null> {
  const url = new URL(`${BASE_URL}/store/product-categories`)
  url.searchParams.set("handle", handle)
  url.searchParams.set("limit", "1")
  url.searchParams.set("fields", "id,handle,name")

  const isDevelopment = process.env.NODE_ENV === "development"

  const res = await fetch(url.toString(), {
    next: isDevelopment 
      ? { revalidate: 0 }      // 🔥 Sin caché en desarrollo
      : { revalidate: 600 },   // ⏰ 10 minutos en producción
    cache: isDevelopment 
      ? "no-store"             // 🔥 No guardar en desarrollo
      : "force-cache",         // 💾 Usar caché en producción
  })
  if (!res.ok) return null  
  const data = await res.json()
  return data.product_categories?.[0] ?? null
}
