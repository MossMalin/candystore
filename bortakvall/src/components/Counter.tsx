import type { Product } from '../types/Product.types';

interface CounterProps {
  product: Product;
  getCartItemQuantity: (productId: number) => number;
  addToCart: (product: Product) => void;
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
          aria-label={`Ta bort en ${product.name}`}
          onClick={() =>
            updateQuantity(product.id, getCartItemQuantity(product.id) - 1)
          }
        >
          ➖
        </button>
        {getCartItemQuantity(product.id)} av {product.stock_quantity}
        <button
          aria-label={`Lägg till en ${product.name}`}
          onClick={() => addToCart(product)}
          disabled={product.stock_quantity <= getCartItemQuantity(product.id)}
        >
          ➕
        </button>
      </div>
    </>
  );
};
