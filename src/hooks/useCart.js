import { useState } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((current) => [...current, product]);
    setCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  return { cart, cartOpen, setCartOpen, addToCart, removeFromCart };
}
