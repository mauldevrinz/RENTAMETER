// ========================================
// PAGES / coming-soon.js
// Temporary page for under-development features
// ========================================

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function ComingSoonPage() {
  return (
    <>
      <Navbar />

      <main className="coming-soon-page" style={{ 
        padding: '120px 0', 
        textAlign: 'center',
        background: 'var(--background)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="container">
          
          <div className="coming-soon-content" style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'white',
            padding: '60px 40px',
            borderRadius: '32px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div className="icon-wrapper" style={{
              width: '80px',
              height: '80px',
              background: 'rgba(37, 99, 235, 0.1)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
              fontSize: '2.5rem'
            }}>
              🚀
            </div>

            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              marginBottom: '16px',
              color: 'var(--text-primary)'
            }}>
              Coming Soon!
            </h1>

            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.1rem', 
              lineHeight: '1.8',
              marginBottom: '40px'
            }}>
              Fitur kategori ini sedang dalam tahap pengembangan. 
              Segera hadir dengan pilihan instrumen yang lebih lengkap untuk Anda!
            </p>

            <Link href="/" className="global-button primary" style={{ display: 'inline-block', padding: '16px 40px' }}>
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
