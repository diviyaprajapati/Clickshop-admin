import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import ProductForm from './ProductForm';
import Dashboard from './components/Dashboard';
import ProductList from './ProductList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Example login flag – in real apps, get this from auth context
  const isLoggedIn = true;

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* Redirect to Dashboard after login */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <ProductList />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* You can add ProductList or other routes as needed */}
        <Route path="/products" element={<ProductList />} />
  <Route path="/add-product" element={<ProductForm />} />
        
      </Routes>
    </Router>
  );
}

export default App;
