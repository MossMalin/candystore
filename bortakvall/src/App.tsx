import "./assets/scss/App.scss";
import { Cart } from "./components/cart";
import Navigation from "./components/Navigation";
import { CartProvider } from "./context/CartProvider";
import ProductListPage from "./pages/ProductListPage";

function App() {

  return (
    <>
      <CartProvider>
        <Navigation />
        <main className="style__section hacker-news__main">
          <ProductListPage />
        </main>
        <Cart />
      </CartProvider>
    </>
  )
}

export default App
 