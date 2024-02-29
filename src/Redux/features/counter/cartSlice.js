import { createSlice } from "@reduxjs/toolkit";

const calculateTotal = (state) => {
  state.totalAmount = 0;
  state.items.forEach((element) => {
    state.totalAmount += +element.totalPrice;
  });
  // return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
const initialState = {
  items: [],
  totalAmount: 0,
  user: null,
  userId: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (state.items.length < 1) {
        state.items.push(action.payload);
      } else {
        if (
          !state.items.some(
            (item) => JSON.stringify(item) === JSON.stringify(action.payload)
          )
        ) {
          state.items.push(action.payload);
        }
      }
      calculateTotal(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(action.payload)
      );
      calculateTotal(state);
    },
    increaseQuantity: (state, action) => {
      state.items.forEach((element, index) => {
        if (JSON.stringify(element) === JSON.stringify(action.payload)) {
          element.totalQuantities += 1;
          element.totalPrice = parseInt(element.totalQuantities * element.rs);
        }
      });
      calculateTotal(state);
    },
    decreaseQuantity: (state, action) => {
      state.items.forEach((element, index) => {
        if (JSON.stringify(element) === JSON.stringify(action.payload)) {
          element.totalQuantities = Math.max(1, element.totalQuantities - 1);
          element.totalPrice = parseInt(element.totalQuantities * element.rs);
        }
      });
      calculateTotal(state);
    },
    setUser: (state, action) => {
      console.log(action.payload.$id);
      state.user = action.payload.name;
      state.userId = action.payload.$id;
    },
    setLogout: (state) => {
      state.user = null;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  setUser,
  setLogout,
} = cartSlice.actions;
export default cartSlice.reducer;
