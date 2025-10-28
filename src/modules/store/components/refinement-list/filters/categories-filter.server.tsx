

import { listCategories } from "@lib/data/categories"
import CategoriesFilterClient from "./categories-filter.client" // ✅ importa directo

export default async function CategoriesFilterServer() {
  const categories = await listCategories({ limit: 100, fields: "id,handle,name,title" })
  return <CategoriesFilterClient categories={categories} />
}
