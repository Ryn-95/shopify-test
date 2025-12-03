import Link from 'next/link'

/**
 * Page 404 personnalisée avec design moderne
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        {/* Illustration 404 */}
        <div className="mb-8 animate-float">
          <div className="relative inline-block">
            <div className="text-9xl md:text-[12rem] font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent animate-gradient">
              404
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-20 blur-2xl animate-pulse"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Oups ! Page introuvable
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          La page que vous recherchez n'existe pas ou a été déplacée. 
          Ne vous inquiétez pas, explorons ensemble notre collection !
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10">Retour à l'accueil</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <Link
            href="/products"
            className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Voir tous les produits
          </Link>
        </div>

        {/* Suggestions de liens */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Vous cherchez peut-être :</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
              À propos
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
              Contact
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
              Panier
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

