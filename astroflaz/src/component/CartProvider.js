import React, { useState } from 'react';
import { CartContext } from './CartContext';

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [cartItemId, setCartItemId] = useState(0);

    const addToCart = (product) => {
        setCartItemId(cartItemId + 1);
        const productWithCartId = { ...product, cartItemId };
        setCart((oldCart) => [...oldCart, productWithCartId]);

    };

    const removeFromCart = (productID) => {
        setCart((oldCart) => oldCart.filter((product) => product.cartItemId !== productID));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;