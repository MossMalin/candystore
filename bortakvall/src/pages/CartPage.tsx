import useCart from '../hooks/useCart';

const CartPage = () => {
  const { cart, totalCost, removeFromCart } = useCart();

  return (
    <>
      <h1>Varukorgen</h1>

      {cart && (
        <table className="cart-page__table">
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
          <button onClick={() => (document.location.href = '/checkout')}>
            Gå till kassan
          </button>
        </div>
      )}
    </>
  );
};

export default CartPage;
