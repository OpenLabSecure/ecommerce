import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { Logo } from "@modules/common/components/logo"
import SearchBar from "@modules/layout/components/search-bar"
import { ShoppingCart, User } from "lucide-react"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 md:h-20 mx-auto border-b duration-200 bg-white border-ui-border-base shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full px-4 md:px-6 bg-primary-verde-agua">
          
          {/* Sección Izquierda: Logo + Menú */}
          <div className="flex items-center gap-2 md:gap-4 h-full flex-shrink-0">
            <LocalizedClientLink
              href="/"
              className="hover:opacity-80 transition-opacity"
              data-testid="nav-store-link"
            >
              <Logo />
            </LocalizedClientLink>

            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Sección Central: Buscador (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
            <SearchBar />
          </div>

          {/* Sección Derecha: Perfil + Carrito */}
          <div className="flex items-center gap-3 md:gap-6 h-full flex-shrink-0">
            <LocalizedClientLink
              className="hidden lg:flex items-center gap-2 hover:text-ui-fg-base transition-colors"
              href="/account"
              data-testid="nav-account-link"
            >
              <User size={20} />
              <span className="text-sm font-medium">Perfil</span>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center gap-2 hover:text-ui-fg-base transition-colors"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCart size={24} />
                  <span className="hidden md:inline text-sm font-medium">
                    Mi carrito (0)
                  </span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>

        {/* Buscador Mobile - Debajo del Nav */}
        <div className="md:hidden border-t border-ui-border-base bg-primary-verde-agua px-4 py-2">
          <SearchBar />
        </div>
      </header>
    </div>
  )
}
