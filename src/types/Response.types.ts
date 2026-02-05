import type { Product, Products, TaggedProducts, Tag } from './Product.types';

type SuccessState<T> = {
  status: 'success';
  data: T;
};

type ErrorState = {
  status: 'error';
  message: string;
};

type FailState = {
  status: 'fail';
  data: { [key: string]: string[] };
  message: string;
};

export type Response<T> = SuccessState<T> | ErrorState;

export type ProductsResponse = Response<Products[]>;

export type ProductResponse = Response<Product>;

export type TagResponse = SuccessState<TaggedProducts> | ErrorState;

export type TagsResponse = SuccessState<Tag[]> | ErrorState;

type OrderItems = {
  id: number | null;
  order_items: [string] | null;
};

export type OrderResponse = SuccessState<OrderItems> | FailState | ErrorState;
