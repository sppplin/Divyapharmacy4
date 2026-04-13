import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './types';

interface CartItem extends Product {
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (handle: string) => void;
  updateQuantity: (handle: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  user: { email: string } | null;
  login: (email: string) => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.handle === product.handle);
      if (existing) {
        return prev.map(item => 
          item.handle === product.handle 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (handle: string) => {
    setCart(prev => prev.filter(item => item.handle !== handle));
  };

  const updateQuantity = (handle: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(handle);
      return;
    }
    setCart(prev => prev.map(item => 
      item.handle === handle ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const login = (email: string) => setUser({ email });
  const logout = () => setUser(null);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount,
      user, login, logout
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
}
