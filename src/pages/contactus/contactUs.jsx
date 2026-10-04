import { useState } from 'react';
import './contactUs.css';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiChevronDown,
  FiMessageSquare,
} from 'react-icons/fi';
import { FaInstagram, FaPinterest, FaYoutube, FaXTwitter } from 'react-icons/fa6';

export function ContactUS() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: 'Recipe Question',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [openFaq, setOpenFaq] = useState(0); // first item open by default

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;

    setSubmittedName(formData.firstName);
    setSubmitted(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      topic: 'Recipe Question',
      message: '',
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  const faqs = [
    {
      q: 'How do I submit my own culinary recipe?',
      a: 'We welcome home chefs! You can submit recipes via your user profile after signing in, or email our editorial team at recipes@recipeexplorer.com with your ingredients list and high-resolution photo.',
    },
    {
      q: 'Can I save recipes to access them later?',
      a: 'Yes! Simply click the heart button on any recipe card or recipe detail page to add it straight to your personal Favorites cookbook.',
    },
    {
      q: 'Are all recipes thoroughly tested?',
      a: 'Every featured recipe is tested in our culinary studio to ensure precise measurements, dependable cook times, and extraordinary flavor results.',
    },
    {
      q: 'Can I request dietary adaptations or substitutions?',
      a: 'Absolutely. Drop us a note via this contact form mentioning the recipe name and your dietary needs (e.g. gluten-free, vegan, dairy-free), and our chefs will recommend substitutions.',
    },
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Top Header */}
        <header className="contact-hero">
          <span className="contact-pill-badge">Get in Touch</span>
          <h1 className="contact-main-heading">We’d Love to Hear From You</h1>
          <p className="contact-subheading">
            Have a recipe question, culinary suggestion, partnership inquiry, or just want to
            say hello? Our kitchen and support team are always happy to connect.
          </p>
        </header>

        {/* 4 Quick Info Cards */}
        <section className="contact-quick-cards">
          <div className="quick-card">
            <div className="quick-icon-wrapper quick-icon-peach">
              <FiMessageSquare />
            </div>
            <h3 className="quick-card-title">Chat with Support</h3>
            <p className="quick-card-desc">
              Need assistance with an account or culinary step? We are here to help.
            </p>
            <a href="mailto:support@recipeexplorer.com" className="quick-card-link">
              support@recipeexplorer.com &rarr;
            </a>
          </div>

          <div className="quick-card">
            <div className="quick-icon-wrapper quick-icon-green">
              <FiMapPin />
            </div>
            <h3 className="quick-card-title">Culinary Studio</h3>
            <p className="quick-card-desc">
              142 Gourmet Ave, Suite 300, Culinary District, San Francisco, CA
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="quick-card-link"
            >
              Get Directions &rarr;
            </a>
          </div>

          <div className="quick-card">
            <div className="quick-icon-wrapper quick-icon-blue">
              <FiPhone />
            </div>
            <h3 className="quick-card-title">Call Our Kitchen</h3>
            <p className="quick-card-desc">
              Monday to Friday, 9:00 AM to 6:00 PM PST for direct chef assistance.
            </p>
            <a href="tel:+15552345678" className="quick-card-link">
              +1 (555) 234-5678 &rarr;
            </a>
          </div>

          <div className="quick-card">
            <div className="quick-icon-wrapper quick-icon-amber">
              <FiMail />
            </div>
            <h3 className="quick-card-title">Partnerships</h3>
            <p className="quick-card-desc">
              Want to feature your food brand or culinary content with our audience?
            </p>
            <a href="mailto:partners@recipeexplorer.com" className="quick-card-link">
              partners@recipeexplorer.com &rarr;
            </a>
          </div>
        </section>

        {/* Two-Column Main Content: Form + Details */}
        <div className="contact-main-grid">
          {/* Left Column: Form */}
          <div className="contact-form-card">
            <h2 className="form-header-title">Send Us a Message</h2>
            <p className="form-header-desc">
              Fill out the details below and we will get back to you within 24 hours.
            </p>

            {submitted && (
              <div className="contact-alert-success">
                <FiCheckCircle size={20} color="#059669" />
                <span>
                  Thank you, <strong>{submittedName}</strong>! Your message has been received.
                  Our team will reply shortly.
                </span>
              </div>
            )}

            <form className="contact-form-inner" onSubmit={handleSubmit}>
              <div className="form-row-two">
                <div className="form-control-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="e.g. Sarah"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="e.g. Miller"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row-two">
                <div className="form-control-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control-group">
                  <label htmlFor="phone">Phone Number (Optional)</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-control-group">
                <label htmlFor="topic">Topic / Inquiry</label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                >
                  <option value="Recipe Question">Recipe Question / Advice</option>
                  <option value="Ingredient Substitution">Dietary / Ingredient Substitution</option>
                  <option value="Website Feedback">Website Feedback / Bug Report</option>
                  <option value="Chef Partnership">Brand or Chef Partnership</option>
                  <option value="Other">Other Inquiries</option>
                </select>
              </div>

              <div className="form-control-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="How can our culinary team help you today?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-contact-submit">
                <span>Send Message</span>
                <FiSend size={15} />
              </button>
            </form>
          </div>

          {/* Right Column: Studio Spotlight & FAQ */}
          <div className="contact-side-column">
            {/* Test Kitchen Spotlight */}
            <div className="studio-spotlight-card">
              <div className="studio-photo-wrapper">
                <img
                  src="/contact-kitchen.jpg"
                  alt="Recipe Explorer culinary studio"
                  className="studio-photo"
                />
                <div className="badge-response-time">
                  <span className="status-dot-green"></span>
                  <span>Avg response: &lt; 2 hrs</span>
                </div>
              </div>

              <div className="studio-details-body">
                <h3 className="studio-details-title">San Francisco Test Kitchen</h3>
                <p className="studio-details-text">
                  Our resident chefs test, shoot, and refine hundreds of dishes monthly right here
                  in our open test kitchen.
                </p>
                <div className="studio-hours-row">
                  <FiClock color="#9c4c1a" />
                  <span>Mon – Fri: 9:00 AM – 6:00 PM PST</span>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="faq-card">
              <h3 className="faq-card-title">Frequently Asked Questions</h3>
              <div className="faq-accordion-list">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                      <button
                        type="button"
                        className="faq-question-btn"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <span className={`faq-arrow ${isOpen ? 'rotated' : ''}`}>
                          <FiChevronDown />
                        </span>
                      </button>
                      {isOpen && <div className="faq-answer-panel">{faq.a}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Community Strip */}
        <section className="community-strip">
          <div className="community-info">
            <h3>Join our culinary community</h3>
            <p>Connect with 100,000+ passionate food lovers across our channels.</p>
          </div>
          <div className="community-social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Pinterest">
              <FaPinterest />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Twitter">
              <FaXTwitter />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}