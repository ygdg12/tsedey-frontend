import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { useShop } from '../context/ShopContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { apiUrl } from '../api.js'

export default function Collection({ adminMode = false }) {
  const { products, productsLoading, addToCart, createProduct, updateProduct, deleteProduct, refreshProducts } = useShop()
  const { isAdmin, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (adminMode && !isAdmin) {
      navigate('/admin', { replace: true })
    }
  }, [adminMode, isAdmin, navigate])

  if (adminMode && !isAdmin) return null
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [saveError, setSaveError] = useState('')
  const [categories, setCategories] = useState([])
  const [managingCategoriesOpen, setManagingCategoriesOpen] = useState(false)
  const [editingCategories, setEditingCategories] = useState([])
  const [categoriesError, setCategoriesError] = useState('')
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (editingProduct || managingCategoriesOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [editingProduct, managingCategoriesOpen])

  const imageFileInputRef = useRef(null)

  const fetchCategories = async () => {
    try {
      const res = await fetch(apiUrl('/api/categories'))
      if (res.ok) {
        const data = await res.json()
        setCategories(Array.isArray(data) ? data : [])
      } else {
        setCategories([])
      }
    } catch {
      setCategories([])
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // simple category list:
  // - if backend returns structured categories, use those with type === 'category'
  // - otherwise, derive categories from existing products
  const distinctProductCategories = Array.from(
    new Set(
      products
        .map((p) => p.category)
        .filter(Boolean),
    ),
  )

  let categoryCats = categories.filter((c) => c.type === 'category')

  if (categoryCats.length === 0 && distinctProductCategories.length > 0) {
    categoryCats = distinctProductCategories.map((value) => ({
      id: value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
      type: 'category',
      value,
    }))
  }

  const filterCats = [
    { id: 'all', label: 'All looks', type: 'all' },
    ...categoryCats,
  ]

  // category options for the "Category" select when adding/editing an item
  const categoryOptions = categoryCats

  const activeCat = filterCats.find((c) => c.id === activeFilter) || filterCats[0]
  const filteredProducts = products.filter((product) => {
    if (!activeCat || activeCat.type === 'all') return true
    if (activeCat.type === 'category') return product.category === activeCat.value
    return true
  })

  const handleAddToCart = (product) => {
    addToCart(product)
    setSelectedProduct(null)
    setToastMessage('Added to cart successfully')
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 2000)
  }

  const handleSaveCategories = async (e) => {
    e.preventDefault()
    setCategoriesError('')
    try {
      // editingCategories is an array of plain names; normalise to full objects for the API
      const normalisedCategories = editingCategories
        .map((name) => name.trim())
        .filter(Boolean)
        .map((name) => {
          const slug = name.toLowerCase().replace(/\s+/g, '-')
          return {
            id: slug,
            label: name,
            type: 'category',
            value: slug,
          }
        })

      const res = await fetch(apiUrl('/api/categories'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ categories: normalisedCategories }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setCategoriesError(data.error || 'Failed to save categories')
        return
      }
      await fetchCategories()
      setManagingCategoriesOpen(false)
      setToastMessage('Categories updated')
      setShowToast(true)
      window.setTimeout(() => setShowToast(false), 2000)
    } catch {
      setCategoriesError('Failed to save categories')
    }
  }

  const updateCategory = (index, value) => {
    setEditingCategories((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const addCategory = () => {
    setEditingCategories((prev) => [...prev, ''])
  }

  const removeCategory = (index) => {
    setEditingCategories((prev) => prev.filter((_, i) => i !== index))
  }

  const openDeleteConfirm = () => {
    if (!editingProduct || editingProduct.id == null) return
    setDeleteError('')
    setDeleteConfirmOpen(true)
  }

  const confirmDeleteProduct = async () => {
    if (!editingProduct || editingProduct.id == null) return
    setDeleteError('')
    setDeleting(true)
    try {
      await deleteProduct(editingProduct.id)
      setDeleteConfirmOpen(false)
      setEditingProduct(null)
      setToastMessage('Product removed')
      setShowToast(true)
      window.setTimeout(() => setShowToast(false), 2000)
    } catch (err) {
      setDeleteError(err.message || 'Failed to remove product')
    } finally {
      setDeleting(false)
    }
  }

  const isCreating = editingProduct && editingProduct.id == null
  const handleSaveEdit = async (e) => {
    e.preventDefault()
    if (!editingProduct) return
    setSaveError('')
    const baseProduct = {
      image: editingProduct.image,
      label: editingProduct.label,
      description: editingProduct.description,
      tag: editingProduct.tag,
      intensity: editingProduct.intensity,
      category: editingProduct.category || 'set',
      vibe: editingProduct.vibe || 'studio',
      soldOut: editingProduct.soldOut || false,
      colorsAvailable: editingProduct.colorsAvailable || [],
    }

    try {
      if (isCreating) {
        await createProduct(baseProduct)
        setToastMessage('Product added')
      } else {
        await updateProduct(editingProduct.id, baseProduct)
        setToastMessage('Changes saved')
      }

      setEditingProduct(null)
      setShowToast(true)
      window.setTimeout(() => setShowToast(false), 2000)
    } catch (err) {
      setSaveError(err.message || 'Failed to save')
    }
  }

  const openAddProduct = () => {
    const defaultCategoryValue = categoryOptions[0]?.value || ''
    setEditingProduct({
      id: null,
      image: '',
      label: '',
      description: '',
      tag: 'Set',
      intensity: '',
      category: defaultCategoryValue,
      vibe: 'studio',
      soldOut: false,
      colorsAvailable: [],
    })
  }

  return (
    <section className="section section--collection">
      <div className="section-header">
        <h1 className="section-title">Tsedey Activewear collection</h1>
        <p className="section-subtitle">
          Curated looks for studio, street, and training days  all shot in Addis Ababa.
        </p>
      </div>

      <div className="collection-toolbar">
        <div className="collection-filters">
          {filterCats.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`collection-chip ${activeFilter === cat.id ? 'collection-chip--active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
          {adminMode && (
            <>
              <button
                type="button"
                className="collection-add-btn collection-add-btn--toolbar"
                onClick={openAddProduct}
              >
                <span className="collection-add-btn-icon">+</span>
                Add item
              </button>
              <button
                type="button"
                className="admin-edit-btn"
                onClick={() => {
                  setEditingCategories(categoryCats.map((c) => c.label || ''))
                  setManagingCategoriesOpen(true)
                }}
              >
                Manage categories
              </button>
            </>
          )}
        </div>
        <div className="collection-meta">
          <span>{filteredProducts.length} looks • Launch drop</span>
        </div>
      </div>

      {productsLoading ? (
        <div className="collection-empty">
          <div className="collection-empty-content">
            <div className="collection-empty-icon">⏳</div>
            <h2 className="collection-empty-title">
              Loading collection…
            </h2>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="collection-empty">
          <div className="collection-empty-content">
            <div className="collection-empty-icon">✦</div>
            <h2 className="collection-empty-title">
              {adminMode ? 'No items yet' : 'Coming soon'}
            </h2>
            <p className="collection-empty-text">
              {adminMode
                ? 'Add your first product to get started.'
                : 'New looks are on the way. Check back soon.'}
            </p>
            {adminMode && (
              <button
                type="button"
                className="collection-add-btn"
                onClick={openAddProduct}
              >
                <span className="collection-add-btn-icon">+</span>
                Add your first item
              </button>
            )}
          </div>
        </div>
      ) : (
      <div className="collection-grid">
        {filteredProducts.map((design, index) => (
          <article key={design.id} className="collection-card">
            <div className="collection-media" style={{ position: 'relative' }}>
              {index === 0 && <span className="collection-badge">Editor&apos;s pick</span>}
              {design.soldOut && <span className="collection-card-sold-out">Sold Out</span>}
              <div className="collection-image-wrapper" onClick={() => adminMode && setEditingProduct({ ...design })} style={{ cursor: adminMode ? 'pointer' : 'default' }}>
                <img src={design.image} alt={design.label} style={{ opacity: design.soldOut ? 0.6 : 1 }} />
              </div>
            </div>
            <div className="collection-body">
              <div className="collection-headline">
                <div>
                  <div className="collection-tag">{design.tag}</div>
                  <h2 className="collection-title">{design.label}</h2>
                </div>
              </div>
              <p className="collection-description">{design.description}</p>
              {design.colorsAvailable && design.colorsAvailable.length > 0 && (
                <div className="collection-card-colors">
                  Colors: {design.colorsAvailable.map((c, i) => <span key={i}>{c}</span>)}
                </div>
              )}
              <div className="collection-footer">
                <span className="collection-intensity">{design.intensity}</span>
                {!adminMode && (
                  <button
                    type="button"
                    className="collection-cta btn-secondary"
                    onClick={() => setSelectedProduct(design)}
                  >
                    View details
                  </button>
                )}
                {adminMode && (
                  <div className="collection-card-actions">
                    <button
                      type="button"
                      className="admin-edit-btn"
                      onClick={() => setEditingProduct({ ...design })}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      )}

      {selectedProduct && !editingProduct && (
        <div className="collection-modal-backdrop">
          <div
            className="collection-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProduct.label}
          >
            <button
              type="button"
              className="collection-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close details"
            >
              ×
            </button>
            <div className="collection-modal-layout">
              <div className="collection-modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.label} />
              </div>
              <div className="collection-modal-body">
                <div className="collection-modal-tag">{selectedProduct.tag}</div>
                <h2 className="collection-modal-title">{selectedProduct.label}</h2>
                <div className="collection-modal-section">
                  <div className="collection-modal-section-title">Description</div>
                  <p className="collection-modal-description">{selectedProduct.description}</p>
                </div>

                {Array.isArray(selectedProduct.colorsAvailable) && selectedProduct.colorsAvailable.length > 0 && (
                  <div className="collection-modal-section">
                    <div className="collection-modal-section-title">Available colors</div>
                    <div className="collection-modal-colors">
                      {selectedProduct.colorsAvailable.map((c, i) => (
                        <span key={`${c}-${i}`} className="collection-modal-color-chip">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="collection-modal-meta">
                  <span>{selectedProduct.intensity}</span>
                </div>
                <button
                  type="button"
                  className="btn-primary collection-modal-cta"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingProduct && (
        <div className="collection-modal-backdrop">
          <div className={`collection-modal ${adminMode ? 'collection-modal--admin' : ''}`} role="dialog" aria-modal="true" aria-label="Edit product">
            <button
              type="button"
              className="collection-modal-close"
              onClick={() => { setEditingProduct(null); setSaveError('') }}
              aria-label="Close"
            >
              ×
            </button>
            <div className="collection-modal-layout">
              <div className={`collection-modal-image ${adminMode && editingProduct.image ? 'collection-modal-image--has-actions' : ''}`}>
                {adminMode ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      ref={imageFileInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = async (ev) => {
                          const base64 = ev.target?.result
                          if (!base64) return
                          try {
                            const res = await fetch(apiUrl('/api/upload-image'), {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ image: base64 }),
                            })
                            const data = await res.json().catch(() => ({}))
                            if (!res.ok || !data.url) {
                              setSaveError(data.error || 'Failed to upload image')
                              return
                            }
                            setEditingProduct((p) => ({ ...p, image: data.url }))
                          } catch {
                            setSaveError('Failed to upload image')
                          }
                        }
                        reader.readAsDataURL(file)
                      }}
                    />
                    {editingProduct.image ? (
                      <div className="collection-modal-image-column">
                        <div className="collection-modal-image-frame">
                          <img src={editingProduct.image} alt={editingProduct.label || 'Product'} />
                        </div>
                        <button
                          type="button"
                          className="admin-change-image-btn"
                          onClick={() => imageFileInputRef.current?.click()}
                        >
                          Change image
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="admin-image-upload-btn"
                        onClick={() => imageFileInputRef.current?.click()}
                      >
                        <span className="admin-image-upload-btn-icon">+</span>
                        Add image
                      </button>
                    )}
                  </>
                ) : (
                  <img src={editingProduct.image || '/tsedey-look-1.png'} alt={editingProduct.label || 'Product'} />
                )}
              </div>
              <div className="collection-modal-body">
                <h2 className="collection-modal-title">{isCreating ? 'Add product' : 'Edit product'}</h2>
                <form className="admin-edit-form" onSubmit={handleSaveEdit}>
                  {saveError && (
                    <div className="admin-login-error" role="alert">{saveError}</div>
                  )}
                  <label className="admin-label">
                    Label
                    <input
                      type="text"
                      className="admin-input"
                      value={editingProduct.label}
                      onChange={(e) => setEditingProduct((p) => ({ ...p, label: e.target.value }))}
                      required
                    />
                  </label>
                  <label className="admin-label">
                    Description
                    <textarea
                      className="admin-input"
                      rows={3}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct((p) => ({ ...p, description: e.target.value }))}
                      required
                    />
                  </label>
                  <div className="admin-section">
                    <div className="admin-section-title">Product categories</div>
                    <label className="admin-label">
                      Category
                      <select
                        className="admin-input"
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct((p) => ({ ...p, category: e.target.value }))}
                      >
                        {categoryOptions.length > 0 ? (
                          categoryOptions.map((cat) => (
                            <option key={cat.id} value={cat.value}>
                              {cat.label}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="set">Set</option>
                            <option value="jumpsuit">Jumpsuit</option>
                          </>
                        )}
                      </select>
                    </label>
                  </div>
                  <label className="admin-label" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={editingProduct.soldOut || false}
                      onChange={(e) => setEditingProduct((p) => ({ ...p, soldOut: e.target.checked }))}
                    />
                    <span>Sold out</span>
                  </label>
                  <label className="admin-label">
                    Colors Available (comma-separated)
                    <input
                      type="text"
                      className="admin-input"
                      value={Array.isArray(editingProduct.colorsAvailable) ? editingProduct.colorsAvailable.join(', ') : (editingProduct.colorsAvailable || '')}
                      onChange={(e) => {
                        const colors = e.target.value.split(',').map((c) => c.trim()).filter(Boolean)
                        setEditingProduct((p) => ({ ...p, colorsAvailable: colors }))
                      }}
                      placeholder="Black, White, Navy"
                    />
                  </label>
                  <div className="admin-modal-actions">
                    {!isCreating && (
                      <button
                        type="button"
                        className="admin-delete-btn"
                        onClick={openDeleteConfirm}
                        title="Remove this product from the collection"
                      >
                        Remove product
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => { setEditingProduct(null); setSaveError('') }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmOpen && editingProduct && (
        <div className="cart-modal-backdrop">
          <div className="cart-modal cart-modal--small" role="dialog" aria-modal="true" aria-label="Confirm delete">
            <button
              type="button"
              className="cart-modal-close"
              onClick={() => { setDeleteConfirmOpen(false); setDeleteError('') }}
              aria-label="Close"
              disabled={deleting}
            >
              ×
            </button>
            <h3 className="cart-modal-title">Remove item?</h3>
            <p className="cart-modal-text" style={{ marginTop: 10 }}>
              You’re about to remove <strong>{editingProduct.label}</strong> from the collection. This can’t be undone.
            </p>
            {deleteError && (
              <div className="admin-login-error" role="alert" style={{ marginTop: 12 }}>
                {deleteError}
              </div>
            )}
            <div className="cart-modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => { setDeleteConfirmOpen(false); setDeleteError('') }}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-delete-btn"
                style={{ marginRight: 0 }}
                onClick={confirmDeleteProduct}
                disabled={deleting}
              >
                {deleting ? 'Removing…' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      {managingCategoriesOpen && (
        <div className="collection-modal-backdrop">
          <div className="collection-modal collection-modal--admin" role="dialog" aria-modal="true" aria-label="Manage categories">
            <button
              type="button"
              className="collection-modal-close"
              onClick={() => { setManagingCategoriesOpen(false); setCategoriesError('') }}
              aria-label="Close"
            >
              ×
            </button>
            <div className="collection-modal-layout" style={{ display: 'block' }}>
              <h2 className="collection-modal-title" style={{ marginBottom: 16 }}>Manage categories</h2>
              <form onSubmit={handleSaveCategories}>
                {categoriesError && (
                  <div className="admin-login-error" role="alert" style={{ marginBottom: 12 }}>{categoriesError}</div>
                )}
                <div className="admin-edit-form" style={{ gap: 16 }}>
                  {editingCategories.map((name, index) => (
                    <div key={index} className="admin-label" style={{ padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                      <label style={{ flex: '1 1 120px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b5ff6b' }}>Category name</span>
                        <input
                          type="text"
                          className="admin-input"
                          value={name}
                          onChange={(e) => updateCategory(index, e.target.value)}
                          placeholder="e.g. Sets"
                        />
                      </label>
                      <button
                        type="button"
                        className="admin-edit-btn"
                        onClick={() => removeCategory(index)}
                        style={{ marginTop: 8 }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                  <button type="button" className="admin-edit-btn" onClick={addCategory}>
                    + Add category
                  </button>
                  <div style={{ flex: 1 }} />
                  <button type="button" className="btn-secondary" onClick={() => { setManagingCategoriesOpen(false); setCategoriesError('') }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save categories
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="toast toast--success">{toastMessage}</div>
      )}
    </section>
  )
}
