import { useState } from 'react';
import './about.css';
import { FiHeart } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa6';

export function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Header Section */}
        <section className="about-hero">
          <h1 className="about-main-title">About Recipe Explorer</h1>
          <p className="about-main-desc">
            Recipe Explorer helps users discover and organize recipes. Our platform is
            designed with a modern minimalist aesthetic to let the food take center stage,
            inspiring your next culinary adventure.
          </p>
        </section>

        {/* 3 Features Row */}
        <section className="about-features">
          {/* Feature 1: Discover Recipes */}
          <div className="feature-card">
            <div className="feature-icon-bubble bubble-peach">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <line x1="21" y1="21" x2="15.2" y2="15.2" />
                <path d="M8 9.5h5M8 12h3" strokeWidth="1.6" />
              </svg>
            </div>
            <h3 className="feature-title">Discover Recipes</h3>
            <p className="feature-text">
              Find inspiration from thousands of curated, high-quality recipes tailored to your taste.
            </p>
          </div>

          {/* Feature 2: Save Favorites */}
          <div className="feature-card">
            <div className="feature-icon-bubble bubble-mint">
              <FiHeart size={26} strokeWidth={2.2} />
            </div>
            <h3 className="feature-title">Save Favorites</h3>
            <p className="feature-text">
              Build your personal cookbook by saving and organizing your favorite culinary discoveries.
            </p>
          </div>

          {/* Feature 3: Easy Cooking */}
          <div className="feature-card">
            <div className="feature-icon-bubble bubble-lavender">
              <FaUtensils size={22} />
            </div>
            <h3 className="feature-title">Easy Cooking</h3>
            <p className="feature-text">
              Follow clear, progressive steps that make cooking even complex dishes a breeze.
            </p>
          </div>
        </section>

        {/* Divider Line */}
        <hr className="about-divider" />

        {/* Get in Touch Section */}
        <section className="about-contact-section">
          {/* Left Column */}
          <div className="contact-info-side">
            <h2 className="contact-heading">Get in Touch</h2>
            <p className="contact-subtext">
              Have questions about a recipe or want to share your own culinary creations? Drop us a message below.
            </p>
            <div className="contact-image-wrapper">
              <img
                src="/about-kitchen.jpg"
                alt="Modern kitchen workspace with laptop"
                className="contact-image"
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-side">
            <div className="contact-card">
              {submitted && (
                <div className="contact-success-alert">
                  <span>✓</span> Thank you! Your message has been sent successfully.
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit-contact">
                  Send Message
                  <span className="btn-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Bottom Divider Line */}
        <hr className="about-divider" />
      </div>
    </div>
  );
}