"use client"

import { isManual, isStripe } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import ErrorMessage from "../error-message"
import { ShoppingBag, CreditCard, Lock, ExternalLink } from "lucide-react"

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

  // Obtenemos la sesión de pago activa
  // Nota: En v2 a veces está en payment_collection, asegúrate de que esto traiga datos
  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  ) || cart.payment_collection?.payment_sessions?.[0]

  const providerId = paymentSession?.provider_id

  switch (true) {
    case isStripe(providerId):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
          className={className}
        />
      )
    case isManual(providerId):
      return (
        <ManualTestPaymentButton 
          notReady={notReady} 
          data-testid={dataTestId}
          className={className}
        />
      )
    // CASO NUEVO: MERCADO PAGO
    case providerId === 'pp_pp_mercadopago_pp_mercadopago':
      return (
        <MercadoPagoPaymentButton
          notReady={notReady}
          cart={cart}
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

//Componente dedicado para Mercado Pago
const MercadoPagoPaymentButton = ({
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

  const handlePayment = () => {
    setSubmitting(true)
    setErrorMessage(null)

   // Opción más segura: Busca cualquiera que incluya "mercadopago"
    const session = cart.payment_collection?.payment_sessions?.find(
        (s) => s.provider_id.includes('mercadopago')
    )

    if (!session) {
        setErrorMessage("No se encontró la sesión de Mercado Pago")
        console.error("IDs encontrados:", cart.payment_collection?.payment_sessions?.map(s => s.provider_id))
        setSubmitting(false)
        return
    }

    const initPoint = session.data.init_point as string

    if (initPoint) {
        console.log("Redirigiendo a Mercado Pago:", initPoint)
        window.location.href = initPoint
    } else {
        setErrorMessage("Error: No se recibió el link de pago desde el servidor.")
        setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button
        disabled={notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
        className={`w-full h-12 small:h-14 text-base small:text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 shadow-md hover:shadow-lg ${className || ''}`}
      >
        {!submitting && (
          <>
            <ExternalLink className="mr-2" size={20} />
            <span>Pagar con Mercado Pago</span>
          </>
        )}
        {submitting && <span>Redirigiendo...</span>}
      </Button>
      
      {errorMessage && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <ErrorMessage
            error={errorMessage}
            data-testid="mp-payment-error-message"
          />
        </div>
      )}
       {!errorMessage && (
        <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-xs small:text-sm text-gray-500 font-medium">
              Serás redirigido a Mercado Pago para completar la compra de forma segura.
            </span>
        </div>
      )}
    </div>
  )
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
            <span>Pagar con Tarjeta</span>
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
            <span>Realizar pedido (Manual)</span>
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
    </div>
  )
}

export default PaymentButton