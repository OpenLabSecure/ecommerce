"use client"

import { ChangeEvent } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setQueryParams = (name: string, value: SortOptions) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set(name, value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-3" data-testid={dataTestId}>
      {/* <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
        Ordenar por:
      </span> */}
      <SortProducts 
        sortBy={sortBy} 
        setQueryParams={setQueryParams}
        data-testid="sort-by-select"
      />
    </div>
  )
}

export default RefinementList