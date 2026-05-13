import './App.css'

import LoginAdmin from './page/login/LoginAdmin';

import AdminFilter from './component/admin/AdminFilter';

import AdminDashboard from './page/admin/AdminDashboard';

import Reinitialisation from './page/admin/data/Reinitialisation';
import UploadFile from './page/admin/data/UploadFile';

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

function App() {

  return (
      <BrowserRouter>
        <Routes>

            <Route path="/" element={<div> Hello word </div>} />
            <Route path="/loginAdmin" element={<LoginAdmin />} />
            <Route path="/admin" element={<AdminFilter />} >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="data" >
                  <Route path="clean" element={<Reinitialisation />} />
                  <Route path="upload" element={<UploadFile />} />
                </Route>
            </Route>
        </Routes>


      </BrowserRouter>


  );
}

export default App
