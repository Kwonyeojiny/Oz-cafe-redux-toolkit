import { legacy_createStore } from "redux";
import data from "../assets/data";
import { combineReducers } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

// Redux Toolkit
export const menuSlice = createSlice({
  name: "menu",
  initialState: data.menu,
  reducers: {},
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      return [...state, action.payload];
    },
    removeFromCart(state, action) {
      return state.filter((el) => action.payload.id !== el.id);
    },
  },
});

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    cart: cartSlice.reducer,
  },
});

// Redux
export const addToCart = (options, quantity, id) => {
  return {
    type: "addToCart",
    payload: { options, quantity, id },
  };
};

export const removeFromCart = (id) => {
  return {
    type: "removeFromCart",
    payload: { id },
  };
};

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "addToCart":
      return [...state, action.payload];
    case "removeFromCart":
      return state.filter((el) => action.payload.id !== el.id);
    default:
      return state;
  }
};

const menuReducer = (state = data.menu, action) => {
  return state;
};

// reducer가 여러개일때 하나로 묶어서 써야함
const rootReducer = combineReducers({ cartReducer, menuReducer });

// export const store = legacy_createStore(rootReducer);
