import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '../components/Input';
import useCart from '../hooks/useCart';
import { postOrder } from '../services/order.service';
import type {
  Order,
  CartItemsPayload,
  CheckoutFormData,
} from '../types/Order.types';
import type { CartItem } from '../types/Product.types';
import { errorHandler } from '../utils/errorHandler';
import Toast from '../components/Toast';
import Loading from '../components/Loading';

const CheckoutPage = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formDataLocalStorage: CheckoutFormData = JSON.parse(
    localStorage.getItem('checkoutFormData') || '{}'
  );

  const { cart, totalCost } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    ...formDataLocalStorage,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const checkQuantity = cart.some((item) => item.quantity <= 0);
    if (checkQuantity) {
      setToastMessage(
        'One or more products in your cart have invalid quantities. Please remove products with zero or negative quantities.'
      );
      return;
    }
    const order: Order = {
      ...formData,
      order_total: totalCost,
      order_items: cart
        .filter((item: CartItem) => item.quantity > 0)
        .map((item: CartItem) => {
          const convertedItem: CartItemsPayload = {
            product_id: item.id,
            item_price: item.price,
            qty: Math.round(item.quantity),
            item_total: item.totalPrice,
          };
          return convertedItem;
        }),
    };
    try {
      setLoading(true);
      const response = await postOrder(order);

      if (response.status === 'success') {
        localStorage.removeItem('cart');
        localStorage.setItem('checkoutFormData', JSON.stringify(formData));

        navigate('/confirmation?orderId=' + response.data.id);
      } else {
        const errorDetails =
          response.status === 'fail'
            ? (Object.values(response.data)[0] as string[]).join(', ')
            : '';
        setToastMessage(
          `An error occurred. Please try again. (${response.message}${errorDetails ? ', ' + errorDetails : ''})`
        );
      }
    } catch (e: unknown) {
      setToastMessage(errorHandler(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loading isLoading={loading} />
      <h1>Kassan</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id="customer_first_name"
          label="First name"
          required={true}
          type="text"
          maxLength={255}
          value={formData.customer_first_name}
          onChange={(value) => handleInputChange('customer_first_name', value)}
        />
        <Input
          id="customer_last_name"
          label="Last name"
          required={true}
          type="text"
          maxLength={255}
          value={formData.customer_last_name}
          onChange={(value) => handleInputChange('customer_last_name', value)}
        />
        <Input
          id="customer_address"
          label="Address"
          required={true}
          type="text"
          maxLength={255}
          value={formData.customer_address}
          onChange={(value) => handleInputChange('customer_address', value)}
        />
        <Input
          id="customer_postcode"
          label="Postcode"
          required={true}
          type="text"
          maxLength={6}
          value={formData.customer_postcode}
          onChange={(value) => handleInputChange('customer_postcode', value)}
        />
        <Input
          id="customer_city"
          label="City"
          required={true}
          type="text"
          maxLength={255}
          value={formData.customer_city}
          onChange={(value) => handleInputChange('customer_city', value)}
        />
        <Input
          id="customer_email"
          label="Email address"
          required={true}
          type="email"
          maxLength={255}
          value={formData.customer_email}
          onChange={(value) => handleInputChange('customer_email', value)}
        />
        <Input
          id="customer_phone"
          label="Phone number (optional)"
          required={false}
          type="tel"
          maxLength={255}
          value={formData.customer_phone}
          onChange={(value) => handleInputChange('customer_phone', value)}
        />
        {cart && (
          <ul className="checkout-summary">
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} {item.quantity} scoops {item.price} kr each{' '}
                <b>{item.totalPrice} kr</b>
              </li>
            ))}
            <li>
              Total: <b>{totalCost} kr</b>
            </li>
          </ul>
        )}
        <div className="style__align-right">
          <button className="button--primary">Order</button>
        </div>
      </form>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}{' '}
    </>
  );
};

export default CheckoutPage;
