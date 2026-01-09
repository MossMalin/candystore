import * as CandyAPI from '../services/CandyAPI';
import type { Product, TaggedProducts } from '../types/Product.types';
import useCart from '../hooks/useCart';
import { Cart } from '../components/Cart';
import { Tags } from '../components/Tags';
import { useState, useEffect } from 'react';

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch all products on initial render.
  // Issue: I could not figure out how it should work with Tanstack and useEffect together with the first load. I had it working but when I added tag filtering I had to remove Tanstack here.
  useEffect(() => {
    async function fetchData() {
      const getProducts = await CandyAPI.getProducts();
      setProducts(
        Array.isArray(getProducts?.data) ? (getProducts.data as Product[]) : []
      );
    }
    fetchData();
  }, []);

  const selectTaggedProducts = async (tag: string) => {
    if (tag.length <= 0) {
      const getProducts = await CandyAPI.getProducts();
      setProducts(
        Array.isArray(getProducts?.data) ? (getProducts.data as Product[]) : []
      );
    } else {
      const response = await CandyAPI.getTaggedProducts(tag);
      const taggedProducts: TaggedProducts = response.data;
      setProducts(taggedProducts.products);
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
