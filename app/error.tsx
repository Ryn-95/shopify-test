'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Composant d'erreur global Next.js
 * S'affiche quand une erreur se produit dans l'application
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log l'erreur pour le debugging
    console.error('❌ Erreur capturée:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        {/* Illustration erreur */}
        <div className="mb-8 animate-float">
          <div className="relative inline-block">
            <div className="text-6xl font-extrabold text-red-500 mb-4">⚠️</div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-20 blur-2xl animate-pulse"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Une erreur s&apos;est produite
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Désolé, quelque chose s&apos;est mal passé. Veuillez réessayer.
        </p>

        {error.digest && (
          <p className="text-sm text-gray-500 mb-8">
            Code d&apos;erreur : {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Réessayer
          </button>
          
          <Link
            href="/"
            className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Retour à l'accueil
          </Link>
        </div>

        {/* Détails de l'erreur en développement */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-lg text-left">
            <h3 className="font-semibold text-red-900 mb-2">Détails de l'erreur (développement) :</h3>
            <pre className="text-sm text-red-800 overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

