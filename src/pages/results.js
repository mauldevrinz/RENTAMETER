// ========================================
// PAGES / results.js
// Search Result Page
// ========================================

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

export default function ResultPage() {
  // Use products from data file
  const searchResults = products.slice(0, 4)
  return (
    <>

      {/* NAVBAR */}
      <Navbar />

      {/* RESULT PAGE */}
      <section className="result-page">

        <div className="container">

          {/* TOP INFO */}
          <div className="result-top">

            <div>

              <h1 className="result-title">
                Search Results
              </h1>

              <p className="result-description">
                Showing results for :
                <span> "oscilloscope"</span>
              </p>

            </div>

            <div className="result-count">
              24 Products Found
            </div>

          </div>

          {/* GRID */}
          <div className="result-grid">

            {searchResults.map((product) => (
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

          {/* PAGINATION */}
          <div className="pagination-wrapper">

            <button className="pagination-button active-page">
              1
            </button>

            <button className="pagination-button">
              2
            </button>

            <button className="pagination-button">
              3
            </button>

            <button className="pagination-button">
              Next
            </button>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </>
  )
}