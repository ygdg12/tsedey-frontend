/**
 * Base URL for the backend API.
 *
 * - In production, set VITE_API_BASE_URL in .env (e.g. https://mongocheck.onrender.com).
 * - In dev, it falls back to https://mongocheck.onrender.com so the live backend just works.
 */
export const API_BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL)) ||
  'https://mongocheck.onrender.com'

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE.replace(/\/$/, '')}${p}`
}
