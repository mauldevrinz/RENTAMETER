import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState('menu') // 'menu', 'chat', 'complaint'
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [complaintForm, setComplaintForm] = useState({ subject: '', message: '' })
  const [isSent, setIsSent] = useState(false)
  
  const messagesEndRef = useRef(null)
  const router = useRouter()

  // Hide on login/register pages
  const hiddenPages = ['/login', '/register']
  const shouldHide = hiddenPages.includes(router.pathname)

  // Initialize and check user
  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (e) {
          console.error(e)
        }
      } else {
        setUser(null)
      }
    }

    checkUser()
    window.addEventListener('storage', checkUser)
    router.events.on('routeChangeComplete', checkUser)

    return () => {
      window.removeEventListener('storage', checkUser)
      router.events.off('routeChangeComplete', checkUser)
    }
  }, [])

  // Load and sync chat messages
  useEffect(() => {
    const loadMessages = () => {
      const storedChats = localStorage.getItem('rentameter_chats')
      if (storedChats) {
        try {
          setMessages(JSON.parse(storedChats))
        } catch (e) {
          console.error(e)
        }
      }
    }
    loadMessages()
    const intervalId = setInterval(loadMessages, 1000)
    window.addEventListener('storage', loadMessages)
    return () => {
      clearInterval(intervalId)
      window.removeEventListener('storage', loadMessages)
    }
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    if (messagesEndRef.current && view === 'chat') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, view])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim() || !user) return

    const newMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      text: inputValue.trim(),
      timestamp: new Date().toISOString()
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    localStorage.setItem('rentameter_chats', JSON.stringify(updatedMessages))
    setInputValue('')
  }

  const handleSendComplaint = (e) => {
    e.preventDefault()
    if (!complaintForm.subject || !complaintForm.message || !user) return
    
    // Save to global complaints list for Admin
    const newComplaint = {
      id: 'CMP-' + Date.now(),
      user: user.name,
      userEmail: user.email,
      subject: complaintForm.subject,
      message: complaintForm.message,
      date: new Date().toISOString(),
      status: 'Terbuka'
    }

    const existingComplaints = JSON.parse(localStorage.getItem('rentameter_complaints') || '[]')
    localStorage.setItem('rentameter_complaints', JSON.stringify([newComplaint, ...existingComplaints]))

    setIsSent(true)
    setTimeout(() => {
      setIsSent(false)
      setComplaintForm({ subject: '', message: '' })
      setView('menu')
    }, 3000)
  }

  const toggleWidget = () => {
    setIsOpen(!isOpen)
    if (isOpen) {
      setView('menu')
      setIsSent(false)
    }
  }

  if (shouldHide) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* MAIN PANEL */}
      {isOpen && (
        <div style={{
          width: '350px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          marginBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #e5e7eb'
        }}>
          
          {/* HEADER */}
          <div style={{
            backgroundColor: '#0B3A64',
            padding: '16px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {view !== 'menu' && (
              <button 
                onClick={() => setView('menu')}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0', display: 'flex' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
            )}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                {view === 'menu' ? 'Pusat Bantuan' : (view === 'chat' ? 'Layanan Chat' : 'Form Pengaduan')}
              </h3>
              <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.8 }}>Rentameter Support</p>
            </div>
            <button 
              onClick={toggleWidget}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* VIEW CONTENT */}
          <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
            
            {/* MENU VIEW */}
            {view === 'menu' && (
              <div style={{ padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <h4 style={{ color: '#0B3A64', marginBottom: '8px' }}>Ada yang bisa kami bantu?</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Silakan pilih jenis layanan bantuan</p>
                </div>

                <button 
                  onClick={() => {
                    if (!user) {
                      router.push('/login')
                      setIsOpen(false)
                    } else {
                      setView('chat')
                    }
                  }}
                  style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#0B3A64'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                  <div style={{ backgroundColor: '#0B3A64', color: 'white', padding: '10px', borderRadius: '10px', display: 'flex' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#1e293b' }}>Layanan Chat { !user && <span style={{ fontSize: '0.6rem', color: '#ef4444' }}>(Login Wajib)</span> }</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Tanya admin secara langsung</div>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    if (!user) {
                      router.push('/login')
                      setIsOpen(false)
                    } else {
                      setView('complaint')
                    }
                  }}
                  style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#ef4444'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                  <div style={{ backgroundColor: '#ef4444', color: 'white', padding: '10px', borderRadius: '10px', display: 'flex' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#1e293b' }}>Pengaduan { !user && <span style={{ fontSize: '0.6rem', color: '#ef4444' }}>(Login Wajib)</span> }</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Kirim laporan via email resmi</div>
                  </div>
                </button>
              </div>
            )}

            {/* CHAT VIEW */}
            {view === 'chat' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {messages.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', marginTop: 'auto', marginBottom: 'auto' }}>
                      Belum ada pesan. Silakan menyapa admin!
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isMe = user && msg.senderId === user.id
                      return (
                        <div key={msg.id} style={{
                          alignSelf: isMe ? 'flex-end' : 'flex-start',
                          maxWidth: '85%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: isMe ? 'flex-end' : 'flex-start'
                        }}>
                          <div style={{
                            backgroundColor: isMe ? '#0B3A64' : (msg.senderRole === 'admin' ? '#10b981' : 'white'),
                            color: isMe || msg.senderRole === 'admin' ? 'white' : '#1f2937',
                            padding: '10px 14px',
                            borderRadius: '14px',
                            fontSize: '0.9rem',
                            border: !isMe && msg.senderRole !== 'admin' ? '1px solid #e5e7eb' : 'none'
                          }}>
                            {msg.text}
                          </div>
                        </div>
                      )
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                  {user ? (
                    <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Tulis pesan..."
                        style={{ flex: 1, padding: '10px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.9rem' }}
                      />
                      <button type="submit" style={{ backgroundColor: '#0B3A64', color: 'white', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      </button>
                    </form>
                  ) : (
                    <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
                      Silakan <Link href="/login" style={{ color: '#0B3A64', fontWeight: '700' }}>Login</Link> untuk chat
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* COMPLAINT VIEW */}
            {view === 'complaint' && (
              <div style={{ padding: '20px', flex: 1 }}>
                {isSent ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ backgroundColor: '#10b981', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h4 style={{ color: '#0B3A64', marginBottom: '8px' }}>Laporan Terkirim!</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Admin akan meninjau laporan Anda dan menghubungi melalui email.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSendComplaint} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#1e293b' }}>Subjek Laporan</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Misal: Kerusakan Alat, Kendala Sewa"
                        value={complaintForm.subject}
                        onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.9rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#1e293b' }}>Detail Masalah</label>
                      <textarea 
                        required
                        rows="5"
                        placeholder="Jelaskan secara detail kendala yang Anda alami..."
                        value={complaintForm.message}
                        onChange={(e) => setComplaintForm({ ...complaintForm, message: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.9rem', resize: 'none' }}
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      style={{ backgroundColor: '#ef4444', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem', marginTop: '10px' }}
                    >
                      Kirim Laporan
                    </button>
                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center' }}>
                      Laporan akan diteruskan ke admin@rentameter.com
                    </p>
                  </form>
                )}
              </div>
            )}

          </div>

        </div>
      )}

      {/* FLOATING BUTTON */}
      <button 
        onClick={toggleWidget}
        style={{
          width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#0B3A64', color: 'white',
          boxShadow: '0 4px 12px rgba(11, 58, 100, 0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s', transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>

    </div>
  )
}
