import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { toast } from 'react-toastify';
import './categories.css';
import {
  FaCouch,
  FaLaptop,
  FaMobileScreen,
  FaShirt,
  FaGem,
  FaSprayCanSparkles,
  FaUtensils,
  FaCar,
  FaMotorcycle,
  FaGlasses,
  FaClock,
  FaBagShopping,
  FaBasketShopping,
  FaHeart,
  FaArrowLeft,
  FaArrowRight,
  FaMagnifyingGlass,
  FaLayerGroup,
  FaCartShopping,
  FaStar,
} from 'react-icons/fa6';

const CATEGORY_ICONS = {
  beauty: <FaHeart />,
  fragrances: <FaSprayCanSparkles />,
  furniture: <FaCouch />,
  groceries: <FaBasketShopping />,
  'home-decoration': <FaCouch />,
  'kitchen-accessories': <FaUtensils />,
  laptops: <FaLaptop />,
  'mens-shirts': <FaShirt />,
  'mens-shoes': <FaShirt />,
  'mens-watches': <FaClock />,
  'mobile-accessories': <FaMobileScreen />,
  motorcycle: <FaMotorcycle />,
  'skin-care': <FaHeart />,
  smartphones: <FaMobileScreen />,
  'sports-accessories': <FaBasketShopping />,
  sunglasses: <FaGlasses />,
  tablets: <FaLaptop />,
  tops: <FaShirt />,
  vehicle: <FaCar />,
  'womens-bags': <FaBagShopping />,
  'womens-dresses': <FaShirt />,
  'womens-jewellery': <FaGem />,
  'womens-shoes': <FaShirt />,
  'womens-watches': <FaClock />,
};

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSlug = searchParams.get('c') || null;

  // Selected category products
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => {
        // DummyJSON returns an array of objects: { slug, name, url } or strings
        const formatted = Array.isArray(data)
          ? data.map((item) =>
              typeof item === 'string'
                ? { slug: item, name: item.replace(/-/g, ' ') }
                : item
            )
          : [];
        setCategories(formatted);
        setLoadingCategories(false);
      })
      .catch((err) => {
        console.error('Failed to load categories', err);
        setLoadingCategories(false);
      });
  }, []);

  // When a category is selected, fetch its products
  useEffect(() => {
    if (!selectedSlug) return;

    let ignore = false;
    fetch(`https://dummyjson.com/products/category/${selectedSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setCategoryProducts(data.products || []);
          setLoadingProducts(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.error('Failed to load category products', err);
          setLoadingProducts(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [selectedSlug]);

  function handleSelectCategory(slug) {
    setLoadingProducts(true);
    setSearchParams({ c: slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBackToCategories() {
    setCategoryProducts([]);
    setSearchParams({});
  }

  function handleAddToCart(product) {
    addToCart(product, 1);
    toast.success(`${product.title} added to cart!`);
  }

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCategoryObj = categories.find((c) => c.slug === selectedSlug);
  const activeCategoryName = activeCategoryObj
    ? activeCategoryObj.name
    : selectedSlug?.replace(/-/g, ' ');

  return (
    <div className="cat-page-wrapper">
      <div className="cat-container">
        {selectedSlug ? (
          /* ==========================================================================
             View: Category Products View
             ========================================================================== */
          <div className="cat-products-view">
            <div className="cat-products-header">
              <button
                type="button"
                className="cat-back-btn"
                onClick={handleBackToCategories}
              >
                <FaArrowLeft /> All Categories
              </button>

              <div className="cat-current-info">
                <div className="cat-header-icon-wrap">
                  {CATEGORY_ICONS[selectedSlug] || <FaLayerGroup />}
                </div>
                <div>
                  <h1 className="cat-current-title">{activeCategoryName}</h1>
                  <p className="cat-current-count">
                    {loadingProducts
                      ? 'Loading items...'
                      : `${categoryProducts.length} Products Found`}
                  </p>
                </div>
              </div>
            </div>

            {loadingProducts ? (
              <div className="cat-products-grid">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="cat-product-skeleton-card">
                    <div className="skeleton-thumb" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line short" />
                    <div className="skeleton-btn" />
                  </div>
                ))}
              </div>
            ) : categoryProducts.length === 0 ? (
              <div className="cat-empty-view">
                <FaLayerGroup className="cat-empty-icon" />
                <h3>No products found in this category</h3>
                <button
                  type="button"
                  className="cat-back-btn primary"
                  onClick={handleBackToCategories}
                >
                  Back to Categories
                </button>
              </div>
            ) : (
              <div className="cat-products-grid">
                {categoryProducts.map((p) => (
                  <div className="cat-product-card" key={p.id}>
                    <Link to={`/product/${p.id}`} className="cat-card-img-link">
                      <img src={p.thumbnail} alt={p.title} />
                      {p.discountPercentage && (
                        <span className="cat-discount-badge">
                          -{Math.round(p.discountPercentage)}%
                        </span>
                      )}
                    </Link>

                    <div className="cat-card-body">
                      <div className="cat-card-rating">
                        <FaStar className="star-icon" />
                        <span>{typeof p.rating === 'number' ? p.rating.toFixed(1) : p.rating}</span>
                      </div>

                      <Link to={`/product/${p.id}`} className="cat-card-title">
                        {p.title}
                      </Link>

                      <div className="cat-card-footer">
                        <span className="cat-card-price">${Number(p.price).toFixed(2)}</span>
                        <button
                          type="button"
                          className="cat-add-cart-btn"
                          onClick={() => handleAddToCart(p)}
                          title="Add to cart"
                          aria-label="Add to cart"
                        >
                          <FaCartShopping />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ==========================================================================
             View: All Categories Grid View
             ========================================================================== */
          <div className="cat-overview">
            {/* Header Banner */}
            <div className="cat-hero">
              <div className="cat-hero-badge">
                <FaLayerGroup /> Explore Categories
              </div>
              <h1 className="cat-hero-title">Browse by Category</h1>
              <p className="cat-hero-desc">
                Find exactly what you love. Select a department to explore high-quality
                products curated for you.
              </p>

              {/* Search Bar */}
              <div className="cat-search-bar">
                <FaMagnifyingGlass className="cat-search-icon" />
                <input
                  type="text"
                  placeholder="Search categories (e.g. beauty, laptops, smartphones)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="cat-clear-search"
                    onClick={() => setSearchQuery('')}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Quick Filter Pill Badges */}
            <div className="cat-quick-pills">
              <button
                type="button"
                className={`quick-pill ${!searchQuery ? 'active' : ''}`}
                onClick={() => setSearchQuery('')}
              >
                All ({categories.length})
              </button>
              {categories.slice(0, 8).map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  className="quick-pill"
                  onClick={() => handleSelectCategory(cat.slug)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Categories Card Grid */}
            {loadingCategories ? (
              <div className="cat-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                  <div key={n} className="cat-card skeleton">
                    <div className="skeleton-icon" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line short" />
                  </div>
                ))}
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="cat-empty-view">
                <FaLayerGroup className="cat-empty-icon" />
                <h3>No categories match "{searchQuery}"</h3>
                <p>Try searching for a different keyword or reset filters.</p>
                <button
                  type="button"
                  className="cat-back-btn primary"
                  onClick={() => setSearchQuery('')}
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="cat-grid">
                {filteredCategories.map((cat) => (
                  <div
                    key={cat.slug}
                    className="cat-card"
                    onClick={() => handleSelectCategory(cat.slug)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSelectCategory(cat.slug);
                    }}
                  >
                    <div className="cat-icon-container">
                      {CATEGORY_ICONS[cat.slug] || <FaLayerGroup />}
                    </div>

                    <div className="cat-card-info">
                      <h3 className="cat-name">{cat.name}</h3>
                      <span className="cat-slug-tag">/{cat.slug}</span>
                    </div>

                    <div className="cat-card-arrow">
                      <FaArrowRight />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}