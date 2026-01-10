import { useEffect, useState } from 'react';
import { getProduct } from '../services/product.service';
import type { ProductResponse } from '../types/Product.types';
import { Cart } from '../components/Cart';
import { errorHandler } from '../utils/errorHandler';
import { Counter } from '../components/Counter';
import useCart from '../hooks/useCart';

const ProductPage = () => {
  const [product, setProduct] = useState<ProductResponse>();
  const { cart, addToCart, updateQuantity } = useCart();

  const Image_URL = import.meta.env.VITE_IMAGE_BASEURL;

  useEffect(() => {
    async function fetchData() {
      try {
        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');
        const loadedData = await getProduct(Number(id));
        if (loadedData.status === 'error') {
          throw new Error('No product found');
        }
        setProduct(loadedData);
      } catch (e) {
        errorHandler(e);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {product && (
        <>
          <h1>{product.data.name}</h1>
          <p>Id: {product.data.id}</p>
          <div dangerouslySetInnerHTML={{ __html: product.data.description }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            {product.data.stock_status === 'instock' && (
              <Counter
                product={product.data}
                getCartItemQuantity={(productId) => {
                  const cartItem = cart.find((item) => item.id === productId);
                  return cartItem ? cartItem.quantity : 0;
                }}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
              />
            )}
            <b>Pris: {product.data.price} kr/skopa</b>
          </div>

          <img
            src={`${Image_URL}${product.data.images.large}`}
            title={product.data.name}
          />
        </>
      )}
      <Cart />
    </>
  );
};

export default ProductPage;
