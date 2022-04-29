import axios from "axios";
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";


export const fetchData = () => {
    return async(dispatch) => {

        async function fetchHandler () {
            const response = await axios.get('https://redux-http-38b3d-default-rtdb.firebaseio.com/cartItems.json');

            const data = await response.data;
            
            return data;
        }

        try {

            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData))

        } catch(error) {
            dispatch(uiActions.showNotification({
                open:'true',
                type: 'error',
                message: "Fetching Data Error"
            }));
        }
    }
}

// Thunk Pattern with Redux
// Simplemente Pasamos la funcion de send Request al cart slice para redicir codigo

export const sendCartData = (cart) => {
    return async(dispatch) => {
        dispatch(
            uiActions.showNotification({
                open: true,
                type: 'warning',
                message: 'Sending Request'
            })
        );
        
        // Send state as a request
        async function sendRequest(){ 
            const response = await axios.put('https://redux-http-38b3d-default-rtdb.firebaseio.com/cartItems.json',
                JSON.stringify(cart)
            )

            const data = await response.data;
            console.log("DATA", data)

            dispatch(uiActions.showNotification({
                open: true,
                type: 'success',
                message: "Sent Request to database Successfully"
            }));
        }
        //  End Request Function

        try {
            await sendRequest();
        } catch(error) {
            dispatch(uiActions.showNotification({
                open:'true',
                type: 'error',
                message: "Sending Request Failed"
            }));
        }
    }
}