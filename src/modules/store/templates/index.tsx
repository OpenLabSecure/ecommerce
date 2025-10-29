import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import CategoriesFilter from "@modules/store/components/refinement-list/filters/categories-filter.server"
import PaginatedProducts from "./paginated-products"
import { getCategoryIdFromHandle } from "@lib/data/categories/wrappers"
import PriceFilter from "../components/refinement-list/filters/price-filter"

const StoreTemplate = async({
  sortBy,
  page,
  countryCode,
  searchParams,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string,
  searchParams?:{
    category?: string
    category_id?: string | string[]
  }
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  let categoryIds: string[] | undefined

  if (searchParams?.category_id) {
    categoryIds = Array.isArray(searchParams.category_id)
      ? searchParams.category_id
      : [searchParams.category_id]
  } else if (searchParams?.category) {
    const handles = Array.isArray(searchParams.category)
      ? searchParams.category
      : [searchParams.category]

    const ids = await Promise.all(
      handles.map((h) => getCategoryIdFromHandle(h))
    )
    categoryIds = ids.filter(Boolean) as string[]
  }

  return (
    <div className="content-container py-6" data-testid="category-container">
      {/* HEADER CON TÍTULO Y ORDENAMIENTO */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 
            className="text-2xl md:text-3xl font-semibold" 
            data-testid="store-page-title"
          >
            Todos los productos
          </h1>
          
          {/* Ordenamiento - visible en todas las pantallas */}
          <div className="w-full md:w-auto">
            <RefinementList sortBy={sort} />
          </div>
        </div>
      </div>

      {/* LAYOUT PRINCIPAL: SIDEBAR + PRODUCTOS */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* SIDEBAR DE FILTROS - Izquierda en desktop, arriba en mobile */}
        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
          <div className="sticky top-4 space-y-4">
            {/* Filtros en mobile: colapsables por defecto */}
            <div className="lg:space-y-4">
              <Suspense fallback={<FilterSkeleton />}>
                <CategoriesFilter />
              </Suspense>
              
              <Suspense fallback={<FilterSkeleton />}>
                <PriceFilter />
              </Suspense>
            </div>
          </div>
        </aside>

        {/* GRID DE PRODUCTOS - Derecha */}
        <main className="flex-1 min-w-0">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              categoryIds={categoryIds}
            />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

// Skeleton para los filtros mientras cargan
function FilterSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 p-4 md:p-5 animate-pulse">
      <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-24 mb-4"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded flex-1"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StoreTemplate