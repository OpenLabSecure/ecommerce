"use client"

import { Heading, Text, clx } from "@medusajs/ui"
import { CheckCircleSolid } from "@medusajs/icons"
import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import Divider from "@modules/common/components/divider"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="flex flex-col small:flex-row small:items-center justify-between mb-6 gap-4">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-2xl small:text-3xl gap-x-2 items-center",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Revisar pedido
          {isOpen && previousStepsCompleted && (
            <CheckCircleSolid className="text-green-500" />
          )}
        </Heading>
      </div>

      {/* Content Section - When Open */}
      {isOpen && previousStepsCompleted && (
        <div className="space-y-6">
          {/* Terms and Conditions Notice */}
          <div className="p-4 small:p-6 bg-ui-bg-subtle rounded-lg border border-ui-border-base">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded-full bg-ui-bg-interactive flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <Text className="text-base small:text-lg font-semibold text-ui-fg-base mb-3">
                    Términos y condiciones
                  </Text>
                  <Text className="text-sm small:text-base text-ui-fg-subtle leading-relaxed">
                    Al hacer clic en el botón "Realizar pedido", confirmas que has leído, 
                    comprendido y aceptado nuestros{" "}
                    <span className="font-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover cursor-pointer">
                      Términos de Uso
                    </span>
                    ,{" "}
                    <span className="font-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover cursor-pointer">
                      Términos de Venta
                    </span>
                    {" "}y{" "}
                    <span className="font-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover cursor-pointer">
                      Política de Devoluciones
                    </span>
                    , y reconoces que has leído la{" "}
                    <span className="font-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover cursor-pointer">
                      Política de Privacidad
                    </span>
                    {" "}de Medusa Store.
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Info */}
          <div className="p-4 small:p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <Text className="text-sm small:text-base text-blue-900 font-medium mb-1">
                  Revisa tu información
                </Text>
                <Text className="text-xs small:text-sm text-blue-700">
                  Asegúrate de que toda la información de tu pedido sea correcta antes de continuar.
                </Text>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <div className="pt-4">
            <PaymentButton 
              cart={cart} 
              data-testid="submit-order-button"
              className="w-full h-12 small:h-14 text-base small:text-lg font-semibold"
            />
            
            {/* Security Notice */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs small:text-sm text-ui-fg-muted">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Pago seguro y encriptado</span>
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      {isOpen && <Divider className="mt-8" />}
    </div>
  )
}

export default Review