import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    const allOrders = JSON.parse(localStorage.getItem('rentameter_orders') || '[]')
    // Filter orders for this user (or show all for demo if email matches)
    const userOrders = allOrders.filter(o => o.buyerEmail === parsedUser.email)
    setOrders(userOrders)
    setLoading(false)
  }, [router])

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(number)
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Lunas': return { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' }
      case 'Diproses': return { bg: '#eff6ff', text: '#1e40af', border: '#dbeafe' }
      case 'Dikirim': return { bg: '#fef9c3', text: '#854d0e', border: '#fef08a' }
      case 'Selesai': return { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' }
      default: return { bg: '#f8fafc', text: '#64748b', border: '#e2e8f0' }
    }
  }

  if (loading) return null

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', backgroundColor: '#f8fafc', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
            
            {/* SIDEBAR */}
            <div>
              <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#0B3A64', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '800', margin: '0 auto 16px' }}>
                  {user.name.charAt(0)}
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>{user.name}</h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '24px' }}>{user.email}</p>
                <div style={{ backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '24px' }}>
                  {user.role === 'admin' ? 'Administrator' : 'Anggota Terverifikasi'}
                </div>

                <Link href="/" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #0B3A64',
                  color: '#0B3A64',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  transition: 'all 0.2s'
                }} onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0B3A64';
                  e.currentTarget.style.color = 'white';
                }} onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#0B3A64';
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Kembali ke Beranda
                </Link>
              </div>
            </div>

            {/* CONTENT */}
            <div>
              <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B3A64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                  Riwayat Pemesanan
                </h3>

                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                    <p style={{ color: '#94a3b8' }}>Anda belum memiliki riwayat pemesanan.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {orders.map(order => (
                      <div key={order.id} style={{ padding: '20px', border: '1px solid #f1f5f9', borderRadius: '12px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <img src={order.productImage} alt={order.productTitle} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0B3A64' }}>{order.id}</span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(order.date).toLocaleDateString('id-ID')}</span>
                          </div>
                          <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: '700' }}>{order.productTitle}</h4>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                            Tipe: <span style={{ fontWeight: '600' }}>{order.mode === 'rent' ? `Sewa (${order.rentDays} Hari)` : 'Pembelian'}</span>
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '800', color: '#0B3A64', marginBottom: '8px' }}>{formatRupiah(order.totalPrice)}</div>
                          <span style={{ 
                            padding: '4px 10px', 
                            backgroundColor: getStatusStyle(order.status).bg, 
                            color: getStatusStyle(order.status).text, 
                            border: `1px solid ${getStatusStyle(order.status).border}`,
                            borderRadius: '20px', 
                            fontSize: '0.7rem', 
                            fontWeight: '700' 
                          }}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
