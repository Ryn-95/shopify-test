/**
 * Composant de chargement global Next.js
 * S'affiche pendant le chargement des pages
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 border-t-transparent mx-auto mb-4"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-900 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-gray-600 text-lg font-medium mt-4">Chargement...</p>
      </div>
    </div>
  )
}

