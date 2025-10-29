"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button, Input, Label } from "@medusajs/ui"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

const PriceFilter = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "")

  useEffect(() => {
    setMinPrice(searchParams.get("min_price") || "")
    setMaxPrice(searchParams.get("max_price") || "")
  }, [searchParams])

  const handlePriceChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newParams = new URLSearchParams(searchParams.toString())

    if (minPrice) {
      newParams.set("min_price", minPrice)
    } else {
      newParams.delete("min_price")
    }

    if (maxPrice) {
      newParams.set("max_price", maxPrice)
    } else {
      newParams.delete("max_price")
    }

    // Reset page to 1 when filters change
    newParams.set("page", "1")

    router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-y-3">
      <span className="txt-small-plus text-ui-fg-base">Price</span>
      <form onSubmit={handlePriceChange} className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <Input
            placeholder="Min"
            value={minPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value)}
            type="number"
            min={0}
          />
          <span className="text-ui-fg-muted">-</span>
          <Input
            placeholder="Max"
            value={maxPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value)}
            type="number"
            min={0}
          />
        </div>
        <Button type="submit" variant="secondary" className="w-full">
          Apply
        </Button>
      </form>
    </div>
  )
}

export default PriceFilter