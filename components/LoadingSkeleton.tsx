/**
 * Composant Loading Skeleton pour les états de chargement
 */

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 animate-pulse">
      <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300"></div>
      <div className="p-5">
        <div className="h-5 bg-gray-200 rounded mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="px-5 pb-5">
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
}

export function ProductPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="h-12 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
          </div>
          <div className="h-14 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export function CartItemSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 animate-pulse">
      <div className="w-32 h-32 sm:w-24 sm:h-24 bg-gray-200 rounded-xl"></div>
      <div className="flex-grow min-w-0 space-y-2">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="flex items-center gap-6 w-full sm:w-auto">
        <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  )
}

