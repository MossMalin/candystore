import { get } from './http';
import type {
  ProductsResponse,
  ProductResponse,
  TagResponse,
  TagsResponse,
} from '../types/Response.types';

/**
 * Get products from API using axios
 */
export const getProducts = async (): Promise<ProductsResponse> => {
  const res = await get<ProductsResponse>('/products');
  return res;
};

/**
 * Get a single product from the API
 *
 * @param id
 */
export const getProduct = async (id: number): Promise<ProductResponse> => {
  const res = await get<ProductResponse>('/products/' + id);
  return res;
};

/**
 * Get tags from API using axios
 */
export const getTags = async () => {
  return get<TagsResponse>('/tags');
};

/**
 * Get products with certain tag
 *
 * @param id
 */
export const getTaggedProducts = async (id: string): Promise<TagResponse> => {
  const res = await get<TagResponse>('/tags' + id);
  return res;
};
