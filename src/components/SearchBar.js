// ========================================
// COMPONENTS / SearchBar.js
// Reusable Search Bar Component
// ========================================

export default function SearchBar({
  placeholder = 'Search products...',
  buttonText = 'Search'
}) {
  return (
    <div className="global-search-wrapper">

      <input
        type="text"
        placeholder={placeholder}
        className="global-search-input"
      />

      <button className="global-search-button">
        {buttonText}
      </button>

    </div>
  )
}