import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './component/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartProvider from './component/CartProvider';
import LoginPage from './component/LoginPage';
import ProtectedRoute from './component/ProtectedRoute';
import RegisterPage from './component/RegisterPage';
import UserContext from './component/UserContext';
import { useState } from 'react';

function App() {
  const [userEmail, setUserEmail] = useState('');

  return (
    <div>
      <Router>
        <CartProvider>
          <UserContext.Provider value={{userEmail, setUserEmail}}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              } />
            </Routes>
          </UserContext.Provider>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
