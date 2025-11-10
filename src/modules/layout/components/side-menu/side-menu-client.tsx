"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { Menu } from "lucide-react"
import { ProductCategoryF } from "types/global"
import CategoriesLeftPanel from "./components/categories-left-panel"
import CategoriesRightPanel from "./components/categories-right-panel"

interface SideMenuClientProps {
  categories: ProductCategoryF[]
}

export default function SideMenuClient({ categories }: SideMenuClientProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  // Filtrado de categorías 
  const filteredCategories = categories.filter(
    (category) => category.parent_category_id === null || category.parent_category_id === undefined
  )

  // Filtrar solo categorías padre (sin parent_category_id)
  const parentCategories = filteredCategories.filter(cat => !cat.parent_category_id)

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  <div className="ml-2 h-[40px] bg-white border-2 rounded-xl flex items-center justify-between px-2.5 hover:bg-gray-50 transition-colors">
                    <Menu className="mr-2 w-5 h-5" />
                    <span className="font-medium">Categorías</span>
                  </div>
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <PopoverPanel className="fixed inset-0 z-[999] bg-black/20 backdrop-blur-sm">
                  <div className="flex h-full">
                    {/* Panel Izquierdo - Categorías Padre */}
                    <CategoriesLeftPanel
                      categories={parentCategories}
                      hoveredCategory={hoveredCategory}
                      onHoverCategory={setHoveredCategory}
                      onClose={close}
                    />

                    {/* Panel Derecho - Subcategorías */}
                    <CategoriesRightPanel
                      categories={parentCategories}
                      categoriesAll={categories}
                      hoveredCategoryId={hoveredCategory}
                      onClearHover={() => setHoveredCategory(null)}
                      onClose={close}
                    />
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}