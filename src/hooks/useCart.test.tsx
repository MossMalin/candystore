import { renderHook, act } from '@testing-library/react';
import { CartProvider } from '../context/CartProvider';
import useCart from './useCart';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('useCart', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  beforeEach(() => {
    localStorage.clear();
  });

  it('should add an item to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart({
        id: 1,
        name: 'Test Product',
        price: 10,
        stock_quantity: 5,
      });
    });
    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].name).toBe('Test Product');
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart({
        id: 2,
        name: 'Remove Product',
        price: 20,
        stock_quantity: 3,
      });
    });
    act(() => {
      result.current.removeFromCart(2);
    });
    expect(result.current.cart.length).toBe(0);
  });

  it('should update quantity of an item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart({
        id: 3,
        name: 'Quantity Product',
        price: 30,
        stock_quantity: 10,
      });
    });
    act(() => {
      result.current.updateQuantity(3, 5);
    });
    expect(result.current.cart[0].quantity).toBe(5);
    expect(result.current.cart[0].totalPrice).toBe(150);
  });
});
