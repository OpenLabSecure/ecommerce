'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

type CategoryLite = { id: string; handle: string; name?: string }

export default function CategoriesFilterClient({ categories }: { categories: CategoryLite[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const activeHandle = sp.get("category") ?? undefined

  const updateQS = useCallback((nextHandle?: string) => {
    const params = new URLSearchParams(sp?.toString() || "")

    // si seleccionas la misma, la quitamos (toggle off)
    if (nextHandle && nextHandle === activeHandle) {
      params.delete("category")
    } else {
      if (nextHandle) params.set("category", nextHandle)
      else params.delete("category")
    }

    // resetea paginación si manejas "page"
    if (params.has("page")) params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [sp, pathname, router, activeHandle])

  return (
    <aside className="space-y-3">
      <h3 className="text-sm font-semibold tracking-wide uppercase">Categorías</h3>
      <ul className="flex flex-col gap-1">
        <li>
          <button
            onClick={() => updateQS(undefined)}
            className={`text-left text-sm transition hover:opacity-90 ${!activeHandle ? "font-semibold underline" : ""}`}
          >
            Todas
          </button>
        </li>
        {categories.map((c) => {
          const label = c.name || c.handle
          const isActive = activeHandle === c.handle
          return (
            <li key={c.id}>
              <button
                onClick={() => updateQS(c.handle)}
                className={`text-left text-sm transition hover:opacity-90 ${isActive ? "font-semibold underline" : ""}`}
                aria-pressed={isActive}
              >
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
