import * as API from '../services/product.service';
import type { Product, TaggedProducts } from '../types/Product.types';
import useCart from '../hooks/useCart';
import { Tags } from '../components/Tags';
import { Counter } from '../components/Counter';
import { useState, useEffect } from 'react';
import { errorHandler } from '../utils/errorHandler';

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const Image_URL = import.meta.env.VITE_IMAGE_BASEURL;

  // Fetch all products on initial render.
  // Issue: I could not figure out how it should work with Tanstack and useEffect together with the first load. I had it working but when I added tag filtering I had to remove Tanstack here.
  useEffect(() => {
    async function fetchData() {
      try {
        const getProductsData = await API.getProducts();
        setProducts(
          Array.isArray(getProductsData?.data)
            ? (getProductsData.data as Product[])
            : []
        );
      } catch (e) {
        errorHandler(e);
      }
    }
    fetchData();
  }, []);

  const selectTaggedProducts = async (tag: string) => {
    try {
      if (tag.length <= 0) {
        const getProductsData = await API.getProducts();
        setProducts(
          Array.isArray(getProductsData?.data)
            ? (getProductsData.data as Product[])
            : []
        );
      } else {
        const response = await API.getTaggedProducts(tag);
        const taggedProducts: TaggedProducts = response.data;
        setProducts(taggedProducts.products);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

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
                {product.stock_status === 'outofstock' && (
                  <a href={`product?id=${product.id}`}>
                    {product.name} är slutsåld
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
    </>
  );
};

export default ProductListPage;
