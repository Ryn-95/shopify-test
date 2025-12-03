'use client'

import { Component, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <div className="text-6xl font-extrabold text-red-500 mb-4">⚠️</div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                Une erreur s'est produite
              </h1>
              <p className="text-gray-600 mb-8">
                Désolé, quelque chose s'est mal passé. Veuillez réessayer.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Recharger la page
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-900 transition-colors duration-200"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

