// ========================================
// PAGES / index.js
// Homepage Template Structure
// ========================================

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import HeroSection from '../sections/HeroSection'
import CategorySection from '../sections/CategorySection'
import ProductSection from '../sections/ProductSection'
import ClientSection from '../sections/ClientSection'
import AdminDashboardSection from '../sections/AdminDashboardSection'

export default function HomePage() {
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkRole = () => {
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          setUserRole(user.role)
        } catch (e) {
          console.error('Failed to parse user data')
          setUserRole(null)
        }
      } else {
        setUserRole(null)
      }
      setLoading(false)
    }

    checkRole()

    // Listen for login/logout from other tabs
    window.addEventListener('storage', checkRole)
    // Re-check on route change (e.g. after login redirect)
    router.events.on('routeChangeComplete', checkRole)

    return () => {
      window.removeEventListener('storage', checkRole)
      router.events.off('routeChangeComplete', checkRole)
    }
  }, [router])

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Memuat...</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>

      {/* MAIN CONTENT */}
      <main>
        {userRole === 'admin' ? (
          /* ADMIN VIEW - Full Screen Dashboard */
          <AdminDashboardSection />
        ) : (
          /* REGULAR USER / GUEST VIEW */
          <>
            <Navbar />
            {/* HERO */}
            <HeroSection />

            {/* CATEGORIES */}
            <CategorySection />

            {/* PRODUCTS */}
            <ProductSection />

            {/* CLIENT PORTFOLIO */}
            <ClientSection />
            <Footer />
          </>
        )}
      </main>

    </>
  )
}