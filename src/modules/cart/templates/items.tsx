import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  const itemCount = items?.length || 0

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with gradient background - Fully Responsive */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Icon - Responsive sizing */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
            </div>
            
            {/* Text - Responsive sizing */}
            <div>
              <Heading className="text-lg sm:text-xl font-bold text-gray-900">
                Mis Productos
              </Heading>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {itemCount} {itemCount === 1 ? 'producto seleccionado' : 'productos seleccionados'}
              </p>
            </div>
          </div>

          {/* Continue Shopping Link - Hidden on mobile, visible on tablet+ */}
          <button className="hidden md:flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Seguir comprando
          </button>
          
          {/* Mobile Continue Shopping - Visible only on mobile */}
          <button className="flex md:hidden items-center justify-center gap-2 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors w-full sm:w-auto py-2 sm:py-0">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Seguir comprando
          </button>
        </div>
      </div>

      {/* Items Section - Different layouts for mobile and desktop */}
      <div className="space-y-3 sm:space-y-0">
        {/* Mobile: Custom Card Layout */}
        <div className="block sm:hidden space-y-3">
          {items && items.length > 0 ? (
            items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Item
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                </div>
              ))
          ) : (
            repeat(3).map((i) => (
              <div 
                key={i} 
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <SkeletonLineItem />
              </div>
            ))
          )}
        </div>

        {/* Tablet and Desktop: Table Layout */}
        <div className="hidden sm:block bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <Table.Header className="bg-gray-50 border-t-0">
                <Table.Row className="text-gray-700 text-xs font-semibold uppercase tracking-wider">
                  <Table.HeaderCell className="!pl-4 sm:!pl-6 py-3 sm:py-4 whitespace-nowrap">
                    Producto
                  </Table.HeaderCell>
                  <Table.HeaderCell className="py-3 sm:py-4"></Table.HeaderCell>
                  <Table.HeaderCell className="py-3 sm:py-4 text-center whitespace-nowrap">
                    Cantidad
                  </Table.HeaderCell>
                  <Table.HeaderCell className="hidden md:table-cell py-3 sm:py-4 text-right whitespace-nowrap">
                    Precio Unit.
                  </Table.HeaderCell>
                  <Table.HeaderCell className="!pr-4 sm:!pr-6 text-right py-3 sm:py-4 whitespace-nowrap">
                    Subtotal
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body className="divide-y divide-gray-100">
                {items && items.length > 0
                  ? items
                      .sort((a, b) => {
                        return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                      })
                      .map((item) => {
                        return (
                          <Item
                            key={item.id}
                            item={item}
                            currencyCode={cart?.currency_code}
                          />
                        )
                      })
                  : repeat(5).map((i) => {
                      return <SkeletonLineItem key={i} />
                    })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>

      {/* Help Section - Fully Responsive */}
      {items && items.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-blue-900 mb-1">
                ¿Necesitas ayuda con tu pedido?
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Los precios incluyen impuestos. El envío se calculará en el checkout.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemsTemplate