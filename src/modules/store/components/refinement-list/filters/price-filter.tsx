
"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { DollarSign } from "lucide-react"

export default function PriceFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  // Sincronizar con URL params al cargar
  useEffect(() => {
    const min = searchParams?.get("min_price") || ""
    const max = searchParams?.get("max_price") || ""
    setMinPrice(min)
    setMaxPrice(max)
  }, [searchParams])

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams?.toString())
    
    // Remover filtros anteriores
    params.delete("min_price")
    params.delete("max_price")
    
    // Agregar nuevos filtros si tienen valor
    if (minPrice) {
      params.set("min_price", minPrice)
    }
    if (maxPrice) {
      params.set("max_price", maxPrice)
    }
    
    // Resetear a página 1 cuando se aplica filtro
    params.set("page", "1")
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams?.toString())
    params.delete("min_price")
    params.delete("max_price")
    params.set("page", "1")
    
    setMinPrice("")
    setMaxPrice("")
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const hasActiveFilter = minPrice || maxPrice

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign size={18} className="text-gray-600" />
        <h3 className="font-semibold text-gray-900">Precio</h3>
      </div>

      <div className="space-y-3">
        {/* Input Precio Mínimo */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Precio mínimo
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="$0"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Input Precio Máximo */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Precio máximo
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="$1000"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleApplyFilter}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Aplicar
          </button>
          
          {hasActiveFilter && (
            <button
              onClick={handleClearFilter}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}