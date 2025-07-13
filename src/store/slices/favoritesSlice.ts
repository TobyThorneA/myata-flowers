import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = 'favoriets';

const loadFromLocalStorage = (): string[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveToLocalStorage = (favoriets: string[]) => { 
  try{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favoriets))
  } catch{ 
    console.warn("Не удалось сохранить избранное в localStorage");
  }
}

interface FavorietsState {
  favoriteIds: string[];
}

const initialState: FavorietsState = {
  favoriteIds: loadFromLocalStorage(),
}

const favoriteSlice = createSlice({
  name: 'Favoriets',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if(state.favoriteIds.includes(id)){
        state.favoriteIds = state.favoriteIds.filter((favId) => favId !== id);
      } else {
        state.favoriteIds.push(id);
      }
      saveToLocalStorage(state.favoriteIds)
    },
    clearFavorite: (state) => {
      state.favoriteIds = [];
      saveToLocalStorage(state.favoriteIds);
    }
  }
})

export const { toggleFavorite, clearFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
