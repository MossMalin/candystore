import cart from '../assets/images/cart.png'
import useCart from "../hooks/useCart";

export const Cart = () => {
	const { totalItems } = useCart();

    return (
        <div className="cart__container">
            <a title="Gå till varukorgen" href="/checkout">
			    <img src={cart} alt="Kundvagnen" />
                <div className="cart__items">{totalItems}</div>
			</a>
        </div>
    )
}