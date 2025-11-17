'use client'

import { MessageCircleMore } from 'lucide-react'
import { useState } from 'react'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const phoneNumber = '51991117845'
  const message = 'Hola, me gustaría obtener más información sobre vuestros productos y servicios.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* TOOLTIP */}
      {isHovered && (
        <div className="absolute bottom-20 right-0 bg-gray-900 text-white text-sm rounded-lg px-4 py-2 whitespace-nowrap shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          <p className="font-medium">¿Necesitas ayuda?</p>
          <p className="text-xs text-gray-300">Chatea con nosotros</p>
          <div className="absolute bottom-0 right-4 w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1"></div>
        </div>
      )}

      {/* BOTÓN */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
        aria-label="Contactar por WhatsApp"
        data-testid="whatsapp-button"
      >
        <MessageCircleMore className="w-7 h-7" />
      </a>

      {/* INDICADOR DE ACTIVIDAD (OPCIONAL) */}
      <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
    </div>
  )
}