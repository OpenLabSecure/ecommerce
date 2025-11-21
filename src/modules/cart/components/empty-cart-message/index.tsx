import { Heading, Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import { ShoppingCartIcon, ArrowRight } from "lucide-react"

const EmptyCartMessage = () => {
  return (
    <div 
      className="min-h-[500px] flex flex-col justify-center items-center px-4 py-16" 
      data-testid="empty-cart-message"
    >
      {/* Icono animado */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-full border-2 border-blue-200">
          <ShoppingCartIcon size={48} className="text-blue-600" />
        </div>
      </div>

      {/* Contenido */}
      <div className="text-center max-w-md">
        <Heading
          level="h1"
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
        >
          Tu carrito está vacío
        </Heading>
        
        <Text className="text-gray-600 text-base lg:text-lg mb-8 leading-relaxed">
          Aún no has agregado productos a tu carrito. Explora nuestro catálogo y encuentra lo que necesitas.
        </Text>

        {/* Características destacadas */}
        <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-gray-200">
          <div className="flex flex-col items-center">
            <div className="text-2xl mb-2">🚚</div>
            <span className="text-xs text-gray-600 font-medium">Envío Rápido</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl mb-2">🔒</div>
            <span className="text-xs text-gray-600 font-medium">Pago Seguro</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl mb-2">↩️</div>
            <span className="text-xs text-gray-600 font-medium">Devoluciones</span>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <InteractiveLink 
            href="/store"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Explorar Productos
          </InteractiveLink>
        </div>
      </div>

      {/* Sugerencia adicional */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>¿Necesitas ayuda? <a href="/sobre-nosotros/canales-de-atencion" className="text-blue-600 hover:text-blue-700 font-medium">Contáctanos</a></p>
      </div>
    </div>
  )
}

export default EmptyCartMessage