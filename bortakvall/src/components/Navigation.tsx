import logoTransparent from '../assets/images/logoTransparent.png';

const Navigation = () => {
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
            onClick={() => (window.location.href = '/cart')}
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
