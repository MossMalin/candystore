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
  ? U extends Uncapitalize<U>
    ? `${Uncapitalize<T>}${CamelToSnakeCase<U>}`
    : `${Uncapitalize<T>}_${CamelToSnakeCase<U>}`
  : S;

export type ConvertToSnakeCase<T> = T extends Date | RegExp // Skip non-object types like Date/RegExp
  ? T
  : T extends Array<infer U> // Handle arrays
    ? U extends object
      ? ConvertToSnakeCase<U>[] // Recursively apply to array elements if they're objects
      : T
    : T extends object // Handle nested objects
      ? {
          [K in keyof T as CamelToSnakeCase<string & K>]: ConvertToSnakeCase<
            T[K]
          >; // Recurse into nested values
        }
      : T;

export interface Order {
  customerFirstName: string;
  customerLastName: string;
  customerAddress: string;
  customerPostcode: string;
  customerCity: string;
  customerEmail: string;
  customerPhone: string;
  orderTotal: number;
  orderItems: CartItem[];
}

export type OrderUpdate = ConvertToSnakeCase<Order>;

export type OrderCartItems = ConvertToSnakeCase<CartItem>;

interface Response {
  status: 'success' | 'error';
}

export type ProductResponse = Response & {
  data: Product;
};

export type TagResponse = Response & {
  data: TaggedProducts;
};
