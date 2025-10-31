import { Heading, Text } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"
import { CheckCircle, Package, Truck } from "lucide-react"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-6 small:py-12 min-h-[calc(100vh-64px)] bg-gradient-to-b from-green-50 to-white">
      <div className="content-container flex flex-col justify-center items-center gap-y-6 small:gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        
        {/* Success Header */}
        <div className="w-full text-center space-y-4 small:space-y-6 px-4 small:px-0">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-green-500 rounded-full p-4 small:p-6">
                <CheckCircle className="w-12 h-12 small:w-16 small:h-16 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          <div className="space-y-2 small:space-y-3">
            <Heading
              level="h1"
              className="text-2xl small:text-4xl font-bold text-ui-fg-base"
            >
              ¡Pedido realizado con éxito!
            </Heading>
            <Text className="text-base small:text-lg text-ui-fg-subtle max-w-2xl mx-auto">
              Gracias por tu compra. Hemos recibido tu pedido y comenzaremos a procesarlo pronto.
            </Text>
          </div>

          {/* Status Steps */}
          <div className="flex flex-col small:flex-row items-center justify-center gap-4 small:gap-8 pt-4 small:pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-2 small:p-3">
                <CheckCircle className="w-5 h-5 small:w-6 small:h-6 text-green-600" />
              </div>
              <div className="text-left">
                <Text className="text-xs small:text-sm font-semibold text-ui-fg-base">
                  Pedido confirmado
                </Text>
                <Text className="text-xs text-ui-fg-muted">
                  Recibido
                </Text>
              </div>
            </div>

            <div className="hidden small:block w-12 h-px bg-ui-border-base"></div>
            <div className="block small:hidden h-8 w-px bg-ui-border-base"></div>

            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-full p-2 small:p-3">
                <Package className="w-5 h-5 small:w-6 small:h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <Text className="text-xs small:text-sm font-semibold text-ui-fg-base">
                  Preparando
                </Text>
                <Text className="text-xs text-ui-fg-muted">
                  En proceso
                </Text>
              </div>
            </div>

            <div className="hidden small:block w-12 h-px bg-ui-border-base"></div>
            <div className="block small:hidden h-8 w-px bg-ui-border-base"></div>

            <div className="flex items-center gap-3">
              <div className="bg-gray-100 rounded-full p-2 small:p-3">
                <Truck className="w-5 h-5 small:w-6 small:h-6 text-gray-400" />
              </div>
              <div className="text-left">
                <Text className="text-xs small:text-sm font-semibold text-ui-fg-muted">
                  En camino
                </Text>
                <Text className="text-xs text-ui-fg-muted">
                  Pendiente
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div
          className="flex flex-col gap-6 small:gap-8 max-w-4xl w-full bg-white rounded-xl small:rounded-2xl shadow-lg border border-ui-border-base p-6 small:p-10"
          data-testid="order-complete-container"
        >
          {/* Order Information */}
          <div className="space-y-6">
            <OrderDetails order={order} />
          </div>

          <Divider />

          {/* Summary Section */}
          <div className="space-y-6">
            <Heading 
              level="h2" 
              className="text-xl small:text-2xl font-semibold text-ui-fg-base"
            >
              Resumen del pedido
            </Heading>
            <Items order={order} />
            <div className="bg-ui-bg-subtle rounded-lg p-4 small:p-6">
              <CartTotals totals={order} />
            </div>
          </div>

          <Divider />

          {/* Shipping Details */}
          <div className="space-y-6">
            <ShippingDetails order={order} />
          </div>

          <Divider />

          {/* Payment Details */}
          <div className="space-y-6">
            <PaymentDetails order={order} />
          </div>

          <Divider />

          {/* Help Section */}
          <div className="space-y-4">
            <Help />
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 small:grid-cols-2 gap-4 small:gap-6 w-full max-w-4xl px-4 small:px-0">
          <div className="bg-blue-50 border border-blue-200 rounded-lg small:rounded-xl p-4 small:p-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <Text className="text-sm small:text-base font-semibold text-blue-900 mb-1">
                  Confirmación enviada
                </Text>
                <Text className="text-xs small:text-sm text-blue-700">
                  Hemos enviado los detalles de tu pedido a tu correo electrónico.
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg small:rounded-xl p-4 small:p-6">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <Text className="text-sm small:text-base font-semibold text-purple-900 mb-1">
                  Mantente informado
                </Text>
                <Text className="text-xs small:text-sm text-purple-700">
                  Te notificaremos sobre el estado de tu pedido en cada etapa.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}