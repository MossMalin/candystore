import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ProductListPage from './ProductListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as productService from '../services/product.service';
import * as useCartModule from '../hooks/useCart';
import { MemoryRouter } from 'react-router';
import type { Products } from '../types/Product.types';
import type { ProductsResponse, TagResponse } from '../types/Response.types';

const mockTag = { id: 1, name: 'Sweet', slug: 'sweet' };
const mockProducts: Products[] = [
  {
    id: 1,
    name: 'Candy1',
    price: 10,
    images: { thumbnail: '/img1.png', large: '/img1-large.png' },
    stock_status: 'instock',
    stock_quantity: 5,
    tags: [mockTag],
    on_sale: false,
  },
  {
    id: 2,
    name: 'Candy2',
    price: 20,
    images: { thumbnail: '/img2.png', large: '/img2-large.png' },
    stock_status: 'outofstock',
    stock_quantity: 0,
    tags: [mockTag],
    on_sale: false,
  },
];

const mockTaggedProducts: TagResponse = {
  status: 'success',
  data: {
    id: 1,
    name: 'Sweet',
    slug: 'sweet',
    products: [mockProducts[0]],
  },
};

const mockCart: ReturnType<typeof useCartModule.default> = {
  cart: [],
  addToCart: vi.fn(),
  updateQuantity: vi.fn(),
  removeFromCart: vi.fn(),
  totalItems: 0,
  totalCost: 0,
  showCart: false,
  setShowCart: vi.fn(),
};

const mockResponse: ProductsResponse = {
  status: 'success',
  data: mockProducts,
};

describe('ProductListPage', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue(mockResponse);
    vi.spyOn(productService, 'getTaggedProducts').mockResolvedValue(
      mockTaggedProducts
    );
    vi.spyOn(useCartModule, 'default').mockReturnValue({
      ...mockCart,
      cart: [],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders products and handles add to cart', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProductListPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Candy1')).toBeInTheDocument();
      expect(screen.getByText(/Candy2/)).toBeInTheDocument();
    });
    // Simulate add to cart
    const plusBtn = screen.getByRole('button', { name: 'Add a Candy1' });
    fireEvent.click(plusBtn);
    expect(mockCart.addToCart).toHaveBeenCalled();
  });

  it('filters products by tag', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProductListPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
    // Simulate tag click
    await waitFor(() => expect(screen.getByText('Candy1')).toBeInTheDocument());
    const tagBtn = screen.getByText('Show all');
    fireEvent.click(tagBtn);
    // Should still show products (mocked getProducts)
    await waitFor(() => expect(screen.getByText('Candy1')).toBeInTheDocument());
  });

  it('shows empty state if no products', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      status: 'success',
      data: [],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProductListPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText('Candy1')).not.toBeInTheDocument();
      expect(screen.queryByText('Candy2')).not.toBeInTheDocument();
    });
  });

  it('shows error message on fetch error', async () => {
    vi.spyOn(productService, 'getProducts').mockRejectedValue(
      new Error('API error')
    );
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProductListPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    });
  });
});
