export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  onSale: boolean;
  images: {
    thumbnail: string;
    large: string;
  };
  stockStatus: 'instock' | 'outofstock';
  stockQuantity: number;
  tags: [Tag];
}

export type Products = Omit<Product, 'description'>;

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export type TaggedProducts = Tag & {
  products: Products[];
};

export type CartItem = Pick<
  Product,
  'id' | 'name' | 'price' | 'stockQuantity'
> & {
  quantity: number;
  totalPrice: number;
};
