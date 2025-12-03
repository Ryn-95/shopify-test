'use client'

import { useState } from 'react'

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
            L'innovation en action
          </h2>
        </div>

        {/* Video placeholder */}
        <div className="relative aspect-video bg-tech-light-gray rounded-lg overflow-hidden cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
          {!isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-tech-black/80 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-tech-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-sm text-primary-600">Vidéo en lecture...</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
