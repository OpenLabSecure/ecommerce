import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import CategoriesFilter from "@modules/store/components/refinement-list/filters/categories-filter.server"
import PaginatedProducts from "./paginated-products"
import { getCategoryIdFromHandle } from "@lib/data/categories/wrappers"

const StoreTemplate = async({
  sortBy,
  page,
  countryCode,
  searchParams,
  //[]
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string,
  searchParams?:{
    category?: string
    category_id?: string | string[]
    //[k: string]: any
  }
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // 1) Normaliza category_id a string (si sólo quieres 1 categoría)
  let categoryId: string | undefined

  if (searchParams?.category_id) {
    categoryId = Array.isArray(searchParams.category_id)
      ? searchParams.category_id[0]
      : searchParams.category_id
  } else if (searchParams?.category) {
    categoryId = await getCategoryIdFromHandle(searchParams.category)
  }
  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      {/* SIDEBAR */}
      <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
        <RefinementList sortBy={sort} />
        <Suspense>
          <CategoriesFilter />
        </Suspense>
      </div>

      {/* CONTENIDO */}
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            categoryId={categoryId}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate