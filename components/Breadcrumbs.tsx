'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname()
  
  // Génération automatique des breadcrumbs si non fournis
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items
    
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', href: '/' }
    ]

    let currentPath = ''
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      breadcrumbs.push({
        label,
        href: currentPath
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav className="flex items-center space-x-2 text-caption text-primary-600 mb-8" aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1
        
        return (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-3 h-3 mx-2 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            )}
            {isLast ? (
              <span className="font-semibold text-tech-black">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-tech-black transition-colors duration-300"
              >
                {item.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
