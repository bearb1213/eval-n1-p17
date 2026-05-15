import './App.css'

import LoginAdmin from './page/login/LoginAdmin';

import AdminFilter from './component/admin/AdminFilter';

import AdminDashboard from './page/admin/AdminDashboard';

import Reinitialisation from './page/admin/data/Reinitialisation';
import UploadFile from './page/admin/data/UploadFile';

import ListOrder from './page/admin/order/ListOrder';

import ProductList from './page/product/ProductList';
import ProductDetail from './page/product/ProductDetail';
import NavBar from './component/NavBar';
import CartDrawer from './component/cart/CartDrawer';

import { useMemo, useState } from 'react';

import {
  BrowserRouter,
  Outlet,
  Route,
  Routes
} from 'react-router-dom'

function ShopLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const cartItems = useMemo(
    () => [
      { id: 1, name: 'T-shirt', qty: 2, price: 25000 },
      { id: 2, name: 'Chaussures', qty: 1, price: 80000 },
    ],
    []
  );

  const handleToggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  const handleToggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <>
      <NavBar
        userName="Rakoto"
        isLoggedIn={isLoggedIn}
        onToggleCart={handleToggleCart}
        onToggleLogin={handleToggleLogin}
      />
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
      />
      <Outlet />
    </>
  );
}

function App() {

  return (
      <BrowserRouter>
        <Routes>

            <Route element={<ShopLayout />}>
              <Route path="/" element={<div> Hello word </div>} />
              <Route path="/products" >
                <Route index element={<ProductList />} />
                <Route path=":productId" element={<ProductDetail />} />
              </Route>
            </Route>

            <Route path="/loginAdmin" element={<LoginAdmin />} />
            <Route path="/admin" element={<AdminFilter />} >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="data" >
                  <Route path="clean" element={<Reinitialisation />} />
                  <Route path="upload" element={<UploadFile />} />
                </Route>
                <Route path='orders' >
                  <Route index element={<ListOrder />} />
                </Route>
            </Route>
        </Routes>


      </BrowserRouter>


  );
}

export default App
