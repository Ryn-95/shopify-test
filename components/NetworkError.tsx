'use client'

interface NetworkErrorProps {
  message?: string
  onRetry?: () => void
}

export default function NetworkError({ message, onRetry }: NetworkErrorProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8 animate-slide-in">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3 flex-grow">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Erreur de connexion
          </h3>
          <p className="text-red-700 mb-4">
            {message || 'Impossible de se connecter au serveur. Vérifiez votre connexion internet et réessayez.'}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

