import { createContext } from 'react';
import type { CartItem, Product } from '../types/Product.types.ts';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  totalCost: number;
  totalItems: number;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  totalCost: 0,
  totalItems: 0,
});
