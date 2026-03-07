import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../App.css'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin/collection', { replace: true })
    } catch (err) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section section--admin">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin sign in</h1>
        <p className="admin-login-subtitle">
          Sign in to update collection products.
        </p>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="admin-login-error" role="alert">
              {error}
            </div>
          )}
          <label className="admin-label">
            Email
            <input
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@tsedeyactivewear.com"
              required
              autoComplete="email"
            />
          </label>
          <label className="admin-label">
            Password
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          <button
            type="submit"
            className="btn-primary admin-login-submit"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  )
}
