import React from 'react'
import { Mail, Phone, MapPin, Clock, MessageCircle, Globe } from 'lucide-react'

export default function PageCanalesDeAtencion() {
  const channels = [
    {
      id: 1,
      icon: Phone,
      title: "Teléfono",
      description: "Llámanos durante nuestro horario de atención",
      details: "+34 XXX XXX XXX",
      hours: "Lunes a Viernes: 9:00 - 18:00",
      color: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      icon: Mail,
      title: "Correo Electrónico",
      description: "Envíanos tu consulta y te responderemos pronto",
      details: "soporte@tutienda.com",
      hours: "Respuesta en 24-48 horas",
      color: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: 3,
      icon: MessageCircle,
      title: "Chat en Vivo",
      description: "Chatea con nuestro equipo en tiempo real",
      details: "Disponible en el sitio web",
      hours: "Lunes a Viernes: 10:00 - 17:00",
      color: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: 4,
      icon: MapPin,
      title: "Visítanos",
      description: "Ven a conocer nuestras tiendas físicas",
      details: "Calle Principal 123, Ciudad",
      hours: "Lunes a Sábado: 10:00 - 20:00",
      color: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      id: 5,
      icon: Globe,
      title: "Redes Sociales",
      description: "Síguenos en nuestras redes sociales",
      details: "@tutienda",
      hours: "Respuesta en 24 horas",
      color: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      id: 6,
      icon: Clock,
      title: "Formulario de Contacto",
      description: "Completa nuestro formulario de contacto",
      details: "Disponible en línea",
      hours: "Acceso 24/7",
      color: "bg-indigo-50",
      borderColor: "border-indigo-200"
    }
  ]

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      {/* HEADER */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Canales de Atención</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Estamos aquí para ayudarte. Elige el canal de comunicación que mejor se adapte a tus necesidades.
        </p>
      </div>

      {/* GRID DE CANALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {channels.map((channel) => {
          const IconComponent = channel.icon
          return (
            <div
              key={channel.id}
              className={`${channel.color} border-2 ${channel.borderColor} rounded-lg p-6 hover:shadow-lg transition-shadow duration-300`}
            >
              {/* ICONO */}
              <div className="mb-4">
                <IconComponent className="w-10 h-10 text-gray-800" />
              </div>

              {/* TÍTULO */}
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {channel.title}
              </h3>

              {/* DESCRIPCIÓN */}
              <p className="text-sm text-gray-600 mb-4">
                {channel.description}
              </p>

              {/* DETALLES */}
              <div className="space-y-2 border-t border-gray-300 pt-4">
                <p className="font-medium text-gray-800">
                  {channel.details}
                </p>
                <p className="text-xs text-gray-500">
                  {channel.hours}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* SECCIÓN DE INFORMACIÓN ADICIONAL */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Información Importante</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Tiempo de Respuesta</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• <strong>Chat en vivo:</strong> Respuesta inmediata</li>
              <li>• <strong>Teléfono:</strong> Respuesta inmediata</li>
              <li>• <strong>Email:</strong> 24-48 horas</li>
              <li>• <strong>Redes sociales:</strong> 24 horas</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Horario de Atención</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• <strong>Lunes a Viernes:</strong> 9:00 - 18:00</li>
              <li>• <strong>Sábados:</strong> 10:00 - 14:00</li>
              <li>• <strong>Domingos:</strong> Cerrado</li>
              <li>• <strong>Festivos:</strong> Cerrado</li>
            </ul>
          </div>
        </div>
      </div>

      {/* PREGUNTAS FRECUENTES */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {[
            {
              question: "¿Cuál es el mejor canal para contactarme?",
              answer: "Depende de tu urgencia. Para consultas urgentes, usa el chat en vivo o llama por teléfono. Para consultas generales, el email es perfecto."
            },
            {
              question: "¿Atienden los fines de semana?",
              answer: "Sí, nuestras tiendas físicas atienden los sábados de 10:00 a 20:00. El chat en vivo y email funcionan 24/7."
            },
            {
              question: "¿Cuánto tiempo tarda una respuesta por email?",
              answer: "Generalmente respondemos en 24-48 horas hábiles. Durante períodos de alta demanda, puede tomar hasta 72 horas."
            }
          ].map((faq, index) => (
            <details key={index} className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <summary className="font-semibold text-gray-900">
                {faq.question}
              </summary>
              <p className="text-gray-600 mt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </main>
  )
}