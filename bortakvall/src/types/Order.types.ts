type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S;

type KeysToSnakeCase<T> = {
  [K in keyof T as CamelToSnakeCase<string & K>]: T[K];
};

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

export type OrderPayload = KeysToSnakeCase<Order>;

export interface OrderResponse {
  status: 'success' | 'error';
  data: { id: number };
}
