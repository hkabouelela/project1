import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";
import "./productDetails.css";
import { toast } from "react-toastify";
import {
  FaStar,
  FaStarHalfStroke,
  FaCartShopping,
  FaArrowLeft,
  FaMinus,
  FaPlus,
  FaHeart,
  FaShieldHalved,
  FaRotateLeft,
  FaTruckFast,
} from "react-icons/fa6";

import { useCart } from "../../context/useCart";

export function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    let ignore = false;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load product details");
        }
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          setProduct(data);
          setSelectedImage(data.images?.[0] || data.thumbnail);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  function increment() {
    if (!product || count < (product.stock || 99)) {
      setCount((prev) => prev + 1);
    }
  }

  function decrement() {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  }

  function handleCountChange(e) {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      const max = product?.stock || 99;
      setCount(Math.min(val, max));
    }
  }

  function addcart() {
    if (product) {
      addToCart(product, count);
      toast.success(`${count}x ${product.title} added to cart!`);
    }
  }

  function toggleWishlist() {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.info("Added to your wishlist!");
    } else {
      toast.info("Removed from your wishlist!");
    }
  }

  const renderStars = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.4;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="pd-star filled" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(<FaStarHalfStroke key={i} className="pd-star half" />);
      } else {
        stars.push(<FaStar key={i} className="pd-star empty" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="pd-page-wrapper">
        <div className="pd-container pd-skeleton-container">
          <div className="pd-skeleton-gallery">
            <div className="pd-skeleton pd-skeleton-img" />
            <div className="pd-skeleton-thumbs">
              <div className="pd-skeleton pd-skeleton-thumb" />
              <div className="pd-skeleton pd-skeleton-thumb" />
              <div className="pd-skeleton pd-skeleton-thumb" />
            </div>
          </div>
          <div className="pd-skeleton-info">
            <div className="pd-skeleton pd-skeleton-badge" />
            <div className="pd-skeleton pd-skeleton-title" />
            <div className="pd-skeleton pd-skeleton-price" />
            <div className="pd-skeleton pd-skeleton-text" />
            <div className="pd-skeleton pd-skeleton-text short" />
            <div className="pd-skeleton pd-skeleton-btn" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pd-page-wrapper">
        <div className="pd-error-card">
          <h2>Product Not Found</h2>
          <p>We couldn't load the product you are looking for.</p>
          <Link to="/products" className="pd-back-link">
            <FaArrowLeft /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  return (
    <div className="pd-page-wrapper">
      <div className="pd-container">
        {/* Navigation Breadcrumbs */}
        <nav className="pd-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/home" className="pd-crumb-link">
            Home
          </Link>
          <span className="pd-crumb-sep">/</span>
          <Link to="/products" className="pd-crumb-link">
            Products
          </Link>
          <span className="pd-crumb-sep">/</span>
          {product.category && (
            <>
              <span className="pd-crumb-link pd-category-crumb">
                {product.category}
              </span>
              <span className="pd-crumb-sep">/</span>
            </>
          )}
          <span className="pd-crumb-current">{product.title}</span>
        </nav>

        {/* Main Product Card */}
        <div className="pd-main-card">
          {/* Left Column: Image Gallery */}
          <div className="pd-gallery-section">
            <div className="pd-main-image-wrap">
              <img
                src={selectedImage || product.thumbnail}
                alt={product.title}
                className="pd-main-image"
              />
              {product.discountPercentage && (
                <div className="pd-badge-discount">
                  -{Math.round(product.discountPercentage)}% OFF
                </div>
              )}
            </div>

            {galleryImages.length > 1 && (
              <div className="pd-thumbnail-strip">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pd-thumbnail-btn ${
                      selectedImage === imgUrl ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(imgUrl)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={imgUrl} alt={`${product.title} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Controls */}
          <div className="pd-info-section">
            <div className="pd-header-meta">
              <div className="pd-badges-row">
                {product.category && (
                  <span className="pd-category-badge">{product.category}</span>
                )}
                {product.brand && (
                  <span className="pd-brand-badge">{product.brand}</span>
                )}
                <span
                  className={`pd-stock-badge ${
                    (product.stock ?? 1) > 0 ? "in-stock" : "out-of-stock"
                  }`}
                >
                  <span className="pd-stock-dot" />
                  {product.availabilityStatus ||
                    (product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock")}
                </span>
              </div>

              <h1 className="pd-title">{product.title}</h1>

              {/* Rating & Review Summary */}
              <div className="pd-rating-row">
                <div className="pd-stars">{renderStars(product.rating)}</div>
                <span className="pd-rating-number">
                  {typeof product.rating === "number"
                    ? product.rating.toFixed(1)
                    : product.rating}
                </span>
                <span className="pd-rating-count">
                  ({product.reviews?.length || 0} reviews)
                </span>
                {product.sku && <span className="pd-sku">SKU: {product.sku}</span>}
              </div>
            </div>

            {/* Price Box */}
            <div className="pd-price-box">
              <div className="pd-price-primary">
                <span className="pd-currency">$</span>
                <span className="pd-amount">
                  {typeof product.price === "number"
                    ? product.price.toFixed(2)
                    : product.price}
                </span>
              </div>
              {originalPrice && (
                <div className="pd-price-discounted">
                  <span className="pd-original-price">${originalPrice}</span>
                  <span className="pd-savings-pill">
                    Save ${(originalPrice - product.price).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="pd-description-block">
              <h3 className="pd-section-label">Description</h3>
              <p className="pd-description">{product.description}</p>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pd-purchase-section">
              <div className="pd-quantity-block">
                <span className="pd-quantity-label">Quantity</span>
                <div className="pd-quantity-control">
                  <button
                    type="button"
                    className="pd-qty-btn"
                    onClick={decrement}
                    disabled={count <= 1}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    className="pd-qty-input"
                    value={count}
                    min={1}
                    max={product.stock || 99}
                    onChange={handleCountChange}
                    aria-label="Product quantity"
                  />
                  <button
                    type="button"
                    className="pd-qty-btn"
                    onClick={increment}
                    disabled={count >= (product.stock || 99)}
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="pd-actions-row">
                <button
                  type="button"
                  className="pd-btn-cart"
                  onClick={addcart}
                >
                  <FaCartShopping className="pd-btn-icon" />
                  <span>Add to Cart</span>
                </button>
                <button
                  type="button"
                  className={`pd-btn-wishlist ${isWishlisted ? "active" : ""}`}
                  onClick={toggleWishlist}
                  aria-label="Add to wishlist"
                  title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <FaHeart />
                </button>
              </div>
            </div>

            {/* Value Guarantees / Perks */}
            <div className="pd-perks-grid">
              <div className="pd-perk-item">
                <div className="pd-perk-icon-wrap">
                  <FaTruckFast />
                </div>
                <div className="pd-perk-text">
                  <strong>
                    {product.shippingInformation || "Fast Shipping"}
                  </strong>
                  <span>Free shipping on all standard orders</span>
                </div>
              </div>

              <div className="pd-perk-item">
                <div className="pd-perk-icon-wrap">
                  <FaShieldHalved />
                </div>
                <div className="pd-perk-text">
                  <strong>
                    {product.warrantyInformation || "Warranty Protected"}
                  </strong>
                  <span>100% Authentic & covered warranty</span>
                </div>
              </div>

              <div className="pd-perk-item">
                <div className="pd-perk-icon-wrap">
                  <FaRotateLeft />
                </div>
                <div className="pd-perk-text">
                  <strong>
                    {product.returnPolicy || "30-Day Returns"}
                  </strong>
                  <span>Hassle-free easy return guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="pd-reviews-card">
            <div className="pd-reviews-header">
              <h2>Customer Reviews</h2>
              <span className="pd-reviews-badge">
                {product.reviews.length} Verified Reviews
              </span>
            </div>
            <div className="pd-reviews-grid">
              {product.reviews.map((rev, index) => (
                <div key={index} className="pd-review-item">
                  <div className="pd-review-top">
                    <div className="pd-reviewer-info">
                      <div className="pd-avatar">
                        {rev.reviewerName ? rev.reviewerName[0].toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="pd-reviewer-name">{rev.reviewerName}</div>
                        <div className="pd-review-date">
                          {rev.date ? new Date(rev.date).toLocaleDateString() : ""}
                        </div>
                      </div>
                    </div>
                    <div className="pd-stars">{renderStars(rev.rating)}</div>
                  </div>
                  <p className="pd-review-comment">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="pd-footer-actions">
          <Link to="/products" className="pd-back-link">
            <FaArrowLeft /> Back to All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
