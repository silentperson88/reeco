import { combineReducers, configureStore } from "@reduxjs/toolkit";
import orderReducer from "../slice/orderSlice";


export const rootReducer = combineReducers({
  order: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
