
"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import CategoriesFilter from "@modules/store/components/refinement-list/filters/categories-filter.server"
import PriceFilter from "@modules/store/components/refinement-list/filters/price-filter"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  // Contar filtros activos
  const activeFiltersCount = () => {
    let count = 0
    if (searchParams?.get("category_id")) count++
    if (searchParams?.get("min_price")) count++
    if (searchParams?.get("max_price")) count++
    return count
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams?.toString())
    params.delete("category_id")
    params.delete("min_price")
    params.delete("max_price")
    params.set("page", "1")
    
    const query = searchParams?.get("q")
    const sortBy = searchParams?.get("sortBy")
    
    let newUrl = window.location.pathname
    const newParams = new URLSearchParams()
    
    if (query) newParams.set("q", query)
    if (sortBy) newParams.set("sortBy", sortBy)
    
    if (newParams.toString()) {
      newUrl += `?${newParams.toString()}`
    }
    
    router.push(newUrl, { scroll: false })
  }

  const activeCount = activeFiltersCount()

  return (
    <div className="space-y-4">
      {/* Header con botón de limpiar filtros */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Filtros
          </h2>
          {activeCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        
        {activeCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <X size={14} />
            Limpiar
          </button>
        )}
      </div>

      {/* Botón para mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium">
          {isOpen ? "Ocultar filtros" : "Mostrar filtros"}
        </span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Filtros */}
      <div className={`space-y-4 ${isOpen ? "block" : "hidden lg:block"}`}>
        <CategoriesFilter />
        <PriceFilter />
      </div>
    </div>
  )
}
