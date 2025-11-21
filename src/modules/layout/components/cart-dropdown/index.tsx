"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { ShoppingCartIcon, X, ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="hover:text-ui-fg-base flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <div className="relative">
              <ShoppingCartIcon size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-sm font-medium">
              Mi Carrito
            </span>
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+8px)] right-0 bg-white border border-gray-200 rounded-xl shadow-lg w-[420px] text-ui-fg-base overflow-hidden"
            data-testid="nav-cart-dropdown"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon size={20} className="text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Mi Carrito
                </h3>
              </div>
              <button
                onClick={close}
                className="p-1 hover:bg-white rounded-lg transition-colors"
                aria-label="Cerrar carrito"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                {/* Items List */}
                <div className="overflow-y-scroll max-h-[380px] px-4 py-4 space-y-4 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 -mx-4 px-4 py-2 rounded transition-colors"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        {/* Thumbnail */}
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="flex-shrink-0"
                        >
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              images={item.variant?.product?.images}
                              size="square"
                            />
                          </div>
                        </LocalizedClientLink>

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                              >
                                {item.title}
                              </LocalizedClientLink>
                            </h4>
                            <div className="mt-1">
                              <LineItemOptions
                                variant={item.variant}
                                data-testid="cart-item-variant"
                                data-value={item.variant}
                              />
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <span
                                className="text-xs text-gray-500 font-medium"
                                data-testid="cart-item-quantity"
                                data-value={item.quantity}
                              >
                                Cantidad: <span className="font-bold text-gray-700">{item.quantity}</span>
                              </span>
                              <LineItemPrice
                                item={item}
                                style="tight"
                                currencyCode={cartState.currency_code}
                              />
                            </div>
                          </div>

                          {/* Delete Button */}
                          <div className="mt-2">
                            <DeleteButton
                              id={item.id}
                              className="text-xs text-red-600 hover:text-red-700 font-medium"
                              data-testid="cart-item-remove-button"
                            >
                              Eliminar
                            </DeleteButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Subtotal <span className="text-xs text-gray-500">(sin impuestos)</span>
                    </span>
                    <span
                      className="text-lg font-bold text-gray-900"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      Ir al Carrito
                      <ArrowRight size={18} />
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-y-6 items-center justify-center py-16 px-6">
                <div className="bg-gray-100 p-4 rounded-full">
                  <ShoppingCartIcon size={32} className="text-gray-400" />
                </div>
                <div className="text-center">
                  <p className="text-gray-600 font-medium">Tu carrito está vacío</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Agrega productos para comenzar
                  </p>
                </div>
                <LocalizedClientLink href="/store">
                  <Button
                    onClick={close}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                  >
                    Explorar Productos
                  </Button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown