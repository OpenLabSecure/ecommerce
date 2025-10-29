import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="content-container" data-testid="cart-container">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Carrito de Compras
          </h1>
          {cart?.items?.length ? (
            <p className="text-gray-600">
              {cart.items.length} {cart.items.length === 1 ? 'producto' : 'productos'} en tu carrito
            </p>
          ) : null}
        </div>

        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-8">
            {/* Left Column - Cart Items */}
            <div className="flex flex-col gap-6">
              {!customer && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fadeIn">
                  <SignInPrompt />
                </div>
              )}
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 animate-fadeIn animation-delay-100">
                <ItemsTemplate cart={cart} />
              </div>
            </div>

            {/* Right Column - Summary (Sticky) */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 animate-fadeIn animation-delay-200">
                {cart && cart.region && (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Resumen del Pedido
                    </h2>
                    <Summary cart={cart as any} />
                  </>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fadeIn animation-delay-300">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Envío seguro y rastreable</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Pago 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Devoluciones fáciles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate