import { MapPin, Tag, Store, Package, Sparkles } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const topbarLinks = [
  {
    href: "/ofertas",
    label: "Ofertas",
    icon: Tag,
    showOnMobile: true,
  },
  {
    href: "/tiendas",
    label: "Nuestras Tiendas",
    icon: Store,
    showOnMobile: false,
  },
  {
    href: "/marcas",
    label: "Marcas",
    icon: Sparkles,
    showOnMobile: false,
  },
  {
    href: "/store",
    label: "Productos",
    icon: Package,
    showOnMobile: true,
  },
]

export default function Topbar() {
  return (
    <div className="bg-secundary-anaranjado text-white">
      <div className="content-container">
        <div className="flex items-center justify-between h-[30px] md:h-[35px] px-2 md:px-4">
          {/* Sección de Ubicación */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <MapPin size={14} className="md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-[11px] md:text-[13px] flex items-center gap-1">
              <span className="hidden sm:inline">Distrito,</span>
              <span className="font-medium">Provincia</span>
            </span>
          </div>

          {/* Navegación - Desktop */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-4">
            {topbarLinks.map((link) => {
              const Icon = link.icon
              return (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-2 py-1 text-[13px] hover:bg-white hover:text-secundary-anaranjado rounded-lg transition-all duration-200"
                >
                  <Icon size={14} />
                  <span>{link.label}</span>
                </LocalizedClientLink>
              )
            })}
          </nav>

          {/* Navegación - Mobile (versión compacta) */}
          <div className="flex md:hidden items-center gap-2 text-[11px]">
            {topbarLinks
              .filter((link) => link.showOnMobile)
              .map((link) => (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className="px-1.5 py-0.5 hover:bg-white hover:text-secundary-anaranjado rounded transition-all duration-200"
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}