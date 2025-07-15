import type { StoreType } from "../store";

export const selectOrders = (state: StoreType) => state.orders.items;
export const selectCurrentOrder = (state: StoreType) =>
  state.orders.currentOrder;
