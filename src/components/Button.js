// ========================================
// COMPONENTS / Button.js
// Reusable Global Button Component
// ========================================

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false
}) {
  return (
    <button
      className={`
        global-button
        ${variant}
        ${fullWidth ? 'full-width' : ''}
      `}
    >
      {children}
    </button>
  )
}