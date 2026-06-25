// ========================================
// PAGES / checkout/[id].js
// Dynamic Checkout Page
// ========================================

import { useRouter } from 'next/router'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import products from '../../data/products'
import Link from 'next/link'

export default function CheckoutDetailPage() {
  const router = useRouter()
  const { id, mode } = router.query
  const [rentDays, setRentDays] = useState(1)
  const [paymentState, setPaymentState] = useState('idle') // 'idle' | 'showing_qr' | 'processing'

  // Ensure router is ready
  if (!router.isReady) {
    return (
      <>
        <Navbar />
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <div className="loading-spinner">Initializing checkout...</div>
        </div>
        <Footer />
      </>
    )
  }

  // Helper to format as Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number)
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
            Produk yang ingin Anda checkout tidak tersedia.
          </p>
          <Link href="/" className="global-button primary" style={{ display: 'inline-block' }}>
            Kembali ke Marketplace
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  // Calculate prices
  const isRent = mode === 'rent'
  const buyPriceString = product.buyPrice || '0'
  
  // Clean string from "Rp", dots, and spaces to parse as float
  const cleanBuyPrice = buyPriceString.replace(/Rp/g, '').replace(/\./g, '').replace(/\s/g, '').split('/')[0]
  const buyPriceValue = parseFloat(cleanBuyPrice) || 0
  
  const dailyRentPrice = buyPriceValue * 0.005
  const subtotal = isRent ? (dailyRentPrice * rentDays) : buyPriceValue
  
  // 10% Transaction Fee
  const transactionFee = subtotal * 0.1
  const totalPrice = subtotal + transactionFee

  const handleCheckout = () => {
    setPaymentState('showing_qr')
  }

  const handleSimulatePayment = () => {
    setPaymentState('processing')

    // Save transaction data for the digital contract
    const transaction = {
      id: 'TRX-' + Date.now(),
      productTitle: product.title,
      productCategory: product.category,
      productImage: product.image,
      mode: isRent ? 'rent' : 'buy',
      rentDays: isRent ? rentDays : null,
      subtotal: subtotal,
      transactionFee: transactionFee,
      totalPrice: totalPrice,
      dailyRentPrice: isRent ? dailyRentPrice : null,
      buyerName: JSON.parse(localStorage.getItem('user') || '{}').name || 'Guest',
      buyerEmail: JSON.parse(localStorage.getItem('user') || '{}').email || '-',
      paymentMethod: 'QRIS',
      date: new Date().toISOString(),
      status: 'Lunas'
    }
    // Save to global orders list
    const existingOrders = JSON.parse(localStorage.getItem('rentameter_orders') || '[]')
    const updatedOrders = [transaction, ...existingOrders]
    localStorage.setItem('rentameter_orders', JSON.stringify(updatedOrders))
    
    // Legacy support for success page
    localStorage.setItem('last_transaction', JSON.stringify(transaction))

    setTimeout(() => {
      router.push('/payment/success')
    }, 2000)
  }

  return (
    <>
      <Navbar />

      <section className="checkout-page">
        <div className="container">
          
          <div className="checkout-header">
            <h1 className="checkout-title">
              Checkout {isRent ? 'Sewa' : 'Pembelian'}
            </h1>
            <p className="checkout-description">
              Konfirmasi {isRent ? 'sewa' : 'pembelian'} Anda untuk {product.title}.
            </p>
          </div>

          <div className="checkout-wrapper">
            
            {/* LEFT */}
            <div className="checkout-left">
              
              <div className="checkout-card">
                <h3 className="checkout-card-title">Ringkasan Produk</h3>
                <div className="checkout-product">
                  <img src={product.image} alt={product.title} />
                  <div>
                    <h4>{product.title}</h4>
                    <p>Kategori: {product.category}</p>
                    <p>Tipe: <strong>{isRent ? 'Sewa Harian' : 'Pembelian Satu Kali'}</strong></p>
                    <span>{isRent ? `${formatRupiah(dailyRentPrice)} / hari` : product.buyPrice}</span>
                  </div>
                </div>
              </div>

              {/* SPESIFIKASI PRODUK */}
              {product.specs && product.specs.length > 0 && (
                <div className="checkout-card">
                  <h3 className="checkout-card-title">Spesifikasi Produk</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                    {product.specs.map((spec, index) => (
                      <div key={index} style={{
                        display: 'flex', justifyContent: 'space-between',
                        padding: '10px 14px',
                        backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white',
                        borderBottom: '1px solid #f3f4f6'
                      }}>
                        <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{spec.label}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1f2937' }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isRent && (
                <div className="checkout-card">
                  <h3 className="checkout-card-title">Durasi Sewa</h3>
                  <div className="duration-selector" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <label htmlFor="rentDays" style={{ fontWeight: '500' }}>Jumlah Hari:</label>
                    <input 
                      type="number" 
                      id="rentDays" 
                      min="1" 
                      max="365"
                      value={rentDays} 
                      onChange={(e) => setRentDays(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color, #ddd)',
                        width: '80px',
                        fontSize: '1rem'
                      }}
                      disabled={paymentState !== 'idle'}
                    />
                  </div>
                </div>
              )}

              <div className="checkout-card">
                <h3 className="checkout-card-title">Metode Pembayaran</h3>
                <div className="payment-methods" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '2px solid var(--primary-color)', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" alt="QRIS" style={{ height: '24px' }} />
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Bayar dengan QRIS</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Pembayaran cepat dan aman menggunakan aplikasi m-banking atau e-wallet yang mendukung QRIS.</p>
                </div>
              </div>

            </div>

            {/* RIGHT */}
            <div className="checkout-right">
              <div className="summary-card">
                <h3 className="summary-title">Ringkasan Pesanan</h3>
                
                <div className="summary-item">
                  <p>Harga {isRent ? `Sewa (${rentDays} Hari)` : 'Beli'}</p>
                  <span>{formatRupiah(subtotal)}</span>
                </div>

                <div className="summary-item">
                  <p>Biaya Transaksi</p>
                  <span>{formatRupiah(transactionFee)}</span>
                </div>

                <div className="summary-item total-summary">
                  <p>Total Pembayaran</p>
                  <span style={{ color: 'var(--primary-color)' }}>{formatRupiah(totalPrice)}</span>
                </div>

                {paymentState === 'idle' && (
                  <button className="checkout-button" onClick={handleCheckout}>
                    Bayar dengan QRIS
                  </button>
                )}

                {paymentState === 'showing_qr' && (
                  <div style={{ marginTop: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>Scan QR Code di bawah ini</p>
                    <div style={{ padding: '16px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', display: 'inline-block' }}>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rentameter-${totalPrice}`} alt="QR Code Payment" style={{ width: '200px', height: '200px' }} />
                    </div>
                    <p style={{ marginTop: '16px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Menunggu pembayaran...</p>
                    
                    <button 
                      className="checkout-button" 
                      style={{ marginTop: '24px', backgroundColor: '#10b981' }}
                      onClick={handleSimulatePayment}
                    >
                      Simulasikan Pembayaran Berhasil
                    </button>
                  </div>
                )}

                {paymentState === 'processing' && (
                  <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <div className="loading-spinner" style={{ margin: '0 auto 16px', width: '32px', height: '32px', border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Memproses pembayaran...</p>
                    <style jsx>{`
                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                    `}</style>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
