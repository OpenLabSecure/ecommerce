import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Logo } from "@modules/common/components/logo"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react"

export default async function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Contáctanos",
      isContact: true,
      links: [
        {
          label: "Atención por WhatsApp",
          href: "https://wa.me/51991117845",
          icon: MessageCircle,
          external: true,
        },
        {
          label: "+51 991117845",
          href: "tel:+51991117845",
          icon: Phone,
        },
        {
          label: "Lun-Sab 9:00am a 6:00pm",
          href: "#",
          icon: Clock,
        },
        {
          label: "servicioalcliente@blumin.com",
          href: "mailto:servicioalcliente@blumin.com",
          icon: Mail,
        },
        {
          label: "gerenciassac@blumin.com",
          href: "mailto:gerenciassac@blumin.com",
          icon: Mail,
        },
      ],
    },
    {
      title: "Sobre nosotros",
      links: [
        { label: "¿Quienes somos?", href: "/sobre-nosotros/quienes-somos" },
        { label: "Canales de atención", href: "/sobre-nosotros/canales-de-atencion" },
        { label: "Compra fácil y seguro", href: "/sobre-nosotros/compra-facil-y-seguro" },
        { label: "Métodos de pago", href: "/sobre-nosotros/metodos-de-pago" },
      ],
    },
    {
      title: "Te informamos",
      links: [
        { label: "Nuestras tiendas", href: "/te-informamos/tiendas" },
        { label: "Cobertura de delivery", href: "/te-informamos/delivery" },
        { label: "Certificado de garantía", href: "/te-informamos/certificado-garantia" },
        { label: "Términos y condiciones", href: "/content/terms-of-use" },
        { label: "Políticas de privacidad", href: "/content/privacy-policy" },
        { label: "Políticas de uso de cookies", href: "/te-informamos/politicas-de-uso-de-cookies" },
        { label: "Políticas de cambios y devoluciones", href: "/te-informamos/politicas-de-cambios-y-devoluciones" },
      ],
    },
    {
      title: "Servicios al cliente",
      links: [
        { label: "Ventas corporativas", href: "/servicios-al-cliente/ventas-corporativas" },
        { label: "Disponibilidad de productos", href: "#" },
      ],
    },
    {
      title: "Destacados",
      links: [
        { label: "Mis compras", href: "#" },
        { label: "Mundo Laptop", href: "/results?q=laptop" },
        { label: "Mundo Servidores", href: "#" },
      ],
    },
  ]

  return (
    <footer className="border-t border-ui-border-base w-full bg-white">
      <div className="content-container flex flex-col w-full">
        {/* SECCIÓN PRINCIPAL */}
        <div className="w-full py-8 md:py-12">
          {/* LOGO Y CONTACTO - MOBILE */}
          <div className="md:hidden mb-8">
            <div className="flex items-center gap-3 mb-6">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              >
                <Logo />
              </LocalizedClientLink>
            </div>
            <span className="txt-small-plus txt-ui-fg-base block mb-4">Contáctanos</span>
            <div className="space-y-3">
              {footerSections[0].links.map((link, idx) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={idx}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="flex items-center gap-2 text-ui-fg-subtle txt-small hover:text-ui-fg-base transition-colors"
                  >
                    {IconComponent && <IconComponent className="w-4 h-4 flex-shrink-0" />}
                    <span>{link.label}</span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* GRID DE SECCIONES */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {/* LOGO Y CONTACTO - DESKTOP */}
            <div className="hidden md:flex flex-col gap-y-4">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              >
                <Logo />
              </LocalizedClientLink>
              <span className="txt-small-plus txt-ui-fg-base">Contáctanos</span>
              <div className="space-y-3">
                {footerSections[0].links.map((link, idx) => {
                  const IconComponent = link.icon
                  return (
                    <a
                      key={idx}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="flex items-center gap-2 text-ui-fg-subtle txt-small hover:text-ui-fg-base transition-colors"
                    >
                      {IconComponent && <IconComponent className="w-4 h-4 flex-shrink-0" />}
                      <span>{link.label}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* RESTO DE SECCIONES */}
            {footerSections.slice(1).map((section, sectionIdx) => (
              <div key={sectionIdx} className="flex flex-col gap-y-3">
                <span className="txt-small-plus txt-ui-fg-base font-semibold">
                  {section.title}
                </span>
                <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noreferrer" : undefined}
                        className="hover:text-ui-fg-base transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* SEPARADOR */}
        <div className="w-full h-px bg-ui-border-base"></div>

        {/* FOOTER INFERIOR */}
        <div className="flex flex-col md:flex-row w-full py-6 justify-between items-center gap-4 text-ui-fg-muted">
          <Text className="txt-compact-small text-center md:text-left">
            © {currentYear} Blumin. Todos los derechos reservados.
          </Text>
          <div className="hidden md:block">
            <MedusaCTA />
          </div>
        </div>
      </div>
    </footer>
  )
}

