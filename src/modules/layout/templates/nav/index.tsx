import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { Logo } from "@modules/common/components/logo"
import { SearchIcon, ShoppingCart, User } from "lucide-react"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular bg-primary-verde-agua">
          <div className="flex-1 basis-0 h-full flex items-center">
            {/* LOGO */}
            <div>
              <LocalizedClientLink
                href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
              >
                <Logo />
              </LocalizedClientLink>              
            </div>


            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              Open Lab Store
            </LocalizedClientLink>
          </div> */}
          
            {/* Input de busqueda */}

          <div className="bg-white w-[20%] flex px-2.5 py-1.5 rounded-xl justify-between"> 
            <input type="text" placeholder="¿Qué estas buscando?" className="w-full selection:border-none "  />
            <SearchIcon />
          </div>  


          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base flex items-center"
                href="/account"
                data-testid="nav-account-link"
              >
                <User className="mr-2" size={20}/>
                Perfil
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCart className="mr-2" size={24} />
                    Mi carrito (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
