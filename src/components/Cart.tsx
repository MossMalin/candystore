import useCart from '../hooks/useCart';
import cartImage from '../assets/images/cart.png';
import { useEffect } from 'react';
import { Counter } from './Counter';

export const Cart = () => {
  const {
    cart,
    totalCost,
    removeFromCart,
    totalItems,
    showCart,
    setShowCart,
    addToCart,
    updateQuantity,
  } = useCart();

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
        <a title="Show cart" href="#" onClick={() => setShowCart(true)}>
          <img src={cartImage} alt="Shopping cart" />
          <div className="cart__items">{totalItems}</div>
        </a>
      </div>

      <div className={showCartSummaryClasses()}>
        {cart && (
          <table className="cart__table">
            <caption className="style__visuallyhidden">Cart</caption>
            <thead>
              <tr>
                <th>
                  <div className="style__visuallyhidden">Remove</div>
                </th>
                <th>Product name</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.name}`}
                    >
                      ✖️
                    </button>
                  </td>
                  <td>
                    <a href={`/product?id=${product.id}`}>{product.name}</a>
                  </td>
                  <td>
                    <Counter
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        stockQuantity: product.stockQuantity,
                      }}
                      getCartItemQuantity={(productId) => {
                        const cartItem = cart.find(
                          (item) => item.id === productId
                        );
                        return cartItem ? cartItem.quantity : 0;
                      }}
                      addToCart={addToCart}
                      updateQuantity={updateQuantity}
                    />
                  </td>
                  <td>{product.quantity * product.price} kr</td>
                </tr>
              ))}
              {cart.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: 'left', paddingLeft: '40px' }}
                  >
                    Your cart is empty 😢 <a href="/">Shop candy here</a>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td>Total amount</td>
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
              Go to checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};
