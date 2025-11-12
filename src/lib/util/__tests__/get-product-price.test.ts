import { describe, it, expect } from 'vitest'
import { getProductPrice, getPricesForVariant } from '@lib/util/get-product-price'

/**
 * Test Suite para getProductPrice
 * 
 * Objetivo: Validar que getProductPrice extrae correctamente
 * el precio más barato (cheapestPrice) y el precio de una variante específica.
 * 
 * Aprenderás:
 * - Cómo estructurar un test (describe, it, expect)
 * - Cómo simular datos (mock objects)
 * - Cómo validar resultados
 */

describe('getProductPrice', () => {
  /**
   * Mock data: Producto simulado con múltiples variantes
   * Esto es lo que retornaría la API normalmente
   */
  const mockProduct = {
    id: 'prod-1',
    title: 'Laptop Pro',
    handle: 'laptop-pro',
    variants: [
      {
        id: 'var-1',
        sku: 'SKU-001',
        calculated_price: {
          calculated_amount: 1000, // Precio más barato
          original_amount: 1200,
          currency_code: 'USD',
          calculated_price: { price_list_type: 'default' },
        },
      },
      {
        id: 'var-2',
        sku: 'SKU-002',
        calculated_price: {
          calculated_amount: 1500, // Precio más caro
          original_amount: 1800,
          currency_code: 'USD',
          calculated_price: { price_list_type: 'default' },
        },
      },
      {
        id: 'var-3',
        sku: 'SKU-003',
        // Sin calculated_price — será filtrada
      },
    ],
  }

  /**
   * Test 1: Extraer el precio más barato
   * 
   * Qué probamos:
   * - getProductPrice encuentra la variante más barata
   * - cheapestPrice retorna la variante con calculated_amount = 1000
   */
  it('debe encontrar el precio más barato entre variantes', () => {
    const result = getProductPrice({ product: mockProduct as any })

    // Validaciones (expect)
    expect(result).toBeDefined()
    expect(result.cheapestPrice).toBeDefined()
    expect(result.cheapestPrice?.calculated_price_number).toBe(1000)
    expect(result.cheapestPrice?.original_price_number).toBe(1200)
    expect(result.cheapestPrice?.currency_code).toBe('USD')
  })

  /**
   * Test 2: Obtener precio de una variante específica por ID
   */
  it('debe obtener el precio de una variante específica por ID', () => {
    const result = getProductPrice({
      product: mockProduct as any,
      variantId: 'var-2',
    })

    expect(result.variantPrice).toBeDefined()
    expect(result.variantPrice?.calculated_price_number).toBe(1500)
    expect(result.variantPrice?.original_price_number).toBe(1800)
  })

  /**
   * Test 3: Obtener precio de una variante por SKU
   */
  it('debe obtener el precio de una variante específica por SKU', () => {
    const result = getProductPrice({
      product: mockProduct as any,
      variantId: 'SKU-001',
    })

    expect(result.variantPrice).toBeDefined()
    expect(result.variantPrice?.calculated_price_number).toBe(1000)
  })

  /**
   * Test 4: Retornar null si no hay variantes con precio
   */
  it('debe retornar null si el producto no tiene variantes con precio', () => {
    const productSinPrecio = {
      id: 'prod-2',
      title: 'Producto sin precio',
      handle: 'sin-precio',
      variants: [
        { id: 'var-1' }, // Sin calculated_price
      ],
    }

    const result = getProductPrice({ product: productSinPrecio as any })

    expect(result.cheapestPrice).toBeNull()
  })

  /**
   * Test 5: Lanzar error si no se pasa un producto
   */
  it('debe lanzar error si el producto es inválido', () => {
    expect(() => {
      getProductPrice({ product: null as any })
    }).toThrow('No product provided')
  })

  /**
   * Test 6: Variante no encontrada retorna null
   */
  it('debe retornar null si la variante no existe', () => {
    const result = getProductPrice({
      product: mockProduct as any,
      variantId: 'var-inexistente',
    })

    expect(result.variantPrice).toBeNull()
  })

  /**
   * Test 7: Validar estructura de objeto retornado
   * (prueba que el objeto tiene todas las propiedades esperadas)
   */
  it('debe retornar un objeto con propiedades de precio correctas', () => {
    const result = getProductPrice({ product: mockProduct as any })
    const price = result.cheapestPrice

    expect(price).toHaveProperty('calculated_price_number')
    expect(price).toHaveProperty('calculated_price') // string formateado
    expect(price).toHaveProperty('original_price_number')
    expect(price).toHaveProperty('original_price') // string formateado
    expect(price).toHaveProperty('currency_code')
    expect(price).toHaveProperty('price_type')
    expect(price).toHaveProperty('percentage_diff')
  })
})

/**
 * Test Suite para getPricesForVariant (función auxiliar)
 */
describe('getPricesForVariant', () => {
  it('debe retornar null si la variante no tiene calculated_price', () => {
    const variant = { id: 'var-1' }
    const result = getPricesForVariant(variant)
    expect(result).toBeNull()
  })

  it('debe formatear correctamente el precio de una variante', () => {
    const variant = {
      calculated_price: {
        calculated_amount: 100,
        original_amount: 150,
        currency_code: 'USD',
        calculated_price: { price_list_type: 'sale' },
      },
    }

    const result = getPricesForVariant(variant)

    expect(result?.calculated_price_number).toBe(100)
    expect(result?.original_price_number).toBe(150)
    expect(result?.price_type).toBe('sale')
  })
})
