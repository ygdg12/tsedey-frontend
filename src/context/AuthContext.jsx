import { createContext, useContext, useCallback, useMemo, useState } from 'react'
import { apiUrl } from '../api.js'

const AUTH_KEY = 'tsedey_admin_token'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => {
    try {
      return window.localStorage.getItem(AUTH_KEY) || null
    } catch {
      return null
    }
  })

  const setToken = useCallback((value) => {
    setTokenState(value)
    try {
      if (value) window.localStorage.setItem(AUTH_KEY, value)
      else window.localStorage.removeItem(AUTH_KEY)
    } catch {
      // ignore
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await fetch(apiUrl('/api/auth/admin-login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json().catch(() => ({}))

    const token = data?.data?.token || data?.token
    if (!res.ok || !token || data.success === false) {
      throw new Error(data.message || data.error || 'Invalid email or password')
    }

    setToken(token)
    return data
  }, [setToken])

  const logout = useCallback(() => {
    setToken(null)
  }, [setToken])

  const value = useMemo(
    () => ({
      isAdmin: !!token,
      token,
      login,
      logout,
    }),
    [token, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function getAuthToken() {
  try {
    return window.localStorage.getItem(AUTH_KEY)
  } catch {
    return null
  }
}
