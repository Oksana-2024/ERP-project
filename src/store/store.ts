import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./orders/slice";

const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
