import { useState } from 'react';
import { Input } from '../components/Input';
import useCart from '../hooks/useCart';
import { postOrder } from '../services/order.service';
import type {
  OrderPayload,
  CartItemsPayload,
  CheckoutFormData,
  CheckoutFormDataSnakeCase,
} from '../types/Order.types';
import type { CartItem } from '../types/Product.types';
import { errorHandler } from '../utils/errorHandler';

const CheckoutPage = () => {
  const formDataLocalStorage = localStorage.getItem('checkoutFormData');
  const formDataLocalStorageSnakeCase: CheckoutFormDataSnakeCase = JSON.parse(
    formDataLocalStorage || '{}'
  );
  const savedFormData: CheckoutFormData = {
    customerFirstName: formDataLocalStorageSnakeCase.customer_first_name || '',
    customerLastName: formDataLocalStorageSnakeCase.customer_last_name || '',
    customerAddress: formDataLocalStorageSnakeCase.customer_address || '',
    customerPostcode: formDataLocalStorageSnakeCase.customer_postcode || '',
    customerCity: formDataLocalStorageSnakeCase.customer_city || '',
    customerEmail: formDataLocalStorageSnakeCase.customer_email || '',
    customerPhone: formDataLocalStorageSnakeCase.customer_phone || '',
  };

  const { cart, totalCost } = useCart();
  const [formData, setFormData] = useState<CheckoutFormDataSnakeCase>({
    customer_first_name: savedFormData.customerFirstName,
    customer_last_name: savedFormData.customerLastName,
    customer_address: savedFormData.customerAddress,
    customer_postcode: savedFormData.customerPostcode,
    customer_city: savedFormData.customerCity,
    customer_email: savedFormData.customerEmail,
    customer_phone: savedFormData.customerPhone,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const checkQuantity = cart.some((item) => item.quantity <= 0);
    if (checkQuantity) {
      alert(
        'Någon produkt i din kundvagn är felaktig, ta bort produkter som har negativa värden eller noll.'
      );
      return;
    }
    const order: OrderPayload = {
      customer_first_name: formData.customer_first_name,
      customer_last_name: formData.customer_last_name,
      customer_address: formData.customer_address,
      customer_postcode: formData.customer_postcode,
      customer_city: formData.customer_city,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
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
      const response = await postOrder(order);

      if (response.status === 'success') {
        localStorage.removeItem('cart');
        localStorage.setItem('checkoutFormData', JSON.stringify(formData));
        alert(
          `Tack för din beställning! Din ordernummer är ${response.data.id}`
        );
        window.location.href = '/';
      } else {
        const errorDetails =
          response.data && Object.values(response.data)[0]
            ? (Object.values(response.data)[0] as string[]).join(', ')
            : '';
        alert(
          `Ett fel uppstod vid beställningen. Vänligen försök igen. (${response.message}${errorDetails ? ', ' + errorDetails : ''})`
        );
      }
    } catch (e: unknown) {
      errorHandler(e);
    }
  };

  return (
    <>
      <h1>Kassan</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id="customer_first_name"
          label="Förnamn"
          required={true}
          type="text"
          maxLength={255}
          value={formData.customer_first_name}
          onChange={(value) => handleInputChange('customer_first_name', value)}
        />
        <Input
          id="customer_last_name"
          label="Efternamn"
          required={true}
          type="text"
          maxLength={255}
          value={formData.customer_last_name}
          onChange={(value) => handleInputChange('customer_last_name', value)}
        />
        <Input
          id="customer_address"
          label="Adress"
          required={true}
          type="text"
          maxLength={255}
          value={formData.customer_address}
          onChange={(value) => handleInputChange('customer_address', value)}
        />
        <Input
          id="customer_postcode"
          label="Postnummer"
          required={true}
          type="text"
          maxLength={6}
          value={formData.customer_postcode}
          onChange={(value) => handleInputChange('customer_postcode', value)}
        />
        <Input
          id="customer_city"
          label="Postort"
          required={true}
          type="text"
          maxLength={255}
          value={formData.customer_city}
          onChange={(value) => handleInputChange('customer_city', value)}
        />
        <Input
          id="customer_email"
          label="E-postadress"
          required={true}
          type="email"
          maxLength={255}
          value={formData.customer_email}
          onChange={(value) => handleInputChange('customer_email', value)}
        />
        <Input
          id="customer_phone"
          label="Telefonnummer (ej obligatorisk)"
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
                {item.name} {item.quantity} skopor {item.price} kr/styck{' '}
                <b>{item.totalPrice} kr</b>
              </li>
            ))}
            <li>
              Att betala: <b>{totalCost} kr</b>
            </li>
          </ul>
        )}
        <div className="style__align-right">
          <button className="button--primary">Beställ</button>
        </div>
      </form>
    </>
  );
};

export default CheckoutPage;
