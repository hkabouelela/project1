
import { Link } from 'react-router-dom';
import './banner.css';

export function Banner() {
  return (
    <section className="hero">
      <div className="hero-text">
        <span className="hero-badge">Curated Collection</span>
        <h2>
          Experience the Future <span className="hero-highlight">of Innovation.</span>
        </h2>
        <p>
          Explore our curated selection of premium electronics designed to elevate
          your daily stream of life. Precision engineering meets minimalist design.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="hero-btn hero-btn-primary">
            Shop Now
          </Link>
          <Link to="/products" className="hero-btn hero-btn-secondary">
            View Collections
          </Link>
        </div>
      </div>

      <div className="hero-image">
        <div className="hero-image-glow" aria-hidden="true" />
        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1599669454699-248893623440?w=1000&auto=format&fit=crop&q=80"
            alt="Premium wireless noise-cancelling headphones"
            className="hero-img"
            loading="eager"
          />
          <div className="hero-image-card">
            <span className="hero-card-icon" role="img" aria-label="Headphones">🎧</span>
            <div className="hero-card-text">
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}