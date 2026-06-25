// ========================================
// SECTIONS / HeroSection.js
// Homepage Hero Marketplace Section
// ========================================

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const BANNERS = [
  '/images/banners/BANNER1.jpg',
  '/images/banners/BANNER2.jpg',
  '/images/banners/BANNER3.jpg'
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* SLIDING BACKGROUNDS */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 0
          }}
        >
          <img 
            src={BANNERS[currentSlide]} 
            alt={`Banner ${currentSlide + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Dark Overlay for Text Readability */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(15, 23, 42, 0.3) 100%)'
          }} />
        </motion.div>
      </AnimatePresence>

      <div className="container hero-container" style={{ position: 'relative', zIndex: 1, minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', width: '100%' }}>
          {/* LEFT CONTENT */}
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
            viewport={{ once: true }} 
          >


            <h1 className="hero-title" style={{ color: 'white' }}>
              Temukan & Sewa
              <span style={{ 
                color: '#38BDF8', 
                WebkitTextFillColor: 'initial', 
                background: 'none',
                display: 'block'
              }}> Instrumen<br />Industri</span>
            </h1>

            <p className="hero-description" style={{ color: '#CBD5E1' }}>
              Temukan berbagai sensor & transduser, transmitter, 
              actuator & control, alat kalibrasi, hingga 
              microcontroller untuk kebutuhan industri Anda.
            </p>

            <div className="hero-actions">
              <Link href="/search" className="hero-primary-btn">
                Telusuri Alat
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE - Logo omitted or styled cleanly */}
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, y: 60 }} 
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} 
            viewport={{ once: true }}
            style={{ display: 'none' }} // Hidden to focus on the background slider, can be re-enabled if needed
          >
          </motion.div>
        </div>

        {/* INDICATORS (User Requested Layout) */}
        <div 
          className="carousel-indicators justify-content-center justify-content-md-start column-gap-2" 
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '60px',
            position: 'absolute',
            bottom: '40px'
          }}
        >
          {BANNERS.map((_, index) => (
            <button 
              key={index}
              type="button" 
              className={`px-3 ${currentSlide === index ? 'active' : ''}`}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: currentSlide === index ? '40px' : '12px',
                height: '12px',
                borderRadius: '99px',
                background: currentSlide === index ? '#38BDF8' : 'rgba(255,255,255,0.5)',
                border: 'none',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                padding: 0
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}