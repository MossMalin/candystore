import { useEffect, useState } from "react";
import * as CandyAPI from "../services/CandyAPI";
import type { ProductResponse } from "../services/CandyAPI.types";

const ProductPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [product, setProduct] = useState<ProductResponse>();

	useEffect(() => {
		async function fetchData() {
			try {
				const url = new URL(window.location.href);
				const id = url.searchParams.get("id");
				console.log("Todo fånga 404")
				// TODO: fånga 404
				const loadedData = await CandyAPI.getProduct(Number(id));
				setProduct(loadedData);
				setIsLoading(false);
			}
			catch(e) {
				console.error(e);
				Response.redirect("/error");
			}
		}
		fetchData();
	}, []);
    
	return (
		<>

			{ isLoading }

			{product && (
			<>
				<h1>{product.data.name}</h1>
				<p>Id: {product.data.id}</p>
				<div dangerouslySetInnerHTML={{ __html: product.data.description }} />
				<a href={`https://www.bortakvall.se${product.data.images.large}`} target="_blank"><img src={`https://www.bortakvall.se${product.data.images.thumbnail}`} title={product.data.name} /></a>
			</>
			)}
		</>
	)
}

export default ProductPage;
