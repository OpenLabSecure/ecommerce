
import { ProductCategoryF } from "types/global"
import SubcategoriesPanel from "./subcategories-panel"

interface CategoriesRightPanelProps {
  categories: ProductCategoryF[]
  hoveredCategoryId: string | null
  categoriesAll: ProductCategoryF[]
  onClearHover: () => void
  onClose: () => void
}

export default function CategoriesRightPanel({
  categories,
  categoriesAll,
  hoveredCategoryId,
  onClearHover,
  onClose,
}: CategoriesRightPanelProps) {
  const hoveredCategory = hoveredCategoryId
    ? categories.find((c) => c.id === hoveredCategoryId)
    : null

  return (
    <div
      className="flex-1 bg-white overflow-y-auto"
      onMouseLeave={onClearHover}
    >
      {hoveredCategory ? (
        <SubcategoriesPanel category={hoveredCategory} categoriesAll={categoriesAll}  close={onClose} />
      ) : (
        <div className="flex items-center justify-center h-full text-neutral-400">
          <p className="text-center px-8">
            Pasa el cursor sobre una categoría para ver sus subcategorías
          </p>
        </div>
      )}
    </div>
  )
}
