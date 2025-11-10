
import { ChevronRight } from "lucide-react"
import { ProductCategoryF } from "types/global"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface CategoryListItemProps {
  category: ProductCategoryF
  isHovered: boolean
  onHover: (id: string) => void
  onClose: () => void
}

export default function CategoryListItem({
  category,
  isHovered,
  onHover,
  onClose,
}: CategoryListItemProps) {
  const hasChildren = category.category_children && category.category_children.length > 0

  return (
    <li>
      <LocalizedClientLink
        href={`/store?category=${category.handle}`}
        onClick={onClose}
        onMouseEnter={() => onHover(category.id)}
        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${
          isHovered ? "bg-red-600 text-white" : "hover:bg-neutral-800"
        }`}
      >
        <span className="font-medium">{category.name || category.handle}</span>
        {hasChildren && (
          <ChevronRight
            className={`w-5 h-5 transition-opacity ${
              isHovered ? "opacity-100" : "opacity-50 group-hover:opacity-100"
            }`}
          />
        )}
      </LocalizedClientLink>
    </li>
  )
}
