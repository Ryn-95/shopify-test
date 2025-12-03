'use client'

/**
 * Composant d'erreur global pour les erreurs critiques
 * S'affiche quand une erreur se produit dans le layout racine
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-6xl font-extrabold text-red-500 mb-4">⚠️</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Erreur Critique
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Une erreur critique s'est produite. Veuillez recharger la page.
            </p>
            <button
              onClick={reset}
              className="px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg"
            >
              Réessayer
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

