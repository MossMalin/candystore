import { createContext } from 'react';
import type { CartItem, Product } from '../types/Product.types.ts';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  totalCost: number;
  totalItems: number;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  totalCost: 0,
  totalItems: 0,
  showCart: false,
  setShowCart: () => {},
});
