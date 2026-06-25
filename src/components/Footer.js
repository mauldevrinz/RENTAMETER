// ========================================
// COMPONENTS / Footer.js
// Marketplace Footer Template
// ========================================

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: '#0B3A64', color: 'white', padding: '80px 0 30px', borderTop: '4px solid #ef4444' }}>

      <div className="container">

        <div className="footer-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '48px', 
          marginBottom: '60px' 
        }}>

          {/* BRAND & CONTACT */}
          <div className="footer-brand">
            <h2 className="footer-logo" style={{ marginBottom: '24px' }}>
              <span className="logo-text-wrapper" style={{ 
                fontSize: '1.5rem', 
                fontWeight: '900', 
                color: 'white', 
                letterSpacing: '-0.5px',
                lineHeight: '1',
                textTransform: 'uppercase'
              }}>
                RENTAMETER<span style={{ color: '#ef4444' }}>.</span>
              </span>
            </h2>

            <p className="footer-description" style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '32px', maxWidth: '400px' }}>
              Solusi terpadu penyediaan instrumen industri presisi tinggi melalui sistem penyewaan dan pembelian yang transparan, andal, dan efisien.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span style={{ lineHeight: '1.4' }}>Gedung A Kampus ITS, Keputih, Kec. Sukolilo, Surabaya, Jawa Timur 60117</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>support@rentameter.com</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>+62 812 0000 0000</span>
              </div>
            </div>
          </div>

          {/* TENTANG */}
          <div className="footer-links">
            <h3 className="footer-title" style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '24px', color: 'white', position: 'relative', paddingBottom: '10px' }}>
              Tentang
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '2px', backgroundColor: '#ef4444' }}></span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/about" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Profil Perusahaan</Link>
              <Link href="/vision" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Visi & Misi</Link>
              <Link href="/privacy" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Kebijakan Privasi</Link>
              <Link href="/terms" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Syarat & Ketentuan</Link>
            </div>
          </div>

          {/* LAYANAN */}
          <div className="footer-links">
            <h3 className="footer-title" style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '24px', color: 'white', position: 'relative', paddingBottom: '10px' }}>
              Layanan
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '2px', backgroundColor: '#ef4444' }}></span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/search" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Sewa Instrumen</Link>
              <Link href="/search" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Pembelian Alat</Link>
              <Link href="/calibration" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Kalibrasi Industri</Link>
              <Link href="/consulting" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Konsultasi Teknis</Link>
            </div>
          </div>

          {/* INFORMASI & MEDIA */}
          <div className="footer-links">
            <h3 className="footer-title" style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '24px', color: 'white', position: 'relative', paddingBottom: '10px' }}>
              Informasi & Media
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '2px', backgroundColor: '#ef4444' }}></span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/news" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Berita & Artikel</Link>
              <Link href="/help" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Pusat Bantuan</Link>
              <Link href="/faq" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>FAQ</Link>
              <Link href="/contact" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.9rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>Hubungi Kami</Link>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            © 2026 RENTAMETER Marketplace. Hak Cipta Dilindungi Undang-Undang. Dikembangkan untuk Industri Masa Depan.
          </p>
        </div>

      </div>

    </footer>
  )
}