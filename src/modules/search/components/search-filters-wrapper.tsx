
import { Suspense } from "react"
import CategoriesFilter from "@modules/store/components/refinement-list/filters/categories-filter.server"
import PriceFilter from "@modules/store/components/refinement-list/filters/price-filter"
import SearchFiltersClient from "./search-filters-client"

export default function SearchFiltersWrapper() {
  return (
    <SearchFiltersClient>
      <Suspense fallback={<FilterSkeleton />}>
        <CategoriesFilter />
      </Suspense>
      
      <Suspense fallback={<FilterSkeleton />}>
        <PriceFilter />
      </Suspense>
    </SearchFiltersClient>
  )
}

function FilterSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    </div>
  )
}
