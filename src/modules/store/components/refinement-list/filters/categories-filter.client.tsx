'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { ChevronDown, X } from "lucide-react" // O usa tus propios iconos

type CategoryLite = { id: string; handle: string; name?: string }

export default function CategoriesFilterClient({ categories }: { categories: CategoryLite[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  const [isExpanded, setIsExpanded] = useState(true)

  // Lee TODAS las categorías activas desde la URL: ?category=a&category=b
  const activeHandles = useMemo(() => new Set(sp.getAll("category")), [sp])

  // Construye una URL con un set de handles
  const pushWithHandles = useCallback((handles: Set<string>) => {
    const params = new URLSearchParams(sp?.toString() || "")

    // Limpia todas las categorías actuales…
    params.delete("category")
    // …y re-agrega las seleccionadas
    Array.from(handles).forEach((h) => params.append("category", h))

    // Resetea la paginación si la usas
    if (params.has("page")) params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [router, pathname, sp])

  // Toggle de un handle
  const toggleHandle = useCallback((handle: string) => {
    const next = new Set(activeHandles)
    if (next.has(handle)) next.delete(handle)
    else next.add(handle)
    pushWithHandles(next)
  }, [activeHandles, pushWithHandles])

  // Limpiar todo (equivale a "Todas")
  const clearAll = useCallback(() => {
    const next = new Set<string>()
    pushWithHandles(next)
  }, [pushWithHandles])

  return (
    <aside className="rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
      {/* Header con toggle y botón limpiar */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase hover:opacity-80 transition-opacity"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Ocultar categorías" : "Mostrar categorías"}
        >
          <span>Categorías</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {activeHandles.size > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-medium"
            aria-label="Limpiar categorías seleccionadas"
          >
            <X className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      {/* Contenido colapsable */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="p-4 md:p-5">
          {/* Badge con contador de filtros activos */}
          {activeHandles.size > 0 && (
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                {activeHandles.size} {activeHandles.size === 1 ? "filtro activo" : "filtros activos"}
              </span>
            </div>
          )}

          <ul className="space-y-2">
            {/* Opción "Todas" */}
            <li>
              <button
                type="button"
                onClick={clearAll}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  activeHandles.size === 0
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                }`}
              >
                Todas las categorías
              </button>
            </li>

            {/* Lista de categorías con checkbox */}
            {categories.map((c) => {
              const label = c.name || c.handle
              const checked = activeHandles.has(c.handle)
              return (
                <li key={c.id}>
                  <label
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer select-none text-sm transition-all ${
                      checked
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-colors"
                      checked={checked}
                      onChange={() => toggleHandle(c.handle)}
                      aria-pressed={checked}
                    />
                    <span className={checked ? "font-medium text-blue-700 dark:text-blue-300" : ""}>
                      {label}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </aside>
  )
}