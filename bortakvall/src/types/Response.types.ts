import type { Product, Products, TaggedProducts } from './Product.types';
import type { KeysToSnakeCase } from './types';

export type Response<T> = {
  status: 'success' | 'fail' | 'error';
  data: T;
  message?: string | null;
};

export type ProductsResponse = Response<Products[]>;

type ProductsToSnakeCase = KeysToSnakeCase<Products>;

type ProductToSnakeCase = KeysToSnakeCase<Product>;

export type ProductResponse = Response<Product>;

export type ProductsSnakeResponse = Response<ProductsToSnakeCase[]>;

export type ProductSnakeResponse = Response<ProductToSnakeCase>;

export type TagResponse = Response<TaggedProducts>;

export type TagSnakeResponse = Response<
  Omit<TaggedProducts, 'products'> & { products: ProductsToSnakeCase[] }
>;

// Create response type for order API with snake_case keys
type OrderItems = KeysToSnakeCase<{
  id: number | null;
  orderItems: [string] | null;
}>;

export type OrderResponse = Response<OrderItems>;
