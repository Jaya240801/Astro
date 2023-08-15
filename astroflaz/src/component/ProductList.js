import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './Product';
import NavBar from './NavBar';
import MyFooter from './MyFooter';

function ProductList() {
  return (
    <div>
      <NavBar />
      {/* <!-- Header--> */}
      <header class="bg-dark border-bottom py-5">
        <div class="container px-4 px-lg-5 pt-5">
          <div class="text-center text-white py-4">
            <h1 class="display-4 fw-bolder">Website Packages</h1>
            <p class="lead fw-normal text-white-50 mb-0">Choose a packages for website</p>
          </div>
        </div>
      </header>
      {/* <!-- Section--> */}
      <section class="py-5  bg-light">
        <div class="container px-4 px-lg-5 mt-5">
          <Product />
        </div>
      </section>
      <MyFooter />
    </div>
  );
}

export default ProductList;