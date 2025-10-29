"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!images || images.length === 0) {
    return null
  }

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <Container className="relative aspect-[4/5] w-full overflow-hidden bg-ui-bg-subtle group">
          {images[selectedImage]?.url && (
            <>
              <Image
                src={images[selectedImage].url}
                alt={`Product image ${selectedImage + 1}`}
                fill
                priority
                className="object-cover rounded-lg cursor-zoom-in"
                sizes="(max-width: 768px) 100vw, 50vw"
                onClick={() => setIsModalOpen(true)}
              />
              {/* Zoom Icon Overlay */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              >
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}
        </Container>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`
                  relative aspect-square overflow-hidden rounded-lg
                  transition-all duration-200 hover:opacity-100
                  ${
                    selectedImage === index
                      ? "ring-2 ring-blue-500 opacity-100"
                      : "opacity-60 hover:ring-2 hover:ring-gray-300"
                  }
                `}
              >
                {image.url && (
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevious()
                }}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          {/* Large Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {images[selectedImage]?.url && (
              <Image
                src={images[selectedImage].url}
                alt={`Product image ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            )}
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGallery