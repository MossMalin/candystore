export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  on_sale: boolean;
  images: {
    thumbnail: string;
    large: string;
  };
  stock_status: 'instock' | 'outofstock';
  stock_quantity: number;
  tags: [Tag];
}

export type Products = {
  data: Omit<Product, 'data.description'>;
};

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export type TaggedProducts = Tag & {
  products: Product[];
};

export type CartItem = Pick<Product, 'id' | 'name' | 'price'> & {
  quantity: number;
  totalPrice: number;
};

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

interface Response {
  status: 'success' | 'error';
}

export type ProductResponse = Response & {
  data: Product;
};

export type TagResponse = Response & {
  data: TaggedProducts;
};

export type OrderResponse = Response & {
  data: { id: number };
};
