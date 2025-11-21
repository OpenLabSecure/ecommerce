"use client"

import { clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination({
  page,
  totalPages,
  'data-testid': dataTestid,
  showInfo = true,
}: {
  page: number
  totalPages: number
  'data-testid'?: string
  showInfo?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const renderPageButton = (
    p: number,
    label: string | number,
    isCurrent: boolean
  ) => (
    <button
      key={p}
      className={clx(
        "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
        {
          "bg-blue-600 text-white shadow-md hover:bg-blue-700": isCurrent,
          "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800": !isCurrent,
        }
      )}
      disabled={isCurrent}
      onClick={() => handlePageChange(p)}
      aria-label={`Ir a página ${p}`}
      aria-current={isCurrent ? "page" : undefined}
    >
      {label}
    </button>
  )

  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="px-2 py-2 text-gray-400 dark:text-gray-600"
      aria-hidden="true"
    >
      ⋯
    </span>
  )

  const renderPageButtons = () => {
    const buttons = []

    if (totalPages <= 7) {
      buttons.push(
        ...arrayRange(1, totalPages).map((p) =>
          renderPageButton(p, p, p === page)
        )
      )
    } else {
      if (page <= 4) {
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p, p, p === page))
        )
        buttons.push(renderEllipsis("ellipsis1"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      } else if (page >= totalPages - 3) {
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis2"))
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
      } else {
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis3"))
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
        buttons.push(renderEllipsis("ellipsis4"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      }
    }

    return buttons
  }

  const handlePrevious = () => {
    if (page > 1) handlePageChange(page - 1)
  }

  const handleNext = () => {
    if (page < totalPages) handlePageChange(page + 1)
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-12 py-8" data-testid={dataTestid}>
      {/* Información de paginación */}
      {/* {showInfo && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Página <span className="font-semibold text-gray-900 dark:text-white">{page}</span> de{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span>
        </div>
      )} */}

      {/* Controles de paginación */}
      <div className="flex items-center gap-2">
        {/* Botón Anterior */}
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className={clx(
            "p-2 rounded-lg transition-all duration-200",
            {
              "text-gray-400 dark:text-gray-600 cursor-not-allowed": page === 1,
              "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800": page > 1,
            }
          )}
          aria-label="Página anterior"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Números de página */}
        <div className="flex gap-1" role="navigation" aria-label="Paginación">
          {renderPageButtons()}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={clx(
            "p-2 rounded-lg transition-all duration-200",
            {
              "text-gray-400 dark:text-gray-600 cursor-not-allowed": page === totalPages,
              "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800": page < totalPages,
            }
          )}
          aria-label="Página siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}