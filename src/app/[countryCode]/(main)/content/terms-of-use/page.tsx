// app/terms/page.tsx
import React from "react";

export const metadata = {
  title: "Términos y Condiciones | Mi Sitio Web",
  description:
    "Lee los términos y condiciones de uso de nuestro sitio, incluidas obligaciones, limitaciones de responsabilidad y derechos del usuario.",
};

const sections = [
  { id: "aceptacion", label: "1. Aceptación de los términos" },
  { id: "uso-permitido", label: "2. Uso permitido" },
  { id: "cuentas", label: "3. Cuentas y seguridad" },
  { id: "propiedad", label: "4. Propiedad intelectual" },
  { id: "privacidad", label: "5. Privacidad y datos" },
  { id: "pagos", label: "6. Pagos y facturación" },
  { id: "responsabilidad", label: "7. Limitación de responsabilidad" },
  { id: "prohibiciones", label: "8. Conductas prohibidas" },
  { id: "terminacion", label: "9. Terminación" },
  { id: "cambios", label: "10. Cambios a estos términos" },
  { id: "contacto", label: "11. Contacto" },
];

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Términos y Condiciones de Uso
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Última actualización: 12 de noviembre de 2025
        </p>
      </header>

      {/* Layout responsive: índice arriba en móvil, sidebar en desktop */}
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Índice (mobile-first) */}
        <nav
          aria-label="Índice de secciones"
          className="rounded-xl border border-gray-200 p-4 lg:sticky lg:top-8 lg:h-fit"
        >
          <h2 className="text-base font-semibold mb-3">Contenido</h2>
          <ul className="space-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contenido */}
        <article className="prose prose-gray max-w-none prose-headings:scroll-mt-24">
          <section id="aceptacion">
            <h2>1. Aceptación de los términos</h2>
            <p>
              Al acceder o utilizar <strong>Mi Sitio Web</strong> (“el
              Servicio”), aceptas quedar vinculado por estos Términos y
              Condiciones (“Términos”). Si no estás de acuerdo, no utilices el
              Servicio.
            </p>
          </section>

          <section id="uso-permitido">
            <h2>2. Uso permitido</h2>
            <p>
              Te comprometes a usar el Servicio de forma legal y conforme a
              estos Términos. No podrás interferir con su funcionamiento ni
              acceder a áreas o sistemas no autorizados.
            </p>
          </section>

          <section id="cuentas">
            <h2>3. Cuentas y seguridad</h2>
            <ul>
              <li>Eres responsable de mantener la confidencialidad de tus credenciales.</li>
              <li>Debes notificarnos de inmediato sobre cualquier uso no autorizado.</li>
              <li>Podemos suspender o cerrar cuentas que infrinjan estos Términos.</li>
            </ul>
          </section>

          <section id="propiedad">
            <h2>4. Propiedad intelectual</h2>
            <p>
              El contenido, marcas, logotipos y software del Servicio están
              protegidos por derechos de propiedad intelectual. No se concede
              licencia alguna salvo lo expresamente permitido.
            </p>
          </section>

          <section id="privacidad">
            <h2>5. Privacidad y datos</h2>
            <p>
              El uso del Servicio también se rige por nuestra{" "}
              <a href="/privacy-policy">Política de Privacidad</a>. Al usar el
              Servicio, aceptas nuestras prácticas de tratamiento de datos.
            </p>
          </section>

          <section id="pagos">
            <h2>6. Pagos y facturación</h2>
            <p>
              Cuando corresponda, los cobros se realizarán según los precios
              vigentes y condiciones mostradas durante la compra. Los impuestos
              aplicables se calcularán según la normativa vigente.
            </p>
          </section>

          <section id="responsabilidad">
            <h2>7. Limitación de responsabilidad</h2>
            <p>
              En la medida máxima permitida por la ley, <strong>Mi Sitio Web</strong>{" "}
              no será responsable por daños indirectos, incidentales, especiales
              o consecuentes derivados del uso o imposibilidad de uso del
              Servicio.
            </p>
          </section>

          <section id="prohibiciones">
            <h2>8. Conductas prohibidas</h2>
            <ul>
              <li>Intentar evadir medidas de seguridad.</li>
              <li>Usar el Servicio para actividades ilegales o fraudulentas.</li>
              <li>Realizar scraping o minería de datos no autorizada.</li>
              <li>Introducir malware, bots o automatizaciones no permitidas.</li>
            </ul>
          </section>

          <section id="terminacion">
            <h2>9. Terminación</h2>
            <p>
              Podemos suspender o terminar tu acceso al Servicio si incumples
              estos Términos o por razones operativas, técnicas o legales. Al
              terminar, cesan los derechos otorgados por estos Términos.
            </p>
          </section>

          <section id="cambios">
            <h2>10. Cambios a estos términos</h2>
            <p>
              Podemos actualizar estos Términos en cualquier momento. Cuando los
              cambios sean significativos, procuraremos notificarlo mediante el
              Servicio. La continuación del uso implica aceptación de los
              cambios.
            </p>
          </section>

          <section id="contacto">
            <h2>11. Contacto</h2>
            <p>
              Si tienes dudas sobre estos Términos, escríbenos a{" "}
              <a
                className="break-words"
                href="mailto:legal@misitio.com"
              >
                legal@misitio.com
              </a>.
            </p>
          </section>

          <hr />
          <p className="text-sm text-gray-500">
            Estos Términos son un ejemplo genérico y deben adaptarse a tu
            negocio y jurisdicción. Considera asesoría legal profesional.
          </p>
        </article>
      </div>
    </main>
  );
}
