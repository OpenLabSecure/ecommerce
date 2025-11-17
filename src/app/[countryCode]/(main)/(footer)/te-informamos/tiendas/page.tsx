import React from 'react'
import { MapPin, Phone, Clock, Mail, Navigation, Star, Users, Package } from 'lucide-react'

export default function PageTiendas() {
  const stores = [
    {
      id: 1,
      name: "Tienda Centro Lima",
      city: "Lima",
      address: "Avenida Paseo de la República 3500, Centro, Lima, Perú",
      phone: "+51 (1) 2345-6789",
      email: "centro@tienda.com",
      hours: "Lunes a Domingo: 10:00 AM - 9:00 PM",
      coordinates: { lat: -12.0464, lng: -77.0428 },
      image: "🏢",
      rating: 4.8,
      reviews: 324,
      services: ["Atención al Cliente", "Devoluciones", "Consultoría"]
    },
    {
      id: 2,
      name: "Tienda Surquillo",
      city: "Lima",
      address: "Avenida Angamos Este 2500, Surquillo, Lima, Perú",
      phone: "+51 (1) 3456-7890",
      email: "surquillo@tienda.com",
      hours: "Lunes a Domingo: 10:00 AM - 10:00 PM",
      coordinates: { lat: -12.1289, lng: -77.0089 },
      image: "🏬",
      rating: 4.9,
      reviews: 456,
      services: ["Atención al Cliente", "Devoluciones", "Consultoría", "Envoltorio de Regalo"]
    }
  ]

  const storeServices = [
    {
      icon: Users,
      title: "Atención al Cliente",
      description: "Equipo especializado disponible para ayudarte con tus compras"
    },
    {
      icon: Package,
      title: "Devoluciones",
      description: "Procesa tus devoluciones de forma rápida y sencilla"
    },
    {
      icon: Navigation,
      title: "Consultoría",
      description: "Asesoramiento personalizado para encontrar lo que necesitas"
    },
    {
      icon: Clock,
      title: "Horarios Extendidos",
      description: "Abierto de lunes a domingo para tu comodidad"
    }
  ]

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      {/* HEADER */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestras Tiendas</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Visita cualquiera de nuestras tiendas físicas en Lima. 
          Contamos con un equipo dedicado para brindarte la mejor experiencia de compra.
        </p>
      </div>

      {/* SERVICIOS EN TIENDA */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Servicios en Nuestras Tiendas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {storeServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1"
              >
                <IconComponent className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* TIENDAS */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Ubicaciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* ENCABEZADO CON ICONO Y BADGE */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{store.image}</div>
                  <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    {store.rating}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{store.name}</h3>
                <p className="text-blue-100">{store.city}</p>
              </div>

              {/* CONTENIDO */}
              <div className="p-6">
                {/* DIRECCIÓN */}
                <div className="mb-4 flex gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Dirección</p>
                    <p className="text-gray-600">{store.address}</p>
                  </div>
                </div>

                {/* TELÉFONO */}
                <div className="mb-4 flex gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Teléfono</p>
                    <a href={`tel:${store.phone}`} className="text-blue-600 hover:underline">
                      {store.phone}
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="mb-4 flex gap-3">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email</p>
                    <a href={`mailto:${store.email}`} className="text-blue-600 hover:underline">
                      {store.email}
                    </a>
                  </div>
                </div>

                {/* HORARIO */}
                <div className="mb-6 flex gap-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Horario</p>
                    <p className="text-gray-600">{store.hours}</p>
                  </div>
                </div>

                {/* SERVICIOS */}
                <div className="mb-6 border-t pt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Servicios Disponibles</p>
                  <div className="flex flex-wrap gap-2">
                    {store.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BOTÓN DE ACCIÓN */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300">
                  Ver en Mapa
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}