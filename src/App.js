import React, { useState, useEffect } from "react";
// import Products from './components/Products/Products'
// import Navbar from './components/Navbar/Navbar'

// All the components coming from indexComponents.js
import { Products, Navbar, Cart, Checkout } from "./components/indexComponents";
//backend will be taken cared of by ecommercejs.components
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  // cart setting
  const fetchCart = async () => {
    // const cart = await commerce.cart.retrieve();
    // setCart(cart); OR
    setCart(await commerce.cart.retrieve());
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart); // updates the cart
  };

  // const response = await commerce.cart.update(productId, {quantity});
  // setCart(response.cart);
  const handleUpdateCartQuantity = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart); // updates the cart
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart); // updates the cart
  };

  // no need of any parameters, it just removes the cart
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart); // updates the cart
  };

  console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          {/* Product component is the root path */}
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          {/* cart route component */}
          <Route exact path="/cart">
            {/* pass them (handleUpdateCartQuantity handleRemoveFromCart handleEmptyCart are  names of the props)to Cart (empty button) and CartItem component (update and remove) where gonna call them */}
            <Cart
              cart={cart}
              handleUpdateCartQuantity={handleUpdateCartQuantity}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          {/* checkout route component*/}
          <Route exact path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
