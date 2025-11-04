"use client"

import { SearchIcon, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  // Sincronizar con URL params
  useEffect(() => {
    const query = searchParams?.get("q") || ""
    setSearchQuery(query)
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/results?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleClear = () => {
    setSearchQuery("")
    setIsFocused(false)
  }

  return (
    <form 
      onSubmit={handleSearch}
      className="relative w-full"
    >
      <div className={`
        flex items-center gap-2 bg-white rounded-xl px-3 py-2
        transition-all duration-200
        ${isFocused ? 'ring-2 ring-secundary-azul shadow-md' : 'shadow-sm'}
      `}>
        <SearchIcon 
          size={18} 
          className="text-gray-400 flex-shrink-0"
        />
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="¿Qué estás buscando?"
          className="w-full text-sm outline-none placeholder:text-gray-400"
          data-testid="search-input"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </form>
  )
}