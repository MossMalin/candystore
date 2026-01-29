import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getProduct } from '../services/product.service';
import type { ProductResponse } from '../types/Response.types';
import { errorHandler } from '../utils/errorHandler';
import Toast from '../components/Toast';
import Loading from '../components/Loading';

const ProductPage = () => {
  const [product, setProduct] = useState<ProductResponse>();
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const Image_URL = import.meta.env.VITE_IMAGE_BASEURL;

  useEffect(() => {
    async function fetchData() {
      try {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');
        setLoading(true);
        const loadedData = await getProduct(Number(id));
        if (loadedData.status === 'error') {
          throw new Error('No product found');
        }
        setProduct(loadedData);
      } catch (e) {
        setToastMessage(errorHandler(e));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [location.search]);

  return (
    <>
      <Loading isLoading={loading} />
      {product && (
        <>
          <h1>{product.data.name}</h1>
          {product.data.tags &&
            product.data.tags.map((tag) => (
              <>
                <button
                  key={tag.id}
                  onClick={() => navigate(`/?tag=${tag.id.toString()}`)}
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
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </>
  );
};

export default ProductPage;
