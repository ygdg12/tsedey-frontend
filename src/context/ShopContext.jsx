import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiUrl } from '../api.js'
import { getAuthToken } from './AuthContext.jsx'

const ANONYMOUS_ID_KEY = 'tsedey_anonymous_user_id'

function getAnonymousId() {
  if (typeof window === 'undefined') return ''
  try {
    let id = window.localStorage.getItem(ANONYMOUS_ID_KEY)
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'anon-' + Date.now() + '-' + Math.random().toString(36).slice(2)
      window.localStorage.setItem(ANONYMOUS_ID_KEY, id)
    }
    return id
  } catch {
    return ''
  }
}

const ShopContext = createContext(null)

// no static PRODUCTS; list comes only from backend

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [cartLoading, setCartLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true)
    try {
      const res = await fetch(apiUrl('/api/products'))
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) {
          setProducts(data)
        }
      }
    } catch {
      // keep whatever products we already have in memory
    } finally {
      setProductsLoading(false)
    }
  }, [])

  const fetchCart = useCallback(async () => {
    const anonymousId = getAnonymousId()
    if (!anonymousId) {
      setCartLoading(false)
      return
    }
    setCartLoading(true)
    try {
      const res = await fetch(apiUrl('/api/cart'), {
        headers: { 'X-Anonymous-User-Id': anonymousId },
      })
      if (res.ok) {
        const data = await res.json()
        const items = Array.isArray(data.items) ? data.items : (Array.isArray(data) ? data : [])
        setCartItems(items)
      }
    } catch {
      // keep current cart state on error
    } finally {
      setCartLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const createProduct = useCallback(
    async (payload) => {
      const token = getAuthToken()
      const res = await fetch(apiUrl('/api/products'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to create product')
      }
      const created = await res.json()
      // refresh list so user + admin see the same data
      await fetchProducts()
      return created
    },
    [fetchProducts],
  )

  const updateProductRemote = useCallback(
    async (id, payload) => {
      const token = getAuthToken()
      const res = await fetch(apiUrl(`/api/products/${id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to update product')
      }
      const updated = await res.json()
      await fetchProducts()
      return updated
    },
    [fetchProducts],
  )

  const deleteProductRemote = useCallback(
    async (id) => {
      const token = getAuthToken()
      const res = await fetch(apiUrl(`/api/products/${id}`), {
        method: 'DELETE',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to remove product')
      }
      await fetchProducts()
    },
    [fetchProducts],
  )

  const putCart = useCallback(async (items) => {
    const anonymousId = getAnonymousId()
    if (!anonymousId) return
    try {
      const res = await fetch(apiUrl('/api/cart'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Anonymous-User-Id': anonymousId,
        },
        body: JSON.stringify({ items }),
      })
      if (!res.ok) {
        throw new Error('Failed to update cart')
      }
    } catch (err) {
      console.error('Cart update failed:', err)
    }
  }, [])

  const addToCart = useCallback(
    (product) => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id)
        const next = existing
          ? prev.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            )
          : [
              ...prev,
              {
                id: product.id,
                name: product.label,
                image: product.image,
                size: 'M',
                quantity: 1,
              },
            ]
        putCart(next)
        return next
      })
    },
    [putCart],
  )

  const removeFromCart = useCallback(
    (id) => {
      setCartItems((prev) => {
        const next = prev.filter((item) => item.id !== id)
        putCart(next)
        return next
      })
    },
    [putCart],
  )

  const value = useMemo(
    () => ({
      products,
      productsLoading,
      refreshProducts: fetchProducts,
      createProduct,
      updateProduct: updateProductRemote,
      deleteProduct: deleteProductRemote,
      cartItems,
      cartLoading,
      addToCart,
      removeFromCart,
      refreshCart: fetchCart,
    }),
    [products, productsLoading, fetchProducts, createProduct, updateProductRemote, deleteProductRemote, cartItems, cartLoading, addToCart, removeFromCart, fetchCart],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) {
    throw new Error('useShop must be used within a ShopProvider')
  }
  return ctx
}

