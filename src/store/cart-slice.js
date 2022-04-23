import { createSlice } from "@reduxjs/toolkit";

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
                existingItem.quantiy++;
                existingItem.totalPrice += newItem.price;
            } else {
                state.itemList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantiy: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                })
                state.totalQuantity++;
            }

        },
        removeFromCart() {},
        setShowCart(state) {
            state.showCart = true;
        }

    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;