import * as API from '../services/product.service';
import type { Products, TaggedProducts } from '../types/Product.types';
import useCart from '../hooks/useCart';
import { Tags } from '../components/Tags';
import { Counter } from '../components/Counter';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { errorHandler } from '../utils/errorHandler';
import Toast from '../components/Toast';

const ProductListPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  const Image_URL = import.meta.env.VITE_IMAGE_BASEURL;

  const navigate = useNavigate();
  const location = useLocation();

  const selectTaggedProducts = useCallback(
    async (tag: string) => {
      const params = new URLSearchParams(location.search);
      params.set('tag', tag ? tag.replace('/', '') : '');
      navigate({ search: params.toString() });
      try {
        if (tag.length <= 0) {
          const getProductsData = await API.getProducts();
          setProducts(getProductsData.data);
        } else {
          const response = await API.getTaggedProducts(tag);
          const taggedProducts: TaggedProducts = response.data;
          setProducts(taggedProducts.products);
        }
      } catch (e) {
        setToastMessage(errorHandler(e));
      }
    },
    [location.search, navigate]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const params = new URLSearchParams(location.search);
        const tagId = params.get('tag');
        selectTaggedProducts(tagId ? `/${tagId}` : '');
      } catch (e) {
        setToastMessage(errorHandler(e));
      }
    }
    fetchData();
  }, [location.search, selectTaggedProducts]);

  const { cart, addToCart, updateQuantity } = useCart();

  function getCartItemQuantity(productId: number): number {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }

  return (
    <>
      <h1>Candy</h1>

      <Tags onTagClick={selectTaggedProducts} />

      {products && (
        <ul className="product-list__container">
          {products.map((product) => (
            <li key={product.id}>
              <div className="product-list__price">{product.price} kr</div>
              <img
                src={`${Image_URL}${product.images.thumbnail}`}
                title={product.name}
              />
              <div className="product-list__item">
                {product.stockStatus === 'outofstock' && (
                  <a href={`product?id=${product.id}`}>
                    {product.name} is out of order
                  </a>
                )}

                {product.stockStatus === 'instock' && (
                  <>
                    <Counter
                      product={product}
                      getCartItemQuantity={getCartItemQuantity}
                      addToCart={addToCart}
                      updateQuantity={updateQuantity}
                    />
                    <a href={`product?id=${product.id}`}>{product.name}</a>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </>
  );
};

export default ProductListPage;
