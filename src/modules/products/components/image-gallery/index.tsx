"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]))

  // Precargar imágenes adyacentes
  useEffect(() => {
    if (!images || images.length === 0) return

    const preloadAdjacentImages = () => {
      const prevIndex = selectedImage === 0 ? images.length - 1 : selectedImage - 1
      const nextIndex = selectedImage === images.length - 1 ? 0 : selectedImage + 1;
      
      // Precargar imagen anterior y siguiente
      [prevIndex, nextIndex].forEach(index => {
        if (!loadedImages.has(index)) {
          const img = new window.Image()
          img.src = images[index].url
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]))
          }
        }
      })
    }

    preloadAdjacentImages()
  }, [selectedImage, images, loadedImages])

  // Precargar todas las imágenes en segundo plano
  useEffect(() => {
    if (!images || images.length === 0) return

    const preloadAllImages = () => {
      images.forEach((image, index) => {
        if (!loadedImages.has(index)) {
          const img = new window.Image()
          img.src = image.url
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]))
          }
        }
      })
    }

    // Precargar después de un pequeño delay para no bloquear la carga inicial
    const timer = setTimeout(preloadAllImages, 500)
    return () => clearTimeout(timer)
  }, [images, loadedImages])

  if (!images || images.length === 0) {
    return (
      <Container className="relative aspect-[4/5] w-full overflow-hidden bg-ui-bg-subtle rounded-lg">
        <div className="flex h-full items-center justify-center text-ui-fg-subtle">
          No hay imágenes disponibles
        </div>
      </Container>
    )
  }

  const handlePrevious = () => {
    setIsLoading(true)
    setSelectedImage((prev) => {
      const newIndex = prev === 0 ? images.length - 1 : prev - 1
      setTimeout(() => setIsLoading(false), 100)
      return newIndex
    })
  }

  const handleNext = () => {
    setIsLoading(true)
    setSelectedImage((prev) => {
      const newIndex = prev === images.length - 1 ? 0 : prev + 1
      setTimeout(() => setIsLoading(false), 100)
      return newIndex
    })
  }

  const handleThumbnailClick = (index: number) => {
    if (index !== selectedImage) {
      setIsLoading(true)
      setSelectedImage(index)
      setTimeout(() => setIsLoading(false), 100)
    }
  }

  // Soporte para navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, images.length])

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Thumbnails - Vertical en desktop, horizontal en mobile */}
      <div className="order-2 lg:order-1 w-full lg:w-24 flex-shrink-0">
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-2 lg:pb-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {images.map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => handleThumbnailClick(index)}
              className={`
                relative flex-shrink-0 w-20 h-20 lg:w-full lg:h-24 rounded-lg overflow-hidden
                transition-all duration-200 border-2
                ${
                  selectedImage === index
                    ? "border-ui-fg-interactive ring-2 ring-ui-fg-interactive ring-opacity-50 scale-105"
                    : "border-gray-200 hover:border-gray-300 hover:scale-105"
                }
              `}
              aria-label={`Ver imagen ${index + 1}`}
              aria-pressed={selectedImage === index}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80px, 96px"
                priority={index < 3} // Priorizar las primeras 3 thumbnails
                quality={60} // Reducir calidad para thumbnails
              />
              {/* Overlay cuando está seleccionado */}
              {selectedImage === index && (
                <div className="absolute inset-0 bg-ui-fg-interactive/10" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div className="order-1 lg:order-2 flex-1 relative">
        <Container className="relative aspect-[4/5] w-full overflow-hidden bg-ui-bg-subtle rounded-lg group">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-ui-fg-interactive border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Imagen Principal */}
          <Image
            src={images[selectedImage].url}
            alt={`Imagen del producto ${selectedImage + 1}`}
            fill
            priority={selectedImage === 0}
            className={`
              object-cover transition-all duration-300
              ${isLoading ? "opacity-50 scale-95" : "opacity-100 scale-100"}
              group-hover:scale-105
            `}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            quality={90} // Alta calidad para imagen principal
            onLoadingComplete={() => setIsLoading(false)}
          />

          {/* Precargar imágenes ocultas (siguiente y anterior) */}
          {images.length > 1 && (
            <>
              {/* Imagen anterior */}
              <div className="hidden">
                <Image
                  src={images[selectedImage === 0 ? images.length - 1 : selectedImage - 1].url}
                  alt="Preload previous"
                  width={1}
                  height={1}
                  priority
                />
              </div>
              {/* Imagen siguiente */}
              <div className="hidden">
                <Image
                  src={images[selectedImage === images.length - 1 ? 0 : selectedImage + 1].url}
                  alt="Preload next"
                  width={1}
                  height={1}
                  priority
                />
              </div>
            </>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                disabled={isLoading}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-20"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={handleNext}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-20"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium z-20">
              {selectedImage + 1} / {images.length}
            </div>
          )}

          {/* Loading Indicator */}
          {!loadedImages.has(selectedImage) && (
            <div className="absolute inset-0 flex items-center justify-center bg-ui-bg-subtle">
              <div className="w-12 h-12 border-4 border-ui-fg-interactive border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </Container>

        {/* Dots Indicator - Mobile only */}
        {images.length > 1 && (
          <div className="flex lg:hidden justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                disabled={isLoading}
                className={`
                  transition-all duration-200 disabled:opacity-50
                  ${
                    selectedImage === index
                      ? "bg-ui-fg-interactive w-6 h-2"
                      : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
                  }
                  rounded-full
                `}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGallery