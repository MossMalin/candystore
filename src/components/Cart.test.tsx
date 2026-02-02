import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Cart } from './Cart';
import * as useCartModule from '../hooks/useCart';

// Arrange: Mock useCart hook
const mockUseCart = {
  cart: [
    {
      id: 1,
      name: 'Candy',
      price: 10,
      quantity: 2,
      totalPrice: 20,
      stockQuantity: 5,
    },
  ],
  totalCost: 20,
  removeFromCart: vi.fn(),
  totalItems: 2,
  showCart: true,
  setShowCart: vi.fn(),
  addToCart: vi.fn(),
  updateQuantity: vi.fn(),
};

describe('Cart component', () => {
  beforeEach(() => {
    vi.spyOn(useCartModule, 'default').mockReturnValue(mockUseCart);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders cart items and total', () => {
    // Act
    render(<Cart />);
    // Assert
    expect(screen.getByText('Candy')).toBeInTheDocument();
    // There may be multiple '20 kr', so use getAllByText
    expect(screen.getAllByText('20 kr').length).toBeGreaterThan(0);
    expect(screen.getByText('Total amount')).toBeInTheDocument();
  });

  it('calls removeFromCart when remove button is clicked', () => {
    render(<Cart />);
    const removeBtn = screen.getByLabelText('Remove Candy');
    fireEvent.click(removeBtn);
    expect(mockUseCart.removeFromCart).toHaveBeenCalledWith(1);
  });

  it('shows empty cart message when cart is empty', () => {
    vi.spyOn(useCartModule, 'default').mockReturnValue({
      ...mockUseCart,
      cart: [],
    });
    render(<Cart />);
    expect(screen.getByText('Your cart is empty 😢')).toBeInTheDocument();
  });
});
