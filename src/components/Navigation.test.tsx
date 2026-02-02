import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Navigation from './Navigation';
import * as useCartModule from '../hooks/useCart';
import { MemoryRouter } from 'react-router';

// Arrange: Mock useCart hook
const mockUseCart = {
  cart: [],
  totalCost: 0,
  removeFromCart: vi.fn(),
  totalItems: 0,
  showCart: false,
  setShowCart: vi.fn(),
  addToCart: vi.fn(),
  updateQuantity: vi.fn(),
};

describe('Navigation component', () => {
  beforeEach(() => {
    vi.spyOn(useCartModule, 'default').mockReturnValue({
      ...mockUseCart,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo and cart button', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByAltText('Candystore logo')).toBeInTheDocument();
    expect(screen.getByText(/show cart/i)).toBeInTheDocument();
  });

  it('shows back button when not on root', () => {
    render(
      <MemoryRouter initialEntries={['/product']}>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('calls setShowCart when cart button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>
    );
    const cartBtn = screen.getByRole('button', { name: /show cart/i });
    fireEvent.click(cartBtn);
    expect(mockUseCart.setShowCart).toHaveBeenCalledWith(true);
  });
});
