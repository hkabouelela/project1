import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import { FaRegCircleUser } from 'react-icons/fa6';
import { useCart } from '../../context/useCart';

export function Header() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [searchValue, setSearchValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  function handleLogout() {
    localStorage.removeItem('token');
    setShowUserMenu(false);
    navigate('/');
  }

  function handleSearchSubmit(e) {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
    }
  }

  return (
    <header className="site-header">
      <div className="header-left">
        <Link to="/home" className="header-logo">
          ShopStream
        </Link>

        <nav className="header-nav">
          <Link to="/home" className="header-nav-link">
            Home
          </Link>
          <Link to="/products" className="header-nav-link">
            Products
          </Link>
          <Link to="/categories" className="header-nav-link">
            Categories
          </Link>
        </nav>
      </div>

      <div className="header-right">
        <div className="header-search-wrap">
          <FiSearch className="search-icon" />
          <input
            type="search"
            className="search-input"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchSubmit}
          />
        </div>

        <div className="header-actions">
          <Link
            to="/cart"
            className="header-action-btn cart-icon-btn"
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <FiShoppingCart className="action-icon" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          <div className="user-dropdown-container">
            <button
              type="button"
              className="header-action-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              title="User Account"
              aria-label="User Account"
            >
              <FaRegCircleUser className="action-icon" />
            </button>

            {showUserMenu && (
              <div className="user-dropdown-menu">
                {localStorage.getItem('token') ? (
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    Log Out
                  </button>
                ) : (
                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Log In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}