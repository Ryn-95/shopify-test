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
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="text-center max-w-lg mx-auto">
            <div className="mb-12 animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center backdrop-blur-sm border border-red-200/30 shadow-xl">
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Une erreur s'est produite
              </h1>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Désolé, quelque chose s'est mal passé. Veuillez réessayer.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Recharger la page
              </button>
              <Link
                href="/"
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
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

