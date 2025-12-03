'use client'

import { useState } from 'react'

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative py-32 bg-tech-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-tech-black via-tech-dark-gray to-tech-black" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-display-2 md:text-display-1 font-display font-bold text-tech-white mb-6 tracking-tight">
            L'innovation en action
          </h2>
          <p className="text-body md:text-xl text-tech-medium-gray leading-relaxed">
            Découvrez comment nos produits tech premium transforment votre quotidien
          </p>
        </div>

        {/* Video placeholder with play button */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
          <div className="aspect-video bg-gradient-to-br from-tech-dark-gray to-tech-black flex items-center justify-center relative">
            {!isPlaying ? (
              <>
                {/* Thumbnail overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Play button */}
                <div className="relative z-10 w-24 h-24 bg-tech-white/10 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-tech-white/20">
                  <svg className="w-10 h-10 text-tech-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Video info */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <p className="text-tech-white text-body font-medium mb-1">Découvrez JJFYNE</p>
                  <p className="text-tech-medium-gray text-caption">2:34</p>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-tech-white text-body">Vidéo en lecture...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

