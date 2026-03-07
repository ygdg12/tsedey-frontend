import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { useShop } from '../context/ShopContext.jsx'

export default function Cart() {
  const { cartItems, removeFromCart } = useShop()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [pendingRemoveId, setPendingRemoveId] = useState(null)

  const handleRemove = (id) => {
    setPendingRemoveId(id)
  }

  const confirmRemove = () => {
    if (pendingRemoveId != null) {
      removeFromCart(pendingRemoveId)
      setPendingRemoveId(null)
    }
  }

  const cancelRemove = () => {
    setPendingRemoveId(null)
  }

  return (
    <section className="section section--cart">
      <div className="section-header">
       
        <h1 className="section-title">Your cart</h1>
        <p className="section-subtitle">
          {cartItems.length === 0
            ? 'Your cart is empty'
            : `${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} in your cart`}
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-text">Start adding items to your cart to see them here.</p>
          <Link to="/collection" className="btn-primary">
            Browse collection
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-meta">
                    <span>Size: {item.size}</span>
                    <span>Quantity: {item.quantity}</span>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="cart-item-remove"
                    type="button"
                    aria-label="Remove item"
                    onClick={() => handleRemove(item.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-card">
              <button
                className="btn-primary cart-checkout"
                type="button"
                onClick={() => setCheckoutOpen(true)}
              >
                Proceed to checkout
              </button>
              <Link to="/collection" className="cart-continue">
                ← Continue shopping
              </Link>
            </div>
          </div>
        </div>
      )}

      {checkoutOpen && (
        <div className="cart-modal-backdrop">
          <div className="cart-modal" role="dialog" aria-modal="true" aria-label="Checkout details">
            <button
              type="button"
              className="cart-modal-close"
              aria-label="Close checkout details"
              onClick={() => setCheckoutOpen(false)}
            >
              ×
            </button>
            <h2 className="cart-modal-title">How to place your order</h2>
            <p className="cart-modal-text">
              To confirm your Tsedey Activewear order and talk through sizes, payment, and delivery,
              please call or message:
            </p>
            <p className="cart-modal-number">
              Call / Telegram:{' '}
              <a href="tel:+251968888886" className="cart-modal-link">
                +251 96 888 8886
              </a>
            </p>
            <p className="cart-modal-text">
              Share a screenshot of your cart or describe the pieces you want, and we&apos;ll guide
              you through the rest.
            </p>
          </div>
        </div>
      )}

      {pendingRemoveId != null && (
        <div className="cart-modal-backdrop">
          <div className="cart-modal cart-modal--small" role="dialog" aria-modal="true">
            <p className="cart-modal-text">Remove this item from your cart?</p>
            <div className="cart-modal-actions">
              <button type="button" className="btn-secondary" onClick={cancelRemove}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={confirmRemove}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

