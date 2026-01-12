import { get } from './http';
import type {
  ProductsResponse,
  ProductResponse,
  TagResponse,
  ProductsSnakeResponse,
  ProductSnakeResponse,
  TagSnakeResponse,
} from '../types/Response.types';

/**
 * Get products from API using axios
 */
export const getProducts = async (): Promise<ProductsResponse> => {
  const res = await get<ProductsSnakeResponse>('/products');
  const products: ProductsResponse = {
    status: res.status,
    message: res.message,
    data: res.data.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      onSale: item.on_sale,
      images: {
        thumbnail: item.images.thumbnail,
        large: item.images.large,
      },
      stockStatus: item.stock_status,
      stockQuantity: item.stock_quantity,
      tags: item.tags,
    })),
  };
  return products;
};

/**
 * Get a single product from the API
 *
 * @param id
 */
export const getProduct = async (id: number): Promise<ProductResponse> => {
  const res = await get<ProductSnakeResponse>('/products/' + id);
  return {
    status: res.status,
    message: res.message,
    data: {
      id: res.data.id,
      name: res.data.name,
      description: res.data.description,
      price: res.data.price,
      onSale: res.data.on_sale,
      images: {
        thumbnail: res.data.images.thumbnail,
        large: res.data.images.large,
      },
      stockStatus: res.data.stock_status,
      stockQuantity: res.data.stock_quantity,
      tags: res.data.tags,
    },
  };
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
export const getTaggedProducts = async (id: string): Promise<TagResponse> => {
  const res = await get<TagSnakeResponse>('/tags' + id);
  return {
    status: res.status,
    message: res.message,
    data: {
      id: res.data.id,
      name: res.data.name,
      slug: res.data.slug,
      products: res.data.products.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        onSale: item.on_sale,
        images: {
          thumbnail: item.images.thumbnail,
          large: item.images.large,
        },
        stockStatus: item.stock_status,
        stockQuantity: item.stock_quantity,
        tags: item.tags,
      })),
    },
  };
};
