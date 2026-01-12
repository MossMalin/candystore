import type { KeysToSnakeCase } from './types';

// Create payload type for cart items with snake_case keys
export type CartItemsPayload = KeysToSnakeCase<{
  productId: number;
  qty: number;
  itemPrice: number;
  itemTotal: number;
}>;

export interface Order {
  customerFirstName: string;
  customerLastName: string;
  customerAddress: string;
  customerPostcode: string;
  customerCity: string;
  customerEmail: string;
  customerPhone: string;
  orderTotal: number;
  orderItems: CartItemsPayload[];
}

// Convert Order keys to snake_case for API payload
export type OrderPayload = KeysToSnakeCase<Order>;

export type CheckoutFormData = Omit<Order, 'orderTotal' | 'orderItems'>;

export type CheckoutFormDataSnakeCase = KeysToSnakeCase<CheckoutFormData>;
