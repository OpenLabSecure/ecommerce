
import React from 'react'
import { CreditCard, Smartphone, Building2, Wallet, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function PageMetodoPago() {
  const paymentMethods = [
    {
      id: 1,
      icon: CreditCard,
      title: "Tarjeta de Crédito",
      description: "Visa, Mastercard, American Express",
      features: [
        "Pago inmediato",
        "Cuotas disponibles",
        "Protección de comprador",
        "Recompensas y puntos"
      ],
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      processingTime: "Instantáneo"
    },
    {
      id: 2,
      icon: CreditCard,
      title: "Tarjeta de Débito",
      description: "Débito directo de tu cuenta",
      features: [
        "Pago inmediato",
        "Sin intereses",
        "Seguro y confiable",
        "Confirmación instantánea"
      ],
      color: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      processingTime: "Instantáneo"
    },
    {
      id: 3,
      icon: Smartphone,
      title: "Billetera Digital",
      description: "Apple Pay, Google Pay, Samsung Pay",
      features: [
        "Pago rápido y fácil",
        "Máxima seguridad",
        "Datos encriptados",
        "Disponible en móvil"
      ],
      color: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      processingTime: "Instantáneo"
    },
    {
      id: 4,
      icon: Wallet,
      title: "PayPal",
      description: "Pago seguro con tu cuenta PayPal",
      features: [
        "Protección de comprador",
        "Sin compartir datos bancarios",
        "Fácil de usar",
        "Disponible en 190 países"
      ],
      color: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-600",
      processingTime: "1-2 minutos"
    },
    {
      id: 5,
      icon: Building2,
      title: "Transferencia Bancaria",
      description: "Transferencia directa a nuestra cuenta",
      features: [
        "Bajo costo",
        "Seguro",
        "Confirmación por email",
        "Ideal para montos grandes"
      ],
      color: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
      processingTime: "1-3 días hábiles"
    },
    {
      id: 6,
      icon: Wallet,
      title: "Stripe",
      description: "Pago seguro con Stripe",
      features: [
        "Múltiples opciones de pago",
        "Encriptación de nivel bancario",
        "Protección contra fraude",
        "Confirmación instantánea"
      ],
      color: "bg-indigo-50",
      borderColor: "border-indigo-200",
      iconColor: "text-indigo-600",
      processingTime: "Instantáneo"
    }
  ]

  const paymentSteps = [
    {
      number: 1,
      title: "Selecciona tu método",
      description: "Elige el método de pago que prefieras en el checkout"
    },
    {
      number: 2,
      title: "Ingresa tus datos",
      description: "Completa la información requerida de forma segura"
    },
    {
      number: 3,
      title: "Confirma el pago",
      description: "Revisa los detalles y confirma tu transacción"
    },
    {
      number: 4,
      title: "Recibe confirmación",
      description: "Obtén un recibo por email con tu número de pedido"
    }
  ]

  const securityFeatures = [
    {
      icon: Shield,
      title: "Encriptación SSL",
      description: "Todos los datos se transmiten de forma segura"
    },
    {
      icon: CheckCircle,
      title: "Verificación 3D Secure",
      description: "Protección adicional para tarjetas de crédito"
    },
    {
      icon: Clock,
      title: "Procesamiento Rápido",
      description: "Confirmación instantánea en la mayoría de métodos"
    },
    {
      icon: Shield,
      title: "Protección de Fraude",
      description: "Sistemas avanzados de detección de fraude"
    }
  ]

  const faqs = [
    {
      question: "¿Cuál es el método de pago más seguro?",
      answer: "Todos nuestros métodos de pago son seguros. Los más seguros son las billeteras digitales y PayPal, ya que no compartes directamente tus datos bancarios."
    },
    {
      question: "¿Puedo cambiar mi método de pago después de confirmar?",
      answer: "No, una vez confirmado el pago no se puede cambiar. Sin embargo, puedes cancelar y crear un nuevo pedido con otro método."
    },
    {
      question: "¿Cuánto tiempo tarda en procesarse el pago?",
      answer: "La mayoría de métodos son instantáneos. Las transferencias bancarias pueden tomar 1-3 días hábiles."
    },
    {
      question: "¿Qué pasa si mi pago es rechazado?",
      answer: "Recibirás una notificación por email. Puedes intentar nuevamente con el mismo método o elegir otro diferente."
    },
    {
      question: "¿Aceptan pagos internacionales?",
      answer: "Sí, aceptamos pagos internacionales a través de Stripe, PayPal y tarjetas de crédito internacionales."
    },
    {
      question: "¿Cómo recibo el recibo de mi compra?",
      answer: "Recibirás un recibo por email inmediatamente después de confirmar el pago. También puedes descargarlo desde tu cuenta."
    }
  ]

  const paymentComparison = [
    {
      method: "Tarjeta de Crédito",
      speed: "Instantáneo",
      security: "Alta",
      fees: "Sin comisión",
      best: "Compras regulares"
    },
    {
      method: "Tarjeta de Débito",
      speed: "Instantáneo",
      security: "Alta",
      fees: "Sin comisión",
      best: "Control de gastos"
    },
    {
      method: "Billetera Digital",
      speed: "Instantáneo",
      security: "Muy Alta",
      fees: "Sin comisión",
      best: "Compras rápidas"
    },
    {
      method: "PayPal",
      speed: "1-2 min",
      security: "Muy Alta",
      fees: "Sin comisión",
      best: "Protección máxima"
    },
    {
      method: "Transferencia",
      speed: "1-3 días",
      security: "Alta",
      fees: "Sin comisión",
      best: "Montos grandes"
    },
    {
      method: "Stripe",
      speed: "Instantáneo",
      security: "Muy Alta",
      fees: "Sin comisión",
      best: "Múltiples opciones"
    }
  ]

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      {/* HEADER */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Métodos de Pago</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Ofrecemos múltiples opciones de pago seguras y confiables para tu comodidad. 
          Elige el método que mejor se adapte a tus necesidades.
        </p>
      </div>

      {/* MÉTODOS DE PAGO */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Métodos de Pago</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon
            return (
              <div
                key={method.id}
                className={`${method.color} border-2 ${method.borderColor} rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              >
                {/* ICONO */}
                <div className="mb-4">
                  <IconComponent className={`w-12 h-12 ${method.iconColor}`} />
                </div>

                {/* TÍTULO Y DESCRIPCIÓN */}
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {method.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {method.description}
                </p>

                {/* CARACTERÍSTICAS */}
                <div className="border-t border-gray-300 pt-4 mb-4">
                  <ul className="space-y-2">
                    {method.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* TIEMPO DE PROCESAMIENTO */}
                <div className="bg-white bg-opacity-50 rounded px-3 py-2 text-center">
                  <p className="text-xs text-gray-600">Tiempo de procesamiento</p>
                  <p className="font-semibold text-gray-900">{method.processingTime}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* PASOS PARA PAGAR */}
      <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Cómo Pagar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentSteps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Línea conectora */}
              {index < paymentSteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[55%] w-[90%] h-1 bg-gradient-to-r from-blue-400 to-transparent"></div>
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center mb-4 shadow-md">
                  <span className="text-2xl font-bold text-blue-600">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CARACTERÍSTICAS DE SEGURIDAD */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Seguridad en Pagos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="bg-white border-2 border-green-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <IconComponent className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* TABLA COMPARATIVA */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Comparativa de Métodos</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Método</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Velocidad</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Seguridad</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Comisión</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Mejor para</th>
              </tr>
            </thead>
            <tbody>
              {paymentComparison.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50 transition-colors duration-200`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{row.method}</td>
                  <td className="px-4 py-3 text-gray-700">{row.speed}</td>
                  <td className="px-4 py-3 text-gray-700">{row.security}</td>
                  <td className="px-4 py-3 text-gray-700">{row.fees}</td>
                  <td className="px-4 py-3 text-gray-700">{row.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQS */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
