// ========================================
// SECTIONS / ProductSection.js
// Homepage Featured Product Section
// ========================================

import ProductCard from '../components/ProductCard'
import productsData from '../data/products'

export default function ProductSection() {
  // Use first 4 products for featured section
  const products = productsData.slice(0, 8)
  return (
    <section className="product-section">

      <div className="container">

        {/* HEADER */}
        <div className="section-header">

          <h2 className="section-title">
            Produk Unggulan
          </h2>

          <p className="section-description">
            Jelajahi instrumen populer yang tersedia
            untuk disewa dan dibeli.
          </p>

        </div>

        {/* PRODUCT GRID */}
        <div className="product-grid">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              category={product.category}
              rentPrice={product.rentPrice}
              buyPrice={product.buyPrice}
              rating={product.rating}
              reviews={product.reviews}
            />
          ))}

        </div>

      </div>

    </section>
  )
}