import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../slices/orderSlice';
import bouquetsReducer from '../slices/bouquetsSlice'

export const store = configureStore({
  reducer: {
    order: orderReducer,
    bouquets: bouquetsReducer,
  },
});

// Типы для хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
