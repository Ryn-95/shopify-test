/**
 * Composant Layout
 * Layout principal qui enveloppe toutes les pages
 * Inclut Navbar et Footer
 */

import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      <main className="flex-grow relative">{children}</main>
      <Footer />
    </div>
  )
}

