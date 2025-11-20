"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import { FileText, List } from "lucide-react"

type ProductSpecificationsProps = {
  product: HttpTypes.StoreProduct
  selectedVariant?: HttpTypes.StoreProductVariant | null
}

const ProductSpecifications = ({ 
  product, 
  selectedVariant 
}: ProductSpecificationsProps) => {
  const [activeTab, setActiveTab] = useState<"description" | "characteristics">("description")

  // Extraer descripción del producto
  const description = product.description || null

  // Extraer características de la variante seleccionada o del producto
  const metadata = product.metadata || {}
  let characteristics: string | null = null
  
  if (selectedVariant?.metadata?.caracteristicas) {
    characteristics = selectedVariant.metadata.caracteristicas as string
  } else if (metadata.caracteristicas) {
    characteristics = metadata.caracteristicas as string
  }

  // Si no hay contenido, no mostrar nada
  if (!description && !characteristics) {
    return null
  }

  const formatDescription = (content: string) => {
    const lines = content.split("\n").filter((line) => line.trim())
    
    return (
      <div className="space-y-4">
        {lines.map((line, index) => (
          <p key={index} className="text-ui-fg-subtle leading-relaxed text-base">
            {line}
          </p>
        ))}
      </div>
    )
  }

 

const formatCharacteristics = (content: string) => {
  // 1. Cortamos cada fila usando "@@"
  const rowsRaw = content
    .split("@@")
    .map((r) => r.trim())
    .filter((r) => r.length > 0)

  const rows: { label: string; value: string }[] = []

  // 2. Cada fila usa ": " para separar etiqueta y valor
  rowsRaw.forEach((row) => {
    const [label, ...valueParts] = row.split(": ")
    const value = valueParts.join(": ").trim()

    rows.push({
      label: (label || "").trim(),
      value: (value || "").trim(),
    })
  })

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-700 w-full sm:w-1/3">
                {row.label}
              </td>
              <td className="px-4 py-3 border-b border-gray-200 text-gray-900">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}





return (
  <div className="mt-12 lg:mt-16">
    {/* Tabs Navigation */}
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex gap-2" aria-label="Product information tabs">
        {description && (
          <button
            onClick={() => setActiveTab("description")}
            className={`
              flex items-center gap-2 px-6 py-3 border-b-2 transition-all duration-200 font-medium text-sm
              ${
                activeTab === "description"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }
            `}
            aria-selected={activeTab === "description"}
          >
            <FileText className="w-4 h-4" />
            <span>Descripción</span>
          </button>
        )}
        
        {characteristics && (
          <button
            onClick={() => setActiveTab("characteristics")}
            className={`
              flex items-center gap-2 px-6 py-3 border-b-2 transition-all duration-200 font-medium text-sm
              ${
                activeTab === "characteristics"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }
            `}
            aria-selected={activeTab === "characteristics"}
          >
            <List className="w-4 h-4" />
            <span>Características</span>
          </button>
        )}
      </nav>
    </div>

    {/* Tab Content */}
    <div>
      {/* Descripción Tab */}
      {activeTab === "description" && description && (
        <div 
          className="animate-fadeIn"
          role="tabpanel"
          aria-labelledby="tab-description"
        >
          <div className="prose prose-gray max-w-none">
            {formatDescription(description)}
          </div>
        </div>
      )}

      {/* Características Tab */}
      {activeTab === "characteristics" && characteristics && (
        <div 
          className="animate-fadeIn"
          role="tabpanel"
          aria-labelledby="tab-characteristics"
        >
          {/* Alerta de variante seleccionada */}
          {selectedVariant && (
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Variante:</span>{" "}
                {selectedVariant.title}
              </p>
            </div>
          )}

          {/* Grid de características */}
          {formatCharacteristics(characteristics)}
        </div>
      )}
    </div>
  </div>
)
}

export default ProductSpecifications