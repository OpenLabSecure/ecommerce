// app/privacy-policy/page.tsx
import React from "react";

export const metadata = {
  title: "Política de Privacidad | Mi Sitio Web",
  description: "Lee nuestra política de privacidad para conocer cómo manejamos tus datos personales.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      <p className="mb-4">
        En <strong>Mi Sitio Web</strong>, valoramos tu privacidad y nos
        comprometemos a proteger tu información personal. Esta política explica
        cómo recopilamos, usamos y protegemos tus datos.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Información que recopilamos</h2>
      <p className="mb-4">
        Podemos recopilar información personal como nombre, correo electrónico,
        dirección IP y datos de navegación cuando usas nuestros servicios.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Uso de la información</h2>
      <p className="mb-4">
        Utilizamos tu información para mejorar la experiencia del usuario,
        enviar comunicaciones importantes y garantizar la seguridad de nuestros
        servicios.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Compartir información</h2>
      <p className="mb-4">
        No compartimos tu información personal con terceros, salvo cuando sea
        necesario para cumplir con la ley o proporcionar nuestros servicios.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Seguridad de los datos</h2>
      <p className="mb-4">
        Implementamos medidas de seguridad técnicas y organizativas para
        proteger tus datos contra el acceso no autorizado o el uso indebido.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Tus derechos</h2>
      <p className="mb-4">
        Puedes solicitar acceso, corrección o eliminación de tus datos
        personales contactándonos a través del correo:{" "}
        <a href="mailto:privacidad@misitio.com" className="text-blue-600 underline">
          privacidad@misitio.com
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Cambios a esta política</h2>
      <p className="mb-4">
        Nos reservamos el derecho de actualizar esta política de privacidad en
        cualquier momento. Te notificaremos mediante nuestro sitio web cuando
        realicemos cambios significativos.
      </p>

      <p className="mt-10 text-sm text-gray-500">
        Última actualización: 12 de noviembre de 2025
      </p>
    </main>
  );
}
