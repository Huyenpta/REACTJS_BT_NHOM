// src/App.js
import { Routes, Route } from 'react-router-dom';
import NavComponent from './components/NavComponent';
import Category from './pages/Category'; // <<< Sửa từ CategoryPage thành Category
import Product from './pages/Product';
import Cart from './pages/Cart';         // <<< Sửa từ CartPage thành Cart
import Home from './pages/Home';
import Forecast from './pages/Forecast';

import { CartProvider } from './components/CartContext';

function App() {
  return (
      <CartProvider>
        <NavComponent />
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Vẫn giữ :categoryName cho consistency với useParams của Category */}
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/forecast" element={<Forecast />} />
            </Routes>
          </div>
        </main>
      </CartProvider>
  );
}

export default App;