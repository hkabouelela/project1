import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('shopstream_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('shopstream_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cartItems]);

  function addToCart(product, quantity = 1) {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        const maxStock = product.stock || 99;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, maxStock),
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: Number(product.price) || 0,
            thumbnail: product.thumbnail || product.images?.[0] || '',
            category: product.category || '',
            stock: product.stock || 99,
            quantity: Math.max(1, quantity),
          },
        ];
      }
    });
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const maxStock = item.stock || 99;
          return { ...item, quantity: Math.min(quantity, maxStock) };
        }
        return item;
      })
    );
  }

  function removeFromCart(id) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCartItems([]);
    setDiscount(0);
    setAppliedPromo('');
  }

  function applyPromoCode(code) {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'STREAM10') {
      const disc = subtotal * 0.1;
      setDiscount(disc);
      setAppliedPromo(cleanCode);
      return { success: true, message: '10% discount applied!' };
    } else if (cleanCode === 'FREESHIP') {
      setDiscount(5.99);
      setAppliedPromo(cleanCode);
      return { success: true, message: 'Free shipping promo applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try STREAM10' };
  }

  function removePromo() {
    setDiscount(0);
    setAppliedPromo('');
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 || cartItems.length === 0 ? 0 : 5.99;
  const finalTotal = Math.max(0, subtotal + shipping - discount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };

