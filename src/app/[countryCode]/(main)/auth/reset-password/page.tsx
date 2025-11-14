
"use client"

import { useActionState, useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { updatePassword } from "@lib/data/customer"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ErrorMessage from "@modules/checkout/components/error-message"

function ResetPasswordForm() {
  const [message, formAction] = useActionState(updatePassword, null)
  const [showSuccess, setShowSuccess] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  // Si no hay token o email, redirigir
  useEffect(() => {
    if (!token || !email) {
      router.push("/account")
    }
  }, [token, email, router])

  // Si fue exitoso, redirigir después de 3 segundos
  useEffect(() => {
    if (message === null && showSuccess) {
      const timeout = setTimeout(() => {
        router.push("/account")
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [message, showSuccess, router])

  if (!token || !email) {
    return null
  }

  const isSuccess = message === null && showSuccess

  return (
    <main className="mx-auto max-w-md px-6 py-10">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold">Restablecer contraseña</h1>
        <p className="text-sm text-ui-fg-subtle">
          Ingresa tu nueva contraseña para restablecer el acceso a tu cuenta.
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
        {/* Campos ocultos para token y email */}
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="email" value={decodeURIComponent(email)} />

        <Input
          label="Nueva contraseña"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          data-testid="password-input"
        />

        <Input
          label="Confirmar contraseña"
          name="confirm_password"
          type="password"
          autoComplete="new-password"
          required
          data-testid="confirm-password-input"
        />

        <SubmitButton 
          className="w-full"
          data-testid="submit-button"
        >
          Restablecer contraseña
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
            <p className="font-medium">¡Contraseña actualizada exitosamente!</p>
            <p className="mt-1 text-xs">
              Serás redirigido al inicio de sesión en unos segundos...
            </p>
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <main className="mx-auto max-w-md px-6 py-10">
        <div className="text-center">Cargando...</div>
      </main>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}