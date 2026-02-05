// Create payload type for cart items with snake_case keys
export type CartItemsPayload = {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
};

export interface Order {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone: string;
  order_total: number;
  order_items: CartItemsPayload[];
}

export type CheckoutFormData = Omit<Order, 'order_total' | 'order_items'>;
