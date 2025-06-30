// bouquetsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { type Bouquet } from "../../mocks/productsData"

// URL API подгружается из .env файла (локальный или прод)
const API_URL = import.meta.env.VITE_API_URL;

/** 
 * Загрузка всех букетов с сервера (GET /bouquets)
 */
export const fetchBouquets = createAsyncThunk(
  'bouquets/fetchAll',
  async () => {
    const res = await fetch(`${API_URL}/bouquets`);
    return res.json() as Promise<Bouquet[]>;
  }
);

/**
 * Добавление нового букета (POST /bouquets)
 * Omit — исключает из типа поля _id и __v, т.к. сервер их сам сгенерирует
 */
export const addBouquet = createAsyncThunk(
  'bouquets/add',
  async (bouquet: Omit<Bouquet, '_id' | '__v'>) => {
    const res = await fetch(`${API_URL}/bouquets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bouquet),
    });
    return res.json() as Promise<Bouquet>;
  }
);

/**
 * Обновление букета по id (PUT /bouquets/:id)
 * Принимает id и обновлённые поля
 */
export const updateBouquet = createAsyncThunk(
  'bouquets/update',
  async ({ id, data }: { id: string; data: Partial<Bouquet> }) => {
    const res = await fetch(`${API_URL}/bouquets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json() as Promise<Bouquet>;
  }
);

/**
 * Удаление букета по id (DELETE /bouquets/:id)
 * Возвращает просто id, чтобы удалить из store
 */
export const deleteBouquet = createAsyncThunk(
  'bouquets/delete',
  async (id: string) => {
    await fetch(`${API_URL}/bouquets/${id}`, { method: 'DELETE' });
    return id;
  }
);

// Сам slice
const bouquetSlice = createSlice({
  name: "bouquets",

  // Начальное состояние: массив букетов
  initialState: {
    items: [],
  } as { items: Bouquet[] },

  reducers: {}, // Пока не нужны обычные редьюсеры — всё через asyncThunk

  extraReducers: (builder) => {
    builder
      // При успешной загрузке — заменить все букеты
      .addCase(fetchBouquets.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // При успешном добавлении — добавить букет в начало массива
      .addCase(addBouquet.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // unshift добавляет элемент в начало массива
      })

      // При успешном обновлении — заменить конкретный букет по _id
      .addCase(updateBouquet.fulfilled, (state, action) => {
        const idx = state.items.findIndex((b) => b._id === action.payload._id); // findIndex — индекс элемента с совпадающим id
        if (idx > -1) state.items[idx] = action.payload;
      })

      // При успешном удалении — удалить букет из массива по id
      .addCase(deleteBouquet.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b._id !== action.payload);
      });
  }
})

export default bouquetSlice.reducer
