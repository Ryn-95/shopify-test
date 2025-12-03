'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-tech-black">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-tech-black via-tech-dark-gray to-tech-black" />

      {/* Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Badge */}
        <div className="inline-block mb-8 animate-slide-down">
          <span className="px-5 py-2 bg-tech-white/5 backdrop-blur-xl rounded-full text-tech-light-gray text-sm font-medium border border-tech-white/10">
            ✨ Nouvelle Collection Tech
          </span>
        </div>
        
        {/* Main headline */}
        <h1 className="text-display-1 md:text-[80px] lg:text-[100px] font-display font-bold text-tech-white mb-8 leading-[1.05] tracking-tight">
          <span className="block text-gradient-accent animate-fade-in">
            Innovation
          </span>
          <span className="block mt-2 text-tech-white animate-fade-in" style={{ animationDelay: '0.1s' }}>
            à chaque clic
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-body md:text-xl text-tech-medium-gray mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Découvrez notre sélection de produits tech premium. 
          Design minimaliste, performance maximale.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link
            href="/products"
            className="group relative px-8 py-4 bg-tech-white text-tech-black font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            <span className="relative z-10">Explorer</span>
            <div className="absolute inset-0 bg-gradient-to-r from-tech-white to-tech-light-gray opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <Link
            href="/about"
            className="px-8 py-4 bg-tech-white/5 backdrop-blur-xl text-tech-white font-semibold rounded-2xl border border-tech-white/10 transition-all duration-300 hover:bg-tech-white/10 hover:scale-105"
          >
            En savoir plus
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-tech-medium-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
    </section>
  )
}
