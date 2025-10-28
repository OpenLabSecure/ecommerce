import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string,
    category?: string ,
    category_id?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  // const params = await props.params;
  // const searchParams = await props.searchParams;
  // const { sortBy, page } = searchParams
   const { countryCode } = await props.params
  const sp = await props.searchParams

  return (
    <StoreTemplate
     countryCode={countryCode}
      sortBy={sp.sortBy}
      page={sp.page}
      searchParams={sp}
    />
  )
}