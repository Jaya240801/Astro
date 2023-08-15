import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './component/ProductList';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CartProvider from './component/CartProvider';
import LoginPage from './component/LoginPage';
import ProtectedRoute from './component/ProtectedRoute';
import RegisterPage from './component/RegisterPage';

function App() {
  return (
    <div>
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <ProductList/>
              </ProtectedRoute>
            }/>
          </Routes>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
