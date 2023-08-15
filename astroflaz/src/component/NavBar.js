import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from './CartContext';
import Modal from 'react-modal';
import axios from 'axios';
import LoginPage from './LoginPage';

function NavBar() {
  const { cart, removeFromCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async () => {
    try {
      console.log(userEmail)
      const { data } = await axios.post('http://localhost:8800/create-transaction', { amount: totalAmount, userEmail: userEmail });
      
      window.snap.pay(data.transactionToken, {
        onSuccess: (result) => {
          console.log('Transaction was successful:', result);
        },
        onPending: (result) => {
          console.log('Transaction is pending:', result);
        },
        onError: (result) => {
          console.log('Transaction had an error:', result);
        },
        onClose: () => {
          console.log('User closed the popup without finishing the payment');
        }
      });
    } catch (error) {
      console.error('Failed to initiate payment:', error);
    }
  };

  const handleLoginSuccess = (email) => {
    setUserEmail(email); // Set the user's email
  };

  return (
    <div>
      {/* <!-- Navigation--> */}
      <nav class="navbar navbar-expand-lg navbar-light bg-black ">
        <div class="container px-4 px-lg-5">
          <a class="navbar-brand text-light fw-bold" href="#!">AstroFlaz</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li class="nav-item"><a class="nav-link text-light" href="#!">Website Packages</a></li>
              <li class="nav-item"><a class="nav-link text-light" href="#!">Mobile Packages</a></li>
            </ul>
            <div class="d-flex">
              <button class="btn btn-outline-dark btn-light" onClick={() => setIsModalOpen(true)} type="submit">
                <i class="bi-cart-fill me-1"></i>
                Cart
                <span class="badge bg-dark text-white ms-1 rounded-pill">{cart.length}</span>
              </button>
              <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                {/* <LoginPage passEmail={() => handleLoginSuccess} /> */}
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Cart Detail</h5>
                    <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
                  </div>
                  <div className="modal-body row row-cols-2 align-items-center justify-content-center">
                    <div>
                      <ul>
                        {cart.map(item => (
                          <li key={item.id}>
                            <span>{item.title} - {item.price}</span>
                            <button onClick={() => removeFromCart(item.cartItemId)}>Delete</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      {/* <input type='hidden' value={userEmail}></input> */}
                      <p>Total Amount: {totalAmount}</p>
                      <button type="button" className="btn btn-secondary" onClick={() => handleCheckout()}>Checkout</button>
                    </div>
                  </div>
                </div>
              </Modal>
              <div class="m-2" />
              <button class="btn btn-outline-dark btn-light" type="submit">Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;