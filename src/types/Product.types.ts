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
  'id' | 'name' | 'price' | 'stock_quantity'
> & {
  quantity: number;
  totalPrice: number;
};
