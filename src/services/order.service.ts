import { post } from './http';
import type { Order } from '../types/Order.types';
import type { OrderResponse } from '../types/Response.types';

/**
 * Post an order to the API
 *
 * @param payload
 */
export const postOrder = async (payload: Order) => {
  return post<OrderResponse, Order>('/users/89/orders', payload);
};
