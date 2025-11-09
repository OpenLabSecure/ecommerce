"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { Fragment, useState } from "react"
import { Menu, ChevronRight, ChevronDown } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ProductCategoryF } from "types/global"

interface SideMenuClientProps {
  categories: ProductCategoryF[]
}

// Componente recursivo para categorías anidadas
function CategoryItem({ 
  category, 
  close, 
  level = 0 
}: { 
  category: ProductCategoryF
  close: () => void
  level?: number 
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = category.category_children && category.category_children.length > 0

  return (
    <li>
      <div className="flex flex-col">
        {/* Categoría principal */}
        <div className="flex items-center">
          {hasChildren && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label={isExpanded ? "Contraer" : "Expandir"}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
          
          <LocalizedClientLink
            href={`/store?category=${category.handle}`}
            className={`flex-1 flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group ${
              !hasChildren ? 'ml-8' : ''
            }`}
            style={{ paddingLeft: hasChildren ? '0.75rem' : `${(level + 1) * 2}rem` }}
            onClick={close}
            data-testid={`category-${category.handle}-link`}
          >
            <span className="text-gray-700 group-hover:text-blue-600">
              {category.name || category.handle}
            </span>
            {!hasChildren && (
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
            )}
          </LocalizedClientLink>
        </div>

        {/* Subcategorías (recursivo) */}
        {hasChildren && isExpanded && (
          <ul className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
            {category.category_children.map((child) => (
              <CategoryItem
                key={child.id}
                category={child}
                close={close}
                level={level + 1}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export default function SideMenuClient({ categories }: SideMenuClientProps) {
  // Filtrar solo categorías de nivel superior (sin parent_category_id)
  const topLevelCategories = categories.filter(cat => !cat.parent_category_id)

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
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Categorías
                      </h2>
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        aria-label="Cerrar menú"
                      >
                        <XMark className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Lista de Categorías */}
                    <div className="flex-1 overflow-y-auto p-4">
                      {topLevelCategories.length > 0 ? (
                        <ul className="space-y-2">
                          {/* Opción "Todas las categorías" */}
                          <li>
                            <LocalizedClientLink
                              href="/store"
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                              onClick={close}
                              data-testid="all-categories-link"
                            >
                              <span className="font-medium text-gray-900 group-hover:text-blue-600">
                                Todas las categorías
                              </span>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                            </LocalizedClientLink>
                          </li>

                          {/* Separador */}
                          <li className="border-t border-gray-200 my-2"></li>

                          {/* Categorías con jerarquía */}
                          {topLevelCategories.map((category) => (
                            <CategoryItem
                              key={category.id}
                              category={category}
                              close={close}
                            />
                          ))}
                        </ul>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-gray-500">
                            No hay categorías disponibles
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <Text className="text-xs text-gray-500 text-center">
                        © {new Date().getFullYear()} Open lab. Todos los
                        derechos reservados.
                      </Text>
                    </div>
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