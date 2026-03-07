import { useState } from 'react'

const logoSvg = (
  <svg
    viewBox="0 0 80 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
  >
    <rect x="20" y="72" width="40" height="12" rx="2" fill="#1a5f2a" />
    <rect x="34" y="24" width="12" height="50" rx="2" fill="#7bc043" />
    <path d="M 34 24 Q 8 40 14 72" stroke="#7bc043" strokeWidth="14" strokeLinecap="round" fill="none" />
    <path d="M 46 24 Q 72 40 66 72" stroke="#d4e157" strokeWidth="14" strokeLinecap="round" fill="none" />
  </svg>
)

export default function Logo({ className, alt = 'Tsedey Activewear logo', ...props }) {
  const [useFallback, setUseFallback] = useState(false)

  if (useFallback) {
    return (
      <span className={className} role="img" aria-label={alt} style={{ display: 'inline-block' }}>
        {logoSvg}
      </span>
    )
  }

  return (
    <img
      src="/tsedey-logo.png"
      alt={alt}
      className={className}
      onError={() => setUseFallback(true)}
      {...props}
    />
  )
}
