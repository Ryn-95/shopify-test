/**
 * Composant Loading Skeleton Premium
 * Design inspiré Apple/Tesla
 */

export function ProductCardSkeleton() {
  return (
    <div className="bg-tech-white rounded-3xl overflow-hidden border border-primary-100 animate-pulse">
      <div className="aspect-square bg-gradient-to-br from-tech-light-gray to-primary-100"></div>
      <div className="p-6">
        <div className="h-5 bg-tech-light-gray rounded-2xl mb-3 w-3/4"></div>
        <div className="h-8 bg-tech-light-gray rounded-2xl w-1/2"></div>
      </div>
      <div className="px-6 pb-6">
        <div className="h-12 bg-tech-light-gray rounded-2xl"></div>
      </div>
    </div>
  )
}

export function ProductPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-br from-tech-light-gray to-primary-100 rounded-3xl animate-pulse"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-tech-light-gray rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-8">
          <div className="h-16 bg-tech-light-gray rounded-2xl w-3/4 animate-pulse"></div>
          <div className="h-12 bg-tech-light-gray rounded-2xl w-1/3 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-4 bg-tech-light-gray rounded-xl w-full animate-pulse"></div>
            <div className="h-4 bg-tech-light-gray rounded-xl w-5/6 animate-pulse"></div>
            <div className="h-4 bg-tech-light-gray rounded-xl w-4/6 animate-pulse"></div>
          </div>
          <div className="h-14 bg-tech-light-gray rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export function CartItemSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-tech-white rounded-3xl border border-primary-100 animate-pulse">
      <div className="w-32 h-32 sm:w-24 sm:h-24 bg-tech-light-gray rounded-2xl"></div>
      <div className="flex-grow min-w-0 space-y-3">
        <div className="h-6 bg-tech-light-gray rounded-xl w-3/4"></div>
        <div className="h-4 bg-tech-light-gray rounded-xl w-1/2"></div>
      </div>
      <div className="flex items-center gap-6 w-full sm:w-auto">
        <div className="h-10 bg-tech-light-gray rounded-2xl w-24"></div>
        <div className="h-8 bg-tech-light-gray rounded-xl w-20"></div>
      </div>
    </div>
  )
}
