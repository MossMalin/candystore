import useCart from '../hooks/useCart';
import cartImage from '../assets/images/cart.png';
import { useEffect } from 'react';

export const Cart = () => {
  const { cart, totalCost, removeFromCart, totalItems, showCart, setShowCart } =
    useCart();

  const showCartSummaryClasses = () => {
    return showCart ? 'cart__summary cart__summary--visible' : 'cart__summary';
  };

  useEffect(() => {
    if (showCart) {
      window.scrollTo(0, 0);
    }
  }, [showCart]);

  return (
    <>
      <div className="cart__container">
        <a title="Visa varukorgen" href="#" onClick={() => setShowCart(true)}>
          <img src={cartImage} alt="Kundvagnen" />
          <div className="cart__items">{totalItems}</div>
        </a>
      </div>

      <div className={showCartSummaryClasses()}>
        {cart && (
          <table className="cart__table">
            <caption className="style__visuallyhidden">Varukorg</caption>
            <thead>
              <tr>
                <th>
                  <div className="style__visuallyhidden">Ta bort</div>
                </th>
                <th>Produktnamn</th>
                <th>Antal</th>
                <th>Summa</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Ta bort ${product.name}`}
                    >
                      ✖️
                    </button>
                  </td>
                  <td>
                    <a href={`/product?id=${product.id}`}>{product.name}</a>
                  </td>
                  <td>{product.quantity} st</td>
                  <td>{product.quantity * product.price} kr</td>
                </tr>
              ))}
              {cart.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: 'left', paddingLeft: '40px' }}
                  >
                    Din varukorg är tom 😢 <a href="/">Handla godis här</a>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td>Totalt belopp</td>
                <td></td>
                <td>{totalCost} kr</td>
              </tr>
            </tfoot>
          </table>
        )}
        {cart.length != 0 && (
          <div className="style__align-right">
            <button
              onClick={() => (document.location.href = '/checkout')}
              className="button--primary"
            >
              Gå till kassan
            </button>
          </div>
        )}
      </div>
    </>
  );
};
