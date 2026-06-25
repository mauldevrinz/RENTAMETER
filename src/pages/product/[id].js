// ========================================
// PAGES / product/[id].js
// Dynamic Product Detail Page
// ========================================

import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import products from '../../data/products'
import Link from 'next/link'

export default function ProductDetailPage() {
  const router = useRouter()
  const { id } = router.query

  // Ensure router is ready before finding product
  if (!router.isReady) {
    return (
      <>
        <Navbar />
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <div className="loading-spinner">Memuat produk...</div>
        </div>
        <Footer />
      </>
    )
  }

  // Find product by id
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Produk Tidak Ditemukan</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Maaf, kami tidak dapat menemukan produk yang Anda cari.
          </p>
          <Link href="/" className="global-button primary" style={{ display: 'inline-block' }}>
            Kembali ke Beranda
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const handleTransaction = (mode) => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push(`/login?redirect=/product/${product.id}`)
      return
    }
    router.push(`/checkout/${product.id}?mode=${mode}`)
  }

  return (
    <>
      <Navbar />

      <section className="product-detail-page" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="product-detail-wrapper">
            
            {/* LEFT IMAGE */}
            <div className="product-detail-image">
              <img
                src={product.image}
                alt={product.title}
                style={{ width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow-md)' }}
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="product-detail-content">
              <p className="detail-category" style={{ color: 'var(--primary-blue)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px' }}>
                {product.category}
              </p>

              <h1 className="detail-title" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '24px' }}>
                {product.title}
              </h1>

              <p className="detail-description" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '32px' }}>
                Instrumen {product.title} industri yang dirancang untuk analisis laboratorium, 
                diagnostik elektronik, dan proyek pengembangan tingkat lanjut. 
                Kualitas tinggi dan performa andal terjamin.
              </p>

              <div className="detail-price-group" style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                <div className="price-card" style={{ flex: 1, background: '#f8fafc', padding: '24px', borderRadius: '16px' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Harga Sewa</p>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-blue)' }}>{product.rentPrice}</h3>
                </div>

                <div className="price-card" style={{ flex: 1, background: '#f8fafc', padding: '24px', borderRadius: '16px' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Harga Beli</p>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>{product.buyPrice}</h3>
                </div>
              </div>

              <div className="detail-actions" style={{ display: 'flex', gap: '20px' }}>
                <button 
                  onClick={() => handleTransaction('rent')}
                  className="global-button outline full-width"
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  Sewa Sekarang
                </button>
                <button 
                  onClick={() => handleTransaction('buy')}
                  className="global-button primary full-width"
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  Beli Produk
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
