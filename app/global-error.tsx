'use client'

/**
 * Composant d'erreur global Premium
 * Design inspiré Apple/Tesla
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
        <div className="min-h-screen flex items-center justify-center px-6 bg-tech-white">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-display-3 md:text-headline font-display font-bold text-tech-black mb-4 tracking-tight">
              Erreur Critique
            </h1>
            <p className="text-body md:text-lg text-primary-600 mb-8 leading-relaxed">
              Une erreur critique s&apos;est produite. Veuillez recharger la page.
            </p>
            <button
              onClick={reset}
              className="px-8 py-4 bg-tech-black text-tech-white font-semibold rounded-2xl hover:bg-primary-800 transition-all duration-300 shadow-medium hover:shadow-large hover:scale-105"
            >
              Réessayer
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
