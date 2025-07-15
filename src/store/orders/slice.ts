import { createSlice } from "@reduxjs/toolkit";
import type { IOrder } from "../../types/order";
import orders from "../../../data/orders.json";

const initialState: { items: IOrder[]; currentOrder: IOrder | null } = {
  items: orders as IOrder[],
  currentOrder: null,
};

const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder(state, { payload }: { payload: IOrder }) {
      state.items = [...state.items, payload];
    },
    updateOrder(state, { payload }: { payload: IOrder }) {
      state.items = [
        ...state.items.filter(({ id }) => id !== payload.id),
        payload,
      ];
    },
    deleteOrder(state, { payload }: { payload: number }) {
      state.items = [...state.items.filter(({ id }) => id !== payload)];
    },
    setCurrentOrder(state, { payload }: { payload: IOrder | null }) {
      state.currentOrder = payload;
    },
  },
});

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;

export const { createOrder, updateOrder, deleteOrder, setCurrentOrder } =
  ordersSlice.actions;
