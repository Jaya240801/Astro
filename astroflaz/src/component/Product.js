import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import { CartContext } from './CartContext';

function Product() {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const url = "http://localhost:8800/product";

        fetch(url).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("something went wrong");
            }
        }).then((data) => {
            setProducts(data);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, []);

    const viewDetails = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    if (isLoading) {
        return (
            <div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <h5 class="fw-bolder text-center">Loading...</h5>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <h5 class="fw-bolder text-center">{error.message}</h5>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.map((product) => (
                <div class="col mb-5" key={product.id_product}>
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">{product.name_product}</h5>
                                <h7>{product.price_product}</h7>
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" onClick={(e) => { e.preventDefault(); viewDetails(product); }} href="#">View Detail</a></div>
                        </div>
                    </div>
                </div>
            ))}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{selectedProduct?.title}</h5>
                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body row row-cols-2 align-items-center justify-content-center">
                        <div>
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        </div>
                        <div>
                            <p>{selectedProduct?.description}</p>
                            <button type="button" className="btn btn-secondary" onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div >
    );
}

export default Product;