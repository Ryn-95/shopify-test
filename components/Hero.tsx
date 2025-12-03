'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface HeroProps {
  featuredImage?: string
}

export default function Hero({ featuredImage }: HeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-tech-white">
      {/* Background Image - Style Apple minimaliste */}
      {featuredImage && (
        <div className="absolute inset-0 opacity-5">
          <Image
            src={featuredImage}
            alt="Hero"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}
      
      {/* Content - Style Apple minimaliste */}
      <div className={`relative z-30 max-w-5xl mx-auto px-6 lg:px-8 text-center ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Main headline - Typographie Apple subtile */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-tech-black mb-4 leading-[1.1] tracking-tight">
          Innovation
          <br />
          à chaque clic
        </h1>
        
        {/* Subheadline - Texte petit et élégant */}
        <p className="text-base md:text-lg text-primary-600 mb-8 max-w-xl mx-auto leading-relaxed font-light">
          Découvrez notre sélection de produits tech premium.
        </p>
        
        {/* CTA Buttons - Style Apple minimaliste */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/products"
            className="text-sm text-tech-black hover:text-primary-700 transition-colors font-medium"
          >
            Explorer →
          </Link>
          
          <span className="text-primary-400 hidden sm:inline">•</span>
          
          <Link
            href="/about"
            className="text-sm text-primary-600 hover:text-tech-black transition-colors"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </section>
  )
}
