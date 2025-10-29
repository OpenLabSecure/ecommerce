import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50"></div>
      
      {/* Content */}
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-6">
        {/* Left Side - Text Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-5 h-5 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
            
            <Heading level="h2" className="text-xl font-semibold text-gray-900">
              ¿Ya tienes una cuenta?
            </Heading>
          </div>
          
          <Text className="text-sm text-gray-600 leading-relaxed">
            Inicia sesión para una experiencia de compra personalizada, acceso rápido a tus pedidos y más beneficios.
          </Text>
          
          {/* Benefits List */}
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Checkout rápido
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Historial de pedidos
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ofertas exclusivas
            </span>
          </div>
        </div>

        {/* Right Side - Action Button */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <LocalizedClientLink href="/account">
            <Button 
              variant="secondary" 
              className="w-full sm:w-auto h-11 px-8 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-200" 
              data-testid="sign-in-button"
            >
              Iniciar Sesión
            </Button>
          </LocalizedClientLink>
          
          <p className="mt-3 text-xs text-center sm:text-right text-gray-500">
            ¿No tienes cuenta?{" "}
            <LocalizedClientLink 
              href="/account" 
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Regístrate aquí
            </LocalizedClientLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignInPrompt