import { useEffect, useState } from 'react';
import * as CandyAPI from '../services/CandyAPI';
import type { ProductResponse } from '../types/Product.types';
import { Cart } from '../components/Cart';

const ProductPage = () => {
  const [product, setProduct] = useState<ProductResponse>();

  useEffect(() => {
    async function fetchData() {
      try {
        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');
        const loadedData = await CandyAPI.getProduct(Number(id));
        if (loadedData.status === 'error') {
          throw new Error('No product found');
          console.log();
        }
        setProduct(loadedData);
      } catch (e) {
        console.error(e);
        window.location.href = '/error';
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <button onClick={() => history.back()}>&#171; Tillbaka</button>
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
