import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";



function App() {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log("Is Logged In", isLoggedIn)

  const cartItems = useSelector(state => state.cart.itemList);
  console.log("Cart List", cartItems)


  return (
    <div className="App">
      { !isLoggedIn && <Auth /> }
      { isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
