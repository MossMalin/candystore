/**
 * All communication with the backend REST-API (`json-server`)
 */

import axios from 'axios';
import type { Tag, Products, ProductResponse } from './CandyAPI.types';

const BASE_URL = import.meta.env.VITE_API_BASEURL;

// Create a new axios instance
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 10000, // 10 seconds
});

/**
 * Generic HTTP GET request
 *
 * @param endpoint Endpoint to get
 */
export const get = async <T>(endpoint: string) => {
  const response = await instance.get<T>(endpoint);
  return response.data;
};

/**
 * Make a generic HTTP POST request
 *
 * @param endpoint Endpoint to POST to
 * @param data Payload to POST
 */
export const post = async <Response, Payload>(
  endpoint: string,
  data: Payload
) => {
  const response = await instance.post<Response>(endpoint, data);
  return response.data;
};

/**
 * Get products from API using axios 🤘🏻
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
 * Get products from API using axios 🤘🏻
 */
export const getTags = async () => {
  return get<Tag[]>('/tags');
};

/**
 * Get a single product from the API
 *
 * @param id
 */
export const getTag = async (id: number) => {
  return get<Tag>('/tags/' + id);
};
