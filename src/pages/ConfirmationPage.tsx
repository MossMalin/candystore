import happy from '../assets/images/happy.png';
import { useLocation } from 'react-router';
const ConfirmationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

  return (
    <>
      <h1>
        This is a store for training purpose. You will not get any candy if you
        place an order.
      </h1>
      <p>
        Your order has been received and is being processed. You will receive a
        confirmation via email shortly.
      </p>
      <p>Your order number is {orderId}</p>
      <p>
        <a href="/">Back to homepage</a>
      </p>
      <img src={happy} width="100%" />
    </>
  );
};

export default ConfirmationPage;
