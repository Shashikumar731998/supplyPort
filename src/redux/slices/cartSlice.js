import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  deliveryAddress: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity by 1 if already exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Initialize quantity to 1
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = []; // Clear cart
      localStorage.removeItem("cartItems");
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
  },
});

export const {
  addItem,
  setCartItems,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  setDeliveryAddress,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectDeliveryAddress = (state) => state.cart.deliveryAddress;

export default cartSlice.reducer;
