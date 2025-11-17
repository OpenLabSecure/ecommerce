
import React from 'react'
import { MapPin, Truck, Clock, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function CoberturaDeliveryPage() {
  const districts = [
    // LIMA CENTRO
    { name: "Lima Centro", zone: "Centro", deliveryTime: "24-48 horas", status: "active" },
    { name: "Cercado de Lima", zone: "Centro", deliveryTime: "24-48 horas", status: "active" },
    { name: "Rímac", zone: "Centro", deliveryTime: "24-48 horas", status: "active" },
    { name: "San Isidro", zone: "Centro", deliveryTime: "24-48 horas", status: "active" },
    { name: "Miraflores", zone: "Centro", deliveryTime: "24-48 horas", status: "active" },
    { name: "Barranco", zone: "Centro", deliveryTime: "24-48 horas", status: "active" },
    { name: "Chorrillos", zone: "Centro", deliveryTime: "24-48 horas", status: "active" },
    { name: "Surquillo", zone: "Centro", deliveryTime: "24-48 horas", status: "active" },
    
    // LIMA NORTE
    { name: "Los Olivos", zone: "Norte", deliveryTime: "24-48 horas", status: "active" },
    { name: "San Martín de Porres", zone: "Norte", deliveryTime: "24-48 horas", status: "active" },
    { name: "Comas", zone: "Norte", deliveryTime: "48-72 horas", status: "active" },
    { name: "Independencia", zone: "Norte", deliveryTime: "48-72 horas", status: "active" },
    { name: "Carabayllo", zone: "Norte", deliveryTime: "48-72 horas", status: "active" },
    { name: "Puente Piedra", zone: "Norte", deliveryTime: "48-72 horas", status: "active" },
    { name: "Ancón", zone: "Norte", deliveryTime: "48-72 horas", status: "limited" },
    
    // LIMA ESTE
    { name: "La Molina", zone: "Este", deliveryTime: "24-48 horas", status: "active" },
    { name: "San Borja", zone: "Este", deliveryTime: "24-48 horas", status: "active" },
    { name: "Santiago de Surco", zone: "Este", deliveryTime: "24-48 horas", status: "active" },
    { name: "Ate", zone: "Este", deliveryTime: "48-72 horas", status: "active" },
    { name: "Santa Anita", zone: "Este", deliveryTime: "48-72 horas", status: "active" },
    { name: "Chaclacayo", zone: "Este", deliveryTime: "48-72 horas", status: "limited" },
    { name: "Cieneguilla", zone: "Este", deliveryTime: "No disponible", status: "inactive" },
    
    // LIMA SUR
    { name: "Villa María del Triunfo", zone: "Sur", deliveryTime: "48-72 horas", status: "limited" },
    { name: "Villa El Salvador", zone: "Sur", deliveryTime: "48-72 horas", status: "active" },
    { name: "Lurín", zone: "Sur", deliveryTime: "No disponible", status: "inactive" },
    { name: "Pachacamac", zone: "Sur", deliveryTime: "No disponible", status: "inactive" },
    
    // LIMA OESTE
    { name: "Callao", zone: "Oeste", deliveryTime: "24-48 horas", status: "active" },
    { name: "Bellavista", zone: "Oeste", deliveryTime: "24-48 horas", status: "active" },
    { name: "La Perla", zone: "Oeste", deliveryTime: "24-48 horas", status: "active" },
    { name: "Ventanilla", zone: "Oeste", deliveryTime: "48-72 horas", status: "active" },
  ]

  const zones = [
    { name: "Centro", color: "bg-blue-100", textColor: "text-blue-700", borderColor: "border-blue-300" },
    { name: "Norte", color: "bg-green-100", textColor: "text-green-700", borderColor: "border-green-300" },
    { name: "Este", color: "bg-purple-100", textColor: "text-purple-700", borderColor: "border-purple-300" },
    { name: "Sur", color: "bg-orange-100", textColor: "text-orange-700", borderColor: "border-orange-300" },
    { name: "Oeste", color: "bg-red-100", textColor: "text-red-700", borderColor: "border-red-300" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", label: "Disponible" }
      case "limited":
        return { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50", label: "Cobertura limitada" }
      case "inactive":
        return { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", label: "No disponible" }
      default:
        return { icon: AlertCircle, color: "text-gray-600", bg: "bg-gray-50", label: "Consultar" }
    }
  }

  const getZoneColor = (zone: string) => {
    return zones.find(z => z.name === zone) || zones[0]
  }

  const groupedByZone = districts.reduce((acc, district) => {
    const zone = district.zone
    if (!acc[zone]) acc[zone] = []
    acc[zone].push(district)
    return acc
  }, {} as Record<string, typeof districts>)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container py-8 md:py-12">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Cobertura de Delivery
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Conoce nuestras zonas de cobertura en Lima y los tiempos de entrega estimados para tu pedido.
          </p>
        </div>

        {/* INFORMACIÓN GENERAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Entrega Rápida</h3>
                <p className="text-sm text-gray-600">
                  Entregas en 24-48 horas en zonas de cobertura completa
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Múltiples Zonas</h3>
                <p className="text-sm text-gray-600">
                  Cobertura en toda Lima Metropolitana
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Seguimiento</h3>
                <p className="text-sm text-gray-600">
                  Rastreo en tiempo real de tu pedido
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LEYENDA DE ZONAS */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Zonas de Lima</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {zones.map((zone) => (
              <div key={zone.name} className={`${zone.color} ${zone.textColor} rounded-lg p-3 text-center font-medium border ${zone.borderColor}`}>
                {zone.name}
              </div>
            ))}
          </div>
        </div>

        {/* LEYENDA DE ESTADOS */}
        <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Estados de Cobertura</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Disponible - Cobertura completa</span>
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-gray-700">Cobertura limitada - Consultar</span>
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-gray-700">No disponible</span>
            </div>
          </div>
        </div>

        {/* DISTRITOS POR ZONA */}
        <div className="space-y-8">
          {Object.entries(groupedByZone).map(([zone, districtsList]) => {
            const zoneColor = getZoneColor(zone)
            return (
              <div key={zone} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* HEADER DE ZONA */}
                <div className={`${zoneColor.color} ${zoneColor.textColor} px-6 py-4 border-b ${zoneColor.borderColor}`}>
                  <h2 className="text-xl font-semibold">{zone}</h2>
                </div>
                
                {/* LISTADO DE DISTRITOS */}
                <div className="divide-y divide-gray-100">
                  {districtsList.map((district) => {
                    const status = getStatusBadge(district.status)
                    const StatusIcon = status.icon
                    return (
                      <div key={district.name} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                        <div>
                          <h3 className="font-medium text-gray-900">{district.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">Tiempo de entrega: {district.deliveryTime}</p>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {status.label}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
