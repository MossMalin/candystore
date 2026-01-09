import { useEffect, useState } from 'react';
import { getProduct } from '../services/product.service';
import type { ProductResponse } from '../types/Product.types';
import { Cart } from '../components/Cart';
import { errorHandler } from '../utils/errorHandler';

const ProductPage = () => {
  const [product, setProduct] = useState<ProductResponse>();

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
          <p>
            <b>Pris: {product.data.price} kr/skopa</b>
          </p>
          <img
            src={`https://www.bortakvall.se${product.data.images.large}`}
            title={product.data.name}
          />
        </>
      )}
      <Cart />
    </>
  );
};

export default ProductPage;
