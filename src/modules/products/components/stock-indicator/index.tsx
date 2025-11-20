import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { Package, AlertCircle, CheckCircle } from "lucide-react"

type StockIndicatorProps = {
  variant?: HttpTypes.StoreProductVariant
  showQuantity?: boolean
}

const StockIndicator = ({ variant, showQuantity = false }: StockIndicatorProps) => {
  console.log("variant completo:", JSON.stringify(variant, null, 2))
  
  // Si no hay variant, no mostrar nada
  if (!variant) {
    return null
  }

  // Intentar obtener el inventario de diferentes formas
  const inventory = variant.inventory_quantity ?? 0
  const manageInventory = variant.manage_inventory ?? false
  const allowBackorder = variant.allow_backorder ?? false

  console.log("Datos de inventario:", {
    inventory,
    manageInventory,
    allowBackorder,
  })

  // Si permite pedidos pendientes, siempre está disponible
  if (allowBackorder) {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle className="w-4 h-4" />
        <Text className="text-sm font-medium">Disponible (bajo pedido)</Text>
      </div>
    )
  }

  // Si no se gestiona inventario, mostrar "En stock"
  if (!manageInventory) {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle className="w-4 h-4" />
        <Text className="text-sm font-medium">En stock</Text>
      </div>
    )
  }

  // Determinar el estado del stock
  const getStockStatus = () => {
    if (inventory === 0) {
      return {
        label: "Agotado",
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: <AlertCircle className="w-4 h-4" />,
      }
    } else if (inventory <= 5) {
      return {
        label: "Últimas unidades",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        icon: <AlertCircle className="w-4 h-4" />,
      }
    } else if (inventory <= 10) {
      return {
        label: "Stock limitado",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        icon: <Package className="w-4 h-4" />,
      }
    } else {
      return {
        label: "En stock",
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: <CheckCircle className="w-4 h-4" />,
      }
    }
  }

  const status = getStockStatus()

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${status.bgColor}`}>
      <span className={status.color}>{status.icon}</span>
      <div className="flex flex-col">
        <Text className={`text-sm font-medium ${status.color}`}>
          {status.label}
        </Text>
        {showQuantity && inventory > 0 && (
          <Text className="text-xs text-ui-fg-subtle">
            {inventory} {inventory === 1 ? "unidad disponible" : "unidades disponibles"}
          </Text>
        )}
      </div>
    </div>
  )
}

export default StockIndicator