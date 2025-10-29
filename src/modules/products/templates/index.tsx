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
        <div 
          className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-8 lg:gap-16 xl:gap-20"
          data-testid="product-container"
        >
          {/* Image Gallery - Left Side */}
          <div className="w-full order-1">
            <div className="lg:sticky lg:top-20 transition-all duration-300">
              <ImageGallery images={product?.images || []} />
            </div>
          </div>

          {/* Product Details - Right Side */}
          <div className="flex flex-col gap-y-6 order-2">
            {/* Product Info */}
            <section className="animate-fadeIn">
              <ProductInfo product={product} />
            </section>

            {/* Product Actions - Highlighted Section */}
            <section className="bg-gray-50 rounded-lg p-6 border border-gray-200 animate-fadeIn animation-delay-100">
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
            <section className="mt-2 animate-fadeIn animation-delay-300">
              <ProductOnboardingCta />
            </section>
          </div>
        </div>
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