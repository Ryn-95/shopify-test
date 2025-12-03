'use client'

interface NetworkErrorProps {
  message?: string
  onRetry?: () => void
}

export default function NetworkError({ message, onRetry }: NetworkErrorProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-50/50 to-orange-50/50 backdrop-blur-sm border border-red-200/50 rounded-2xl p-8 mb-8 animate-fade-in shadow-lg shadow-red-100/20">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-50"></div>
      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/30">
            <svg
              className="h-6 w-6 text-white"
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
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
            Erreur de connexion
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message || 'Impossible de se connecter au serveur. Vérifiez votre connexion internet et réessayez.'}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

