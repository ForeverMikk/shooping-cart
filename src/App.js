import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { sendCartData } from "./store/cart-slice";
let isFirstRender = true;


function App() {

  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
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

    if(isFirstRender) {
      isFirstRender = false;
      return;
    }

    dispatch(sendCartData(cart));
    
  }, [cart, dispatch])



  return (
    <div className="App">
      { notification && <Notification type={notification.type} message={notification.message} />}
      { !isLoggedIn && <Auth /> }
      { isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
