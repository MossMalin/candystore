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

export type ProductResponse = {
  data: Product;
};

export type Products = {
  data: Omit<Product, 'data.description'>;
};

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export type CartItem = Pick<Product, 'id' | 'name' | 'price'> & {
  quantity: number;
};
