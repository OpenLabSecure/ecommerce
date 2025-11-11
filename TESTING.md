# Guía de Testing — Aprender a escribir tests

> Esta guía es **para principiantes**. Explicaré cada concepto y haremos ejercicios prácticos.

## ¿Qué es un test?

Un test verifica que tu código hace lo que esperas. Imagina que tienes una función que calcula el precio más barato de un producto:

```js
getProductPrice({ product })
```

¿Cómo sabes que funciona? Podrías:
- Opción A: Abrir la app, cargar productos, mirar el precio → manual, lento.
- Opción B: Escribir un test automático que verifique → rápido, repetible, confiable.

## Estructura básica de un test

Todo test sigue este patrón:

```typescript
import { describe, it, expect } from 'vitest'

describe('Mi función', () => {
  // Describo qué pruebo
  it('debe hacer X cuando Y', () => {
    // 1. Setup: preparo datos
    const input = { ... }
    
    // 2. Execute: llamo la función
    const result = miFunction(input)
    
    // 3. Assert: valido el resultado
    expect(result).toBe(esperado)
  })
})
```

### Partes:
- **describe**: agrupa tests relacionados (como una carpeta).
- **it**: un test individual (debe tener nombre descriptivo).
- **expect**: validación ("espero que result sea X").

## Test ejemplo: getProductPrice

He creado un test en `src/lib/util/__tests__/get-product-price.test.ts`.

### Qué hace:

Valida que `getProductPrice`:
1. ✅ Encuentra el precio más barato entre variantes.
2. ✅ Obtiene precio de una variante específica.
3. ✅ Maneja casos donde no hay precio.
4. ✅ Lanza error si el producto es inválido.

## Cómo ejecutar los tests

### 1. Instalar dependencias

```powershell
npm install
# o con yarn:
yarn install
```

Esto descargará vitest y @vitest/ui.

### 2. Ejecutar tests

```powershell
# Ejecutar todos los tests (modo watch = reruns automáticos)
npm run test

# Ver resultados en interfaz gráfica
npm run test:ui

# Ver cobertura (qué % del código está probado)
npm run test:coverage
```

### 3. Ver resultado

Cuando ejecutes `npm run test`, deberías ver algo como:

```
✓ src/lib/util/__tests__/get-product-price.test.ts (7 tests)

  getProductPrice
    ✓ debe encontrar el precio más barato entre variantes
    ✓ debe obtener el precio de una variante específica por ID
    ✓ debe obtener el precio de una variante específica por SKU
    ✓ debe retornar null si el producto no tiene variantes con precio
    ✓ debe lanzar error si el producto es inválido
    ✓ debe retornar null si la variante no existe
    ✓ debe retornar un objeto con propiedades de precio correctas

  getPricesForVariant
    ✓ debe retornar null si la variante no tiene calculated_price
    ✓ debe formatear correctamente el precio de una variante

Test Files  1 passed (1)
     Tests  9 passed (9)
```

Si todos ✓ están verdes → tests pasaron.

## Conceptos clave (aprende esto)

### expect() — validaciones comunes

```typescript
// Igualdad
expect(result).toBe(100)           // === estricto
expect(result).toEqual({ x: 1 })   // igualdad profunda

// Tipos
expect(result).toBeDefined()       // no es undefined
expect(result).toBeNull()          // es null
expect(result).toBeTruthy()        // truthy

// Números
expect(result).toBeGreaterThan(50)
expect(result).toBeLessThan(200)

// Strings
expect(result).toContain('precio')
expect(result).toMatch(/\$/)       // regex

// Arrays/Objetos
expect(result).toHaveProperty('price')
expect(result).toHaveLength(3)

// Errores
expect(() => myFunction()).toThrow('error message')
```

### Mock data (datos simulados)

En el test, creo un `mockProduct` porque no quiero depender de una API real:

```typescript
const mockProduct = {
  id: 'prod-1',
  variants: [
    { id: 'var-1', calculated_price: { calculated_amount: 100 } },
    { id: 'var-2', calculated_price: { calculated_amount: 200 } },
  ],
}
```

Esto me permite:
- ✅ Pruebas rápidas (sin red).
- ✅ Casos que controlo (error, edge cases).
- ✅ Reproducibles siempre.

## Ejercicio 1 (30 min): Añade un test para moneda EUR

En `get-product-price.test.ts`, después del último `describe`, añade:

```typescript
describe('getProductPrice - Moneda EUR', () => {
  it('debe manejar moneda EUR correctamente', () => {
    const mockProductEUR = {
      id: 'prod-eur',
      title: 'Producto EUR',
      handle: 'producto-eur',
      variants: [
        {
          id: 'var-1',
          calculated_price: {
            calculated_amount: 50,
            original_amount: 75,
            currency_code: 'EUR',
            calculated_price: { price_list_type: 'default' },
          },
        },
      ],
    }

    const result = getProductPrice({ product: mockProductEUR as any })

    expect(result.cheapestPrice?.currency_code).toBe('EUR')
    expect(result.cheapestPrice?.calculated_price_number).toBe(50)
  })
})
```

Luego ejecuta `npm run test` y confirma que pasa (✓).

**Por qué:** Practicas escribir tests; ves que tu código funciona con otras monedas.

## Ejercicio 2 (45 min): Test para convertToLocale

Crea un archivo `src/lib/util/__tests__/money.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { convertToLocale } from '@lib/util/money'

describe('convertToLocale', () => {
  it('debe formatear USD correctamente', () => {
    const result = convertToLocale({ amount: 1234.56, currency_code: 'USD' })
    // Esperado: "$1,234.56"
    expect(result).toContain('$')
    expect(result).toContain('1234')
  })

  it('debe formatear EUR correctamente', () => {
    const result = convertToLocale({ amount: 1234.56, currency_code: 'EUR' })
    expect(result).toContain('€')
  })

  it('debe manejar amounts inválidos', () => {
    const result = convertToLocale({ amount: null as any, currency_code: 'USD' })
    // Según la lógica, retorna "" si amount no es número
    expect(result).toBe('')
  })
})
```

Ejecuta y observa qué falla. Luego arregla el test o la función.

**Por qué:** Aprendes a testear funciones de utilidad pequeñas.

## Ejercicio 3 (1 hora): Test para el flujo completo

Crea `src/lib/util/__tests__/product-preview.integration.test.ts` (test de integración):

```typescript
import { describe, it, expect } from 'vitest'
import { getProductPrice } from '@lib/util/get-product-price'

describe('Product Preview Integration', () => {
  it('debe calcular precio y formatearlo para mostrar en preview', () => {
    const product = {
      id: 'prod-1',
      title: 'Laptop',
      handle: 'laptop',
      variants: [
        {
          id: 'v1',
          calculated_price: {
            calculated_amount: 999.99,
            original_amount: 1299.99,
            currency_code: 'USD',
            calculated_price: { price_list_type: 'default' },
          },
        },
      ],
    }

    const { cheapestPrice } = getProductPrice({ product: product as any })

    // Validar estructura que ProductPreview espera
    expect(cheapestPrice).toBeDefined()
    expect(cheapestPrice?.calculated_price_number).toBe(999.99)
    expect(cheapestPrice?.calculated_price).toBeTruthy() // string formateado
    expect(cheapestPrice?.currency_code).toBe('USD')
  })
})
```

Ejecuta, observa, aprendes.

## Consejos prácticos

1. **Tests deben ser independientes**: cada test no depende de otro.
2. **Nombres descriptivos**: `it('debe retornar null si no hay variantes')`
3. **Una validación principal por test**: no pruebes 10 cosas en 1 test.
4. **Test primero**: escribe el test antes del código (TDD avanzado).
5. **Ejecuta frecuentemente**: `npm run test` mientras codificas.

## Links útiles

- [Vitest Docs](https://vitest.dev)
- [Expect API](https://vitest.dev/api/expect.html)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

## Preguntas frecuentes

**P: ¿Debo testear TODO?**
A: No. Empieza con funciones críticas (cálculos, lógica). UI es más difícil de testear.

**P: ¿Cuál es el % de cobertura que necesito?**
A: 80% es excelente. Luego refina.

**P: ¿Cómo se venden los tests en una empresa?**
A: Menos bugs, confianza para refactorizar, documentación viviente.

---

## Siguiente paso

1. Ejecuta `npm install`.
2. Ejecuta `npm run test`.
3. Haz el Ejercicio 1.
4. Pregúntame si algo no funciona.

¡Adelante! 🚀
