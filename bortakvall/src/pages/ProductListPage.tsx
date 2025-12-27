import * as CandyAPI from "../services/CandyAPI";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../services/CandyAPI.types";
import useCart from "../hooks/useCart"

const ProductListPage = () => {
	const { data: getProducts } = useQuery({
		queryKey: ["getProducts"],
		queryFn: CandyAPI.getProducts,
	})

	const { cart, addToCart, totalItems, totalCost, updateQuantity } = useCart();

	const products: Product[] = Array.isArray(getProducts?.data) ? getProducts.data : [];

	function getCartItemQuantity(productId: number): number {
		const cartItem = cart.find(item => item.id === productId);
		console.log(cartItem)
		return cartItem ? cartItem.quantity : 0;
	}

	return (
		<>
			<h1>Products</h1>
			<p>{totalCost} {totalItems}</p>

			{products && (
				<ul className="style__product-list">
					{products.map(product => (
						<li
							key={product.id}
						>
							<img src={`https://www.bortakvall.se${product.images.thumbnail}`} title={product.name} />
							<a href={`product/${product.id}`}>{product.name}</a>
							{(product.stock_status === "outofstock") && ("Slutsåld")}
							{(product.stock_status === "instock") && (
								<>
								<div className="style__price">{product.price} kr</div>
								<button onClick={() => updateQuantity(product.id, getCartItemQuantity(product.id) - 1)}>
									-
								</button>
								{getCartItemQuantity(product.id)} av {product.stock_quantity}
								{product.stock_quantity > getCartItemQuantity(product.id) && (
								<button onClick={() => addToCart(product)}>
									+
								</button>
								)}
								</>
							)}
						</li>
					))}
				</ul>
			)}
		</>
	)
}

export default ProductListPage;
