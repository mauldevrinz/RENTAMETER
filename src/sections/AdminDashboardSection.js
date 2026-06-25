import { useState, useEffect } from 'react'

export default function AdminDashboardSection() {
  const [activeTab, setActiveTab] = useState('overview')
  const [transactions, setTransactions] = useState([])
  const [complaints, setComplaints] = useState([])
  const [allChats, setAllChats] = useState([])
  const [selectedChatUser, setSelectedChatUser] = useState(null)

  // Fetch data from localStorage
  useEffect(() => {
    const fetchData = () => {
      // Transactions
      const storedOrders = JSON.parse(localStorage.getItem('rentameter_orders') || '[]')
      setTransactions(storedOrders)

      // Complaints
      const storedComplaints = JSON.parse(localStorage.getItem('rentameter_complaints') || '[]')
      setComplaints(storedComplaints)

      // Chats
      const storedChats = JSON.parse(localStorage.getItem('rentameter_chats') || '[]')
      setAllChats(storedChats)
    }

    fetchData()
    const interval = setInterval(fetchData, 2000)
    return () => clearInterval(interval)
  }, [])

  // Calculate dynamic stats
  const stats = {
    revenue: transactions.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0),
    activeOrders: transactions.filter(t => t.status !== 'Selesai').length,
    totalUsers: Array.from(new Set(transactions.map(t => t.buyerEmail))).length,
    newComplaints: complaints.filter(c => c.status === 'Terbuka').length
  }

  // Group chats by user
  const chatUsers = Array.from(new Set(allChats.filter(c => c.senderRole !== 'admin').map(c => c.senderName)))

  const renderOverview = () => (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <StatCard 
          title="Total Pendapatan" 
          value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(stats.revenue)} 
          trend="+12.5%" 
          trendUp={true}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>} 
        />
        <StatCard 
          title="Transaksi Aktif" 
          value={`${stats.activeOrders} Pesanan`} 
          trend="+5 hari ini" 
          trendUp={true}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>}
        />
        <StatCard 
          title="Laporan Masuk" 
          value={`${stats.newComplaints} Pengaduan`} 
          trend="Perlu Respon" 
          trendUp={false}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>}
        />
        <StatCard 
          title="Basis Pelanggan" 
          value={`${stats.totalUsers} User`} 
          trend="+120 bln ini" 
          trendUp={true}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.2fr', gap: '24px' }}>
        {/* RECENT ACTIVITY TABLE */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>Aktivitas Penjualan & Sewa</h3>
            <button onClick={() => setActiveTab('transactions')} style={{ fontSize: '0.8rem', color: '#0B3A64', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>Lihat Semua</button>
          </div>
          <div style={{ padding: '0 20px' }}>
            {transactions.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Belum ada transaksi.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left' }}>
                    <th style={{ padding: '16px 0', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User</th>
                    <th style={{ padding: '16px 0', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Item</th>
                    <th style={{ padding: '16px 0', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map(trx => (
                    <tr key={trx.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 0' }}>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#334155' }}>{trx.buyerName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{trx.id}</div>
                      </td>
                      <td style={{ padding: '16px 0' }}>
                        <div style={{ fontSize: '0.85rem', color: '#475569' }}>{trx.productTitle}</div>
                        <div style={{ fontSize: '0.75rem', color: trx.mode === 'rent' ? '#0B3A64' : '#ef4444', fontWeight: '700' }}>{trx.mode === 'rent' ? 'SEWA' : 'BELI'}</div>
                      </td>
                      <td style={{ padding: '16px 0' }}>
                        <span style={{ 
                          padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700',
                          backgroundColor: trx.status === 'Lunas' ? '#f0fdf4' : '#fffbeb',
                          color: trx.status === 'Lunas' ? '#166534' : '#92400e',
                          border: `1px solid ${trx.status === 'Lunas' ? '#bbf7d0' : '#fef08a'}`
                        }}>{trx.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* RECENT COMPLAINTS LIST */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>Pengaduan Terbaru</h3>
          </div>
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {complaints.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Tidak ada pengaduan.</div>
            ) : (
              complaints.map(cmp => (
                <div key={cmp.id} style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#ef4444' }}>{cmp.subject}</span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{new Date(cmp.date).toLocaleDateString()}</span>
                  </div>
                  <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#1e293b', marginBottom: '4px' }}>{cmp.user}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{cmp.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = transactions.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    )
    localStorage.setItem('rentameter_orders', JSON.stringify(updatedOrders))
    setTransactions(updatedOrders)
  }

  const renderTransactions = () => (
    <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Riwayat Seluruh Transaksi</h3>
      </div>
      <div style={{ padding: '0 20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b' }}>ID</th>
              <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b' }}>Pelanggan</th>
              <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b' }}>Produk</th>
              <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b' }}>Metode</th>
              <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b' }}>Total</th>
              <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(trx => (
              <tr key={trx.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700' }}>{trx.id}</td>
                <td style={{ padding: '16px', fontSize: '0.85rem' }}>{trx.buyerName}</td>
                <td style={{ padding: '16px', fontSize: '0.85rem' }}>{trx.productTitle}</td>
                <td style={{ padding: '16px', fontSize: '0.85rem' }}>{trx.paymentMethod}</td>
                <td style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700' }}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(trx.totalPrice)}</td>
                <td style={{ padding: '16px' }}>
                  <select 
                    value={trx.status} 
                    onChange={(e) => handleStatusChange(trx.id, e.target.value)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      border: `1px solid ${getStatusColor(trx.status).border}`,
                      backgroundColor: getStatusColor(trx.status).bg,
                      color: getStatusColor(trx.status).text,
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="Lunas">Lunas</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Dikirim">Dikirim</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderComplaints = () => (
    <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Laporan Pengaduan User</h3>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {complaints.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Tidak ada pengaduan masuk.</div>
        ) : (
          complaints.map(cmp => (
            <div key={cmp.id} style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ padding: '4px 8px', backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700' }}>{cmp.id}</span>
                  <span style={{ fontWeight: '700', color: '#0B3A64' }}>{cmp.subject}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{new Date(cmp.date).toLocaleDateString('id-ID')}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#1e293b', marginBottom: '12px', fontWeight: '500' }}>Oleh: {cmp.user}</div>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>"{cmp.message}"</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                <span style={{ 
                  padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700',
                  backgroundColor: cmp.status === 'Terbuka' ? '#fecaca' : '#fef9c3',
                  color: cmp.status === 'Terbuka' ? '#991b1b' : '#854d0e'
                }}>{cmp.status}</span>
                <button style={{ padding: '6px 12px', backgroundColor: '#0B3A64', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Tanggapi</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderChats = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', height: '600px' }}>
      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '20px' }}>Daftar Chat User</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {chatUsers.map(userName => (
            <button 
              key={userName}
              onClick={() => setSelectedChatUser(userName)}
              style={{
                padding: '12px', border: '1px solid #f1f5f9', borderRadius: '8px', textAlign: 'left',
                backgroundColor: selectedChatUser === userName ? '#f1f5f9' : 'white', cursor: 'pointer'
              }}
            >
              <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{userName}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Lihat percakapan</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
        {selectedChatUser ? (
          <>
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', fontWeight: '800' }}>Chat Log: {selectedChatUser}</div>
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {allChats.filter(c => c.senderName === selectedChatUser || (c.senderRole === 'admin' && c.recipientName === selectedChatUser)).map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.senderRole === 'admin' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                  <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: msg.senderRole === 'admin' ? '#0B3A64' : '#f1f5f9', color: msg.senderRole === 'admin' ? 'white' : '#1e293b', fontSize: '0.85rem' }}>
                    {msg.text}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '4px', textAlign: msg.senderRole === 'admin' ? 'right' : 'left' }}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Pilih user untuk melihat log chat</div>
        )}
      </div>
    </div>
  )

  const renderUsers = () => {
    // Extract unique users from transactions
    const uniqueUsers = transactions.reduce((acc, curr) => {
      const existing = acc.find(u => u.email === curr.buyerEmail)
      if (existing) {
        existing.totalSpent += curr.totalPrice
        existing.orderCount += 1
      } else {
        acc.push({
          name: curr.buyerName,
          email: curr.buyerEmail,
          totalSpent: curr.totalPrice,
          orderCount: 1,
          joinDate: curr.date
        })
      }
      return acc
    }, [])

    return (
      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Daftar Pelanggan Aktif</h3>
        </div>
        <div style={{ padding: '0 20px' }}>
          {uniqueUsers.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Belum ada pelanggan terdaftar.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b' }}>Nama</th>
                  <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b' }}>Email</th>
                  <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b' }}>Total Pesanan</th>
                  <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b' }}>Total Belanja</th>
                  <th style={{ padding: '16px', fontSize: '0.8rem', color: '#64748b' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {uniqueUsers.map((user, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700' }}>{user.name}</td>
                    <td style={{ padding: '16px', fontSize: '0.85rem' }}>{user.email}</td>
                    <td style={{ padding: '16px', fontSize: '0.85rem' }}>{user.orderCount} Transaksi</td>
                    <td style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700' }}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(user.totalSpent)}</td>
                    <td style={{ padding: '16px' }}>
                      <button style={{ padding: '6px 12px', background: 'none', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Lunas': return { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' }
      case 'Diproses': return { bg: '#eff6ff', text: '#1e40af', border: '#dbeafe' }
      case 'Dikirim': return { bg: '#fef9c3', text: '#854d0e', border: '#fef08a' }
      case 'Selesai': return { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' }
      default: return { bg: '#f8fafc', text: '#64748b', border: '#e2e8f0' }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload() // Force reload to trigger index.js role check
  }

  return (
    <section style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex' }}>
      {/* SIDEBAR */}
      <div style={{ width: '280px', backgroundColor: '#0B3A64', color: 'white', padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-0.5px' }}>ADMIN PANEL<span style={{ color: '#ef4444' }}>.</span></div>
          <div style={{ fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase', marginTop: '4px' }}>Rentameter Industrial</div>
        </div>

        <SidebarLink active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Ringkasan Umum" icon="grid" />
        <SidebarLink active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} label="Transaksi Checkout" icon="shopping-bag" />
        <SidebarLink active={activeTab === 'complaints'} onClick={() => setActiveTab('complaints')} label="Pengaduan User" icon="alert-circle" />
        <SidebarLink active={activeTab === 'chats'} onClick={() => setActiveTab('chats')} label="Manajemen Chat" icon="chat" />
        <SidebarLink active={activeTab === 'products'} onClick={() => setActiveTab('products')} label="Kelola Alat" icon="package" />
        <SidebarLink active={activeTab === 'users'} onClick={() => setActiveTab('users')} label="Daftar Pelanggan" icon="users" />
        
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SidebarLink active={false} onClick={() => {}} label="Pengaturan" icon="settings" />
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '10px',
              color: '#f87171',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              fontWeight: '700',
              opacity: 0.8
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.opacity = 1; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.opacity = 0.8; }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Keluar Akun
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: '40px' }}>
        {/* TOP BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A' }}>
              {activeTab === 'overview' ? 'Selamat Datang, Admin' : (activeTab === 'transactions' ? 'Manajemen Transaksi' : (activeTab === 'chats' ? 'Log Percakapan User' : 'Laporan Pengaduan'))}
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Pantau dan kelola aktivitas pasar Rentameter hari ini.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '700', color: '#0F172A' }}>Administrator</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>admin@rentameter.com</div>
            </div>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B3A64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
          </div>
        </div>

        {/* TAB CONTENT */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'complaints' && renderComplaints()}
        {activeTab === 'chats' && renderChats()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'products' && (
          <div style={{ textAlign: 'center', padding: '100px 0', backgroundColor: 'white', borderRadius: '16px' }}>
            <h2 style={{ color: '#0B3A64' }}>Fitur sedang dikembangkan</h2>
            <p style={{ color: '#64748b' }}>Halaman {activeTab} akan segera tersedia.</p>
          </div>
        )}
      </div>

    </section>
  )
}

function StatCard({ title, value, trend, trendUp, icon }) {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '12px', 
      border: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '140px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.025em' }}>{title}</div>
        <div style={{ color: '#0B3A64', backgroundColor: '#f1f5f9', padding: '8px', borderRadius: '8px', display: 'flex' }}>
          {icon}
        </div>
      </div>
      <div>
        <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>{value}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: '700',
            color: trendUp ? '#10b981' : '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            {trendUp ? '↑' : '→'} {trend}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>vs bln lalu</span>
        </div>
      </div>
    </div>
  )
}

function SidebarLink({ active, onClick, label, icon }) {
  return (
    <button 
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px 16px',
        backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s',
        fontWeight: active ? '700' : '500',
        opacity: active ? 1 : 0.7
      }}
      onMouseOver={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.opacity = 1; }}
      onMouseOut={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; if (!active) e.currentTarget.style.opacity = 0.7; }}
    >
      <div style={{ display: 'flex' }}>
        {icon === 'grid' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>}
        {icon === 'shopping-bag' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>}
        {icon === 'chat' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
        {icon === 'alert-circle' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>}
        {icon === 'package' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.27 6.96 8.73 5.05 8.73-5.05"></path><path d="M12 22.08V12"></path></svg>}
        {icon === 'users' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
        {icon === 'settings' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>}
      </div>
      {label}
    </button>
  )
}
