import * as API from '../services/product.service';
import type { Products, TaggedProducts } from '../types/Product.types';
import useCart from '../hooks/useCart';
import { Tags } from '../components/Tags';
import { Counter } from '../components/Counter';
import { useState, useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

const ProductListPage = () => {
  const [products, setProducts] = useState<Products[]>([]);

  const Image_URL = import.meta.env.VITE_IMAGE_BASEURL;

  const selectTaggedProducts = async (tag: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tag', tag ? tag.replace('/', '') : '');
    window.history.pushState({}, '', url.toString());
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
      errorHandler(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const url = new URL(window.location.href);
        const tagId = url.searchParams.get('tag');

        selectTaggedProducts(tagId ? `/${tagId}` : '');
      } catch (e) {
        errorHandler(e);
      }
    }
    fetchData();
  }, []);

  const { cart, addToCart, updateQuantity } = useCart();

  function getCartItemQuantity(productId: number): number {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }

  return (
    <>
      <h1>Godis</h1>

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
                    {product.name} är slutsåld
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
    </>
  );
};

export default ProductListPage;
