import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(item => item._id === action.payload._id);
      if (!existingProduct) {
        return [...state, action.payload];
      }
      return state;
    },
    
    removeFromCart: (state, action) => {
      console.log("Removing from cart:", action.payload);
      return state.filter(item => item._id !== action.payload._id);
    },
    
    clearCart: state => [],
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
