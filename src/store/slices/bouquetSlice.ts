// src/store/slices/bouquetSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IBouquet } from '@pages/admin/types';
import type { BouquetFormData } from '@pages/admin/BouquetForm';

const API = 'https://api-v2.myata-flowers.ru/api/bouquets';

// ===================== Async Thunks =====================

// 1. Fetch all bouquets
export const fetchBouquetsThunk = createAsyncThunk<IBouquet[], { isAdmin?: boolean } | void, { state: { auth: { token: string } } }>(
  'bouquets/fetchAll',
  async ({ isAdmin } = {}, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await axios.get<IBouquet[]>(API, {
      params: { ...(isAdmin && { showHidden: true }) },
      headers: isAdmin ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data;
  }
);

// 2. Create bouquet
export const createBouquetThunk = createAsyncThunk<IBouquet, BouquetFormData, { state: { auth: { token: string } } }>(
  'bouquets/create',
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await axios.post<IBouquet>(API, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// 3. Update bouquet
export const updateBouquetThunk = createAsyncThunk<IBouquet, { id: string; data: Partial<BouquetFormData> }, { state: { auth: { token: string } } }>(
  'bouquets/update',
  async ({ id, data }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await axios.put<IBouquet>(`${API}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// 4. Delete bouquet
export const deleteBouquetThunk = createAsyncThunk<string, string, { state: { auth: { token: string } } }>(
  'bouquets/delete',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

// 5. Fetch bouquets by category
export const fetchBouquetsByCategoryThunk = createAsyncThunk<{ category: string; bouquets: IBouquet[] }, string>(
  'bouquets/fetchByCategory',
  async (category, thunkAPI) => {
    try {
      const res = await axios.get<IBouquet[]>(`${API}?categories=${encodeURIComponent(category)}`);
      return { category, bouquets: res.data };
    } catch (err) {
      const msg = (err instanceof Error ? err.message : 'Ошибка загрузки по категории');
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// ===================== Slice =====================

interface BouquetState {
  items: IBouquet[];
  bouquetsByCategory: Record<string, IBouquet[]>;
  loading: boolean;
  error: string | null;
}

const initialState: BouquetState = {
  items: [],
  bouquetsByCategory: {},
  loading: false,
  error: null,
};

const bouquetSlice = createSlice({
  name: 'bouquets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchBouquetsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBouquetsThunk.fulfilled, (state, action: PayloadAction<IBouquet[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchBouquetsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка загрузки букетов';
      })

      // create
      .addCase(createBouquetThunk.fulfilled, (state, action: PayloadAction<IBouquet>) => {
        state.items.push(action.payload);
      })

      // update
      .addCase(updateBouquetThunk.fulfilled, (state, action: PayloadAction<IBouquet>) => {
        const idx = state.items.findIndex(b => b._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })

      // delete
      .addCase(deleteBouquetThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(b => b._id !== action.payload);
      })

      // fetch by category
      .addCase(fetchBouquetsByCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBouquetsByCategoryThunk.fulfilled, (state, action: PayloadAction<{ category: string; bouquets: IBouquet[] }>) => {
        const { category, bouquets } = action.payload;
        state.bouquetsByCategory[category] = bouquets;
        state.loading = false;
      })
      .addCase(fetchBouquetsByCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Ошибка загрузки по категории';
      });
  },
});

export default bouquetSlice.reducer;


// // src/store/slices/bouquetSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import type { IBouquet } from '@pages/admin/types';
// import type { BouquetFormData } from '@pages/admin/BouquetForm';

// const API = 'https://api-v2.myata-flowers.ru/api/bouquets';

// // // 1. Fetch all bouquets
// // export const fetchBouquetsThunk = createAsyncThunk(
// //   'bouquets/fetchAll',
// //   async (_, thunkAPI) => {
// //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //     const token = (thunkAPI.getState() as any).auth.token;
// //     const res = await axios.get(API, {
// //       headers: { Authorization: `Bearer ${token}` },
// //     });
// //     return res.data; // массив букетов
// //   }
// // );

// // 1. Fetch all bouquets
// export const fetchBouquetsThunk = createAsyncThunk(
//   'bouquets/fetchAll',
//   async ({ isAdmin }: { isAdmin?: boolean } = {}, thunkAPI) => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const token = (thunkAPI.getState() as any).auth.token;

//     const res = await axios.get(API, {
//       params: {
//         ...(isAdmin && { showHidden: true }) // добавляем showHidden=true только для админа
//       },
//       headers: isAdmin ? { Authorization: `Bearer ${token}` } : undefined,
//     });

//     return res.data; // массив букетов
//   }
// );


// // 2. Create bouquet
// export const createBouquetThunk = createAsyncThunk(
//   'bouquets/create',
//   async (data: BouquetFormData, thunkAPI) => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const token = (thunkAPI.getState() as any).auth.token;
//     const res = await axios.post(API, data, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data; // созданный букет
//   }
// );

// // 3. Update bouquet
// export const updateBouquetThunk = createAsyncThunk(
//   'bouquets/update',
//   async ({ id, data }: { id: string; data: Partial<BouquetFormData> }, thunkAPI) => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const token = (thunkAPI.getState() as any).auth.token;
//     const res = await axios.put(`${API}/${id}`, data, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data; // обновленный букет
//   }
// );

// // 4. Delete bouquet
// export const deleteBouquetThunk = createAsyncThunk(
//   'bouquets/delete',
//   async (id: string, thunkAPI) => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const token = (thunkAPI.getState() as any).auth.token;
//     await axios.delete(`${API}/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return id; // возвращаем id, чтобы удалить из стейта
//   }
// );

// export const fetchBouquetsByCategoryThunk = createAsyncThunk(
//   'bouquets/fetchByCategory',
//   async (category: string, thunkAPI) => {
//     try {
//       const params = new URLSearchParams();
//       params.append('categories', category);
//       const res = await axios.get(`${API}?${params.toString()}`);
//       return { category, bouquets: res.data }; // возвращаем и категорию, и букеты
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

// interface BouquetState {
//   items: IBouquet[];
//   bouquetsByCategory: {
//     [categoryName: string]: IBouquet[];
//   };
//   loading: boolean;
//   error: string | null;
// }

// const initialState: BouquetState = {
//   items: [],
//   bouquetsByCategory: {},
//   loading: false,
//   error: null,
// };


// const bouquetSlice = createSlice({
//   name: 'bouquets',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // fetchAll
//       .addCase(fetchBouquetsThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBouquetsThunk.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchBouquetsThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Ошибка загрузки букетов';
//       })
//       // create
//       .addCase(createBouquetThunk.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })
//       // update
//       .addCase(updateBouquetThunk.fulfilled, (state, action) => {
//         const idx = state.items.findIndex(b => b._id === action.payload._id);
//         if (idx !== -1) state.items[idx] = action.payload;
//       })
//       // delete
//       .addCase(deleteBouquetThunk.fulfilled, (state, action) => {
//         state.items = state.items.filter(b => b._id !== action.payload);
//       })
//       // fetch bouquets by categories (promo)
//       // Загрузка по категориям
//       .addCase(fetchBouquetsByCategoryThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBouquetsByCategoryThunk.fulfilled, (state, action) => {
//         const { category, bouquets } = action.payload;
//         state.bouquetsByCategory[category] = bouquets;
//         state.loading = false;
//       })
//       .addCase(fetchBouquetsByCategoryThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string ?? 'Ошибка загрузки по категории';
//       })
//   },
// });

// export default bouquetSlice.reducer;
