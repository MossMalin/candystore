import { Input } from '../components/Input';
import useCart from '../hooks/useCart';
import { postOrder } from '../services/CandyAPI';
import type {
  CartItem,
  CartItemsPayload,
  OrderPayload,
} from '../services/CandyAPI.types';

const CheckoutPage = () => {
  const { cart, totalCost } = useCart();

  const formAction = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData);
    const order: OrderPayload = {
      customer_first_name: formValues['customer_first_name'] as string,
      customer_last_name: formValues['customer_last_name'] as string,
      customer_address: formValues['customer_address'] as string,
      customer_postcode: formValues['customer_postcode'] as string,
      customer_city: formValues['customer_city'] as string,
      customer_email: formValues['customer_email'] as string,
      customer_phone: formValues['customer_phone'] as string,
      order_total: totalCost,
      order_items: cart.map((item: CartItem) => {
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

      console.log('Order response:', response.data.id);
      console.log('order success', response.status);
      if (response.status === 'success') {
        localStorage.removeItem('cart');
        alert(
          `Tack för din beställning! Din ordernummer är ${response.data.id}`
        );
      } else {
        alert('Ett fel uppstod vid beställningen. Vänligen försök igen.');
      }
    } catch (e: unknown) {
      let error = 'Okänt fel';
      if (e instanceof Error) {
        error = e.message;
      }
      alert(`Något gick fel vid beställningen. Vänligen försök igen. ${error}`);
    }
  };

  return (
    <>
      <h1>Kassan</h1>
      {cart && (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} skopor - <b>{item.totalPrice} kr</b>
            </li>
          ))}
          <li>
            <strong>Att betala: {totalCost} kr</strong>
          </li>
        </ul>
      )}
      <form action={formAction}>
        <Input
          id="customer_first_name"
          label="Förnamn"
          required={true}
          type="text"
          maxLength={255}
        />
        <Input
          id="customer_last_name"
          label="Efternamn"
          required={true}
          type="text"
          maxLength={255}
        />
        <Input
          id="customer_address"
          label="Adress"
          required={true}
          type="text"
          maxLength={255}
        />
        <Input
          id="customer_postcode"
          label="Postnummer"
          required={true}
          type="text"
          maxLength={6}
        />
        <Input
          id="customer_city"
          label="Postort"
          required={true}
          type="text"
          maxLength={255}
        />
        <Input
          id="customer_email"
          label="E-postadress"
          required={true}
          type="email"
          maxLength={255}
        />
        <Input
          id="customer_phone"
          label="Telefonnummer (ej obligatorisk)"
          required={false}
          type="tel"
          maxLength={255}
        />
        <button>Beställ</button>
      </form>
    </>
  );
};

export default CheckoutPage;
