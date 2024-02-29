import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import cartReducer from "../cartSlice";
// import { account } from "../../../../lib/appwite";
// let id = await account.get();
// console.log(id);
const persistConfig = {
  // key: `root ${id.$id} `,
  key: `root `,
  storage,
};
const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
});

export const persistor = persistStore(store);
