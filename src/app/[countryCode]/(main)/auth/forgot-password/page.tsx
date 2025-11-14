
"use client"

import { useActionState, useState } from "react"
import { requestPasswordReset } from "@lib/data/customer"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ErrorMessage from "@modules/checkout/components/error-message"

export default function ForgotPasswordPage() {
  const [message, formAction] = useActionState(requestPasswordReset, null)
  const [showSuccess, setShowSuccess] = useState(false)

  // Si no hay error (message es null), significa que fue exitoso
  const isSuccess = message === null && showSuccess

  return (
    <main className="mx-auto max-w-md px-6 py-10">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold">¿Olvidaste tu contraseña?</h1>
        <p className="text-sm text-ui-fg-subtle">
          Ingresa tu correo electrónico y, si existe una cuenta asociada, te
          enviaremos un enlace para restablecer tu contraseña.
        </p>
      </div>

      <form 
        action={async (formData) => {
          const result = await formAction(formData)
          if (result === null) {
            setShowSuccess(true)
          }
        }} 
        className="space-y-4"
      >
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          required
          data-testid="email-input"
        />

        <SubmitButton 
          className="w-full"
          data-testid="submit-button"
        >
          Enviar enlace de restablecimiento
        </SubmitButton>

        {/* Mostrar error si existe */}
        <ErrorMessage error={message} data-testid="error-message" />

        {/* Mostrar mensaje de éxito */}
        {isSuccess && (
          <div
            className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
            role="status"
            data-testid="success-message"
          >
            Si existe una cuenta con ese correo, se ha enviado un enlace para
            restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.
          </div>
        )}

        <div className="text-center text-sm text-ui-fg-subtle">
          <LocalizedClientLink
            href="/account"
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover underline"
          >
            Volver al inicio de sesión
          </LocalizedClientLink>
        </div>
      </form>
    </main>
  )
}