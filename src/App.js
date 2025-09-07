// // src/App.js
// import { Routes, Route } from 'react-router-dom';
// import NavComponent from './components/NavComponent';
// import Category from './pages/Category'; // <<< Sửa từ CategoryPage thành Category
// import Product from './pages/Product';
// import Cart from './pages/Cart';         // <<< Sửa từ CartPage thành Cart
// import Home from './pages/Home';
// import Forecast from './pages/Forecast';
// import STATE from './context/initState';
// import { GlobalProvider } from './context/context';
// //import { CartProvider } from './components/CartContext';
// import { useState } from 'react';

// function App() {
//   const [data,setData] = useState();
//   return (
//       <GlobalProvider value={{data, setData}}>
//         <NavComponent />
//         <main>
//           <div className="container">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               {/* Vẫn giữ :categoryName cho consistency với useParams của Category */}
//               <Route path="/category/:categoryName" element={<Category />} />
//               <Route path="/product/:id" element={<Product />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/forecast" element={<Forecast />} />
//             </Routes>
//           </div>
//         </main>
//       </GlobalProvider>
//   );
// }

// export default App;

import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Forecast from "./pages/Forecast";
import NavComponent from "./components/NavComponent";
import Product from "./pages/Product";
import STATE from "./context/initState";
import { GlobalProvider } from "./context/context";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(STATE);

  // Mỗi khi cart thay đổi thì lưu xuống localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(data.cart));
  }, [data.cart]);


  return (
    <GlobalProvider value={{ data, setData }}>
      <div className="App">
        <NavComponent />
        <main>
          <div className="container">
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/category/:slug" Component={Category} />
              <Route path="/product/:id" Component={Product} />
              <Route path="/cart" Component={Cart} />
              <Route path="/forecast" Component={Forecast} />
            </Routes>
          </div>
        </main>
      </div>
    </GlobalProvider>
  );
}

export default App;