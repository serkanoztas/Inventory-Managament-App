import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Root from './components/Root';
import Login from './pages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import MainDashboard from './components/admin/MainDashboard';
import Categories from './components/admin/Categories';
import Products from './components/admin/Products';
import Orders from './components/admin/Orders';
import Suppliers from './components/admin/Suppliers';
import Users from './components/admin/Users';
import Profile from './components/admin/Profile';
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerProducts from "./components/customer/CustomerProducts";
import CustomerOrders from './components/customer/CustomerOrders';
import CustomerProfile from './components/customer/CustomerProfile';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<ProtectedRoutes requiredRole={['admin']}> <Dashboard /> </ProtectedRoutes>}>
          <Route index element={<MainDashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/customer-dashboard" element={<ProtectedRoutes requiredRole={['customer']}><CustomerDashboard /></ProtectedRoutes>}>
          <Route index element={<CustomerProducts />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>
      </Routes>
    </Router >
  )
}

export default App
