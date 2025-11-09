
import { listCategories } from "@lib/medusa/categories"
import SideMenuClient from "./side-menu-client"
import SideMenuClientMobile from "./side-menu-client-mobile"

export default async function SideMenu() {
  const categories = await listCategories()

  console.log("Categories in SideMenu:", categories)

  // Filtrado de categorías 
  const filteredCategories = categories.filter(
    (category) => category.category_children && category.category_children.length > 0
  )

  return (
    <>
    <SideMenuClient categories={filteredCategories} />
    <SideMenuClientMobile />
    </>
  )
}

