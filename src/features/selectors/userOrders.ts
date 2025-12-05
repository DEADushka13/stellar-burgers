import { RootState } from '../slices/rootReducer';

export const getUserOrders = (state: RootState) => state.userOrders.orders;
export const getUserOrdersLoading = (state: RootState) =>
  state.userOrders.loading;
export const getUserOrdersError = (state: RootState) => state.userOrders.error;
