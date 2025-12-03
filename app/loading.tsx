/**
 * Composant de chargement global Next.js Premium
 * Design inspiré Apple/Tesla
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-tech-white">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-16 h-16 border-4 border-tech-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
        <p className="text-body text-primary-600 font-medium mt-4">Chargement...</p>
      </div>
    </div>
  )
}
