import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import { MapPin, Phone, Mail, Truck } from "lucide-react"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Heading 
        level="h2" 
        className="text-2xl small:text-3xl font-semibold text-ui-fg-base"
      >
        Detalles de envío
      </Heading>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 small:grid-cols-2 lg:grid-cols-3 gap-4 small:gap-6">
        {/* Shipping Address Card */}
        <div
          className="bg-white border border-ui-border-base rounded-lg small:rounded-xl p-5 small:p-6 hover:shadow-lg transition-all duration-200 group"
          data-testid="shipping-address-summary"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 rounded-full p-2.5 group-hover:bg-blue-200 transition-colors">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <Text className="text-sm small:text-base font-semibold text-ui-fg-base uppercase tracking-wide">
              Dirección de envío
            </Text>
          </div>
          
          <div className="space-y-2 ml-0.5">
            <Text className="text-sm small:text-base font-medium text-ui-fg-base">
              {order.shipping_address?.first_name}{" "}
              {order.shipping_address?.last_name}
            </Text>
            <div className="space-y-1">
              <Text className="text-sm text-ui-fg-subtle">
                {order.shipping_address?.address_1}
              </Text>
              {order.shipping_address?.address_2 && (
                <Text className="text-sm text-ui-fg-subtle">
                  {order.shipping_address?.address_2}
                </Text>
              )}
              <Text className="text-sm text-ui-fg-subtle">
                {order.shipping_address?.postal_code},{" "}
                {order.shipping_address?.city}
              </Text>
              <Text className="text-sm font-medium text-ui-fg-base">
                {order.shipping_address?.country_code?.toUpperCase()}
              </Text>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div
          className="bg-white border border-ui-border-base rounded-lg small:rounded-xl p-5 small:p-6 hover:shadow-lg transition-all duration-200 group"
          data-testid="shipping-contact-summary"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 rounded-full p-2.5 group-hover:bg-green-200 transition-colors">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <Text className="text-sm small:text-base font-semibold text-ui-fg-base uppercase tracking-wide">
              Información de contacto
            </Text>
          </div>
          
          <div className="space-y-3 ml-0.5">
            {order.shipping_address?.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-ui-fg-muted mt-0.5 flex-shrink-0" />
                <Text className="text-sm small:text-base text-ui-fg-subtle break-all">
                  {order.shipping_address?.phone}
                </Text>
              </div>
            )}
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-ui-fg-muted mt-0.5 flex-shrink-0" />
              <Text className="text-sm small:text-base text-ui-fg-subtle break-all">
                {order.email}
              </Text>
            </div>
          </div>
        </div>

        {/* Shipping Method Card */}
        <div
          className="bg-white border border-ui-border-base rounded-lg small:rounded-xl p-5 small:p-6 hover:shadow-lg transition-all duration-200 group small:col-span-2 lg:col-span-1"
          data-testid="shipping-method-summary"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 rounded-full p-2.5 group-hover:bg-purple-200 transition-colors">
              <Truck className="w-5 h-5 text-purple-600" />
            </div>
            <Text className="text-sm small:text-base font-semibold text-ui-fg-base uppercase tracking-wide">
              Método de envío
            </Text>
          </div>
          
          <div className="space-y-3 ml-0.5">
            <div className="flex flex-col small:flex-row small:items-center small:justify-between gap-2">
              <Text className="text-sm small:text-base font-medium text-ui-fg-base">
                {(order as any).shipping_methods?.[0]?.name || "Método estándar"}
              </Text>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs small:text-sm font-semibold bg-purple-50 text-purple-700 border border-purple-200 w-fit">
                {convertToLocale({
                  amount: order.shipping_methods?.[0]?.total ?? 0,
                  currency_code: order.currency_code,
                })}
              </span>
            </div>
            
            {order.shipping_methods?.[0]?.total === 0 && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <Text className="text-xs small:text-sm font-medium text-green-700">
                  Envío gratuito
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <Divider className="mt-2" />
    </div>
  )
}

export default ShippingDetails