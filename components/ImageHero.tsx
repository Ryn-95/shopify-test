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

export default function ImageHero({ 
  title, 
  subtitle, 
  imageUrl, 
  ctaText = 'Découvrir',
  ctaLink = '/products',
  reverse = false 
}: ImageHeroProps) {
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
        <div className={`${reverse ? 'lg:col-start-1 lg:row-start-1' : ''} relative aspect-[4/3] rounded-lg overflow-hidden`}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-tech-light-gray flex items-center justify-center">
              <svg className="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12.75v-.008z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
