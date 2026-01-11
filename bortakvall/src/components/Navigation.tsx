import logoTransparent from '../assets/images/logoTransparent.png';
import useCart from '../hooks/useCart';
import { Cart } from './Cart';

const Navigation = () => {
  const showCartLink = location.pathname !== '/checkout';
  const { showCart, setShowCart } = useCart();

  const showHideText = () => {
    return showCart ? 'Dölj varukorgen' : 'Visa varukorgen';
  };

  return (
    <header>
      <a href="/">
        <img
          src={logoTransparent}
          className="navigation__logo"
          alt="Bortakväll logo"
        />
      </a>
      <div className="navigation__menu">
        {location.pathname !== '/' && (
          <button onClick={() => history.back()}>&#171; Tillbaka</button>
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
      <Cart />
    </header>
  );
};

export default Navigation;
