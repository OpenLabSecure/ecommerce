import React from 'react'
import { Shield, Lock, Truck, RotateCcw, CreditCard, CheckCircle, Zap, Eye } from 'lucide-react'
import Link from 'next/link'
export default function PageCompraFacilYSeguro() {
  const securityFeatures = [
    {
      id: 1,
      icon: Lock,
      title: "Encriptación SSL",
      description: "Todos tus datos están protegidos con encriptación de nivel bancario",
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      icon: Shield,
      title: "Compra Protegida",
      description: "Garantía de protección en todas tus compras con nosotros",
      color: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      icon: CreditCard,
      title: "Métodos de Pago Seguros",
      description: "Aceptamos las principales tarjetas de crédito y billeteras digitales",
      color: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      id: 4,
      icon: Truck,
      title: "Envío Seguro",
      description: "Rastreo en tiempo real y seguros de envío incluidos",
      color: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600"
    },
    {
      id: 5,
      icon: RotateCcw,
      title: "Devoluciones Fáciles",
      description: "30 días para devolver tu compra sin hacer preguntas",
      color: "bg-pink-50",
      borderColor: "border-pink-200",
      iconColor: "text-pink-600"
    },
    {
      id: 6,
      icon: Eye,
      title: "Privacidad Garantizada",
      description: "Nunca compartimos tus datos personales con terceros",
      color: "bg-indigo-50",
      borderColor: "border-indigo-200",
      iconColor: "text-indigo-600"
    }
  ]

  const easySteps = [
    {
      number: 1,
      title: "Explora",
      description: "Navega por nuestro catálogo y encuentra lo que buscas"
    },
    {
      number: 2,
      title: "Agrega al Carrito",
      description: "Selecciona cantidad y añade a tu carrito de compras"
    },
    {
      number: 3,
      title: "Checkout",
      description: "Completa tus datos de envío y facturación"
    },
    {
      number: 4,
      title: "Paga",
      description: "Elige tu método de pago preferido de forma segura"
    },
    {
      number: 5,
      title: "Confirma",
      description: "Recibe confirmación por email con tu número de pedido"
    },
    {
      number: 6,
      title: "Recibe",
      description: "Tu pedido llega en tu domicilio con rastreo"
    }
  ]

  const paymentMethods = [
    { name: "Tarjeta de Crédito", icon: "💳" },
    { name: "Tarjeta de Débito", icon: "🏦" },
    { name: "PayPal", icon: "🅿️" },
    { name: "Stripe", icon: "💰" },
    { name: "Transferencia Bancaria", icon: "🔄" },
    { name: "Billetera Digital", icon: "📱" }
  ]

  const guarantees = [
    {
      title: "Garantía de Satisfacción",
      description: "Si no estás satisfecho, te devolvemos tu dinero en 100%"
    },
    {
      title: "Garantía de Seguridad",
      description: "Tus datos están protegidos con los estándares más altos"
    },
    {
      title: "Garantía de Entrega",
      description: "Si no recibes tu pedido, te lo reembolsamos o reenviamos"
    },
    {
      title: "Garantía de Privacidad",
      description: "Tus datos nunca serán vendidos o compartidos"
    }
  ]

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      {/* HEADER */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Compra Fácil y Seguro</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          En nuestra tienda, tu seguridad y satisfacción son nuestras prioridades. 
          Disfruta de una experiencia de compra confiable y sin preocupaciones.
        </p>
      </div>

      {/* SECCIÓN DE CARACTERÍSTICAS DE SEGURIDAD */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Características de Seguridad</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature) => {
            const IconComponent = feature.icon
            return (
              <div
                key={feature.id}
                className={`${feature.color} border-2 ${feature.borderColor} rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="mb-4">
                  <IconComponent className={`w-12 h-12 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* SECCIÓN DE PASOS FÁCILES */}
      <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-12 text-center">6 Pasos Simples para Comprar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {easySteps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Línea conectora (solo en desktop) */}
              {index < easySteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-1 bg-gradient-to-r from-blue-400 to-transparent"></div>
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center mb-4 shadow-md">
                  <span className="text-3xl font-bold text-blue-600">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MÉTODOS DE PAGO */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Métodos de Pago Aceptados</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center hover:border-blue-500 hover:shadow-md transition-all duration-300"
            >
              <div className="text-4xl mb-2">{method.icon}</div>
              <p className="text-sm font-medium text-gray-700">{method.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GARANTÍAS */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestras Garantías</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white border-l-4 border-green-500 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {guarantee.title}
                  </h3>
                  <p className="text-gray-600">
                    {guarantee.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE CERTIFICACIONES */}
      <section className="mb-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Certificaciones y Estándares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "SSL Certificado", icon: "🔐" },
            { title: "PCI DSS Compliant", icon: "✅" },
            { title: "GDPR Compliant", icon: "📋" },
            { title: "Verificado por Terceros", icon: "🏅" }
          ].map((cert, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl mb-3">{cert.icon}</div>
              <p className="font-semibold text-gray-900">{cert.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              question: "¿Es seguro comprar en tu tienda?",
              answer: "Sí, utilizamos encriptación SSL de nivel bancario y cumplimos con los estándares PCI DSS. Tus datos están completamente protegidos."
            },
            {
              question: "¿Cuáles son los métodos de pago disponibles?",
              answer: "Aceptamos tarjetas de crédito, débito, PayPal, Stripe, transferencias bancarias y billeteras digitales."
            },
            {
              question: "¿Puedo devolver mi compra?",
              answer: "Sí, tienes 30 días para devolver cualquier producto sin hacer preguntas. El reembolso se procesa en 5-7 días hábiles."
            },
            {
              question: "¿Cómo puedo rastrear mi pedido?",
              answer: "Recibirás un número de seguimiento por email. Puedes usarlo para rastrear tu pedido en tiempo real."
            },
            {
              question: "¿Mis datos personales son privados?",
              answer: "Absolutamente. Nunca compartimos tus datos con terceros. Cumplimos con GDPR y todas las leyes de privacidad."
            },
            {
              question: "¿Qué pasa si mi pedido no llega?",
              answer: "Si tu pedido no llega en el tiempo estimado, te ofrecemos un reembolso completo o un reenvío gratuito."
            }
          ].map((faq, index) => (
            <details
              key={index}
              className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <summary className="font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                {faq.question}
              </summary>
              <p className="text-gray-600 mt-3 ml-7">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">¿Listo para comprar?</h2>
        <p className="text-lg mb-6 opacity-90">
          Comienza tu experiencia de compra segura hoy mismo
        </p>
        <button  className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <Link href="/store">Ir a la Tienda</Link>
        </button>
      </div>
    </main>
  )
}