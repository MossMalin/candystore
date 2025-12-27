import { Route, Routes } from "react-router";
import "./assets/scss/App.scss";
import { Cart } from "./components/Cart";
import Navigation from "./components/Navigation";
import { CartProvider } from "./context/CartProvider";
import ProductListPage from "./pages/ProductListPage";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";

function App() {

  return (
    <>
      <CartProvider>
        <Navigation />
        <main className="style__section hacker-news__main">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
					  <Route path="/product" element={<ProductPage />} />
					  <Route path="*" element={<NotFound />} />
          </Routes>
          
        </main>
        <Cart />
      </CartProvider>
    </>
  )
}

export default App
 