import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import bouquetReducer from "../slices/bouquetSlice";
// import bouquetsReducer from '../slices/bouquetsSlice';
import favoriteReducer from "../slices/favoritesSlice";
import orderReducer from "../slices/orderSlice";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    favoriets: favoriteReducer,
    auth: authReducer,
    bouquet: bouquetReducer,
  },
});

// Типы для хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
