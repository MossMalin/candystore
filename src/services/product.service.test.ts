import { describe, expect, it, vi } from 'vitest';
import * as productService from './product.service';

vi.mock('axios', () => ({
  default: {
    create: () => ({
      get: vi.fn((endpoint) => Promise.resolve({ data: `GET:${endpoint}` })),
      post: vi.fn((endpoint, data) =>
        Promise.resolve({ data: `POST:${endpoint}:${JSON.stringify(data)}` })
      ),
    }),
  },
}));

describe('product.service', () => {
  it('should get products', async () => {
    const data = await productService.getProducts();
    expect(data).toBe('GET:/products');
  });

  it('should get product by id', async () => {
    const data = await productService.getProduct(123);
    expect(data).toBe('GET:/products/123');
  });

  it('should get tags', async () => {
    const data = await productService.getTags();
    expect(data).toBe('GET:/tags');
  });

  it('should get tagged products', async () => {
    const data = await productService.getTaggedProducts('42');
    expect(data).toBe('GET:/tags42');
  });
});
