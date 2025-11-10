
import { ChevronRight } from "lucide-react"
import { ProductCategoryF } from "types/global"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SubcategoryGroup from "./subcategory-group"

interface SubcategoriesPanelProps {
  category: ProductCategoryF,
  categoriesAll: ProductCategoryF[]
  close: () => void
}

export default function SubcategoriesPanel({
  category,
  categoriesAll,
  close,
}: SubcategoriesPanelProps) {
  // Si no tiene hijos, mostrar mensaje simple
  if (!category.category_children || category.category_children.length === 0) {
    return (
      <div className="p-8">
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
          {category.name || category.handle}
        </h3>
        <LocalizedClientLink
          href={`/store?category=${category.handle}`}
          onClick={close}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          Ver todos los productos
          <ChevronRight className="w-4 h-4 ml-1" />
        </LocalizedClientLink>
      </div>
    )
  }

  // Agrupar subcategorías con hijos
  const subcategoriesWithChildren = categoriesAll.filter(
    (sub) => sub.parent_category_id == category.id
  )

  console.log("Subcategories with children:", subcategoriesWithChildren)
  // Agrupar subcategorías sin hijos
  const subcategoriesWithoutChildren = category.category_children.filter(
    (sub) => !sub.category_children || sub.category_children.length === 0
  )

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
        <h3 className="text-2xl font-bold text-neutral-900">
          {category.name || category.handle}
        </h3>
        <LocalizedClientLink
          href={`/store?category=${category.handle}`}
          onClick={close}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Ver todo
        </LocalizedClientLink>
      </div>

      {/* Grid de subcategorías */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Subcategorías con hijos */}
        {subcategoriesWithChildren.map((subcategory) => (
          <SubcategoryGroup
            key={subcategory.id}
            subcategory={subcategory}
            close={close}
          />
        ))}

        {/* Subcategorías sin hijos
        {subcategoriesWithoutChildren.map((subcategory) => (
          <LocalizedClientLink
            key={subcategory.id}
            href={`/store?category=${subcategory.handle}`}
            onClick={close}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-neutral-200 hover:border-blue-500 transition-colors group"
          >
            <span className="text-lg font-medium text-neutral-900 group-hover:text-blue-600">
              {subcategory.name || subcategory.handle} xd
            </span>
            <ChevronRight className="w-4 h-4 mt-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </LocalizedClientLink>
        ))} */}
      </div>
    </div>
  )
}
