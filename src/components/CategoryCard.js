// ========================================
// COMPONENTS / CategoryCard.js
// Reusable Category Card Component
// ========================================

export default function CategoryCard({
  icon,
  name
}) {
  return (
    <div className="global-category-card">

      <div className="global-category-icon">
        {icon}
      </div>

      <h3 className="global-category-name">
        {name}
      </h3>

    </div>
  )
}