'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-tech-black">
      {/* Background Image Hero - Style Apple avec grande image */}
      <div className="absolute inset-0">
        {/* Placeholder pour image hero - vous pouvez ajouter votre image ici */}
        <div className="absolute inset-0 bg-gradient-to-br from-tech-dark-gray via-tech-black to-tech-dark-gray">
          {/* Pattern overlay subtil */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>
        </div>
        
        {/* Gradient overlay pour le texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-tech-black/80 via-tech-black/40 to-tech-black/80 z-10" />
      </div>

      {/* Content - Style Apple avec typographie massive */}
      <div className={`relative z-30 max-w-7xl mx-auto px-6 lg:px-8 text-center ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Badge */}
        <div className="inline-block mb-10 animate-slide-down">
          <span className="px-6 py-2.5 bg-tech-white/10 backdrop-blur-xl rounded-full text-tech-light-gray text-sm font-medium border border-tech-white/20">
            ✨ Nouvelle Collection Tech Premium
          </span>
        </div>
        
        {/* Main headline - Typographie massive style Apple */}
        <h1 className="text-[64px] md:text-[120px] lg:text-[160px] font-display font-bold text-tech-white mb-10 leading-[1.05] tracking-[-0.02em]">
          <span className="block text-gradient-accent animate-fade-in">
            Innovation
          </span>
          <span className="block mt-2 text-tech-white animate-fade-in" style={{ animationDelay: '0.1s' }}>
            à chaque clic
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl lg:text-3xl text-tech-medium-gray mb-14 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Découvrez notre sélection de produits tech premium. 
          <br className="hidden md:block" />
          Design minimaliste, performance maximale.
        </p>
        
        {/* CTA Buttons - Style Apple avec boutons arrondis */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link
            href="/products"
            className="group relative px-12 py-5 bg-tech-white text-tech-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg min-w-[180px] text-center"
          >
            <span className="relative z-10">Explorer</span>
            <div className="absolute inset-0 bg-gradient-to-r from-tech-white to-tech-light-gray opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <Link
            href="/about"
            className="px-12 py-5 bg-tech-white/5 backdrop-blur-xl text-tech-white font-semibold rounded-full border-2 border-tech-white/20 transition-all duration-300 hover:bg-tech-white/10 hover:scale-105 text-lg min-w-[180px] text-center"
          >
            En savoir plus
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <svg className="w-6 h-6 text-tech-medium-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
    </section>
  )
}
