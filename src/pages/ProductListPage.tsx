import { getProducts, getTaggedProducts } from '../services/product.service';
import type { Products, TaggedProducts } from '../types/Product.types';
import useCart from '../hooks/useCart';
import { Tags } from '../components/Tags';
import { Counter } from '../components/Counter';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { errorHandler } from '../utils/errorHandler';
import Toast from '../components/Toast';
import Loading from '../components/Loading';

const ProductListPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const Image_URL = import.meta.env.VITE_IMAGE_BASEURL;

  const navigate = useNavigate();
  const location = useLocation();

  const selectTaggedProducts = useCallback(
    async (tag: string): Promise<void> => {
      const params = new URLSearchParams(location.search);
      params.set('tag', tag ? tag.replace('/', '') : '');
      navigate({ search: params.toString() });
    },
    [location.search, navigate]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const params = new URLSearchParams(location.search);
        const tagId = params.get('tag');
        if (!tagId) {
          const getProductsData = await getProducts();
          if (getProductsData.status === 'error') {
            throw new Error('Failed to fetch products');
          }
          setProducts(getProductsData.data);
        } else {
          const response = await getTaggedProducts(`/${tagId}`);
          if (response.status === 'error') {
            throw new Error('Failed to fetch tagged products');
          }
          const taggedProducts: TaggedProducts = response.data;
          setProducts(taggedProducts.products);
        }
      } catch (e) {
        setToastMessage(errorHandler(e));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [location.search]);

  const { cart, addToCart, updateQuantity } = useCart();

  function getCartItemQuantity(productId: number): number {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }

  return (
    <>
      <Loading isLoading={loading} />

      <h1>This is a store for training purpose. </h1>
      <p>You will not get any candy if you place an order.</p>

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
                {product.stock_status === 'outofstock' && (
                  <a href={`product?id=${product.id}`}>
                    {product.name} is out of order
                  </a>
                )}

                {product.stock_status === 'instock' && (
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
