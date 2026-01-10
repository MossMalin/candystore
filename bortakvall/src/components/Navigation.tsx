import logoTransparent from '../assets/images/logoTransparent.png';
import { useNavigate } from 'react-router';

const Navigation = () => {
  const navigate = useNavigate();
  const showCartLink =
    location.pathname !== '/cart' && location.pathname !== '/checkout';

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
            onClick={() => navigate('/cart')}
            className="navigation__cart-link"
          >
            🛒 Till varukorgen
          </button>
        )}
      </div>
    </header>
  );
};

export default Navigation;
