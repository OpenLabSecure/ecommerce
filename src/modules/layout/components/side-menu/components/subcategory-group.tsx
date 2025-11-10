
import { ProductCategoryF } from "types/global"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface SubcategoryGroupProps {
  subcategory: ProductCategoryF
  close: () => void
}

export default function SubcategoryGroup({
  subcategory,
  close,
}: SubcategoryGroupProps) {
  return (
    <div className="space-y-3">
      {/* Título de la subcategoría padre */}
      <LocalizedClientLink
        href={`/store?category=${subcategory.handle}`}
        onClick={close}
      >
        <h4 className="font-semibold text-red-600 text-sm uppercase tracking-wide">
        {subcategory.name || subcategory.handle}
        </h4>
      </LocalizedClientLink>
      

      {/* Lista de categorías hijas */}
      <ul className="space-y-2">
        {subcategory.category_children?.map((child) => (
          <li key={child.id}>
            <LocalizedClientLink
              href={`/store?category=${child.handle}`}
              onClick={close}
              className="text-sm text-neutral-700 hover:text-blue-600 transition-colors block"
            >
              {child.name || child.handle}
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
