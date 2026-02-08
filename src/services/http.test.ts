import { describe, expect, it, vi } from 'vitest';
import * as http from './http';

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

describe('http service', () => {
  it('should perform GET request', async () => {
    const data = await http.get('test-endpoint');
    expect(data).toBe('GET:test-endpoint');
  });

  it('should perform POST request', async () => {
    const data = await http.post('test-endpoint', { foo: 'bar' });
    expect(data).toBe('POST:test-endpoint:{"foo":"bar"}');
  });
});
