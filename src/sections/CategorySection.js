// ========================================
// SECTIONS / CategorySection.js
// Marketplace Category Section
// ========================================

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const categorySlides = [
  {
    id: 1,
    name: 'Sensor & Transduser',
    image: '/images/categories/sensor-transducer.jpg',
    url: '/search?category=Sensor%20%26%20Transduser'
  },
  {
    id: 2,
    name: 'Transmitter',
    image: '/images/categories/transmitter.jpg',
    url: '/search?category=Transmitter'
  },
  {
    id: 3,
    name: 'Actuator & Control',
    image: '/images/categories/actuator-control.webp',
    url: '/search?category=Actuator%20%26%20Control'
  },
  {
    id: 4,
    name: 'Alat Kalibrasi',
    image: '/images/categories/alatkalibrasi.avif',
    url: '/search?category=Alat%20Kalibrasi'
  },
  {
    id: 5,
    name: 'Microcontroller',
    image: '/images/categories/microcontroller.avif',
    url: '/search?category=Microcontroller'
  }
]

export default function CategorySection() {
  return (
    <section className="category-section" style={{ padding: '80px 0', background: '#f8fafc', overflow: 'hidden' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ 
              color: '#0B3A64', 
              fontWeight: '800', 
              textTransform: 'uppercase', 
              fontSize: '2.5rem',
              marginBottom: '10px'
            }}>
              KATEGORI INSTRUMEN
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Jelajahi berbagai kategori instrumen industri dan peralatan elektronik.
            </p>
        </div>

        {/* SWIPER 3D COVERFLOW */}
        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={false}
            initialSlide={2}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 2.5,
              slideShadows: true,
            }}
            pagination={{
              el: '.swiper-pagination-custom',
              clickable: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
            style={{ paddingBottom: '20px', paddingTop: '20px' }}
          >
            {categorySlides.map((slide) => (
              <SwiperSlide key={slide.id} style={{ width: '280px', height: '400px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <Link href={slide.url} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div style={{ width: '100%', height: '80%', overflow: 'hidden' }}>
                    <img 
                      src={slide.image} 
                      alt={slide.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    />
                  </div>
                  <div style={{ height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', backgroundColor: 'white', borderTop: '3px solid #0B3A64' }}>
                    <h5 style={{ margin: 0, color: '#0B3A64', fontWeight: '700', fontSize: '1.1rem', textAlign: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {slide.name}
                      <span style={{ fontSize: '1.2rem' }}>›</span>
                    </h5>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* CUSTOM NAVIGATION & PAGINATION */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '0px' }}>
            <button className="swiper-button-prev-custom" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0B3A64', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(11,58,100,0.3)', flexShrink: 0 }}>
              ‹
            </button>
            <div className="swiper-pagination-custom" style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10, width: 'auto', position: 'relative', bottom: 'auto', left: 'auto' }}></div>
            <button className="swiper-button-next-custom" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0B3A64', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(11,58,100,0.3)', flexShrink: 0 }}>
              ›
            </button>
          </div>

        </div>
      </div>

    </section>
  )
}