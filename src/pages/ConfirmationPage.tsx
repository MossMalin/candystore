import happy from '../assets/images/happy.png';
import { useLocation } from 'react-router';
const ConfirmationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

  return (
    <>
      <h1>Tack för din order</h1>
      <p>
        Din beställning har mottagits och behandlas. Du kommer att få en
        bekräftelse via e-post inom kort.
      </p>
      <p>Ditt ordernummer är {orderId}</p>
      <p>
        <a href="/">Tillbaka till startsidan</a>
      </p>
      <img src={happy} width="100%" />
    </>
  );
};

export default ConfirmationPage;
