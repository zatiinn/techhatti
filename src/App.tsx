import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Footer from "./components/footer";

import ProductCatalogue from "./pages/Products";
import ContactPage from "./pages/Contact";
import { AboutPage } from "./pages/About";
import { LoginPage } from "./pages/Login";
import CartPage from "./pages/Cart";
import OrdersPage from "./pages/Orders";
import { ProductPage } from "./pages/ProductDetailPage";

const App: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route path="/products" element={<ProductCatalogue />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/orders/:userId" element={<OrdersPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
