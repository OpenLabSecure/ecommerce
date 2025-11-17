import React from 'react'
import { Users, Target, Heart, Zap, Award, Globe, TrendingUp, CheckCircle } from 'lucide-react'

export default function PageQuienesSomos() {
  const teamMembers = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      role: "Fundador & CEO",
      image: "👨‍💼",
      bio: "Emprendedor con 15 años de experiencia en e-commerce"
    },
    {
      id: 2,
      name: "María García",
      role: "Directora de Operaciones",
      image: "👩‍💼",
      bio: "Especialista en logística y gestión de inventario"
    },
    {
      id: 3,
      name: "Juan López",
      role: "Director de Tecnología",
      image: "👨‍💻",
      bio: "Ingeniero de software con expertise en plataformas de comercio"
    },
    {
      id: 4,
      name: "Ana Martínez",
      role: "Directora de Atención al Cliente",
      image: "👩‍💼",
      bio: "Apasionada por brindar la mejor experiencia al cliente"
    }
  ]

  const values = [
    {
      icon: Heart,
      title: "Pasión por el Cliente",
      description: "Tu satisfacción es nuestra prioridad número uno. Trabajamos cada día para superar tus expectativas."
    },
    {
      icon: Target,
      title: "Excelencia",
      description: "Nos comprometemos con la calidad en cada aspecto de nuestro negocio, desde productos hasta servicio."
    },
    {
      icon: Zap,
      title: "Innovación",
      description: "Constantemente buscamos nuevas formas de mejorar tu experiencia de compra con tecnología de punta."
    },
    {
      icon: Globe,
      title: "Sostenibilidad",
      description: "Nos preocupamos por el medio ambiente y trabajamos con proveedores responsables."
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Creemos en construir relaciones duraderas con nuestros clientes y socios."
    },
    {
      icon: Award,
      title: "Integridad",
      description: "Operamos con transparencia y honestidad en todas nuestras transacciones y relaciones."
    }
  ]

  const milestones = [
    {
      year: "2015",
      title: "Fundación",
      description: "Iniciamos nuestra aventura en el comercio electrónico con una pequeña tienda online"
    },
    {
      year: "2017",
      title: "Primer Millón",
      description: "Alcanzamos el primer millón en ventas y expandimos nuestro equipo"
    },
    {
      year: "2019",
      title: "Expansión Regional",
      description: "Abrimos operaciones en 5 países diferentes de América Latina"
    },
    {
      year: "2021",
      title: "Certificación ISO",
      description: "Obtuvimos certificación ISO 9001 por nuestros estándares de calidad"
    },
    {
      year: "2023",
      title: "Transformación Digital",
      description: "Implementamos tecnología AI para mejorar la experiencia del cliente"
    },
    {
      year: "2024",
      title: "Hoy",
      description: "Servimos a más de 500,000 clientes satisfechos en toda la región"
    }
  ]

  const achievements = [
    {
      number: "500K+",
      label: "Clientes Satisfechos",
      icon: "😊"
    },
    {
      number: "2M+",
      label: "Productos Vendidos",
      icon: "📦"
    },
    {
      number: "98%",
      label: "Satisfacción del Cliente",
      icon: "⭐"
    },
    {
      number: "24/7",
      label: "Soporte Disponible",
      icon: "🎧"
    }
  ]

  const commitments = [
    {
      title: "Calidad Garantizada",
      description: "Todos nuestros productos pasan por rigurosos controles de calidad antes de llegar a ti."
    },
    {
      title: "Precios Competitivos",
      description: "Ofrecemos los mejores precios del mercado sin comprometer la calidad."
    },
    {
      title: "Envío Rápido",
      description: "Entregamos tus pedidos en el menor tiempo posible con rastreo en tiempo real."
    },
    {
      title: "Atención Personalizada",
      description: "Nuestro equipo está disponible para resolver cualquier duda o inconveniente."
    },
    {
      title: "Devoluciones Fáciles",
      description: "Si no estás satisfecho, tienes 30 días para devolver tu compra sin preguntas."
    },
    {
      title: "Seguridad Total",
      description: "Tus datos y transacciones están protegidos con encriptación de nivel bancario."
    }
  ]

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      {/* HEADER HERO */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Quiénes Somos</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Somos una empresa de comercio electrónico dedicada a ofrecer productos de calidad 
          con la mejor experiencia de compra. Nuestra misión es hacer el comercio en línea 
          accesible, seguro y satisfactorio para todos.
        </p>
      </div>

      {/* SECCIÓN DE MISIÓN, VISIÓN Y VALORES */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* MISIÓN */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Nuestra Misión</h2>
          <p className="text-gray-700 leading-relaxed">
            Proporcionar a nuestros clientes una experiencia de compra en línea segura, 
            confiable y satisfactoria, ofreciendo productos de calidad a precios competitivos 
            con un servicio al cliente excepcional.
          </p>
        </div>

        {/* VISIÓN */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-green-900">Nuestra Visión</h2>
          <p className="text-gray-700 leading-relaxed">
            Ser la plataforma de comercio electrónico más confiable y preferida de la región, 
            reconocida por nuestra calidad, innovación y compromiso con la satisfacción del cliente.
          </p>
        </div>

        {/* VALORES */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-900">Nuestros Valores</h2>
          <p className="text-gray-700 leading-relaxed">
            Integridad, excelencia, innovación, sostenibilidad y pasión por el cliente. 
            Estos valores guían cada decisión que tomamos y cada acción que realizamos.
          </p>
        </div>
      </section>

      {/* LOGROS Y ESTADÍSTICAS */}
      <section className="mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-12 text-white">
        <h2 className="text-3xl font-bold mb-12 text-center">Nuestros Logros</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl mb-3">{achievement.icon}</div>
              <p className="text-4xl font-bold mb-2">{achievement.number}</p>
              <p className="text-blue-100">{achievement.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALORES PRINCIPALES */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Valores Principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="mb-4">
                  <IconComponent className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* LÍNEA DE TIEMPO */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Nuestra Historia</h2>
        <div className="relative">
          {/* Línea vertical central */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-600"></div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Contenido */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <span className="inline-block bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-4">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                {/* Punto de la línea de tiempo */}
                <div className="hidden md:block w-1/2 flex justify-center">
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPROMISOS CON EL CLIENTE */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Compromisos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commitments.map((commitment, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
            >
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {commitment.title}
              </h3>
              <p className="text-gray-600">
                {commitment.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EQUIPO */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-6xl mb-4">{member.image}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
