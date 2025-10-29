"use client"

import ErrorMessage from "@modules/checkout/components/error-message"
import Input from "@modules/common/components/input"
import { useActionState } from "react"
import { login } from "@lib/data/customer"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="w-full flex flex-col items-center"
      data-testid="login-page"
    >
      {/* Header */}
      <div className="w-full text-center mb-6">
        <h1 className="text-2xl small:text-3xl font-semibold mb-2">
          ¡Bienvenido de nuevo!
        </h1>
        <p className="text-sm small:text-base text-ui-fg-subtle">
          Inicia sesión para acceder a una experiencia de compra mejorada
        </p>
      </div>

      {/* Form */}
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            title="Ingresa un correo electrónico válido"
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end mt-2">
          <button
            type="button"
            className="text-sm text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <ErrorMessage error={message} data-testid="login-error-message" />

        <SubmitButton 
          data-testid="sign-in-button" 
          className="w-full mt-6 h-11 small:h-12 text-sm small:text-base"
        >
          Iniciar sesión
        </SubmitButton>
      </form>

      {/* Register Link */}
      <div className="text-center text-sm small:text-base text-ui-fg-subtle mt-6">
        ¿No tienes una cuenta?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium transition-colors"
          data-testid="register-button"
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  )
}

export default Login