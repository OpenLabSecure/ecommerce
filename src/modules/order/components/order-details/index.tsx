import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { Mail, Calendar, Hash, Package, CreditCard } from "lucide-react"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")
    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes("completed") || statusLower.includes("paid") || statusLower.includes("fulfilled")) {
      return "text-green-600 bg-green-50 border-green-200"
    }
    if (statusLower.includes("pending") || statusLower.includes("processing")) {
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    }
    if (statusLower.includes("canceled") || statusLower.includes("failed")) {
      return "text-red-600 bg-red-50 border-red-200"
    }
    return "text-blue-600 bg-blue-50 border-blue-200"
  }

  return (
    <div className="space-y-6">
      {/* Email Confirmation */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg small:rounded-xl p-4 small:p-5">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 rounded-full p-2 flex-shrink-0 mt-0.5">
            <Mail className="w-4 h-4 small:w-5 small:h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <Text className="text-sm small:text-base text-ui-fg-base">
              Hemos enviado los detalles de confirmación del pedido a{" "}
              <span
                className="font-semibold text-blue-700 break-all"
                data-testid="order-email"
              >
                {order.email}
              </span>
            </Text>
          </div>
        </div>
      </div>

      {/* Order Information Grid */}
      <div className="grid grid-cols-1 small:grid-cols-2 gap-4 small:gap-6">
        {/* Order Date */}
        <div className="bg-white border border-ui-border-base rounded-lg small:rounded-xl p-4 small:p-5 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-100 rounded-full p-2">
              <Calendar className="w-4 h-4 small:w-5 small:h-5 text-purple-600" />
            </div>
            <Text className="text-xs small:text-sm font-medium text-ui-fg-muted uppercase tracking-wide">
              Fecha del pedido
            </Text>
          </div>
          <Text 
            className="text-base small:text-lg font-semibold text-ui-fg-base ml-11"
            data-testid="order-date"
          >
            {new Date(order.created_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </div>

        {/* Order Number */}
        <div className="bg-white border border-ui-border-base rounded-lg small:rounded-xl p-4 small:p-5 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 rounded-full p-2">
              <Hash className="w-4 h-4 small:w-5 small:h-5 text-green-600" />
            </div>
            <Text className="text-xs small:text-sm font-medium text-ui-fg-muted uppercase tracking-wide">
              Número de pedido
            </Text>
          </div>
          <Text 
            className="text-base small:text-lg font-semibold text-green-600 ml-11"
            data-testid="order-id"
          >
            #{order.display_id}
          </Text>
        </div>
      </div>

      {/* Status Information */}
      {showStatus && (
        <div className="grid grid-cols-1 small:grid-cols-2 gap-4 small:gap-6">
          {/* Order Status */}
          <div className="bg-white border border-ui-border-base rounded-lg small:rounded-xl p-4 small:p-5 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-orange-100 rounded-full p-2">
                <Package className="w-4 h-4 small:w-5 small:h-5 text-orange-600" />
              </div>
              <Text className="text-xs small:text-sm font-medium text-ui-fg-muted uppercase tracking-wide">
                Estado del pedido
              </Text>
            </div>
            <div className="ml-11">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs small:text-sm font-semibold border ${getStatusColor(
                  order.fulfillment_status
                )}`}
                data-testid="order-status"
              >
                {formatStatus(order.fulfillment_status)}
              </span>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-white border border-ui-border-base rounded-lg small:rounded-xl p-4 small:p-5 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-teal-100 rounded-full p-2">
                <CreditCard className="w-4 h-4 small:w-5 small:h-5 text-teal-600" />
              </div>
              <Text className="text-xs small:text-sm font-medium text-ui-fg-muted uppercase tracking-wide">
                Estado del pago
              </Text>
            </div>
            <div className="ml-11">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs small:text-sm font-semibold border ${getStatusColor(
                  order.payment_status
                )}`}
                data-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetails