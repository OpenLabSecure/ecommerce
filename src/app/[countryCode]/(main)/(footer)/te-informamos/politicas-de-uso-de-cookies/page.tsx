
import React from 'react'
import { Cookie, Settings, Shield, Info, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function PoliticasCookiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container py-8 md:py-12">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Política de Uso de Cookies
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Información sobre cómo utilizamos cookies y tecnologías similares en nuestro sitio web.
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
                  <a href="#que-son" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    ¿Qué son las cookies?
                  </a>
                </li>
                <li>
                  <a href="#tipos" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Tipos de cookies
                  </a>
                </li>
                <li>
                  <a href="#usamos" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Cookies que usamos
                  </a>
                </li>
                <li>
                  <a href="#terceros" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Cookies de terceros
                  </a>
                </li>
                <li>
                  <a href="#control" className="text-blue-600 hover:text-blue-700 hover:underline block py-2 text-sm">
                    Control de cookies
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
            {/* QUÉ SON LAS COOKIES */}
            <section id="que-son" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">¿Qué son las cookies?</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (computadora, tablet o teléfono móvil) cuando visitas nuestro sitio web. Estos archivos contienen información que nos permite reconocerte y personalizar tu experiencia de navegación.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Las cookies son una tecnología estándar utilizada por la mayoría de sitios web. No contienen virus ni malware, y no pueden ejecutar programas ni transmitir virus a tu dispositivo.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-sm text-blue-900">
                      <strong>Nota:</strong> Puedes controlar y eliminar las cookies en cualquier momento a través de la configuración de tu navegador.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* TIPOS DE COOKIES */}
            <section id="tipos" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <Settings className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tipos de cookies</h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-purple-600 pl-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Cookies de sesión</h3>
                      <p className="text-gray-600">
                        Se eliminan automáticamente cuando cierras tu navegador. Se utilizan para mantener tu sesión activa mientras navegas por nuestro sitio.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Cookies persistentes</h3>
                      <p className="text-gray-600">
                        Permanecen en tu dispositivo durante un período determinado (días, meses o años). Se utilizan para recordar tus preferencias y datos de inicio de sesión.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Cookies de primera parte</h3>
                      <p className="text-gray-600">
                        Son establecidas por nuestro sitio web. Se utilizan para funcionalidades esenciales y preferencias del usuario.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-600 pl-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Cookies de terceros</h3>
                      <p className="text-gray-600">
                        Son establecidas por sitios web o servicios externos. Se utilizan para análisis, publicidad y redes sociales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* COOKIES QUE USAMOS */}
            <section id="usamos" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies que utilizamos</h2>
                  
                  <div className="space-y-6">
                    {/* COOKIES ESENCIALES */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block w-3 h-3 bg-green-600 rounded-full"></span>
                        <h3 className="font-semibold text-gray-900">Cookies Esenciales (Obligatorias)</h3>
                      </div>
                      <p className="text-gray-600 mb-3">
                        Estas cookies son necesarias para el funcionamiento básico del sitio web. Sin ellas, no podrías navegar correctamente.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">_medusa_session</p>
                            <p className="text-sm text-gray-600">Mantiene tu sesión activa</p>
                          </div>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Sesión</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">cart_id</p>
                            <p className="text-sm text-gray-600">Identifica tu carrito de compras</p>
                          </div>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Persistente</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">country_code</p>
                            <p className="text-sm text-gray-600">Almacena tu país/región seleccionado</p>
                          </div>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Persistente</span>
                        </div>
                      </div>
                    </div>

                    {/* COOKIES DE PREFERENCIAS */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block w-3 h-3 bg-blue-600 rounded-full"></span>
                        <h3 className="font-semibold text-gray-900">Cookies de Preferencias</h3>
                      </div>
                      <p className="text-gray-600 mb-3">
                        Recuerdan tus preferencias y configuraciones para personalizar tu experiencia.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">language</p>
                            <p className="text-sm text-gray-600">Tu idioma preferido</p>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Persistente</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">theme</p>
                            <p className="text-sm text-gray-600">Preferencia de tema (claro/oscuro)</p>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Persistente</span>
                        </div>
                      </div>
                    </div>

                    {/* COOKIES ANALÍTICAS */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block w-3 h-3 bg-yellow-600 rounded-full"></span>
                        <h3 className="font-semibold text-gray-900">Cookies Analíticas</h3>
                      </div>
                      <p className="text-gray-600 mb-3">
                        Nos ayudan a comprender cómo interactúas con nuestro sitio web, mejorando así nuestra experiencia de usuario.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">_ga</p>
                            <p className="text-sm text-gray-600">Google Analytics</p>
                          </div>
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Persistente</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">_gid</p>
                            <p className="text-sm text-gray-600">Google Analytics</p>
                          </div>
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Persistente</span>
                        </div>
                      </div>
                    </div>

                    {/* COOKIES DE SEGURIDAD */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block w-3 h-3 bg-red-600 rounded-full"></span>
                        <h3 className="font-semibold text-gray-900">Cookies de Seguridad</h3>
                      </div>
                      <p className="text-gray-600 mb-3">
                        Protegen tu cuenta y tu información personal contra accesos no autorizados.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">security_token</p>
                            <p className="text-sm text-gray-600">Autenticación segura</p>
                          </div>
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Sesión</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* COOKIES DE TERCEROS */}
            <section id="terceros" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <Shield className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies de terceros</h2>
                  <p className="text-gray-600 mb-4">
                    Algunas funcionalidades de nuestro sitio web están proporcionadas por terceros, quienes pueden establecer sus propias cookies. Estas cookies se utilizan principalmente para:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                    <li>Análisis web (Google Analytics)</li>
                    <li>Publicidad (Google Ads, Facebook Pixel)</li>
                    <li>Redes sociales (Facebook, Twitter, Instagram)</li>
                    <li>Servicios de mapas (Google Maps)</li>
                  </ul>
                  <p className="text-gray-600">
                    Te recomendamos revisar las políticas de privacidad de estos proveedores para obtener información detallada sobre cómo manejan tus datos personales.
                  </p>
                </div>
              </div>
            </section>

            {/* CONTROL DE COOKIES */}
            <section id="control" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Control de cookies</h2>
                  <p className="text-gray-600 mb-4">
                    Puedes controlar y gestionar las cookies a través de la configuración de tu navegador. A continuación te mostramos cómo hacerlo en los navegadores más populares:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Google Chrome</h3>
                      <p className="text-sm text-gray-600">
                        Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Mozilla Firefox</h3>
                      <p className="text-sm text-gray-600">
                        Preferencias → Privacidad y seguridad → Cookies
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Safari</h3>
                      <p className="text-sm text-gray-600">
                        Preferencias → Privacidad → Cookies y datos de sitios
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Microsoft Edge</h3>
                      <p className="text-sm text-gray-600">
                        Configuración → Privacidad, búsqueda y servicios → Cookies
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-900">
                      <strong>Importante:</strong> Al desactivar las cookies, algunas funciones del sitio web pueden dejar de funcionar correctamente.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CONTACTO */}
            <section id="contacto" className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contacto</h2>
                  <p className="text-gray-600 mb-4">
                    Si tienes preguntas sobre nuestra política de cookies o necesitas más información, no dudes en contactarnos:
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> privacy@tuempresa.com
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Teléfono:</span> +34 900 123 456
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Dirección:</span> Calle Ejemplo, 123, 08000 Barcelona
                    </p>
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
