// ========================================
// PAGES / payment/success.js
// Payment Success + Digital Contract Page
// ========================================

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function PaymentSuccessPage() {
  const [transaction, setTransaction] = useState(null)
  const contractRef = useRef(null)

  useEffect(() => {
    const data = localStorage.getItem('last_transaction')
    if (data) {
      try {
        setTransaction(JSON.parse(data))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number)
  }

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDownloadPDF = async () => {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    const t = transaction

    // Header
    doc.setFillColor(59, 130, 246)
    doc.rect(0, 0, 210, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('RENTAMETER', 20, 18)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text('Kontrak Digital Transaksi', 20, 28)
    doc.text(t.id, 20, 35)

    // Reset color
    doc.setTextColor(30, 30, 30)

    // Status badge
    doc.setFillColor(16, 185, 129)
    doc.roundedRect(140, 45, 50, 12, 3, 3, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('LUNAS', 155, 53)

    doc.setTextColor(30, 30, 30)

    // Info section
    let y = 55
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    y += 15
    doc.text('Detail Transaksi', 20, y)

    doc.setDrawColor(200, 200, 200)
    y += 5
    doc.line(20, y, 190, y)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')

    const addRow = (label, value) => {
      y += 10
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text(label, 20, y)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(30, 30, 30)
      doc.text(value, 90, y)
    }

    addRow('Tanggal', formatDate(t.date))
    addRow('Produk', t.productTitle)
    addRow('Kategori', t.productCategory)
    addRow('Tipe Transaksi', t.mode === 'rent' ? `Sewa (${t.rentDays} Hari)` : 'Pembelian')
    addRow('Metode Bayar', t.paymentMethod)

    // Buyer info
    y += 15
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 30, 30)
    doc.text('Informasi Pembeli', 20, y)
    y += 5
    doc.line(20, y, 190, y)
    doc.setFontSize(10)

    addRow('Nama', t.buyerName)
    addRow('Email', t.buyerEmail)

    // Financial Summary
    y += 15
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 30, 30)
    doc.text('Rincian Biaya', 20, y)
    y += 5
    doc.line(20, y, 190, y)
    doc.setFontSize(10)

    addRow('Subtotal', formatRupiah(t.subtotal))
    addRow('Biaya Transaksi', formatRupiah(t.transactionFee))

    // Total highlight
    y += 15
    doc.setFillColor(240, 245, 255)
    doc.roundedRect(15, y - 7, 180, 16, 3, 3, 'F')
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(59, 130, 246)
    doc.text('TOTAL PEMBAYARAN', 20, y + 3)
    doc.text(formatRupiah(t.totalPrice), 140, y + 3)

    // Footer
    y += 30
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(150, 150, 150)
    doc.text('Dokumen ini digenerate secara otomatis oleh sistem Rentameter.', 20, y)
    doc.text('Kontrak ini berlaku sebagai bukti sah transaksi digital.', 20, y + 5)
    doc.text(`Digenerate pada: ${formatDate(new Date().toISOString())}`, 20, y + 10)

    doc.save(`Kontrak-${t.id}.pdf`)
  }

  if (!transaction) {
    return (
      <>
        <Navbar />
        <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#6b7280' }}>Tidak ada transaksi ditemukan.</p>
            <Link href="/" style={{ color: '#3b82f6', fontWeight: '600', textDecoration: 'none' }}>
              Kembali ke Beranda
            </Link>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <section style={{ minHeight: '70vh', padding: '40px 16px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* SUCCESS HEADER */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px', height: '80px', backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: '#1f2937' }}>Pembayaran Berhasil!</h1>
            <p style={{ color: '#6b7280' }}>Kontrak digital Anda telah dibuat secara otomatis.</p>
          </div>

          {/* CONTRACT PREVIEW */}
          <div ref={contractRef} style={{
            backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            overflow: 'hidden', border: '1px solid #e5e7eb'
          }}>
            
            {/* Contract Header */}
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              padding: '32px', color: 'white'
            }}>
              <div className="contract-header-inner">
                <div>
                  <h2 style={{ margin: '0 0 4px', fontSize: '1.5rem', fontWeight: '800' }}>RENTAMETER</h2>
                  <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.8 }}>Kontrak Digital Transaksi</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    backgroundColor: '#10b981', padding: '6px 16px', borderRadius: '20px',
                    fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px'
                  }}>
                    {transaction.status.toUpperCase()}
                  </span>
                  <p style={{ margin: '8px 0 0', fontSize: '0.75rem', opacity: 0.8 }}>{transaction.id}</p>
                </div>
              </div>
            </div>

            {/* Contract Body */}
            <div className="contract-body">
              
              {/* Transaction Detail */}
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px',
                borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
                Detail Transaksi
              </h3>
              <div className="contract-detail-grid">
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 4px' }}>Tanggal</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>{formatDate(transaction.date)}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 4px' }}>Metode Pembayaran</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>{transaction.paymentMethod}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 4px' }}>Produk</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>{transaction.productTitle}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 4px' }}>Tipe Transaksi</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                    {transaction.mode === 'rent' ? `Sewa (${transaction.rentDays} Hari)` : 'Pembelian'}
                  </p>
                </div>
              </div>

              {/* Buyer Info */}
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px',
                borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
                Informasi Pembeli
              </h3>
              <div className="contract-detail-grid">
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 4px' }}>Nama</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>{transaction.buyerName}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 4px' }}>Email</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>{transaction.buyerEmail}</p>
                </div>
              </div>

              {/* Financial Summary */}
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px',
                borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
                Rincian Biaya
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {transaction.mode === 'rent' ? `Harga Sewa (${transaction.rentDays} Hari)` : 'Harga Beli'}
                  </span>
                  <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.875rem' }}>{formatRupiah(transaction.subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Biaya Transaksi</span>
                  <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.875rem' }}>{formatRupiah(transaction.transactionFee)}</span>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '16px', backgroundColor: '#eff6ff', borderRadius: '12px',
                  marginTop: '8px'
                }}>
                  <span style={{ fontWeight: '700', color: '#1f2937', fontSize: '1rem' }}>Total Pembayaran</span>
                  <span style={{ fontWeight: '800', color: '#3b82f6', fontSize: '1.25rem' }}>{formatRupiah(transaction.totalPrice)}</span>
                </div>
              </div>

              {/* Legal Notice */}
              <div style={{
                backgroundColor: '#f9fafb', borderRadius: '12px', padding: '16px',
                border: '1px solid #e5e7eb', marginTop: '16px'
              }}>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 4px', lineHeight: '1.6' }}>
                  Dokumen ini digenerate secara otomatis oleh sistem Rentameter dan berlaku sebagai bukti sah transaksi digital.
                  Dengan melakukan pembayaran, Anda menyetujui syarat dan ketentuan yang berlaku.
                </p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="success-actions" style={{ display: 'flex', gap: '16px', marginTop: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleDownloadPDF}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '16px 32px', backgroundColor: '#3b82f6', color: 'white',
                border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem',
                cursor: 'pointer', transition: 'opacity 0.2s', boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
              onMouseOut={(e) => e.currentTarget.style.opacity = 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download PDF
            </button>
            
            <Link 
              href="/" 
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '16px 32px', backgroundColor: 'white', color: '#1f2937',
                textDecoration: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '1rem',
                border: '2px solid #e5e7eb', transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </section>

      <Footer />

      <style jsx>{`
        .contract-header-inner {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .contract-body {
          padding: 32px;
        }
        .contract-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }
        @media (max-width: 640px) {
          .contract-header-inner {
            flex-direction: column;
            gap: 12px;
          }
          .contract-body {
            padding: 20px;
          }
          .contract-detail-grid {
            grid-template-columns: 1fr;
          }
          .success-actions {
            flex-direction: column !important;
          }
          .success-actions button,
          .success-actions a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}
