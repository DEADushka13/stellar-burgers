import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsSlice';
import constructorReducer from './constructorSlice';
import orderReducer from './orderSlice';
import feedReducer from './feedSlice';
import userReducer from './userSlice';
import userOrdersReducer from './userOrdersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer,
  userOrders: userOrdersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
