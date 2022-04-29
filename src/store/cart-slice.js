import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            // checar si el item esta disponible
            const existingItem = state.itemList.find((item) => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else {
                state.itemList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                })
                state.totalQuantity++;
            }

        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.itemList.find(item => item.id === id);

            if(existingItem.quantity === 1){
                state.itemList = state.itemList.filter(item => item.id !== id);
                state.totalQuantity--;
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
        setShowCart(state) {
            state.showCart = !state.showCart;
        }

    }
})

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


export const cartActions = cartSlice.actions;

export default cartSlice;