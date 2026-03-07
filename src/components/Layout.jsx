import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import './Layout.css'

const DEFAULT_TITLE = 'Tsedey Activewear | Sports Clothing Store'

export default function Layout({ children }) {
  const location = useLocation()

  const isAdminPage = location.pathname === '/admin' || location.pathname.startsWith('/admin/')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.title = isAdminPage ? 'Admin page' : DEFAULT_TITLE
    return () => { document.title = DEFAULT_TITLE }
  }, [isAdminPage])

  useEffect(() => {
    // close mobile menu when route changes
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isAdminLogin = location.pathname === '/admin'

  return (
    <div className="app">
      <div className="app-inner">
        {!isAdminLogin && (
          <header className="nav">
            <Link to="/" className="nav-logo" aria-label="Tsedey Activewear home">
              <Logo className="nav-logo-mark" alt="Tsedey Activewear logo" />
            </Link>
            <nav className="nav-links">
              <Link
                to="/collection"
                className={`nav-link ${location.pathname === '/collection' ? 'active' : ''}`}
              >
                Collection
              </Link>
              <Link
                to="/design-studio"
                className={`nav-link ${location.pathname === '/design-studio' ? 'active' : ''}`}
              >
                Team Orders
              </Link>
            </nav>
            <div className="nav-right">
              <Link to="/cart" className="nav-cart">
                Cart
              </Link>
              <button
                type="button"
                className={`nav-menu-toggle ${mobileMenuOpen ? 'nav-menu-toggle--open' : ''}`}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                <span className="nav-menu-bar" />
                <span className="nav-menu-bar" />
              </button>
            </div>
          </header>
        )}

        {!isAdminLogin && mobileMenuOpen && (
          <nav className="nav-mobile" aria-label="Mobile navigation">
            <Link
              to="/collection"
              className="nav-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collection
            </Link>
            <Link
              to="/design-studio"
              className="nav-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Team Orders
            </Link>
            <Link
              to="/cart"
              className="nav-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart
            </Link>
          </nav>
        )}

        <main>{children}</main>

        {!isAdminLogin && (
          <footer className="footer">
            <div className="footer-top">
              <div className="footer-brand">
                <Logo className="footer-logo" alt="Tsedey Activewear" />
                <p className="footer-tagline">
                  Performance sportswear from Addis Ababa — built for everyday movement.
                </p>
              </div>

              <div className="footer-columns">
                <div className="footer-col">
                  <div className="footer-col-title">Explore</div>
                  <Link className="footer-link" to="/collection">
                    Collection
                  </Link>
                  <Link className="footer-link" to="/design-studio">
                    Team Orders
                  </Link>
                  <Link className="footer-link" to="/cart">
                    Cart
                  </Link>
                </div>

                <div className="footer-col">
                  <div className="footer-col-title">Contact</div>
                  <a className="footer-link" href="tel:+251968888886">
                    +251 96 888 8886
                  </a>
                  <a className="footer-link" href="mailto:info@tsedeyactivewear.com">
                    info@tsedeyactivewear.com
                  </a>
                  <Link className="footer-link" to="/contacts">
                    Contact page
                  </Link>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Tsedey Activewear</span>
              <span className="footer-bottom-sep">•</span>
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

