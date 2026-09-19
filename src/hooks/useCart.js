import { useEffect, useState } from 'react';

const CART_KEY = 'storegamer_cart';

export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((current) => {
      const existingIndex = current.findIndex((item) => String(item.id) === String(product.id));

      if (existingIndex >= 0) {
        return current.map((item, index) =>
          index === existingIndex ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (index, delta) => {
    setCart((current) =>
      current.map((item, itemIndex) => {
        if (itemIndex !== index) return item;

        const nextQuantity = (item.quantity || 1) + delta;
        return { ...item, quantity: Math.max(1, nextQuantity) };
      })
    );
  };

  const removeFromCart = (index) => {
    setCart((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  return { cart, cartOpen, setCartOpen, addToCart, updateQuantity, removeFromCart, clearCart };
}
