import logoTransparent from '../assets/images/logoTransparent.png';
import useCart from '../hooks/useCart';
import { Cart } from './Cart';
import { useLocation } from 'react-router';

const Navigation = () => {
  const location = useLocation();
  const showCartLink =
    location.pathname !== '/checkout' && location.pathname !== '/confirmation';
  const { showCart, setShowCart } = useCart();

  const showHideText = () => {
    return showCart ? 'Hide cart' : 'Show cart';
  };

  return (
    <header>
      <a href="/">
        <img
          src={logoTransparent}
          className="navigation__logo"
          alt="Candystore logo"
        />
      </a>
      <div className="navigation__menu">
        {location.pathname !== '/' && (
          <button onClick={() => history.back()}>&#171; Back</button>
        )}
        {showCartLink && (
          <button
            onClick={() => setShowCart(!showCart)}
            className="navigation__cart-link"
          >
            🛒 {showHideText()}
          </button>
        )}
      </div>
      {showCartLink && <Cart />}
    </header>
  );
};

export default Navigation;
