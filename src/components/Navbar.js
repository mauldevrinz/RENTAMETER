// ========================================
// COMPONENTS / Navbar.js
// Marketplace Navbar Template (Fixed Version)
// ========================================

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (e) {
        console.error('Failed to parse user data')
      }
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsDropdownOpen(false)
    router.push('/login')
  }

  return (
    <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'white', borderBottom: '1px solid #e5e7eb', height: '70px', display: 'flex', alignItems: 'center' }}>
      <div className="container navbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        
        {/* LOGO - Sisi Kiri */}
        <Link href="/" className="navbar-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo/rentameter-logo.svg" alt="Rentameter Logo" style={{ height: '32px' }} />
          <div className="logo-text-wrapper" style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0B3A64' }}>RENTAMETER<span style={{ color: '#ef4444' }}>.</span></div>
        </Link>

        {/* NAVIGATION & PROFILE - Sisi Kanan */}
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/search" className="nav-link" style={{ 
            textDecoration: 'none', 
            color: '#0B3A64', 
            fontWeight: '600', 
            fontSize: '0.9rem',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }} onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.borderColor = '#0B3A64';
          }} onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="nav-link-text">Telusuri Alat</span>
          </Link>

          {user && user.role !== 'admin' && (
            <Link href="/profile" className="nav-link" title="Riwayat Pesanan" style={{ 
              textDecoration: 'none', 
              color: '#0B3A64', 
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center'
            }} onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.borderColor = '#0B3A64';
            }} onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </Link>
          )}

          
          {user ? (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              {/* PROFILE TRIGGER */}
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {/* AVATAR ICON */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#0B3A64',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 2px 5px rgba(11, 58, 100, 0.2)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>

                {/* NAME & ARROW */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1f2937' }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              {/* DROPDOWN MENU */}
              {isDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '10px',
                  width: '200px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb',
                  padding: '8px 0',
                  overflow: 'hidden',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>{user.name}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{user.role === 'admin' ? 'Administrator' : 'Anggota'}</p>
                  </div>
                  
                  <Link href="/profile" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: '12px 16px', 
                    textDecoration: 'none', 
                    color: '#374151',
                    fontSize: '0.9rem',
                    transition: 'background 0.2s'
                  }} onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Detail Profil
                  </Link>

                  <button 
                    onClick={handleLogout}
                    style={{ 
                      width: '100%',
                      textAlign: 'left',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px', 
                      padding: '12px 16px', 
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }} onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div ref={dropdownRef} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="desktop-auth" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link href="/login" className="nav-link" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '500' }}>
                  Masuk
                </Link>
                <Link href="/register" className="nav-button" style={{ 
                  textDecoration: 'none', 
                  backgroundColor: '#0B3A64', 
                  color: 'white', 
                  padding: '10px 20px', 
                  borderRadius: '8px', 
                  fontWeight: '600',
                  transition: 'opacity 0.2s'
                }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                  Daftar
                </Link>
              </div>

              {/* MOBILE AUTH HAMBURGER */}
              <div className="mobile-auth" style={{ position: 'relative' }}>
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px',
                    cursor: 'pointer',
                    color: '#0B3A64',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>

                {isMobileMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '10px',
                    width: '160px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    padding: '8px 0',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Link href="/login" style={{ padding: '12px 16px', color: '#4b5563', textDecoration: 'none', fontWeight: '500', borderBottom: '1px solid #f3f4f6' }} onClick={() => setIsMobileMenuOpen(false)}>
                      Masuk
                    </Link>
                    <Link href="/register" style={{ padding: '12px 16px', color: '#0B3A64', textDecoration: 'none', fontWeight: '600' }} onClick={() => setIsMobileMenuOpen(false)}>
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>


      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .nav-link-text {
          display: inline;
        }
        
        .mobile-auth {
          display: none !important;
        }

        @media (max-width: 768px) {
          .desktop-auth {
            display: none !important;
          }
          .mobile-auth {
            display: block !important;
          }
          .navbar-logo .logo-text-wrapper {
            display: none !important;
          }
          .navbar-right {
            gap: 12px !important;
          }
          .nav-link {
            padding: 8px !important;
          }
          .nav-link-text {
            display: none !important;
          }
          .nav-button {
            padding: 8px 12px !important;
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </nav>
  )
}