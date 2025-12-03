'use client'

import Image from 'next/image'
import { useState } from 'react'

interface VideoSectionProps {
  thumbnailImage?: string
}

export default function VideoSection({ thumbnailImage }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-16 lg:py-20 bg-tech-white border-t border-primary-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-light text-tech-black mb-3 tracking-tight">
            L'innovation en action
          </h2>
        </div>

        {/* Video placeholder avec image */}
        <div className="relative aspect-video bg-tech-light-gray rounded-lg overflow-hidden cursor-pointer group" onClick={() => setIsPlaying(!isPlaying)}>
          {thumbnailImage ? (
            <>
              <Image
                src={thumbnailImage}
                alt="Vidéo"
                fill
                className="object-cover group-hover:opacity-90 transition-opacity"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                  <div className="w-12 h-12 bg-tech-black/80 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-tech-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {!isPlaying ? (
                <div className="w-12 h-12 bg-tech-black/80 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-tech-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              ) : (
                <div className="text-sm text-primary-600">Vidéo en lecture...</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
