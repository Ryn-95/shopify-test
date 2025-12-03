'use client'

import { useState, useEffect } from 'react'
import type { Product } from '@/lib/types'

interface ProductFiltersProps {
  products: Product[]
  onFilter: (filtered: Product[]) => void
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

export default function ProductFilters({ products, onFilter }: ProductFiltersProps) {
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const prices = products.map(p => parseFloat(p.variants[0]?.price || '0'))
    return Math.max(...prices, 1000)
  })
  const [selectedPrice, setSelectedPrice] = useState(maxPrice)

  const handleSort = (option: SortOption) => {
    setSortBy(option)
    let sorted = [...products]

    switch (option) {
      case 'price-asc':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.variants[0]?.price || '0')
          const priceB = parseFloat(b.variants[0]?.price || '0')
          return priceA - priceB
        })
        break
      case 'price-desc':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.variants[0]?.price || '0')
          const priceB = parseFloat(b.variants[0]?.price || '0')
          return priceB - priceA
        })
        break
      case 'name-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        break
    }

    // Filtrer par prix
    const filtered = sorted.filter(product => {
      const price = parseFloat(product.variants[0]?.price || '0')
      return price <= selectedPrice
    })

    onFilter(filtered)
  }

  const handlePriceChange = (value: number) => {
    setSelectedPrice(value)
    handleSort(sortBy)
  }

  // Appliquer les filtres au chargement
  useEffect(() => {
    handleSort('default')
  }, [])

  return (
    <div className="bg-tech-white rounded-3xl shadow-soft border border-primary-100 p-6 sticky top-24">
      <h2 className="text-title font-display font-bold text-tech-black mb-6">Filtres</h2>

      {/* Tri */}
      <div className="mb-8">
        <label className="block text-caption font-semibold text-tech-black mb-3 uppercase tracking-wider">
          Trier par
        </label>
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value as SortOption)}
          className="w-full px-4 py-3 bg-tech-light-gray border border-primary-200 rounded-2xl text-body text-tech-black font-medium focus:ring-2 focus:ring-tech-accent focus:border-tech-accent transition-all duration-300 appearance-none cursor-pointer hover:bg-primary-50"
        >
          <option value="default">Par défaut</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="name-asc">Nom A-Z</option>
          <option value="name-desc">Nom Z-A</option>
        </select>
      </div>

      {/* Filtre prix */}
      <div>
        <label className="block text-caption font-semibold text-tech-black mb-3 uppercase tracking-wider">
          Prix maximum
        </label>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max={maxPrice}
            step="10"
            value={selectedPrice}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-full h-2 bg-tech-light-gray rounded-lg appearance-none cursor-pointer accent-tech-accent"
            style={{
              background: `linear-gradient(to right, #0071e3 0%, #0071e3 ${(selectedPrice / maxPrice) * 100}%, #f5f5f7 ${(selectedPrice / maxPrice) * 100}%, #f5f5f7 100%)`
            }}
          />
          <div className="flex items-center justify-between text-caption text-primary-600 font-medium">
            <span>0 €</span>
            <span className="text-tech-black font-bold text-body">{selectedPrice.toFixed(0)} €</span>
            <span>{maxPrice.toFixed(0)} €</span>
          </div>
        </div>
      </div>
    </div>
  )
}
