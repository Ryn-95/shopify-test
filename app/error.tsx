'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Composant d'erreur global Next.js Premium
 * Design inspiré Apple/Tesla
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('❌ Erreur capturée:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-tech-white">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        {/* Illustration erreur */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-display-3 md:text-headline font-display font-bold text-tech-black mb-4 tracking-tight">
          Une erreur s&apos;est produite
        </h1>
        <p className="text-body md:text-lg text-primary-600 mb-8 leading-relaxed">
          Désolé, quelque chose s&apos;est mal passé. Veuillez réessayer.
        </p>

        {error.digest && (
          <p className="text-caption text-primary-500 mb-8">
            Code d&apos;erreur : {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-large"
          >
            Réessayer
          </button>
          
          <Link
            href="/"
            className="px-8 py-4 bg-tech-white text-tech-black font-semibold rounded-2xl border-2 border-primary-200 hover:border-tech-black transition-all duration-300 hover:scale-105"
          >
            Retour à l&apos;accueil
          </Link>
        </div>

        {/* Détails de l'erreur en développement */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-2xl text-left">
            <h3 className="font-display font-semibold text-red-900 mb-2 text-title">Détails de l&apos;erreur (développement) :</h3>
            <pre className="text-caption text-red-800 overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
