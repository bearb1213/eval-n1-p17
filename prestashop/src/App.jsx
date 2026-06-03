import './App.css'

import LoginAdmin from './page/login/LoginAdmin';

import AdminFilter from './component/admin/AdminFilter';

// import AdminDashboard from './page/admin/AdminDashboard';

import Reinitialisation from './page/admin/data/Reinitialisation';
import UploadFile from './page/admin/data/UploadFile';
import AdminListing from './page/admin/data/AdminListing';
import StockUpdate from './page/admin/data/StockUpdate';
import ProfitByCategory from './page/admin/ProfitByCategory';

import ListOrder from './page/admin/order/ListOrder';

import ProductList from './page/product/ProductList';
import ProductDetail from './page/product/ProductDetail';
import Connexion from './page/customer/Connexion';
import ShopLayout from './component/ShopLayout';
import AdminDashboard from './page/admin/AdminDashboard';

import OrderDuplicate from './page/order/OrderDuplicate'

import ExportCSVButton from './page/test/ExportCSVButton'

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

function App() {

  return (
      <BrowserRouter>
        <Routes>
            
            <Route element={<ShopLayout />}>
              <Route path="/" element={<Connexion /> } />
              <Route path="/products" >
                <Route index element={<ProductList />} />
                <Route path=":productId" element={<ProductDetail />} />
              </Route>
              <Route path="/customers" element={<Connexion />} />
              <Route path="/order/:id" element={<OrderDuplicate />} />
            </Route>

            <Route path="/loginAdmin" element={<LoginAdmin />} />
            <Route path="/admin" element={<AdminFilter />} >
                <Route path="dashboard" element={<AdminDashboard />} />
                {/* <Route path="export" element={<ExportCSVButton />} /> */}
                <Route path="data" >
                  <Route path="clean" element={<Reinitialisation />} />
                  <Route path="upload" element={<UploadFile />} />
                  <Route path="listing" element={<AdminListing />} />
                </Route>
                <Route path='orders' >
                  <Route index element={<ListOrder />} />
                </Route>
                <Route path='stock'>
                  <Route index element={<StockUpdate />} />
                </Route>
                <Route path='statistics'>
                  <Route index element={<ProfitByCategory />} />
                </Route>
            </Route>
        </Routes>


      </BrowserRouter>


  );
}

export default App
