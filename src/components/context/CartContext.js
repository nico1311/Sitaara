// CartContext.js
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  isInCart: () => {},
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate the total whenever the cart changes
    const newTotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotal(newTotal);
  }, [cart]);

  const addItem = (item, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // If item already exists in the cart, update quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
        );
      } else {
        // If item does not exist in the cart, add it
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId) => {
    return cart.some((item) => item.id === itemId);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, isInCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
