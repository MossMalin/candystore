import { get } from './http';
import type {
  Products,
  ProductResponse,
  TagResponse,
} from '../types/Product.types';

/**
 * Get products from API using axios
 */
export const getProducts = async () => {
  return get<Products>('/products');
};

/**
 * Get a single product from the API
 *
 * @param id
 */
export const getProduct = async (id: number) => {
  return get<ProductResponse>('/products/' + id);
};

/**
 * Get tags from API using axios
 */
export const getTags = async () => {
  return get<TagResponse>('/tags');
};

/**
 * Get products with certain tag
 *
 * @param id
 */
export const getTaggedProducts = async (id: string) => {
  return get<TagResponse>('/tags' + id);
};
