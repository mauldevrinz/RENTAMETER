// ========================================
// SECTIONS / ClientSection.js
// Client Portfolio Slider Section
// ========================================

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const CLIENT_LOGOS = [
  { name: 'Medco Energy', url: 'https://cms.tripatra.com/uploads/tripatra/originals/7d120b0e-3fff-4772-8db7-5d955ea6ed27.png' },
  { name: 'Kaltim Prana Industri', url: 'https://cms.tripatra.com/uploads/tripatra/originals/17dfd480-c687-4d86-92bd-cee8d05240b7.png' },
  { name: 'Kilang Pertamina Internasional', url: 'https://cms.tripatra.com/uploads/tripatra/originals/4724cda1-6b11-4d50-bae9-ab67fff7d41a.png' },
  { name: 'Pupuk Kaltim', url: 'https://cms.tripatra.com/uploads/tripatra/originals/29a1249a-5614-426f-856d-68d84fd5304f.png' },
  { name: 'Pupuk Indonesia', url: 'https://cms.tripatra.com/uploads/tripatra/originals/d2b112ad-4800-4909-b1b7-d40c17a986ae.png' },
  { name: 'Pertamina EP', url: 'https://cms.tripatra.com/uploads/tripatra/originals/4a8ce9b0-85e7-420c-aaa6-226f1d41240d.png' },
  { name: 'Pertamina Hulu Rokan', url: 'https://cms.tripatra.com/uploads/tripatra/originals/1283c8dc-083a-453b-8a4a-c7e4f373f6b0.png' },
  { name: 'Wilmar', url: 'https://cms.tripatra.com/uploads/tripatra/originals/dbb30bb0-5cae-4d9a-ae23-9a53ee7572c5.png' },
  { name: 'Cabot', url: 'https://cms.tripatra.com/uploads/tripatra/originals/e30ec78b-fc3e-4d93-a882-57e06de0e468.png' },
  { name: 'Vopak', url: 'https://cms.tripatra.com/uploads/tripatra/originals/1de8c1a9-8c55-4d1d-b8b2-9c58ebe9d247.png' },
  { name: 'PLN', url: 'https://cms.tripatra.com/uploads/tripatra/originals/f3b7b381-a49a-4a64-a5bf-a1ff3fda0409.png' },
  { name: 'PGN', url: 'https://cms.tripatra.com/uploads/tripatra/originals/0793c9bf-89ce-4325-9b74-94698f881340.png' },
  { name: 'Pertamina Gas', url: 'https://cms.tripatra.com/uploads/tripatra/originals/ec06d699-62ec-42e9-936f-726cf6aadc29.png' },
  { name: 'Exxon Mobil', url: 'https://cms.tripatra.com/uploads/tripatra/originals/b82a2bec-f1eb-4570-942e-d677a6197aa7.png' }
]

export default function ClientSection() {
  return (
    <section className="client-section" style={{ padding: '80px 0', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
      <div className="container">
        
        {/* HEADER */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', fontWeight: '800', color: '#0B3A64', marginBottom: '16px' }}>
            TELAH DIPERCAYA OLEH
          </h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: '#ef4444', margin: '0 auto' }}></div>
        </div>

        {/* LOGO SLIDER */}
        <div style={{ position: 'relative', padding: '0 40px' }}>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
              el: '.client-pagination'
            }}
            navigation={{
              nextEl: '.client-next',
              prevEl: '.client-prev',
            }}
            className="client-swiper"
          >
            {CLIENT_LOGOS.map((client, index) => (
              <SwiperSlide key={index}>
                <div style={{ 
                  height: '100px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease'
                }} 
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img 
                    src={client.url} 
                    alt={client.name} 
                    title={client.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'all 0.3s' }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* CUSTOM NAVIGATION CONTROLS */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
            <button className="client-prev" style={{
              width: '40px', height: '40px', borderRadius: '50%', background: 'white', border: '2px solid #0B3A64', color: '#0B3A64', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0
            }} onMouseOver={(e) => { e.currentTarget.style.background = '#0B3A64'; e.currentTarget.style.color = 'white'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#0B3A64'; }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            
            <div className="client-pagination" style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10, width: 'auto', position: 'relative', bottom: 'auto', left: 'auto' }}></div>

            <button className="client-next" style={{
              width: '40px', height: '40px', borderRadius: '50%', background: 'white', border: '2px solid #0B3A64', color: '#0B3A64', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0
            }} onMouseOver={(e) => { e.currentTarget.style.background = '#0B3A64'; e.currentTarget.style.color = 'white'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#0B3A64'; }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
