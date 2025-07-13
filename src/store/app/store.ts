import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../slices/orderSlice';
import bouquetsReducer from '../slices/bouquetsSlice';
import favoriteReducer from '../slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    bouquets: bouquetsReducer,
    favoriets: favoriteReducer,
  },
});

// Типы для хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
