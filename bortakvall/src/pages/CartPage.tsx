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
      <a href="/checkout">Gå till kassan</a>
    </>
  );
};

export default CartPage;
