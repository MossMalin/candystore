import { useEffect, useState } from "react";
import * as CandyAPI from "../services/CandyAPI";
import type { ProductResponse } from "../services/CandyAPI.types";
import { Cart } from "../components/Cart";

const ProductPage = () => {
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
			<button>&#171; Tillbaka</button>
			{product && (
			<>
				<h1>{product.data.name}</h1>
				<p>Id: {product.data.id}</p>
				<div dangerouslySetInnerHTML={{ __html: product.data.description }} />
				<p><b>Pris: {product.data.price} kr/skopa</b></p>
				<img src={`https://www.bortakvall.se${product.data.images.large}`} title={product.data.name} />
			</>
			)}
			<Cart />
		</>
	)
}

export default ProductPage;
