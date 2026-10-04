import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './cart.css';
import { toast } from 'react-toastify';
import {
  FiTrash2,
  FiShoppingBag,
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiCheck,
  FiTag,
} from 'react-icons/fi';
import { FaLock, FaShieldHalved, FaTruckFast } from 'react-icons/fa6';

export function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyPromoCode,
    removePromo,
    totalItems,
    subtotal,
    shipping,
    discount,
    appliedPromo,
    finalTotal,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  function handleApplyPromo(e) {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (res.success) {
      toast.success(res.message);
      setPromoInput('');
    } else {
      setPromoError(res.message);
      toast.error(res.message);
    }
  }

  function handleCheckout() {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      toast.success('Order placed successfully! Thank you for shopping with ShopStream.');
      clearCart();
    }, 1200);
  }

  // Free shipping threshold calculation ($50)
  const freeShippingThreshold = 50;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-container">
          <div className="cart-empty-card">
            <div className="cart-empty-icon-wrap">
              <FiShoppingBag className="cart-empty-icon" />
            </div>
            <h2>Your Shopping Cart is Empty</h2>
            <p>
              Looks like you haven't added any items to your cart yet. Explore our
              curated catalog and discover great deals today!
            </p>
            <Link to="/products" className="cart-btn-primary cart-empty-btn">
              <FiArrowLeft /> Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        {/* Breadcrumb / Top Bar */}
        <div className="cart-header-row">
          <div>
            <h1 className="cart-title">Shopping Cart</h1>
            <p className="cart-subtitle">
              You have <strong>{totalItems}</strong> {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            type="button"
            className="cart-clear-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to empty your cart?')) {
                clearCart();
                toast.info('Cart cleared');
              }
            }}
          >
            <FiTrash2 /> Empty Cart
          </button>
        </div>

        {/* Free Shipping Progress Alert */}
        <div className="cart-shipping-banner">
          <div className="cart-shipping-banner-top">
            <FaTruckFast className="shipping-banner-icon" />
            <span>
              {amountToFreeShipping > 0 ? (
                <>
                  Add <strong>${amountToFreeShipping.toFixed(2)}</strong> more to get{' '}
                  <span className="free-shipping-highlight">FREE Standard Shipping!</span>
                </>
              ) : (
                <strong className="free-shipping-highlight">
                  🎉 Congratulations! You have unlocked FREE Standard Shipping!
                </strong>
              )}
            </span>
          </div>
          <div className="cart-progress-bar-bg">
            <div
              className="cart-progress-bar-fill"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Cart Grid */}
        <div className="cart-grid">
          {/* Left Column: Selected Products List */}
          <div className="cart-items-column">
            <div className="cart-table-card">
              <div className="cart-table-header">
                <span className="col-product">Product</span>
                <span className="col-price">Price</span>
                <span className="col-qty">Quantity</span>
                <span className="col-total">Total</span>
                <span className="col-action"></span>
              </div>

              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const itemTotal = (item.price * item.quantity).toFixed(2);
                  return (
                    <div className="cart-item-row" key={item.id}>
                      {/* Product Info */}
                      <div className="col-product cart-product-info">
                        <Link to={`/product/${item.id}`} className="cart-thumb-link">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="cart-product-thumb"
                          />
                        </Link>
                        <div className="cart-product-meta">
                          {item.category && (
                            <span className="cart-item-cat">{item.category}</span>
                          )}
                          <Link to={`/product/${item.id}`} className="cart-item-title">
                            {item.title}
                          </Link>
                          <span className="cart-mobile-price">
                            ${Number(item.price).toFixed(2)} each
                          </span>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="col-price cart-unit-price">
                        ${Number(item.price).toFixed(2)}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="col-qty cart-qty-wrap">
                        <div className="cart-stepper">
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <FiMinus />
                          </button>
                          <span className="stepper-count">{item.quantity}</span>
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= (item.stock || 99)}
                            aria-label="Increase quantity"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="col-total cart-line-total">
                        ${itemTotal}
                      </div>

                      {/* Remove Button */}
                      <div className="col-action cart-action-wrap">
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => {
                            removeFromCart(item.id);
                            toast.info(`${item.title} removed from cart`);
                          }}
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Card Actions */}
              <div className="cart-table-footer">
                <Link to="/products" className="cart-continue-link">
                  <FiArrowLeft /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Final Total */}
          <div className="cart-summary-column">
            <div className="cart-summary-card">
              <h2 className="summary-title">Order Summary</h2>

              {/* Promo Code Input */}
              <form className="promo-form" onSubmit={handleApplyPromo}>
                <div className="promo-input-wrap">
                  <FiTag className="promo-icon" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. STREAM10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="promo-input"
                  />
                  <button type="submit" className="promo-apply-btn">
                    Apply
                  </button>
                </div>
                {promoError && <p className="promo-error-msg">{promoError}</p>}
                {appliedPromo && (
                  <div className="promo-active-tag">
                    <span>
                      <FiCheck /> Code <strong>{appliedPromo}</strong> applied!
                    </span>
                    <button
                      type="button"
                      className="promo-remove-btn"
                      onClick={() => {
                        removePromo();
                        toast.info('Promo code removed');
                      }}
                    >
                      &times;
                    </button>
                  </div>
                )}
              </form>

              {/* Cost Breakdown */}
              <div className="summary-rows">
                <div className="summary-row">
                  <span className="summary-label">Subtotal ({totalItems} items)</span>
                  <span className="summary-value">${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span className="summary-label">Estimated Shipping</span>
                  <span className="summary-value">
                    {shipping === 0 ? (
                      <span className="shipping-free-tag">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="summary-row discount-row">
                    <span className="summary-label">Discount Applied</span>
                    <span className="summary-value discount-value">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="summary-divider" />

                {/* Final Total Price */}
                <div className="summary-row total-row">
                  <span className="total-label">Final Total</span>
                  <div className="total-value-wrap">
                    <span className="total-currency">$</span>
                    <span className="total-amount">{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                className="cart-checkout-btn"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                <FaLock className="checkout-icon" />
                <span>{isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}</span>
              </button>

              {/* Trust & Guarantee Badges */}
              <div className="summary-guarantees">
                <div className="guarantee-item">
                  <FaShieldHalved className="guarantee-icon" />
                  <span>Secure 256-bit SSL Encrypted Checkout</span>
                </div>
                <div className="guarantee-item">
                  <FaTruckFast className="guarantee-icon" />
                  <span>Tracked delivery with instant confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
