import { RootState } from '../slices/rootReducer';

export const getCurrentOrder = (state: RootState) => state.order.currentOrder;
export const getOrderNumber = (state: RootState) => state.order.orderNumber;
export const getOrderLoading = (state: RootState) => state.order.loading;
export const getOrderError = (state: RootState) => state.order.error;
