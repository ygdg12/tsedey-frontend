import '../App.css'

export default function DesignStudio() {
  return (
    <section className="section section--team-orders">
      <div className="section-header">
        <h1 className="section-title">Team & bulk orders</h1>
        <p className="section-subtitle">
          Simple steps to place a Tsedey Activewear order for your club, gym, or community.
        </p>
      </div>

      <div className="studio-layout">
        <div className="studio-card studio-card-primary">
          <h3 className="studio-title">1. Choose your pieces</h3>
          <p className="studio-text">
            Decide what you want to outfit: training tops, hoodies, or full sets for your group.
          </p>
          <ul className="studio-list">
            <li>Training tees and long sleeves</li>
            <li>Hoodies and warm-up layers</li>
            <li>Legging + bra sets for women</li>
            <li>Mixed sizes for your whole crew</li>
          </ul>
        </div>

        <div className="studio-card">
          <h3 className="studio-title">2. Share your order details</h3>
          <p className="studio-text">
            Send us a message with the quantities and sizes you need, plus any reference photos or
            ideas you like.
          </p>
          <ul className="studio-list">
            <li>Number of people you are outfitting</li>
            <li>Size breakdown (XS–XXL)</li>
            <li>Timeline you are working with</li>
            <li>Any inspiration or mood you prefer</li>
          </ul>
        </div>
      </div>

      <div className="studio-features">
        <div className="studio-feature">
          <div className="studio-feature-icon">01</div>
          <h4 className="studio-feature-title">Based in Addis</h4>
          <p className="studio-feature-text">
            Orders are coordinated from Addis Ababa so communication stays fast and clear.
          </p>
        </div>
        <div className="studio-feature">
          <div className="studio-feature-icon">02</div>
          <h4 className="studio-feature-title">Everyday performance</h4>
          <p className="studio-feature-text">
            Clothing made for training, travel, and off-duty wear — not just one-time events.
          </p>
        </div>
        <div className="studio-feature">
          <div className="studio-feature-icon">03</div>
          <h4 className="studio-feature-title">Support for teams</h4>
          <p className="studio-feature-text">
            We help clubs, gyms, and small brands figure out sizing, quantities, and re-orders.
          </p>
        </div>
      </div>
    </section>
  )
}

