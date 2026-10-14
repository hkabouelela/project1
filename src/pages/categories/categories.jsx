import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/useCart';
import '../Home/home.css';
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
  FaLayerGroup,
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const url =
      selectedCategory === 'all'
        ? 'https://dummyjson.com/products'
        : `https://dummyjson.com/products/category/${selectedCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error(err));
  }, [selectedCategory]);

  function addcart(product) {
    addToCart(product, 1);
    toast.success(`${product.title} added to cart!`);
  }

  return (
    <div className="cat-page-wrapper">
      <div className="cat-container">
        {selectedCategory ? (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <button
                className="cat-back-btn"
                onClick={() => setSelectedCategory(null)}
              >
                ← All Categories
              </button>
              <h2
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textTransform: 'capitalize',
                  margin: 0,
                }}
              >
                {selectedCategory === 'all' ? (
                  <FaLayerGroup />
                ) : (
                  CATEGORY_ICONS[selectedCategory]
                )}
                {selectedCategory === 'all'
                  ? 'All Products'
                  : selectedCategory.replace(/-/g, ' ')}
              </h2>
            </div>

            {/* Quick category switch pills */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '16px',
                marginBottom: '20px',
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`quick-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                }}
              >
                <FaLayerGroup /> All
              </button>
              {categories.map((cat) => {
                const slug = typeof cat === 'object' ? cat.slug : cat;
                const name = typeof cat === 'object' ? cat.name : cat;
                const isActive = selectedCategory === slug;
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => setSelectedCategory(slug)}
                    className={`quick-pill ${isActive ? 'active' : ''}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {CATEGORY_ICONS[slug]} {name}
                  </button>
                );
              })}
            </div>

            {/* Products grid displayed exactly like the products page */}
            <div className="grid">
              {products.map((p) => (
                <div className="card" key={p.id}>
                  <Link
                    to={`/product/${p.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <img src={p.thumbnail} alt={p.description} />
                    <h2>{p.title}</h2>
                    <p>price :${p.price}</p>
                  </Link>
                  <button onClick={() => addcart(p)}>add to cart</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="cat-grid">
            <div
              className="cat-card"
              onClick={() => setSelectedCategory('all')}
              style={{ cursor: 'pointer' }}
            >
              <div className="cat-icon-container">
                <FaLayerGroup />
              </div>
              <div className="cat-card-info">
                <h3 className="cat-name">All Products</h3>
              </div>
            </div>

            {categories.map((cat) => {
              const slug = typeof cat === 'object' ? cat.slug : cat;
              const name = typeof cat === 'object' ? cat.name : cat;

              return (
                <div
                  key={slug}
                  className="cat-card"
                  onClick={() => setSelectedCategory(slug)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="cat-icon-container">
                    {CATEGORY_ICONS[slug]}
                  </div>
                  <div className="cat-card-info">
                    <h3 className="cat-name">{name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
