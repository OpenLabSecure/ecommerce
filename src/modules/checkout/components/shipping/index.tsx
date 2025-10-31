"use client"

import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Button, clx, Heading, Text } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"
import MedusaRadio from "@modules/common/components/radio"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) {
    return ""
  }

  let ret = ""

  if (address.address_1) {
    ret += ` ${address.address_1}`
  }

  if (address.address_2) {
    ret += `, ${address.address_2}`
  }

  if (address.postal_code) {
    ret += `, ${address.postal_code} ${address.city}`
  }

  if (address.country_code) {
    ret += `, ${address.country_code.toUpperCase()}`
  }

  return ret
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)

  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup"
  )

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!_pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[p.value?.id || ""] = p.value?.amount!))

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      } else {
        setIsLoadingPrices(false)
      }
    } else {
      setIsLoadingPrices(false)
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)

    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON)
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF)
    }

    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="flex flex-col small:flex-row small:items-center justify-between mb-6 gap-4">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-2xl small:text-3xl gap-x-2 items-center",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          Método de envío
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid className="text-green-500" />
          )}
        </Heading>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover text-sm small:text-base font-medium transition-colors"
              data-testid="edit-delivery-button"
            >
              Editar
            </button>
          )}
      </div>

      {isOpen ? (
        <>
          {/* Shipping Options Section */}
          <div className="space-y-8">
            {/* Pickup Option Toggle */}
            {hasPickupOptions && (
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-base small:text-lg text-ui-fg-base">
                    Tipo de entrega
                  </span>
                  <span className="text-sm small:text-base text-ui-fg-muted">
                    Elige cómo deseas recibir tu pedido
                  </span>
                </div>
                
                <RadioGroup
                  value={showPickupOptions}
                  onChange={(value) => {
                    const id = _pickupMethods.find(
                      (option) => !option.insufficient_inventory
                    )?.id

                    if (id) {
                      handleSetShippingMethod(id, "pickup")
                    }
                  }}
                  className="space-y-3"
                >
                  {/* Pickup Option */}
                  <Radio
                    value={PICKUP_OPTION_ON}
                    data-testid="delivery-option-radio"
                    className={clx(
                      "flex items-center justify-between cursor-pointer py-4 small:py-5 px-4 small:px-6 border-2 rounded-lg transition-all duration-200",
                      "hover:border-ui-border-interactive hover:shadow-md",
                      {
                        "border-ui-border-interactive bg-ui-bg-subtle shadow-md":
                          showPickupOptions === PICKUP_OPTION_ON,
                        "border-ui-border-base": showPickupOptions !== PICKUP_OPTION_ON,
                      }
                    )}
                  >
                    <div className="flex items-center gap-x-3 small:gap-x-4">
                      <MedusaRadio
                        checked={showPickupOptions === PICKUP_OPTION_ON}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm small:text-base font-medium text-ui-fg-base">
                          Recoger en tienda
                        </span>
                        <span className="text-xs small:text-sm text-ui-fg-muted mt-1">
                          Recoge tu pedido en una de nuestras tiendas
                        </span>
                      </div>
                    </div>
                    <span className="text-sm small:text-base font-semibold text-ui-fg-base">
                      Gratis
                    </span>
                  </Radio>

                  {/* Shipping Option */}
                  <Radio
                    value={PICKUP_OPTION_OFF}
                    data-testid="delivery-option-radio"
                    className={clx(
                      "flex items-center justify-between cursor-pointer py-4 small:py-5 px-4 small:px-6 border-2 rounded-lg transition-all duration-200",
                      "hover:border-ui-border-interactive hover:shadow-md",
                      {
                        "border-ui-border-interactive bg-ui-bg-subtle shadow-md":
                          showPickupOptions === PICKUP_OPTION_OFF,
                        "border-ui-border-base": showPickupOptions !== PICKUP_OPTION_OFF,
                      }
                    )}
                  >
                    <div className="flex items-center gap-x-3 small:gap-x-4">
                      <MedusaRadio
                        checked={showPickupOptions === PICKUP_OPTION_OFF}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm small:text-base font-medium text-ui-fg-base">
                          Envío a domicilio
                        </span>
                        <span className="text-xs small:text-sm text-ui-fg-muted mt-1">
                          Recibe tu pedido en la dirección indicada
                        </span>
                      </div>
                    </div>
                  </Radio>
                </RadioGroup>
              </div>
            )}

            {/* Shipping Methods */}
            {showPickupOptions === PICKUP_OPTION_OFF && (
              <div className="space-y-4" data-testid="delivery-options-container">
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-base small:text-lg text-ui-fg-base">
                    Opciones de envío
                  </span>
                  <span className="text-sm small:text-base text-ui-fg-muted">
                    Selecciona el método de envío que prefieras
                  </span>
                </div>

                <RadioGroup
                  value={shippingMethodId}
                  onChange={(v) => {
                    if (v) {
                      return handleSetShippingMethod(v, "shipping")
                    }
                  }}
                  className="space-y-3"
                >
                  {_shippingMethods?.map((option) => {
                    const isDisabled =
                      option.price_type === "calculated" &&
                      !isLoadingPrices &&
                      typeof calculatedPricesMap[option.id] !== "number"

                    return (
                      <Radio
                        key={option.id}
                        value={option.id}
                        data-testid="delivery-option-radio"
                        disabled={isDisabled}
                        className={clx(
                          "flex items-center justify-between cursor-pointer py-4 small:py-5 px-4 small:px-6 border-2 rounded-lg transition-all duration-200",
                          "hover:border-ui-border-interactive hover:shadow-md",
                          {
                            "border-ui-border-interactive bg-ui-bg-subtle shadow-md":
                              option.id === shippingMethodId,
                            "border-ui-border-base":
                              option.id !== shippingMethodId,
                            "cursor-not-allowed opacity-70":
                              isDisabled,
                          }
                        )}
                      >
                        <div className="flex items-center gap-x-3 small:gap-x-4">
                          <MedusaRadio
                            checked={option.id === shippingMethodId}
                          />
                          <div className="flex flex-col">
                            <span className="text-sm small:text-base font-medium text-ui-fg-base">
                              {option.name}
                            </span>
                            <span className="text-xs small:text-sm text-ui-fg-muted mt-1">
                              {option.description}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm small:text-base font-semibold text-ui-fg-base">
                          {option.price_type === "flat" ? (
                            convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })
                          ) : calculatedPricesMap[option.id] ? (
                            convertToLocale({
                              amount: calculatedPricesMap[option.id],
                              currency_code: cart?.currency_code,
                            })
                          ) : isLoadingPrices ? (
                            <Loader className="w-4 h-4" />
                          ) : (
                            "-"
                          )}
                        </span>
                      </Radio>
                    )
                  })}
                </RadioGroup>
              </div>
            )}

            {/* Pickup Methods */}
            {showPickupOptions === PICKUP_OPTION_ON && (
              <div className="space-y-4" data-testid="delivery-options-container">
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold text-base small:text-lg text-ui-fg-base">
                    Tiendas disponibles
                  </span>
                  <span className="text-sm small:text-base text-ui-fg-muted">
                    Elige una tienda cercana para recoger tu pedido
                  </span>
                </div>

                <RadioGroup
                  value={shippingMethodId}
                  onChange={(v) => {
                    if (v) {
                      return handleSetShippingMethod(v, "pickup")
                    }
                  }}
                  className="space-y-3"
                >
                  {_pickupMethods?.map((option) => {
                    return (
                      <Radio
                        key={option.id}
                        value={option.id}
                        disabled={option.insufficient_inventory}
                        data-testid="delivery-option-radio"
                        className={clx(
                          "flex items-start justify-between cursor-pointer py-4 small:py-5 px-4 small:px-6 border-2 rounded-lg transition-all duration-200",
                          "hover:border-ui-border-interactive hover:shadow-md",
                          {
                            "border-ui-border-interactive bg-ui-bg-subtle shadow-md":
                              option.id === shippingMethodId,
                            "border-ui-border-base":
                              option.id !== shippingMethodId,
                            "cursor-not-allowed opacity-70":
                              option.insufficient_inventory,
                          }
                        )}
                      >
                        <div className="flex items-start gap-x-3 small:gap-x-4">
                          <MedusaRadio
                            checked={option.id === shippingMethodId}
                          />
                          <div className="flex flex-col flex-1">
                            <span className="text-sm small:text-base font-medium text-ui-fg-base">
                              {option.name}
                            </span>
                            <span className="text-xs small:text-sm text-ui-fg-muted mt-1">
                              {formatAddress(
                                option.service_zone?.fulfillment_set?.location
                                  ?.address
                              )}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm small:text-base font-semibold text-ui-fg-base">
                          {convertToLocale({
                            amount: option.amount!,
                            currency_code: cart?.currency_code,
                          })}
                        </span>
                      </Radio>
                    )
                  })}
                </RadioGroup>
              </div>
            )}
          </div>

          {/* Error Message and Submit Button */}
          <div className="mt-8">
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <Button
              size="large"
              className="w-full mt-4"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!cart.shipping_methods?.[0]}
              data-testid="submit-delivery-option-button"
            >
              Continuar al pago
            </Button>
          </div>
        </>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Método
                </Text>
                <Text className="txt-medium text-ui-fg-subtle">
                  {cart.shipping_methods!.at(-1)!.name}{" "}
                  {convertToLocale({
                    amount: cart.shipping_methods!.at(-1)!.amount!,
                    currency_code: cart?.currency_code,
                  })}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Shipping
