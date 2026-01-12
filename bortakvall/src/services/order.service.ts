import { post } from './http';
import type { OrderPayload } from '../types/Order.types';
import type { OrderResponse } from '../types/Response.types';

/**
 * Post an order to the API
 *
 * @param payload
 */
export const postOrder = async (payload: OrderPayload) => {
  return post<OrderResponse, OrderPayload>('/users/89/orders', payload);
};
