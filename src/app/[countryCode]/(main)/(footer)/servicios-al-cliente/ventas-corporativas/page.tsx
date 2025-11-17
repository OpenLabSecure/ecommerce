
import React from 'react'
import { Building2, Users, TrendingUp, FileText, Mail, Phone, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function VentasCorporativasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container py-8 md:py-12">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ventas Corporativas
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Soluciones especializadas para empresas, instituciones y organizaciones que buscan equipamiento tecnológico de calidad con precios competitivos.
          </p>
        </div>

        {/* LAYOUT CON SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR - NAVEGACIÓN */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contenido</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#beneficios" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Beneficios
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Nuestros Servicios
                  </a>
                </li>
                <li>
                  <a href="#proceso" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Proceso de Compra
                  </a>
                </li>
                <li>
                  <a href="#productos" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Productos Disponibles
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Contacto
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* CONTENIDO PRINCIPAL */}
          <div className="lg:col-span-3 space-y-8">
            {/* INTRODUCCIÓN */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                En Blumin entendemos las necesidades específicas de las empresas. Ofrecemos soluciones corporativas personalizadas con precios especiales, facilidades de pago y un servicio dedicado para asegurar que tu organización cuente con la mejor tecnología.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Ya sea que necesites equipamiento para una pequeña oficina o una gran institución, contamos con la experiencia y los recursos para atender tu solicitud.
              </p>
            </section>

            {/* BENEFICIOS */}
            <section id="beneficios" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Beneficios Corporativos</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* BENEFICIO 1 */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-gray-900">Precios Especiales</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Descuentos por volumen y tarifas corporativas personalizadas según el monto y cantidad de productos.
                  </p>
                </div>

                {/* BENEFICIO 2 */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-gray-900">Facilidades de Pago</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Opciones de crédito, planes de financiamiento y términos de pago adaptados a tu flujo de caja.
                  </p>
                </div>

                {/* BENEFICIO 3 */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-gray-900">Asesoría Especializada</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Equipo dedicado para asesorarte en la selección de productos según tus necesidades específicas.
                  </p>
                </div>

                {/* BENEFICIO 4 */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-gray-900">Entrega Programada</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Coordinamos entregas según tu calendario y disponibilidad, incluyendo instalación si lo requieres.
                  </p>
                </div>

                {/* BENEFICIO 5 */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-gray-900">Garantía Extendida</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Opciones de garantía extendida y soporte técnico prioritario para tu tranquilidad.
                  </p>
                </div>

                {/* BENEFICIO 6 */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-gray-900">Facturación Flexible</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Emisión de facturas electrónicas y documentación contable según tus requerimientos.
                  </p>
                </div>
              </div>
            </section>

            {/* NUESTROS SERVICIOS */}
            <section id="servicios" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Nuestros Servicios</h2>
              </div>

              <div className="space-y-4">
                {/* SERVICIO 1 */}
                <div className="border-l-4 border-purple-600 pl-6 py-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Asesoría de Equipamiento</h3>
                  <p className="text-gray-600 text-sm">
                    Análisis de tus necesidades y recomendación de soluciones tecnológicas óptimas para tu empresa.
                  </p>
                </div>

                {/* SERVICIO 2 */}
                <div className="border-l-4 border-purple-600 pl-6 py-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Cotizaciones Personalizadas</h3>
                  <p className="text-gray-600 text-sm">
                    Presupuestos detallados con opciones de configuración y precios especiales según volumen.
                  </p>
                </div>

                {/* SERVICIO 3 */}
                <div className="border-l-4 border-purple-600 pl-6 py-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Instalación y Configuración</h3>
                  <p className="text-gray-600 text-sm">
                    Servicio de instalación, configuración inicial y capacitación en el uso de equipos.
                  </p>
                </div>

                {/* SERVICIO 4 */}
                <div className="border-l-4 border-purple-600 pl-6 py-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Soporte Técnico Dedicado</h3>
                  <p className="text-gray-600 text-sm">
                    Línea de soporte prioritaria y equipo técnico disponible para resolver tus consultas.
                  </p>
                </div>

                {/* SERVICIO 5 */}
                <div className="border-l-4 border-purple-600 pl-6 py-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Mantenimiento Preventivo</h3>
                  <p className="text-gray-600 text-sm">
                    Planes de mantenimiento y actualización de equipos para
                  </p>
                </div>
              </div>
            </section>

            {/* PROCESO DE COMPRA */}
            <section id="proceso" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Proceso de Compra</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PASO 1 */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Solicitud de Información</h3>
                  <p className="text-gray-600 text-sm">
                    Contáctanos con tus necesidades y requerimientos específicos.
                  </p>
                </div>

                {/* PASO 2 */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Análisis y Asesoría</h3>
                  <p className="text-gray-600 text-sm">
                    Evaluamos tus necesidades y te recomendamos las mejores soluciones.
                  </p>
                </div>

                {/* PASO 3 */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Confirmación y Entrega</h3>
                  <p className="text-gray-600 text-sm">
                    Confirmamos la cotización y coordinamos la entrega programada.
                  </p>
                </div>
              </div>
            </section>

            {/* PRODUCTOS DISPONIBLES */}
            <section id="productos" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <ArrowRight className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Productos Disponibles</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Computadoras de Escritorio</h3>
                  <p className="text-gray-600 text-sm">
                    Equipos de última generación para oficinas y centros de cómputo.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Laptops Empresariales</h3>
                  <p className="text-gray-600 text-sm">
                    Portátiles con garantía extendida y soporte técnico especializado.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Impresoras y Multifuncionales</h3>
                  <p className="text-gray-600 text-sm">
                    Soluciones de impresión eficientes para entornos corporativos.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Accesorios y Periféricos</h3>
                  <p className="text-gray-600 text-sm">
                    Teclados, ratones, auriculares y otros accesorios de calidad.
                  </p>
                </div>
              </div>
            </section>

            {/* CONTACTO */}
            <section id="contacto" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <Mail className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">Contacto</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Envíanos un mensaje</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="tu@empresa.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                        Mensaje
                      </label>
                      <textarea
                        id="mensaje"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Cuéntanos sobre tus necesidades..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Enviar Mensaje
                    </button>
                  </form>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Información de Contacto</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Teléfono</p>
                        <p className="text-gray-600 text-sm">+52 (55) 1234-5678</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Correo Electrónico</p>
                        <p className="text-gray-600 text-sm">ventas@blumin.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Chat en Vivo</p>
                        <p className="text-gray-600 text-sm">Disponible de lunes a viernes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
