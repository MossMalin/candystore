import * as CandyAPI from '../services/CandyAPI';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '../services/CandyAPI.types';
import useCart from '../hooks/useCart';
import { Cart } from '../components/Cart';
import { Tags } from '../components/Tags';

const ProductListPage = () => {
  const { data: getProducts } = useQuery({
    queryKey: ['getProducts'],
    queryFn: CandyAPI.getProducts,
  });

  const { cart, addToCart, updateQuantity } = useCart();

  const products: Product[] = Array.isArray(getProducts?.data)
    ? getProducts.data
    : [];

  function getCartItemQuantity(productId: number): number {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }

  return (
    <>
      <h1>Godis</h1>

      <Tags />

      {products && (
        <ul className="product-list__container">
          {products.map((product) => (
            <li key={product.id}>
              <div className="product-list__price">{product.price} kr</div>
              <img
                src={`https://www.bortakvall.se${product.images.thumbnail}`}
                title={product.name}
              />
              <div className="product-list__item">
                {product.stock_status === 'outofstock' &&
                  `Godiset "${product.name}" är slutsålt`}
                {product.stock_status === 'instock' && (
                  <>
                    <div className="product-list__update">
                      <button
                        aria-label={`Lägg till en ${product.name}`}
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            getCartItemQuantity(product.id) - 1
                          )
                        }
                      >
                        ➖
                      </button>
                      {getCartItemQuantity(product.id)} av{' '}
                      {product.stock_quantity}
                      <button
                        aria-label={`Ta bort en ${product.name}`}
                        onClick={() => addToCart(product)}
                        disabled={
                          product.stock_quantity <=
                          getCartItemQuantity(product.id)
                        }
                      >
                        ➕
                      </button>
                    </div>
                    <a href={`product?id=${product.id}`}>{product.name}</a>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <Cart />
    </>
  );
};

export default ProductListPage;
