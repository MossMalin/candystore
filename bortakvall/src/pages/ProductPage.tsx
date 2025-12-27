import { useEffect, useState } from "react";
import * as CandyAPI from "../services/CandyAPI";
import type { Product, ProductResponse } from "../services/CandyAPI.types";

const Product = (id: number) => {
	const [isLoading, setIsLoading] = useState(true);
	const [product, setProduct] = useState<ProductResponse>();

	useEffect(() => {
		async function fetchData() {
			const loadedData = await CandyAPI.getProduct(id);
			setProduct(loadedData);
			setIsLoading(false);
		}
		fetchData();
	}, [id]);
    
	return (
		<>
			<h1>Products</h1>

			{ isLoading }

			{product && (
				console.log(product.data.description)
				// <ul>
				// 	{products.map(product => (
				// 		<li
				// 			key={product.id}
				// 		>
				// 			{product.name}
				// 		</li>
				// 	))}
				// </ul>
			)}
		</>
	)
}

export default Product;
