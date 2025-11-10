
import { listCategories } from "@lib/medusa/categories"
import SideMenuClient from "./side-menu-client"
import SideMenuClientMobile from "./side-menu-client-mobile"

export default async function SideMenu() {
  const categories = await listCategories()
  return (
    <>
    <SideMenuClient categories={categories} />
    <SideMenuClientMobile />
    </>
  )
}

