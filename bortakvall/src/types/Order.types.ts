type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S;

type KeysToSnakeCase<T> = {
  [K in keyof T as CamelToSnakeCase<string & K>]: T[K];
};

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

// Create response type for order API with snake_case keys
type OrderItems = KeysToSnakeCase<{
  id: number | null;
  orderItems: [string] | null;
}>;

export interface OrderResponse {
  status: 'success' | 'fail';
  message: string | null;
  data: OrderItems;
}
