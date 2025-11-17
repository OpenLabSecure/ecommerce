
import React from 'react'
import { Shield, CheckCircle2, AlertCircle, FileText } from 'lucide-react'

export default function pageCertificadoGarantia() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container py-8 md:py-12">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Certificado de Garantía
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Información sobre la garantía de nuestros productos y cómo activar tu certificado de garantía.
          </p>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SIDEBAR - NAVEGACIÓN */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contenido</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#que-es" className="text-blue-600 hover:text-blue-700 hover:underline block py-2">
                    ¿Qué es la garantía?
                  </a>
                </li>
                <li>
                  <a href="#cobertura" className="text-blue-600 hover:text-blue-700 hover:underline block py-2">
                    Cobertura de garantía
                  </a>
                </li>
                <li>
                  <a href="#activar" className="text-blue-600 hover:text-blue-700 hover:underline block py-2">
                    Cómo activar
                  </a>
                </li>
                <li>
                  <a href="#exclusiones" className="text-blue-600 hover:text-blue-700 hover:underline block py-2">
                    Exclusiones
                  </a>
                </li>
                <li>
                  <a href="#reclamaciones" className="text-blue-600 hover:text-blue-700 hover:underline block py-2">
                    Proceso de reclamación
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-blue-600 hover:text-blue-700 hover:underline block py-2">
                    Contacto
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* CONTENIDO PRINCIPAL */}
          <div className="lg:col-span-2 space-y-8">
            {/* QUÉ ES LA GARANTÍA */}
            <section id="que-es" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">¿Qué es la garantía?</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    La garantía es un compromiso de Blumin para reparar o reemplazar cualquier producto que presente defectos de fabricación dentro del período especificado. Esta garantía cubre los defectos de material y mano de obra, pero no el desgaste normal por uso.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Todos nuestros productos incluyen garantía estándar desde el momento de la compra. Para acceder a los beneficios completos, es recomendable registrar tu producto en nuestro sistema.
                  </p>
                </div>
              </div>
            </section>

            {/* COBERTURA DE GARANTÍA */}
            <section id="cobertura" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cobertura de garantía</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Laptops y Computadoras</h3>
                      <p className="text-gray-600 mb-2">Garantía de 12 meses desde la fecha de compra</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                        <li>Defectos de fabricación</li>
                        <li>Fallas en componentes internos</li>
                        <li>Problemas de hardware</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Servidores</h3>
                      <p className="text-gray-600 mb-2">Garantía de 24 meses desde la fecha de compra</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                        <li>Defectos de fabricación</li>
                        <li>Fallas en componentes</li>
                        <li>Problemas de rendimiento</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Accesorios</h3>
                      <p className="text-gray-600 mb-2">Garantía de 6 meses desde la fecha de compra</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                        <li>Defectos de fabricación</li>
                        <li>Fallas funcionales</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CÓMO ACTIVAR */}
            <section id="activar" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <FileText className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cómo activar tu garantía</h2>
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">1</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Accede a tu cuenta</h3>
                        <p className="text-gray-600">Inicia sesión en tu cuenta de BLUMIN o crea una nueva si no tienes.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">2</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Ve a "Mis Compras"</h3>
                        <p className="text-gray-600">Busca el producto que deseas registrar en tu historial de compras.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">3</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Registra tu producto</h3>
                        <p className="text-gray-600">Haz clic en "Registrar garantía" e ingresa el número de serie del producto.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">4</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Confirma y descarga</h3>
                        <p className="text-gray-600">Confirma los datos y descarga tu certificado de garantía en PDF.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* EXCLUSIONES */}
            <section id="exclusiones" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Exclusiones de garantía</h2>
                  <p className="text-gray-600 mb-4">La garantía NO cubre:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Daños por caídas, golpes o accidentes</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Daños por líquidos o humedad</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Desgaste normal por uso</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Modificaciones o reparaciones no autorizadas</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Daños por sobrecarga eléctrica</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Consumibles (baterías, tóner, etc.)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Software o problemas de compatibilidad</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Daños por uso indebido o negligencia</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* PROCESO DE RECLAMACIÓN */}
            <section id="reclamaciones" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Proceso de reclamación</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Pasos para hacer una reclamación</h3>
                      <ol className="space-y-2 list-decimal list-inside text-gray-600">
                        <li>Envía un correo electrónico a soporte@blumin.com con tu certificado de garantía</li>
                        <li>Describe el problema con detalle y adjunta fotos si es posible</li>
                        <li>Espera la confirmación de nuestro equipo de soporte</li>
                        <li>Si se acepta la reclamación, recibirás instrucciones para enviar el producto</li>
                        <li>Una vez recibido y evaluado, te devolveremos el producto o te ofreceremos un reemplazo</li>
                      </ol>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Tiempo estimado de resolución</h3>
                      <p className="text-gray-600">
                        El proceso completo suele tomar entre 5 y 10 días hábiles después de recibir el producto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CONTACTO */}
            <section id="contacto" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contacto</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Soporte técnico</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>Email: soporte@blumin.com</li>
                        <li>Teléfono: +51 1 234 5678</li>
                        <li>Horario: Lunes a Viernes, 9:00 - 18:00</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Dirección</h3>
                      <address className="not-italic text-gray-600">
                        Av. Javier Prado Este 1234<br />
                        San Isidro, Lima 15001<br />
                        Perú
                      </address>
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
