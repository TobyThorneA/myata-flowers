import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface OrderState {
  name: string,
  bouquetName: string,
  phone: string,
  contactMethod: 'call' | 'telegram' | 'whatsapp' | '',
  kindOfFlowers: string,
  whomGifts: string,
  flowerDesign: string,
  honeypot: string,
}

const initialState: OrderState = {
  name: '',
  bouquetName: "Не указан",
  phone: '',
  contactMethod: 'call',
  kindOfFlowers: '',
  whomGifts: '',
  flowerDesign: '',
  honeypot: '',
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>){
      state.name = action.payload
    },
    setBouquetName(state, action: PayloadAction<string>){
      state.bouquetName = action.payload
    },
    setPhone(state, action: PayloadAction<string>){
      state.phone = action.payload
    },
    setContactMethod(state, action: PayloadAction<'call' | 'telegram' | 'whatsapp' | ''>){
      state.contactMethod = action.payload
    },
    setKindOfFlowers(state, action: PayloadAction<string>){
      state.kindOfFlowers = action.payload
    },
    setWhomGifts(state, action: PayloadAction<string>){
      state.whomGifts = action.payload
    },
    setFlowerDesign(state, action: PayloadAction<string>){
      state.flowerDesign = action.payload
    },
    setHoneypot(state, action: PayloadAction<string>){
      state.honeypot = action.payload
    },
    resetOrder(state) {
      Object.assign(state, initialState)
    },
  }
});

export const {
  setName,
  setBouquetName,
  setPhone,
  setContactMethod,
  setKindOfFlowers,
  setWhomGifts,
  setFlowerDesign,
  setHoneypot,
  resetOrder
} = orderSlice.actions

export default orderSlice.reducer
