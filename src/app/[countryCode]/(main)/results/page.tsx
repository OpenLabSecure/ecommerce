
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import SearchResults from "@modules/search/templates/search-results"
import SearchFiltersWrapper from "@modules/search/components/search-filters-wrapper"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{
    q?: string
    page?: string
    sortBy?: SortOptions
    category_id?: string | string[]
    min_price?: string
    max_price?: string
  }>
}

export default async function SearchPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  
  const { countryCode } = params
  const query = searchParams.q || ""
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const sortBy = searchParams.sortBy
  const categoryIds = searchParams.category_id 
    ? Array.isArray(searchParams.category_id) 
      ? searchParams.category_id 
      : [searchParams.category_id]
    : undefined
  const minPrice = searchParams.min_price ? parseFloat(searchParams.min_price) : undefined
  const maxPrice = searchParams.max_price ? parseFloat(searchParams.max_price) : undefined

  return (
    <div className="content-container py-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              Resultados de búsqueda
            </h1>
            {query && (
              <p className="text-gray-600">
                Mostrando resultados para: <span className="font-medium">"{query}"</span>
              </p>
            )}
          </div>
          
          {/* Ordenamiento */}
          <div className="w-full md:w-auto">
            <RefinementList sortBy={sortBy || "created_at"} />
          </div>
        </div>
      </div>

      {/* Layout con filtros y productos */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar de filtros */}
        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
          <div className="sticky top-4">
            <SearchFiltersWrapper />
          </div>
        </aside>

        {/* Área de productos */}
        <main className="flex-1 min-w-0">
          <Suspense fallback={<SkeletonProductGrid />}>
            <SearchResults
              query={query}
              page={page}
              countryCode={countryCode}
              sortBy={sortBy}
              categoryIds={categoryIds}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </Suspense>
        </main>
      </div>
    </div>
  )
}