
import React from 'react'
import { RotateCcw, Calendar, Package, AlertCircle, CheckCircle2, Clock, FileText } from 'lucide-react'

export default function PoliticasCambiosDevolucionesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container py-8 md:py-12">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Políticas de Cambios y Devoluciones
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Conoce nuestras políticas de cambio y devolución de productos para garantizar tu satisfacción.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Última actualización: 12 de noviembre de 2025
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
                  <a href="#plazo" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Plazo de devolución
                  </a>
                </li>
                <li>
                  <a href="#condiciones" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Condiciones de cambio
                  </a>
                </li>
                <li>
                  <a href="#proceso" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Proceso de devolución
                  </a>
                </li>
                <li>
                  <a href="#reembolso" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Reembolsos
                  </a>
                </li>
                <li>
                  <a href="#excepciones" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Excepciones
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
            {/* PLAZO DE DEVOLUCIÓN */}
            <section id="plazo" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Plazo de Devolución</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Tienes <strong>30 días calendario</strong> desde la fecha de recepción del producto para solicitar un cambio o devolución, siempre que el artículo se encuentre en condiciones originales.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-blue-900 mb-1">Importante:</p>
                        <p className="text-sm text-blue-800">
                          El plazo comienza desde la fecha de recepción del producto, no desde la fecha de compra. Conserva tu comprobante de entrega.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CONDICIONES DE CAMBIO */}
            <section id="condiciones" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <Package className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Condiciones para Cambios</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Para que tu solicitud de cambio sea válida, el producto debe cumplir con los siguientes requisitos:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Empaque original intacto</p>
                        <p className="text-sm text-gray-600">El producto debe estar en su empaque original sin abrir o dañado.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Sin uso</p>
                        <p className="text-sm text-gray-600">El artículo no debe haber sido utilizado, probado o instalado.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Accesorios completos</p>
                        <p className="text-sm text-gray-600">Todos los accesorios, cables y documentación deben estar incluidos.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Etiquetas intactas</p>
                        <p className="text-sm text-gray-600">Las etiquetas de precio y código de barras deben estar presentes y legibles.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Comprobante de compra</p>
                        <p className="text-sm text-gray-600">Debes presentar el comprobante de compra (boleta o factura).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PROCESO DE DEVOLUCIÓN */}
            <section id="proceso" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <FileText className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Proceso de Devolución</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Sigue estos pasos para realizar tu devolución:
                  </p>

                  <div className="space-y-4">
                    {/* PASO 1 */}
                    <div className="border-l-4 border-green-600 pl-4 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full font-bold text-sm">1</span>
                        <h3 className="font-semibold text-gray-900">Contacta con nuestro equipo</h3>
                      </div>
                      <p className="text-gray-600 text-sm ml-11">
                        Envía un correo a <strong>servicioalcliente@blumin.com</strong> o llama al <strong>+51 991117845</strong> indicando el motivo de la devolución.
                      </p>
                    </div>

                    {/* PASO 2 */}
                    <div className="border-l-4 border-green-600 pl-4 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full font-bold text-sm">2</span>
                        <h3 className="font-semibold text-gray-900">Recibe autorización</h3>
                      </div>
                      <p className="text-gray-600 text-sm ml-11">
                        Nuestro equipo revisará tu solicitud y te enviará una autorización de devolución con instrucciones de envío.
                      </p>
                    </div>

                    {/* PASO 3 */}
                    <div className="border-l-4 border-green-600 pl-4 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full font-bold text-sm">3</span>
                        <h3 className="font-semibold text-gray-900">Prepara el envío</h3>
                      </div>
                      <p className="text-gray-600 text-sm ml-11">
                        Empaca el producto en su embalaje original junto con todos los accesorios y documentación.
                      </p>
                    </div>

                    {/* PASO 4 */}
                    <div className="border-l-4 border-green-600 pl-4 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full font-bold text-sm">4</span>
                        <h3 className="font-semibold text-gray-900">Envía el paquete</h3>
                      </div>
                      <p className="text-gray-600 text-sm ml-11">
                        Utiliza el servicio de mensajería que indique la autorización y envía el paquete a la dirección proporcionada.
                      </p>
                    </div>

                    {/* PASO 5 */}
                    <div className="border-l-4 border-green-600 pl-4 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full font-bold text-sm">5</span>
                        <h3 className="font-semibold text-gray-900">Recepción y procesamiento</h3>
                      </div>
                      <p className="text-gray-600 text-sm ml-11">
                        Una vez recibido el paquete, nuestro equipo lo revisará y procesará tu solicitud de devolución o cambio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* REEMBOLSOS */}
            <section id="reembolso" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Reembolsos</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Los reembolsos se procesan dentro de los <strong>5 a 10 días hábiles</strong> posteriores a la recepción del producto devuelto, una vez verificado que cumple con las condiciones establecidas.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-yellow-900 mb-1">Método de reembolso:</p>
                        <p className="text-sm text-yellow-800">
                          El reembolso se realizará al mismo medio de pago utilizado en la compra original. En caso de haber usado múltiples medios, se reembolsará proporcionalmente.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* EXCEPCIONES */}
            <section id="excepciones" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Excepciones</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    No se aceptan devoluciones ni cambios de los siguientes productos:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Productos personalizados</p>
                        <p className="text-sm text-gray-600">Artículos fabricados bajo especificaciones personalizadas.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Productos usados o dañados</p>
                        <p className="text-sm text-gray-600">Artículos que hayan sido utilizados, instalados o presenten daños por uso.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Productos sin empaque original</p>
                        <p className="text-sm text-gray-600">Artículos que no estén en su embalaje original o que hayan sido abiertos.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Accesorios faltantes</p>
                        <p className="text-sm text-gray-600">Productos que no incluyan todos sus accesorios o documentación.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CONTACTO */}
            <section id="contacto" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Tienes alguna pregunta?</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Si tienes dudas sobre nuestras políticas de cambio y devolución, no dudes en contactarnos:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">📧</span>
                      <div>
                        <p className="font-semibold text-gray-900">Correo electrónico</p>
                        <p className="text-sm text-gray-600">servicioalcliente@blumin.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">📞</span>
                      <div>
                        <p className="font-semibold text-gray-900">Teléfono</p>
                        <p className="text-sm text-gray-600">+51 991117845</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">🕒</span>
                      <div>
                        <p className="font-semibold text-gray-900">Horario de atención</p>
                        <p className="text-sm text-gray-600">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
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
