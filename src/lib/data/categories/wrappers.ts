// @lib/data/categories/wrappers.ts
import { getCategoryByHandle } from "@lib/data/categories"
import { listCategories } from "@lib/medusa/categories"
import { ProductCategoryF } from "types/global"

export const getCategoryIdFromHandle = async (handle: string) => {
  const parts = handle.split("/").filter(Boolean) // por si usas jerarquías
  const cat = await getCategoryByHandle(parts)
  return cat?.id
}