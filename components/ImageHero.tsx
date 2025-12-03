'use client'

import Link from 'next/link'
import Image from 'next/image'

interface ImageHeroProps {
  title: string
  subtitle: string
  imageUrl?: string
  ctaText?: string
  ctaLink?: string
  reverse?: boolean
}

// Images Unsplash par défaut pour différentes sections
const defaultImages = [
  'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
]

let imageIndex = 0

export default function ImageHero({ 
  title, 
  subtitle, 
  imageUrl, 
  ctaText = 'Découvrir',
  ctaLink = '/products',
  reverse = false 
}: ImageHeroProps) {
  // Utiliser l'image fournie ou une image Unsplash par défaut
  const image = imageUrl || defaultImages[imageIndex++ % defaultImages.length]

  return (
    <section className={`py-16 lg:py-20 bg-tech-white ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      <div className={`max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}>
        {/* Text Content */}
        <div className={`${reverse ? 'lg:col-start-2' : ''}`}>
          <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base text-primary-600 mb-6 leading-relaxed font-light">
            {subtitle}
          </p>
          {ctaLink && (
            <Link
              href={ctaLink}
              className="inline-flex items-center text-sm text-tech-black hover:text-primary-700 transition-colors font-medium"
            >
              {ctaText}
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          )}
        </div>

        {/* Image */}
        <div className={`${reverse ? 'lg:col-start-1 lg:row-start-1' : ''} relative aspect-[4/3] rounded-lg overflow-hidden bg-tech-light-gray`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover hover:opacity-90 transition-opacity duration-300"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}
