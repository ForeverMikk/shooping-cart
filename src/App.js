import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";



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
    // Send state as a request
    async function sendRequest(){
      try {

        dispatch(uiActions.showNotification({
          open: true,
          type: 'warning',
          message: 'Sending Request'
        }))

        const response = await axios.put('https://redux-http-38b3d-default-rtdb.firebaseio.com/cartItems.json',
          JSON.stringify(cart)
        )

        dispatch(uiActions.showNotification({
          open: true,
          type: 'success',
          message: "Sent Request to database Successfully"
        }))

        const data = response.JSON();
        console.log("DATA", data)
      } catch(error) {

        dispatch(uiActions.showNotification({
          open:'true',
          type: 'error',
          message: "Sending Request Failed"
        }))

        // console.log(error)
      }
    }

    sendRequest()
  }, [cart])



  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      { !isLoggedIn && <Auth /> }
      { isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
