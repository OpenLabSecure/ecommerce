"use client"

import { signup } from "@lib/data/customer"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { useActionState } from "react"
import Input from "@modules/common/components/input"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="w-full flex flex-col items-center"
      data-testid="register-page"
    >
      {/* Header */}
      <div className="w-full text-center mb-6">
        <h1 className="text-2xl small:text-3xl font-semibold mb-2">
          Crear cuenta
        </h1>
        <p className="text-sm small:text-base text-ui-fg-subtle">
          Crea tu perfil y accede a una experiencia de compra mejorada
        </p>
      </div>

      {/* Form */}
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          {/* Name Fields - Side by side on larger screens */}
            <Input
              label="Nombre"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
              type="text"
            />
            <Input
              label="Apellido"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
              type="text"
            />

          <Input
            label="Correo electrónico"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          
          <Input
            label="Teléfono"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          
          <Input
            label="Contraseña"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={message} data-testid="register-error" />

        {/* Terms and Conditions */}
        <div className="text-center text-xs small:text-sm text-ui-fg-subtle mt-6 mb-4">
          Al crear una cuenta, aceptas nuestra{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover underline transition-colors"
          >
            Política de Privacidad
          </LocalizedClientLink>{" "}
          y{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover underline transition-colors"
          >
            Términos de Uso
          </LocalizedClientLink>
          .
        </div>

        <SubmitButton 
          className="w-full h-11 small:h-12 text-sm small:text-base" 
          data-testid="register-button"
        >
          Crear cuenta
        </SubmitButton>
      </form>

      {/* Login Link */}
      <div className="text-center text-sm small:text-base text-ui-fg-subtle mt-6">
        ¿Ya tienes una cuenta?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium transition-colors"
        >
          Inicia sesión aquí
        </button>
      </div>
    </div>
  )
}

export default Register