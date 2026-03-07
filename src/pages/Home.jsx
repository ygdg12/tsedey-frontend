import { Link } from 'react-router-dom'
import '../App.css'

// Social Media Icons as SVG Components
const TelegramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const MountainIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 19l7-12 3.5 6" />
    <path d="M21 19L14 7l-2 3" />
    <path d="M5 19h14" />
  </svg>
)

const PerformanceIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3v3" />
    <path d="M6.6 6.6l2.1 2.1" />
    <path d="M3 12h3" />
    <path d="M6.6 17.4l2.1-2.1" />
    <path d="M12 18v3" />
    <path d="M15.3 15.3l2.1 2.1" />
    <path d="M18 12h3" />
    <path d="M15.3 8.7l2.1-2.1" />
    <circle cx="12" cy="12" r="3.5" />
  </svg>
)

const PaletteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 6 6 6h1a1 1 0 0 1 1 1v1c0 1.48 1.79 2 3 2a9 9 0 0 0 0-18Z" />
    <circle cx="8.5" cy="10.5" r=".75" fill="currentColor" stroke="none" />
    <circle cx="12" cy="7.5" r=".75" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="10.5" r=".75" fill="currentColor" stroke="none" />
    <circle cx="12" cy="13.5" r=".75" fill="currentColor" stroke="none" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.12 1h2a2 2 0 0 1 2 1.72 12.85 12.85 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7 9a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45 12.85 12.85 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
)

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
    <path d="m22 6-10 7L2 6" />
  </svg>
)

const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10c0 5.25-6 11-9 11s-9-5.75-9-11a9 9 0 1 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-kicker">Watch the Tsedey motion lookbook</div>
          <h1 className="hero-title">
            <span>Gear up</span>
            <span>for your</span>
            <span>next move</span>
          </h1>
          <p className="hero-text">
            See our latest performance pieces in motion—captured on the track and in the studio.
            Built with breathable stretch, ready for training, travel, and everyday wear.
          </p>
          <div className="hero-buttons">
            <Link to="/design-studio" className="btn-primary">
              
              <span>Team Orders</span>
            </Link>
            <Link to="/collection" className="btn-secondary">
              Browse collection
            </Link>
          </div>
        </div>

        <div className="hero-side">
          <article className="hero-card">
            <span className="hero-tag">Motion lookbook — Addis shoot</span>
            <div className="hero-image-frame">
              <video
                className="hero-video"
                src="/tsedey-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                aria-label="Tsedey Activewear product showcase"
              />
              <div className="hero-shadow" />
            </div>
            <div className="hero-card-footer">
              <div className="hero-pill">
                <span className="hero-dot" />
                <span>Full on-body footage</span>
              </div>
              <span>Breathable stretch · Track & studio</span>
            </div>
          </article>
        </div>
      </section>

      <section className="section home-about">
        <div className="section-header">
          <h2 className="section-title">About Tsedey Activewear</h2>
          <p className="section-subtitle">Performance sportswear built for everyday movement.</p>
        </div>

        <div className="about-split">
          <div className="about-left">
            <p className="about-lead">
              Tsedey Activewear is a sports clothing brand based in Addis Ababa, Ethiopia — focused
              on fit, comfort, and pieces you can train in and live in.
            </p>
            <p className="about-paragraph">
              From the gym to the street, we keep the silhouettes clean, the fabrics breathable, and
              the finishing sharp so your gear holds up session after session.
            </p>

            <div className="about-stats">
              <div className="stat-pill">
                <span className="stat-number">Addis</span>
                <span className="stat-label">based</span>
              </div>
              <div className="stat-pill">
                <span className="stat-number">Breathable</span>
                <span className="stat-label">comfort</span>
              </div>
              <div className="stat-pill">
                <span className="stat-number">Built</span>
                <span className="stat-label">to last</span>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="about-panel">
              <div className="about-panel-icon">
                <MountainIcon />
              </div>
              <div className="about-panel-body">
                <div className="about-panel-title">Rooted in Ethiopia</div>
                <div className="about-panel-text">
                  Inspired by the track culture and everyday style of Addis Ababa.
                </div>
              </div>
            </div>

            <div className="about-panel">
              <div className="about-panel-icon">
                <PerformanceIcon />
              </div>
              <div className="about-panel-body">
                <div className="about-panel-title">Made to perform</div>
                <div className="about-panel-text">
                  Comfortable stretch, breathable feel, and clean finishing for real training.
                </div>
              </div>
            </div>

            <div className="about-panel">
              <div className="about-panel-icon">
                <PaletteIcon />
              </div>
              <div className="about-panel-body">
                <div className="about-panel-title">Team orders supported</div>
                <div className="about-panel-text">
                  Clubs and gyms can place bulk orders — we help with sizes, quantities, and reorders.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-contact">
        <div className="home-contact-card">
          <div>
            <h2 className="home-contact-title">Need help with an order?</h2>
            <p className="home-contact-text">
              For team orders, questions, or availability, reach us directly or follow our pages for
              new drops.
            </p>
            <div className="home-contact-actions">
              <a className="btn-primary" href="tel:+251968888886">
                Call: +251 96 888 8886
              </a>
              <a className="btn-secondary" href="/contacts">
                Contact & socials
              </a>
            </div>
          </div>

          <div className="home-contact-links">
            <a
              href="https://t.me/tsedey_activewear"
              target="_blank"
              rel="noopener noreferrer"
              className="home-social-pill"
            >
              <span className="home-social-icon">
                <TelegramIcon />
              </span>
              <span className="home-social-label">Telegram</span>
            </a>
            <a
              href="https://instagram.com/tsedeyactivewear"
              target="_blank"
              rel="noopener noreferrer"
              className="home-social-pill"
            >
              <span className="home-social-icon">
                <InstagramIcon />
              </span>
              <span className="home-social-label">Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@tsedey.active"
              target="_blank"
              rel="noopener noreferrer"
              className="home-social-pill"
            >
              <span className="home-social-icon">
                <TikTokIcon />
              </span>
              <span className="home-social-label">TikTok</span>
            </a>
            <a
              href="https://youtube.com/@tsedeyactivewear"
              target="_blank"
              rel="noopener noreferrer"
              className="home-social-pill"
            >
              <span className="home-social-icon">
                <YouTubeIcon />
              </span>
              <span className="home-social-label">YouTube</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

