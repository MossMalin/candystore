import { useEffect, useState } from 'react';
import { getProduct } from '../services/product.service';
import type { ProductResponse } from '../types/Response.types';
import { errorHandler } from '../utils/errorHandler';

const ProductPage = () => {
  const [product, setProduct] = useState<ProductResponse>();

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
          {product.data.tags &&
            product.data.tags.map((tag) => (
              <>
                <button
                  key={tag.id}
                  onClick={() =>
                    (window.location.href = `/?tag=${tag.id.toString()}`)
                  }
                >
                  {tag.name}
                </button>{' '}
              </>
            ))}
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
            <b>Pris: {product.data.price} kr/skopa</b>
          </div>

          <img
            src={`${Image_URL}${product.data.images.large}`}
            title={product.data.name}
          />
        </>
      )}
    </>
  );
};

export default ProductPage;
