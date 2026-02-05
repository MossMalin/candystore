import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Counter } from './Counter';

describe('Counter component', () => {
  const product = {
    id: 1,
    name: 'Candy',
    price: 10,
    stock_quantity: 5,
  };

  it('renders product quantity and stock', () => {
    render(
      <Counter
        product={product}
        getCartItemQuantity={() => 2}
        addToCart={vi.fn()}
        updateQuantity={vi.fn()}
      />
    );
    expect(screen.getByText('2 av 5')).toBeInTheDocument();
  });

  it('calls updateQuantity when minus button is clicked', () => {
    const updateQuantity = vi.fn();
    render(
      <Counter
        product={product}
        getCartItemQuantity={() => 2}
        addToCart={vi.fn()}
        updateQuantity={updateQuantity}
      />
    );
    const minusBtn = screen.getByLabelText('Remove one Candy');
    fireEvent.click(minusBtn);
    expect(updateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('calls addToCart when plus button is clicked', () => {
    const addToCart = vi.fn();
    render(
      <Counter
        product={product}
        getCartItemQuantity={() => 2}
        addToCart={addToCart}
        updateQuantity={vi.fn()}
      />
    );
    const plusBtn = screen.getByLabelText('Add a Candy');
    fireEvent.click(plusBtn);
    expect(addToCart).toHaveBeenCalledWith(product);
  });

  it('disables plus button if stock is reached', () => {
    render(
      <Counter
        product={product}
        getCartItemQuantity={() => 5}
        addToCart={vi.fn()}
        updateQuantity={vi.fn()}
      />
    );
    const plusBtn = screen.getByLabelText('Add a Candy');
    expect(plusBtn).toBeDisabled();
  });
});
