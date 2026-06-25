// ========================================
// COMPONENTS / ProductCard.js
// Marketplace Product Card Template
// ========================================

import Link from 'next/link'

export default function ProductCard({
  id,
  image,
  title,
  category,
  rentPrice,
  buyPrice,
  rating = 5.0,
  reviews = 0
}) {
  return (
    <div className="product-card">

      {/* IMAGE */}
      <Link href={`/product/${id}`} className="product-image-wrapper">
        <img
          src={image}
          alt={title}
          className="product-image"
        />
      </Link>

      {/* CONTENT */}
      <div className="product-content">

        <p className="product-category">
          {category}
        </p>

        <Link href={`/product/${id}`}>
          <h3 className="product-title">
            {title}
          </h3>
        </Link>

        {/* RATING */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{rating}</span>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>({reviews})</span>
        </div>

        <div className="product-price-group">
          <p className="product-rent">
            Sewa : <span>{rentPrice}</span>
          </p>

          <p className="product-buy">
            Beli : <span>{buyPrice}</span>
          </p>
        </div>

        {/* ACTION - Opens in same tab */}
        <div className="product-actions">

          <Link
            href={`/checkout/${id}?mode=rent`}
            className="rent-button"
          >
            Sewa
          </Link>

          <Link
            href={`/checkout/${id}?mode=buy`}
            className="buy-button"
          >
            Beli
          </Link>

        </div>

      </div>
    </div>
  )
}