import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import ProductSpecifications from "../components/product-specifications"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      {/* Main Product Section */}
      <div className="content-container py-6 lg:py-12">
        {/* Breadcrumb - Opcional */}
        <nav className="mb-6 lg:mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-ui-fg-muted">
            <li>
              <a href="/" className="hover:text-ui-fg-base transition-colors">
                Inicio
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/products" className="hover:text-ui-fg-base transition-colors">
                Productos
              </a>
            </li>
            <li>/</li>
            <li className="text-ui-fg-base font-medium truncate max-w-[200px]">
              {product.title}
            </li>
          </ol>
        </nav>

        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16"
          data-testid="product-container"
        >
          {/* Image Gallery - Left Side */}
          <div className="w-full">
            <div className="lg:sticky lg:top-24 transition-all duration-300">
              <ImageGallery images={product?.images || []} />
            </div>
          </div>

          {/* Product Details - Right Side */}
          <div className="flex flex-col gap-y-6 lg:gap-y-8">
            {/* Product Info */}
            <section className="animate-fadeIn">
              <ProductInfo product={product} />
            </section>

            {/* Product Actions - Highlighted Section */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 lg:p-8 border border-gray-200 shadow-sm animate-fadeIn animation-delay-100">
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </section>

            {/* Product Tabs */}
            <section className="animate-fadeIn animation-delay-200">
              <ProductTabs product={product} />
            </section>

            {/* Onboarding CTA */}
            <section className="animate-fadeIn animation-delay-300">
              <ProductOnboardingCta />
            </section>
          </div>
        </div>

        <ProductSpecifications product={product} />
      </div>

      {/* Related Products Section */}
      <div
        className="content-container my-16 lg:my-24 border-t border-gray-200 pt-16 lg:pt-24"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate