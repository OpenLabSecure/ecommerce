"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="flex flex-col small:flex-row small:items-center justify-between mb-6 gap-4">
        <Heading
          level="h2"
          className="flex flex-row text-2xl small:text-3xl gap-x-2 items-center"
        >
          Dirección de envío
          {!isOpen && <CheckCircleSolid className="text-green-500" />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover text-sm small:text-base font-medium transition-colors"
            data-testid="edit-address-button"
          >
            Editar
          </button>
        )}
      </div>

      {/* Form Section - When Open */}
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            {/* Shipping Address Form */}
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {/* Billing Address Form - Conditional */}
            {!sameAsBilling && (
              <div className="mt-8">
                <Heading
                  level="h2"
                  className="text-2xl small:text-3xl pb-6"
                >
                  Dirección de facturación
                </Heading>
                <BillingAddress cart={cart} />
              </div>
            )}

            {/* Submit Button */}
            <SubmitButton 
              className="mt-6 w-full small:w-auto h-11 small:h-12 text-sm small:text-base" 
              data-testid="submit-address-button"
            >
              Continuar con la entrega
            </SubmitButton>
            
            {/* Error Message */}
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        /* Summary Section - When Closed */
        <div>
          {cart && cart.shipping_address ? (
            <div className="grid grid-cols-1 small:grid-cols-3 gap-6 small:gap-8">
              {/* Shipping Address Summary */}
              <div 
                className="flex flex-col space-y-2 p-4 small:p-0 bg-ui-bg-subtle small:bg-transparent rounded-lg"
                data-testid="shipping-address-summary"
              >
                <Text className="text-base small:text-lg font-semibold text-ui-fg-base mb-2">
                  Dirección de envío
                </Text>
                <Text className="text-sm small:text-base text-ui-fg-subtle">
                  {cart.shipping_address.first_name}{" "}
                  {cart.shipping_address.last_name}
                </Text>
                <Text className="text-sm small:text-base text-ui-fg-subtle">
                  {cart.shipping_address.address_1}
                  {cart.shipping_address.address_2 && `, ${cart.shipping_address.address_2}`}
                </Text>
                <Text className="text-sm small:text-base text-ui-fg-subtle">
                  {cart.shipping_address.postal_code}, {cart.shipping_address.city}
                </Text>
                <Text className="text-sm small:text-base text-ui-fg-subtle">
                  {cart.shipping_address.country_code?.toUpperCase()}
                </Text>
              </div>

              {/* Contact Summary */}
              <div 
                className="flex flex-col space-y-2 p-4 small:p-0 bg-ui-bg-subtle small:bg-transparent rounded-lg"
                data-testid="shipping-contact-summary"
              >
                <Text className="text-base small:text-lg font-semibold text-ui-fg-base mb-2">
                  Contacto
                </Text>
                <Text className="text-sm small:text-base text-ui-fg-subtle">
                  {cart.shipping_address.phone || "No proporcionado"}
                </Text>
                <Text className="text-sm small:text-base text-ui-fg-subtle break-all">
                  {cart.email}
                </Text>
              </div>

              {/* Billing Address Summary */}
              <div 
                className="flex flex-col space-y-2 p-4 small:p-0 bg-ui-bg-subtle small:bg-transparent rounded-lg"
                data-testid="billing-address-summary"
              >
                <Text className="text-base small:text-lg font-semibold text-ui-fg-base mb-2">
                  Dirección de facturación
                </Text>

                {sameAsBilling ? (
                  <Text className="text-sm small:text-base text-ui-fg-subtle italic">
                    La dirección de facturación y envío son la misma.
                  </Text>
                ) : (
                  <>
                    <Text className="text-sm small:text-base text-ui-fg-subtle">
                      {cart.billing_address?.first_name}{" "}
                      {cart.billing_address?.last_name}
                    </Text>
                    <Text className="text-sm small:text-base text-ui-fg-subtle">
                      {cart.billing_address?.address_1}
                      {cart.billing_address?.address_2 && `, ${cart.billing_address?.address_2}`}
                    </Text>
                    <Text className="text-sm small:text-base text-ui-fg-subtle">
                      {cart.billing_address?.postal_code}, {cart.billing_address?.city}
                    </Text>
                    <Text className="text-sm small:text-base text-ui-fg-subtle">
                      {cart.billing_address?.country_code?.toUpperCase()}
                    </Text>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* Loading State */
            <div className="flex items-center justify-center py-12">
              <Spinner />
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <Divider className="mt-8" />
    </div>
  )
}

export default Addresses