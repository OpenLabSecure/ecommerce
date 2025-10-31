"use client"

import { isManual, isStripe } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import ErrorMessage from "../error-message"
import { ShoppingBag, CreditCard, Lock } from "lucide-react"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
  className?: string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
  className,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
          className={className}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton 
          notReady={notReady} 
          data-testid={dataTestId}
          className={className}
        />
      )
    default:
      return (
        <Button 
          disabled 
          size="large"
          className={`w-full h-12 small:h-14 text-base small:text-lg font-semibold ${className || ''}`}
        >
          <Lock className="mr-2" size={20} />
          Selecciona un método de pago
        </Button>
      )
  }
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
  className,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
  className?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const disabled = !stripe || !elements ? true : false

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
  }

  return (
    <div className="space-y-4">
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
        className={`w-full h-12 small:h-14 text-base small:text-lg font-semibold bg-ui-bg-interactive hover:bg-ui-bg-interactive-hover transition-all duration-200 shadow-md hover:shadow-lg ${className || ''}`}
      >
        {!submitting && (
          <>
            <CreditCard className="mr-2" size={20} />
            <span>Realizar pedido</span>
          </>
        )}
        {submitting && <span>Procesando pago...</span>}
      </Button>
      
      {errorMessage && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <ErrorMessage
            error={errorMessage}
            data-testid="stripe-payment-error-message"
          />
        </div>
      )}

      {/* Security badges */}
      {!errorMessage && (
        <div className="flex flex-wrap items-center justify-center gap-3 small:gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-xs small:text-sm text-ui-fg-muted">
            <Lock size={14} className="text-green-600" />
            <span>Pago seguro SSL</span>
          </div>
          <div className="hidden small:block w-px h-4 bg-ui-border-base" />
          <div className="flex items-center gap-1.5 text-xs small:text-sm text-ui-fg-muted">
            <CreditCard size={14} className="text-blue-600" />
            <span>Stripe protegido</span>
          </div>
        </div>
      )}
    </div>
  )
}

const ManualTestPaymentButton = ({ 
  notReady,
  "data-testid": dataTestId,
  className,
}: { 
  notReady: boolean
  "data-testid"?: string
  className?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)
    onPaymentCompleted()
  }

  return (
    <div className="space-y-4">
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid={dataTestId}
        className={`w-full h-12 small:h-14 text-base small:text-lg font-semibold bg-ui-bg-interactive hover:bg-ui-bg-interactive-hover transition-all duration-200 shadow-md hover:shadow-lg ${className || ''}`}
      >
        {!submitting && (
          <>
            <ShoppingBag className="mr-2" size={20} />
            <span>Realizar pedido</span>
          </>
        )}
        {submitting && <span>Procesando pedido...</span>}
      </Button>
      
      {errorMessage && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <ErrorMessage
            error={errorMessage}
            data-testid="manual-payment-error-message"
          />
        </div>
      )}

      {/* Test mode indicator */}
      {!errorMessage && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-full">
            <span className="text-xs small:text-sm text-yellow-800 font-medium">
              🧪 Modo de prueba
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentButton