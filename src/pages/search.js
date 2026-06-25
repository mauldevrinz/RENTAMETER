// ========================================
// PAGES / search.js
// Search Marketplace Page
// ========================================

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products'

export default function SearchPage() {
  const router = useRouter()
  const { category: queryCategory } = router.query

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')

  // Set category from URL when component mounts
  useEffect(() => {
    if (router.isReady && queryCategory) {
      setActiveCategory(queryCategory)
    }
  }, [router.isReady, queryCategory])

  const categories = ['Semua', 'Sensor & Transduser', 'Transmitter', 'Actuator & Control', 'Alat Kalibrasi', 'Microcontroller']

  // Filter Logic
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = activeCategory === 'Semua' ? true : product.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Navbar />

      <section className="search-page">
        <div className="container">

          {/* HEADER */}
          <div className="search-header" style={{ position: 'relative' }}>
            <Link href="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--primary-blue)',
              fontWeight: '600',
              marginBottom: '20px',
              padding: '8px 16px',
              background: 'rgba(37, 99, 235, 0.08)',
              borderRadius: '99px',
              transition: 'all 0.3s ease'
            }} className="back-home-btn">
              <span>←</span> Kembali ke Beranda
            </Link>
            
            <h1 className="search-title">Cari Instrumen</h1>
            <p className="search-description">
              Temukan instrumen industri, peralatan laboratorium, dan perangkat industri.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="search-bar-wrapper">
            <input
              type="text"
              placeholder="Cari produk berdasarkan nama atau kategori..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* FILTER */}
          <div className="filter-wrapper">
            {categories.map((cat) => (
              <button 
                key={cat}
                className={`filter-button ${activeCategory === cat ? 'active-filter' : ''}`}
                onClick={() => {
                  setActiveCategory(cat)
                  // Update URL query string without page reload
                  if (cat === 'Semua') {
                    router.push('/search', undefined, { shallow: true })
                  } else {
                    router.push(`/search?category=${encodeURIComponent(cat)}`, undefined, { shallow: true })
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* PRODUCT GRID */}
          <div className="search-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  category={product.category}
                  rentPrice={product.rentPrice}
                  buyPrice={product.buyPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                />
              ))
            ) : (
              <div style={{ padding: '40px', gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}