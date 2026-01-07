import { Input } from '../components/Input';
import useCart from '../hooks/useCart';
import type {
  CartItem,
  OrderCartItems,
  OrderUpdate,
} from '../services/CandyAPI.types';

const CheckoutPage = () => {
  const { cart, totalCost } = useCart();

  const formAction = (formData: FormData) => {
    const formValues = Object.fromEntries(formData);
    const order: OrderUpdate = {
      customer_first_name: formValues['customer_first_name'] as string,
      customer_last_name: formValues['customer_last_name'] as string,
      customer_address: formValues['customer_address'] as string,
      customer_postcode: formValues['customer_postcode'] as string,
      customer_city: formValues['customer_city'] as string,
      customer_email: formValues['customer_email'] as string,
      customer_phone: formValues['customer_phone'] as string,
      order_total: totalCost,
      order_items: cart.map((item: CartItem) => {
        const convertedItem: OrderCartItems = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total_price: item.totalPrice,
        };
        return convertedItem;
      }),
    };

    console.log(order);
  };

  return (
    <>
      <h1>Kassan</h1>
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
          label="Telefonnummer"
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
