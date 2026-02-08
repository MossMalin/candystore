import { describe, expect, it, vi } from 'vitest';
import * as orderService from './order.service';

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

describe('order.service', () => {
  it('should post order', async () => {
    const order = {
      customer_first_name: '',
      customer_last_name: '',
      customer_address: '',
      customer_postcode: '',
      customer_city: '',
      customer_email: '',
      customer_phone: '',
      order_total: 0,
      order_items: [],
    };
    const data = await orderService.postOrder(order);
    expect(data).toBe('POST:/users/89/orders:' + JSON.stringify(order));
  });
});
