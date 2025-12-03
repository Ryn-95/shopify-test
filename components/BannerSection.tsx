'use client'

import Image from 'next/image'
import Link from 'next/link'

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
  bgColor = 'black'
}: BannerSectionProps) {
  const bgClasses = {
    black: 'bg-tech-black text-tech-white',
    white: 'bg-tech-white text-tech-black',
    gray: 'bg-tech-light-gray text-tech-black'
  }

  return (
    <section className={`py-32 lg:py-40 ${bgClasses[bgColor]} relative overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-display-2 md:text-display-1 font-display font-bold mb-6 tracking-tight">
              {title}
            </h2>
            <p className="text-body md:text-xl mb-8 leading-relaxed opacity-80">
              {description}
            </p>
            {ctaLink && (
              <Link
                href={ctaLink}
                className={`inline-flex items-center px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-large ${
                  bgColor === 'black' 
                    ? 'bg-tech-white text-tech-black hover:bg-tech-light-gray' 
                    : 'bg-tech-black text-tech-white hover:bg-primary-800'
                }`}
              >
                {ctaText}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${
                bgColor === 'black' ? 'bg-tech-dark-gray' : 'bg-tech-light-gray'
              }`}>
                <svg className="w-32 h-32 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12.75v-.008z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

