import { Route, Routes } from "react-router";
import "./assets/scss/App.scss";
import Navigation from "./components/Navigation";
import { CartProvider } from "./context/CartProvider";
import ProductListPage from "./pages/ProductListPage";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {

  return (
    <>
      <CartProvider>
        <Navigation />
        <main className="style__section hacker-news__main">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
					  <Route path="/product" element={<ProductPage />} />
					  <Route path="/checkout" element={<CheckoutPage />} />
					  <Route path="*" element={<NotFound />} />
          </Routes>
          
        </main>
      </CartProvider>
    </>
  )
}

export default App
 