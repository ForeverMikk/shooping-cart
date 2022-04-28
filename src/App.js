import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";



function App() {

  const cart = useSelector(state => state.cart);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log("Is Logged In", isLoggedIn)

  // const cartItems = useSelector(state => state.cart.itemList);
  // console.log("Cart List", cartItems)


  // using fetch
  // useEffect(() => {
  //   fetch('https://redux-http-38b3d-default-rtdb.firebaseio.com/cartItems.json', {
  //     method: 'PUT',
  //     body: JSON.stringify(cart)
  //   })
  // },[cart])


  // using axios
  useEffect(() => {
    async function setItemsCart(){
      try {
        const response = await axios.put('https://redux-http-38b3d-default-rtdb.firebaseio.com/cartItems.json',
          JSON.stringify(cart)
        )
        console.log(response)
      } catch(error) {
        console.log(error)
      }
    }

    setItemsCart()
  }, [cart])



  return (
    <div className="App">
      { !isLoggedIn && <Auth /> }
      { isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
