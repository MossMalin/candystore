import type { Product } from '../types/Product.types';

interface CounterProps {
  product: Pick<Product, 'id' | 'name' | 'price' | 'stock_quantity'>;
  getCartItemQuantity: (productId: number) => number;
  addToCart: (
    product: Pick<Product, 'id' | 'name' | 'price' | 'stock_quantity'>
  ) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

export const Counter: React.FC<CounterProps> = ({
  product,
  getCartItemQuantity,
  addToCart,
  updateQuantity,
}) => {
  return (
    <>
      <div className="counter">
        <button
          aria-label={`Remove one ${product.name}`}
          onClick={() =>
            updateQuantity(product.id, getCartItemQuantity(product.id) - 1)
          }
        >
          ➖
        </button>
        {getCartItemQuantity(product.id)} av {product.stock_quantity}
        <button
          aria-label={`Add a ${product.name}`}
          onClick={() => addToCart(product)}
          disabled={product.stock_quantity <= getCartItemQuantity(product.id)}
        >
          ➕
        </button>
      </div>
    </>
  );
};
