import cart from '../assets/images/cart.png'
import useCart from "../hooks/useCart";

export const Cart = () => {
	const { totalItems } = useCart();

    return (
        <div className="style__cart">
            <a title="Gå till varukorgen" href="/">
			    <img src={cart} alt="Kundvagnen" />
                <div className="style__cart-items">{totalItems}</div>
			</a>
        </div>
    )
}