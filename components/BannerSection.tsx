'use client'

import Link from 'next/link'
import Image from 'next/image'

interface BannerSectionProps {
  title: string
  description: string
  imageUrl?: string
  ctaText?: string
  ctaLink?: string
  bgColor?: 'black' | 'white' | 'gray'
}

export default function BannerSection({ 
  title, 
  description, 
  imageUrl,
  ctaText = 'Découvrir',
  ctaLink = '/products',
  bgColor = 'white'
}: BannerSectionProps) {
  const bgClasses = {
    black: 'bg-tech-black text-tech-white',
    white: 'bg-tech-white text-tech-black',
    gray: 'bg-tech-light-gray text-tech-black'
  }

  return (
    <section className={`py-16 lg:py-20 ${bgClasses[bgColor]} border-t border-primary-100 relative overflow-hidden`}>
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0 opacity-5">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
      
      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-light mb-3 tracking-tight">
          {title}
        </h2>
        <p className="text-sm md:text-base mb-6 leading-relaxed font-light opacity-80">
          {description}
        </p>
        {ctaLink && (
          <Link
            href={ctaLink}
            className="inline-flex items-center text-sm font-medium transition-colors hover:opacity-70"
          >
            {ctaText}
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        )}
      </div>
    </section>
  )
}
