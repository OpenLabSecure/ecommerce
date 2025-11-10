
import { X, ChevronRight } from "lucide-react"
import { ProductCategoryF } from "types/global"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CategoryListItem from "./category-list-item"

interface CategoriesLeftPanelProps {
  categories: ProductCategoryF[]
  hoveredCategory: string | null
  onHoverCategory: (id: string) => void
  onClose: () => void
}

export default function CategoriesLeftPanel({
  categories,
  hoveredCategory,
  onHoverCategory,
  onClose,
}: CategoriesLeftPanelProps) {
  return (
    <div className="w-[280px] md:w-[320px] bg-neutral-900 text-white overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-700">
        <h2 className="text-lg font-semibold">Categorías</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          aria-label="Cerrar menú"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Lista de Categorías */}
      <nav className="p-2">
        <ul className="space-y-1">
          {/* Opción "Ver todo" */}
          <li>
            <LocalizedClientLink
              href="/store"
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-neutral-800 transition-colors group"
            >
              <span className="font-medium">Ver todo</span>
              <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
            </LocalizedClientLink>
          </li>

          {/* Separador */}
          <li className="border-t border-neutral-700 my-2"></li>

          {/* Categorías Padre */}
          {categories.map((category) => (
            <CategoryListItem
              key={category.id}
              category={category}
              isHovered={hoveredCategory === category.id}
              onHover={onHoverCategory}
              onClose={onClose}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}
