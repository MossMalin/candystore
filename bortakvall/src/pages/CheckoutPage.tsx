import useCart from "../hooks/useCart"

const CheckoutPage = () => {

	const { cart, totalCost, removeFromCart } = useCart();

	return (
		<>
			<h1>Varukorgen</h1>

			{cart && (
				<table className="style__table">
                    <caption className="style__visuallyhidden">Varukorg</caption>
                    <tr>
                        <th><div className="style__visuallyhidden">Ta bort</div></th>
                        <th>Produktnamn</th>
                        <th>Antal</th>
                        <th>Summa</th>
                    </tr>
					{cart.map(product => (
						<tr
							key={product.id}
						>
                            <td><button onClick={() => removeFromCart(product.id)}>✖️</button></td>
							<td>{product.name}</td>
							<td>{product.quantity} st</td>
							<td>{product.quantity * product.price} kr</td>
						</tr>
					))}
                    <tr>
                        <td></td>
                        <td>Totalt belopp</td>
                        <td></td>
                        <td>{totalCost} kr</td>
                    </tr>
				</table>
			)}
		</>
	)
}

export default CheckoutPage;
