import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext'; // custom toast

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { addToast } = useToast(); // custom toast function

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/cart');
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (foodId, quantity = 1) => {
    if (!user) {
      addToast('Please login to add items to cart', 'error');
      return false;
    }
    try {
      const { data } = await axios.post('/api/cart/add', { foodId, quantity });
      setCart(data);
      addToast('Added to cart!', 'success');
      return true;
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to add to cart', 'error');
      return false;
    }
  };

  const removeFromCart = async (foodId) => {
    try {
      const { data } = await axios.delete(`/api/cart/remove/${foodId}`);
      setCart(data);
      addToast('Removed from cart', 'success');
    } catch (error) {
      addToast('Failed to remove item', 'error');
    }
  };

  const updateQuantity = async (foodId, quantity) => {
    try {
      const { data } = await axios.put('/api/cart/update', { foodId, quantity });
      setCart(data);
    } catch (error) {
      addToast('Failed to update quantity', 'error');
    }
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  const getCartCount = () => {
    return cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  };

  const getCartTotal = () => {
    return cart.items?.reduce((sum, item) => sum + (item.food?.price || 0) * item.quantity, 0) || 0;
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal,
      fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};