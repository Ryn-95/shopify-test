'use client'

import Image from 'next/image'

interface ImageGalleryProps {
  images?: string[]
  title?: string
}

// Images Unsplash par défaut pour la galerie
const defaultGalleryImages = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
]

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const galleryImages = images && images.length > 0 ? images : defaultGalleryImages

  return (
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
              {title}
            </h2>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.slice(0, 8).map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg bg-tech-light-gray group cursor-pointer"
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-tech-black/0 group-hover:bg-tech-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
