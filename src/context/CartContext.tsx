'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type CartItem = {
  id: string; // unique local id
  childName: string;
  language: 'ar' | 'en';
  gender: 'boy' | 'girl';
  photos: File[];
  photoPreviewUrls: string[];
  price: number;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType>({
  items: [],
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = { ...item, id: `${Date.now()}-${Math.random()}` };
    setItems(prev => [...prev, newItem]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const removed = prev.find(i => i.id === id);
      if (removed) {
        removed.photoPreviewUrls.forEach(url => URL.revokeObjectURL(url));
      }
      return prev.filter(i => i.id !== id);
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems(prev => {
      prev.forEach(item => item.photoPreviewUrls.forEach(url => URL.revokeObjectURL(url)));
      return [];
    });
  }, []);

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, openCart, closeCart, addItem, removeItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
