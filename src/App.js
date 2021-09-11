import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meal from "./components/Meal/Meal";
import React, { useState } from "react";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShow, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShow && <Cart onHideCart={hideCartHandler}></Cart>}
      <Header onShowCart={showCartHandler}></Header>
      <main>
        <Meal></Meal>
      </main>
    </CartProvider>
  );
}

export default App;
